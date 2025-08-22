import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { loadComponent } from './DynamicComponentLoader.js'
import { dataServiceManager } from '../services/dataServiceManager'
import ErrorPage from '../components/ui/ErrorPage'
import ErrorBoundary from './ErrorBoundary'
import { languageService } from '../services/languageService'
import { t } from '../../user/translations'

const DynamicPage = () => {
  const [pageData, setPageData] = useState(null)
  const [error, setError] = useState(null)
  const [errorObject, setErrorObject] = useState(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [loadedComponents, setLoadedComponents] = useState({})
  const [componentsLoading, setComponentsLoading] = useState(false)
  const location = useLocation()

  // Make language service available globally for translations
  if (typeof window !== 'undefined') {
    window.languageService = languageService
  }

  const loadPageData = async () => {
    setError(null)
    setErrorObject(null)
    setComponentsLoading(true)
    
    try {
      console.log('🚀 Loading page data for:', location.pathname)
      
      // Block test routes in production
      if (location.pathname.startsWith('/tests') && import.meta.env.PROD === true) {
        const error = new Error(`Page not found: ${location.pathname}`)
        error.status = 404
        error.type = 'NOT_FOUND'
        throw error
      }
      
      // Load JSON data first
      let data
      if (location.pathname.startsWith('/tests')) {
        console.log('Test route detected, using local storage only')
        data = await loadFromLocalStorage(location.pathname)
      } else {
        data = await dataServiceManager.fetchJsonFile(location.pathname)
      }
      
      setPageData(data)

      // 🎯 PERFORMANCE OPTIMIZATION: Extract component types and load only what's needed
      if (data?.components) {
        console.log('📦 Loading components specified in JSON...')
        
        // Extract unique component types from JSON
        const componentTypes = new Set()
        data.components.forEach(component => {
          if (component.type) {
            componentTypes.add(component.type)
          }
        })

        console.log('🎯 Component types to load:', Array.from(componentTypes))

        // Load ONLY the components that are actually used in the JSON (lazy loading)
        if (componentTypes.size > 0) {
          const componentPromises = Array.from(componentTypes).map(async (type) => {
            try {
              console.log(`⚡ Loading component: ${type}`)
              const Component = await loadComponent(type)
              return [type, Component]
            } catch (err) {
              console.warn(`❌ Failed to load component: ${type}`, err)
              return [type, null] // Will show fallback
            }
          })

          const componentEntries = await Promise.all(componentPromises)
          const components = Object.fromEntries(componentEntries)
          
          console.log(`✅ Successfully loaded ${Object.keys(components).length} components`)
          setLoadedComponents(components)
        }
      }
      
      setComponentsLoading(false)
    } catch (err) {
      console.error('Failed to load page data:', err)
      setError(err.message)
      setErrorObject(err)
      setComponentsLoading(false)
    } finally {
      setIsInitialLoad(false)
    }
  }

  // Local storage loader for test routes
  const loadFromLocalStorage = async (path) => {
    let jsonPath
    
    if (path === '/') {
      jsonPath = '/database/json/index.json'
    } else if (path === '/tests') {
      // Handle /tests route -> /database/json/tests/index.json
      jsonPath = '/database/json/tests/index.json'
    } else if (path.startsWith('/tests/')) {
      // Handle nested test routes like /tests/component-error-test
      const testFileName = path.replace('/tests/', '')
      jsonPath = `/database/json/tests/${testFileName}.json`
    } else {
      // For other routes, try folder structure first (e.g., /company -> /company/index.json)
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      jsonPath = `/database/json${cleanPath}/index.json`
    }
    
    console.log('Loading local file:', jsonPath)
    
    let response = await fetch(jsonPath)
    
    // If folder structure fails for non-test routes, try flat file fallback
    if (!response.ok && !path.startsWith('/tests') && path !== '/') {
      console.log(`Folder structure failed, trying flat file: /database/json${path}.json`)
      jsonPath = `/database/json${path}.json`
      response = await fetch(jsonPath)
    }
    
    if (!response.ok) {
      if (response.status === 404) {
        const error = new Error(`Test page not found: ${path}`)
        error.status = 404
        error.type = 'NOT_FOUND'
        throw error
      }
      const error = new Error(`Failed to load test file: ${jsonPath}`)
      error.status = response.status
      error.type = 'FILE_ERROR'
      throw error
    }
    
    const data = await response.json()
    return data
  }

  useEffect(() => {
    setIsInitialLoad(true)
    setPageData(null)
    setError(null)
    setErrorObject(null)
    loadPageData()
  }, [location.pathname])

  const handleRetry = () => {
    loadPageData()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  // Don't render anything during initial load to prevent flash
  if (isInitialLoad) {
    return null
  }

  // Show loading state while components are being loaded
  if (componentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading components...</p>
          <p className="text-gray-500 text-sm mt-2">Only loading what's needed for this page</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorPage 
        error={error}
        errorObject={errorObject}
        path={location.pathname}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    )
  }

  if (!pageData?.components) {
    return (
      <ErrorPage 
        error={t('errors.general.invalidPageData')}
        errorObject={{ status: 500, type: 'SERVER_ERROR' }}
        path={location.pathname}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    )
  }

  return (
    <ErrorBoundary
      ErrorPage={ErrorPage}
      path={location.pathname}
      onRetry={handleRetry}
      onGoHome={handleGoHome}
    >
      <div className="min-h-screen">
        {pageData.components.map((component, index) => {
          const Component = loadedComponents[component.type]
          
          if (!Component) {
            if (!import.meta.env.PROD) {
              console.warn(`Component "${component.type}" not found in loaded components`)
            }
            
            // Create a structured error for production
            if (import.meta.env.PROD) {
              const errorMessage = `Component "${component.type}" not found`
              const error = new Error(errorMessage)
              error.status = 500
              error.type = 'COMPONENT_ERROR'
              error.componentType = component.type
              throw error
            }
            
            // In development, show detailed component error
            return (
              <div key={index} className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded m-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <strong>{t('errors.component.title')}:</strong>
                </div>
                <p className="mt-1">{t('errors.component.notFound', { type: component.type })}</p>
                <p className="text-sm text-red-600 mt-1">
                  Available: {Object.keys(loadedComponents).join(', ') || 'None'}
                </p>
                <p className="text-xs text-red-500 mt-1">
                  💡 Check component name and ensure it exists in the components folder
                </p>
              </div>
            )
          }

          // Extract props (everything except 'type')
          const { type, ...props } = component
          
          // Let ErrorBoundary handle any render errors
          return <Component key={index} {...props} />
        })}
      </div>
    </ErrorBoundary>
  )
}

export default DynamicPage

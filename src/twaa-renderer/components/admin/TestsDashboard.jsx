import React, { useState, useEffect } from 'react'

const TestsDashboard = () => {
  const [systemStats, setSystemStats] = useState({})
  const [loading, setLoading] = useState(true)

  // Check if we should show this component
  const isDevelopment = import.meta.env.DEV
  const isDebugEnabled = import.meta.env.VITE_DEBUG_MODE === 'true'
  const testsHidden = import.meta.env.VITE_HIDE_TESTS === 'true'
  const shouldShow = (isDevelopment || isDebugEnabled) && !testsHidden

  useEffect(() => {
    if (!shouldShow) return
    loadDashboardData()
    // No auto-refresh - load once only
  }, [shouldShow])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load system stats once
      await loadSystemStats()
      
      // Skip all ping tests - not needed
      
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadSystemStats = async () => {
    try {
      // Dynamically discover all main page JSON files and categorize them
      const response = await fetch('/database/json/')
      let totalPages = 0
      let totalComponents = 0
      let availablePages = 0
      let pageCategories = {}
      let componentFolders = {}

      // Define page categories based on common naming patterns
      const categoryPatterns = {
        'Main Pages': [], // Will be default for all pages not in other categories
        'Company Pages': ['company', 'team', 'pricing'],
        'Product Pages': ['products', 'services', 'portfolio'],
        'Blog Pages': ['blog']
      }

      // Initialize categories
      Object.keys(categoryPatterns).forEach(category => {
        pageCategories[category] = { count: 0, files: [] }
      })

      if (response.ok) {
        // Try to get directory listing if server supports it
        try {
          const text = await response.text()
          // Extract .json files from directory listing
          const jsonFiles = (text.match(/href="[^"]*\.json"/g) || [])
            .map(match => match.replace(/href="|"/g, ''))
            .filter(file => !file.includes('/')) // Exclude nested paths
          
          if (jsonFiles.length > 0) {
            // Use discovered files and categorize them
            for (const file of jsonFiles) {
              const fileName = file.replace('.json', '')
              let categorized = false
              
              try {
                const pageResponse = await fetch(`/database/json/${file}`)
                if (pageResponse.ok) {
                  totalPages++
                  availablePages++
                  
                  // Categorize the page
                  let categorized = false
                  for (const [category, patterns] of Object.entries(categoryPatterns)) {
                    if (category !== 'Main Pages' && patterns.includes(fileName)) {
                      pageCategories[category].count++
                      pageCategories[category].files.push(fileName)
                      categorized = true
                      break
                    }
                  }
                  
                  // If not categorized in specific folders, it goes to Main Pages (root)
                  if (!categorized) {
                    pageCategories['Main Pages'].count++
                    pageCategories['Main Pages'].files.push(fileName)
                  }
                }
              } catch (error) {
                console.warn(`Failed to load ${file}:`, error)
                totalPages++
              }
            }
          } else {
            throw new Error('No files discovered from directory listing')
          }
        } catch (dirError) {
          // Fallback: try known file patterns and common names
          const commonPageNames = [
            'index', 'products', 'blog', 'company', 'dashboard', 'about', 'contact',
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
            '3-1', '3_1', '2-1', '2_1', '4-1', '4_1', '5-1', '5_1',
            'home', 'services', 'portfolio', 'team', 'pricing', 'faq'
          ]
          
          for (const pageName of commonPageNames) {
            try {
              const pageResponse = await fetch(`/database/json/${pageName}.json`)
              if (pageResponse.ok) {
                totalPages++
                availablePages++
                
                // Categorize the page
                let categorized = false
                for (const [category, patterns] of Object.entries(categoryPatterns)) {
                  if (category !== 'Main Pages' && patterns.includes(pageName)) {
                    pageCategories[category].count++
                    pageCategories[category].files.push(pageName)
                    categorized = true
                    break
                  }
                }
                
                // If not categorized in specific folders, it goes to Main Pages (root)
                if (!categorized) {
                  pageCategories['Main Pages'].count++
                  pageCategories['Main Pages'].files.push(pageName)
                }
              }
            } catch (error) {
              // File doesn't exist, continue
            }
          }
        }
      } else {
        // If directory listing fails, use fallback method (same as above)
        const commonPageNames = [
          'index', 'products', 'blog', 'company', 'dashboard', 'about', 'contact',
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '3-1', '3_1', '2-1', '2_1', '4-1', '4_1', '5-1', '5_1',
          'home', 'services', 'portfolio', 'team', 'pricing', 'faq'
        ]
        
        for (const pageName of commonPageNames) {
          try {
            const pageResponse = await fetch(`/database/json/${pageName}.json`)
            if (pageResponse.ok) {
              totalPages++
              availablePages++
              
              // Categorize the page
              let categorized = false
              for (const [category, patterns] of Object.entries(categoryPatterns)) {
                if (category !== 'Main Pages' && patterns.includes(pageName)) {
                  pageCategories[category].count++
                  pageCategories[category].files.push(pageName)
                  categorized = true
                  break
                }
              }
              
              // If not categorized in specific folders, it goes to Main Pages (root)
              if (!categorized) {
                pageCategories['Main Pages'].count++
                pageCategories['Main Pages'].files.push(pageName)
              }
            }
          } catch (error) {
            // File doesn't exist, continue
          }
        }
      }

      // Count actual JSX components from folders (excluding ui and admin)
      const { getAvailableFolders, getComponentsByFolder } = await import('../../core/DynamicComponentLoader.js')
      const folders = getAvailableFolders()
      const excludeFolders = ['ui', 'admin'] // Exclude these folders from component count
      
      const includedFolders = folders.filter(folder => !excludeFolders.includes(folder))
      
      for (const folder of includedFolders) {
        const components = getComponentsByFolder(folder)
        const componentCount = Object.keys(components).length
        componentFolders[folder] = {
          count: componentCount,
          components: Object.keys(components)
        }
        totalComponents += componentCount
      }

      setSystemStats({
        totalPages,
        availablePages,
        totalComponents,
        pageCategories,
        componentFolders,
        buildTime: new Date().toISOString(),
        environment: import.meta.env.MODE
      })

    } catch (error) {
      console.error('Failed to load system stats:', error)
    }
  }

  // Don't render in production unless debug is enabled
  if (!shouldShow) {
    if (import.meta.env.PROD === true) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tests Not Available</h1>
            <p className="text-gray-600 mb-8">Test dashboard is disabled in production mode for security reasons.</p>
            <div className="space-y-2">
              <a href="/" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">System Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Real-time monitoring and system health checks
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {import.meta.env.MODE}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="mb-6 flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        )}

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pages Statistics */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pages</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalPages || 0}</p>
              </div>
            </div>
            
            {systemStats.pageCategories && (
              <div className="space-y-2">
                {Object.entries(systemStats.pageCategories)
                  .filter(([_, data]) => data.count > 0)
                  .map(([category, data]) => (
                  <div key={category} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700">
                      {category === 'Main Pages' ? '/' : 
                       category === 'Product Pages' ? '/products' : 
                       category === 'Company Pages' ? '/company' : 
                       category === 'Blog Pages' ? '/blog' : 
                       category}
                    </span>
                    <span className="text-sm text-gray-900 font-semibold">{data.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Components Statistics */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Components</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalComponents || 0}</p>
              </div>
            </div>
            
            {systemStats.componentFolders && (
              <div className="space-y-2">
                {Object.entries(systemStats.componentFolders)
                  .filter(([_, data]) => data.count > 0)
                  .map(([folder, data]) => (
                  <div key={folder} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-700 capitalize">{folder}</span>
                    <span className="text-sm text-gray-900 font-semibold">
                      {data.count > 4 ? `+${data.count}` : data.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Environment Variables - Full Width */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Environment Variables</p>
              <p className="text-xs text-gray-500">Current configuration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">NODE_ENV</span>
              <span className="text-sm text-gray-600">{import.meta.env.MODE}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">DEV</span>
              <span className="text-sm text-gray-600">{import.meta.env.DEV ? 'true' : 'false'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">PROD</span>
              <span className="text-sm text-gray-600">{import.meta.env.PROD ? 'true' : 'false'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">DEBUG_MODE</span>
              <span className="text-sm text-gray-600">{import.meta.env.VITE_DEBUG_MODE || 'undefined'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">HIDE_TESTS</span>
              <span className="text-sm text-gray-600">{import.meta.env.VITE_HIDE_TESTS || 'undefined'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">DATA_SOURCE</span>
              <span className="text-sm text-gray-600">{import.meta.env.VITE_DATA_SOURCE || 'undefined'}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
              <span className="text-sm font-medium text-gray-700">BASE_URL</span>
              <span className="text-sm text-gray-600 truncate">{import.meta.env.VITE_BASE_URL || 'undefined'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestsDashboard

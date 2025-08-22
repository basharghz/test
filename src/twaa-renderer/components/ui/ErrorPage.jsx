import React from 'react'
import { languageService } from '../../services/languageService'
import { t } from '../../../user/translations'

const ErrorPage = ({ error, errorObject, path, onRetry, onGoHome }) => {
  // Make language service available globally for translations
  if (typeof window !== 'undefined') {
    window.languageService = languageService
  }

  const currentLanguage = languageService.getCurrentLanguage()
  // Extract error details from error object or string
  const getErrorDetails = () => {
    if (errorObject) {
      return {
        status: errorObject.status || 500,
        type: errorObject.type || 'UNKNOWN',
        message: errorObject.message || error,
        dataSource: errorObject.dataSource,
        originalError: errorObject.originalError
      }
    }
    
    // Legacy string-based error detection
    if (error && error.includes('not found') || error && error.includes('404')) {
      return { status: 404, type: 'NOT_FOUND', message: error }
    }
    if (error && error.includes('rate limit')) {
      return { status: 403, type: 'RATE_LIMIT', message: error }
    }
    if (error && error.includes('network') || error && error.includes('fetch')) {
      return { status: 0, type: 'NETWORK_ERROR', message: error }
    }
    
    return { status: 500, type: 'UNKNOWN', message: error || 'Unknown error' }
  }

  const errorDetails = getErrorDetails()

  const getErrorIcon = () => {
    switch (errorDetails.type) {
      case 'NOT_FOUND':
        return (
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )
      
      case 'CONNECTION_ERROR':
      case 'RATE_LIMIT':
      case 'UNAUTHORIZED':
        return (
          <svg className="mx-auto h-24 w-24 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      
      case 'NETWORK_ERROR':
        return (
          <svg className="mx-auto h-24 w-24 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.111 16.404a5.5 5.5 0 717.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        )
      
      case 'SERVER_ERROR':
        return (
          <svg className="mx-auto h-24 w-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      
      default:
        return (
          <svg className="mx-auto h-24 w-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getErrorTitle = () => {
    switch (errorDetails.status) {
      case 404:
        return t('errors.404.title')
      case 401:
        return t('errors.401.title')
      case 403:
        return t('errors.403.title')
      case 429:
        return t('errors.429.title')
      case 500:
        return t('errors.500.title')
      case 502:
        return t('errors.502.title')
      case 503:
        return t('errors.503.title')
      case 0:
        return t('errors.network.title')
      default:
        if (errorDetails.status >= 500) {
          return `${errorDetails.status} - ${t('errors.500.title').split(' - ')[1]}`
        }
        if (errorDetails.status >= 400) {
          return `${errorDetails.status} - Client Error`
        }
        return 'Something Went Wrong'
    }
  }

  const getErrorMessage = () => {
    switch (errorDetails.type) {
      case 'NOT_FOUND':
        return path ? t('errors.404.messageWithPath', { path }) : t('errors.404.message')
      
      case 'UNAUTHORIZED':
        return t('errors.401.message')
      
      case 'CONNECTION_ERROR':
        return `Data source connection failed: ${errorDetails.message}`
      
      case 'RATE_LIMIT':
        return t('errors.429.message')
      
      case 'NETWORK_ERROR':
        return t('errors.network.message')
      
      case 'SERVER_ERROR':
        return t('errors.500.message')
      
      default:
        return errorDetails.message || t('errors.general.unknownError')
    }
  }

  const getStatusColor = () => {
    if (errorDetails.status === 404) return 'text-gray-600'
    if (errorDetails.status >= 500) return 'text-red-600'
    if (errorDetails.status >= 400) return 'text-orange-600'
    if (errorDetails.status === 0) return 'text-blue-600'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          {getErrorIcon()}
        </div>
        
        <h1 className={`text-2xl font-bold mb-2 ${getStatusColor()}`}>
          {getErrorTitle()}
        </h1>
        
        <p className="text-gray-600 mb-8">{getErrorMessage()}</p>
        
        {/* Show additional debugging info in development mode */}
        {!import.meta.env.PROD && errorDetails.dataSource && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Development Debug Info:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Data Source:</strong> {errorDetails.dataSource}</div>
              <div><strong>Error Type:</strong> {errorDetails.type}</div>
              <div><strong>Status Code:</strong> {errorDetails.status}</div>
              {errorDetails.originalError && (
                <div><strong>Original Error:</strong> {errorDetails.originalError.message}</div>
              )}
              <div className="mt-2 pt-2 border-t border-gray-300">
                <strong>Suggested Solutions:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {errorDetails.status === 403 && (
                    <>
                      <li><strong>Quick Fix:</strong> Set VITE_DATA_SOURCE=local in .env to use local files</li>
                      <li>Check your AWS S3 configuration if using S3 data source</li>
                      <li>Verify bucket permissions and CORS settings</li>
                    </>
                  )}
                  {errorDetails.status === 404 && (
                    <>
                      <li>The requested page doesn't exist in the data source</li>
                      <li>Check the file path and ensure the .json file exists</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {errorDetails.status !== 0 && (
          <div className="mb-6 text-sm text-gray-500">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {t('ui.errorCode', { code: errorDetails.status })}
            </span>
          </div>
        )}
        
        <div className="space-y-4">
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t('ui.tryAgain')}
          </button>
          
          <button
            onClick={onGoHome}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {t('ui.goToHomePage')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

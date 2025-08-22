import React from 'react'
import { languageService } from '../services/languageService'
import { t } from '../../user/translations'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // In production, you might want to log this to an error reporting service
    if (import.meta.env.PROD) {
      // Log to external service in production
      console.error('Production error logged:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }
  }

  render() {
    // Make language service available globally for translations
    if (typeof window !== 'undefined') {
      window.languageService = languageService
    }

    if (this.state.hasError) {
      const { ErrorPage, path, onRetry, onGoHome } = this.props

      // In production, show clean error based on error type
      if (import.meta.env.PROD) {
        let errorMessage = t('errors.general.internalServerError')
        let errorObject = { status: 500, type: 'SERVER_ERROR' }
        
        // Handle specific component errors
        if (this.state.error?.type === 'COMPONENT_ERROR') {
          errorMessage = t('errors.component.notFound', { type: this.state.error.componentType || 'Unknown' })
          errorObject = { status: 500, type: 'COMPONENT_ERROR' }
        }
        
        return (
          <ErrorPage
            error={errorMessage}
            errorObject={errorObject}
            path={path}
            onRetry={onRetry}
            onGoHome={onGoHome}
          />
        )
      }

      // In development, show detailed error information
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-red-600 mb-4">{t('errors.development.title')}</h1>
            <p className="text-gray-600 mb-6">{t('errors.development.reactError')}</p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-red-800 mb-2">{t('errors.development.errorLabel')}</h3>
              <p className="text-red-700 font-mono text-sm">{this.state.error && this.state.error.toString()}</p>
              
              {this.state.errorInfo && (
                <>
                  <h3 className="font-semibold text-red-800 mt-4 mb-2">{t('errors.development.componentStackLabel')}</h3>
                  <pre className="text-red-700 text-xs overflow-auto max-h-48">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
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

    return this.props.children
  }
}

export default ErrorBoundary

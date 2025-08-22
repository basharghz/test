import React from 'react'

const NetworkErrorPage = ({ onRetry, onGoHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h1>
        <p className="text-gray-600 mb-8">
          Unable to connect to data source or load local files. Please check your internet connection and try again.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Retry Connection
          </button>
          
          <button
            onClick={onGoHome}
            className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go to Home Page
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
          <p className="font-medium mb-2">💡 Troubleshooting Tips:</p>
          <ul className="text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Verify data source configuration (S3, local)</li>
            <li>• Ensure local JSON files exist as fallback</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NetworkErrorPage

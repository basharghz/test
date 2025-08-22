import React, { useState, useEffect } from 'react'
import { dataServiceManager } from '../../services/dataServiceManager'

const DataSourcesStatus = () => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAllSources = async () => {
      try {
        const servicesStatus = dataServiceManager.getServicesStatus()
        
        // Test the primary service
        const primaryService = servicesStatus.primary
        let testResult = null
        try {
          await primaryService.service.fetchJsonFile('/data-sources-test')
          testResult = { success: true, service: primaryService.name }
        } catch (error) {
          testResult = { success: false, service: primaryService.name, error: error.message }
        }

        setStatus({
          ...servicesStatus,
          testResult
        })
      } catch (error) {
        setStatus({
          error: error.message
        })
      } finally {
        setLoading(false)
      }
    }

    checkAllSources()
  }, [])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">Testing all data sources...</p>
        </div>
      </div>
    )
  }

  if (status?.error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {status.error}</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (configured) => {
    return configured ? 'bg-green-500' : 'bg-gray-400'
  }

  const getStatusText = (configured) => {
    return configured ? 'Configured' : 'Not Configured'
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Configuration Status */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Data Source Configuration</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-purple-900">Preferred Source Setting:</p>
            <p className="text-sm text-purple-700">
              {import.meta.env.VITE_DATA_SOURCE 
                ? `VITE_DATA_SOURCE=${import.meta.env.VITE_DATA_SOURCE}`
                : 'VITE_DATA_SOURCE=auto (not set)'}
            </p>
          </div>
          <div>
            <p className="font-medium text-purple-900">How to Change:</p>
            <p className="text-sm text-purple-700">
              Set VITE_DATA_SOURCE in .env file: s3, github, local, or auto
            </p>
          </div>
        </div>
      </div>

      {/* Primary Service Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Current Primary Data Source</h2>
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${
            status.testResult?.success ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <div>
            <p className="font-medium">
              {status.primary.name.toUpperCase()} 
              {status.testResult?.success ? ' (Active)' : ' (Failed)'}
            </p>
            <p className="text-sm text-gray-600">
              Priority: {status.primary.priority} | 
              {status.testResult?.success 
                ? ' Successfully loaded test data' 
                : ` Error: ${status.testResult?.error}`}
            </p>
          </div>
        </div>
      </div>

      {/* All Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* AWS S3 */}
        <div className={`border rounded-lg p-6 ${
          status.s3.configured 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status.s3.configured)}`}></div>
            <h3 className="text-lg font-bold">AWS S3</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> {getStatusText(status.s3.configured)}</p>
            {status.s3.configured && status.s3.info && (
              <>
                <p><strong>Region:</strong> {status.s3.info.config?.region}</p>
                <p><strong>Bucket:</strong> {status.s3.info.config?.bucket}</p>
                <p><strong>Path:</strong> {status.s3.info.config?.basePath}</p>
              </>
            )}
            {!status.s3.configured && (
              <div className="text-xs text-gray-600">
                <p>Add to .env:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>VITE_AWS_REGION</li>
                  <li>VITE_AWS_BUCKET</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* GitHub */}
        <div className={`border rounded-lg p-6 ${
          status.github.configured 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status.github.configured)}`}></div>
            <h3 className="text-lg font-bold">GitHub</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> {getStatusText(status.github.configured)}</p>
            {status.github.configured && status.github.info && (
              <>
                <p><strong>Owner:</strong> {status.github.info.config?.owner}</p>
                <p><strong>Repo:</strong> {status.github.info.config?.repo}</p>
                <p><strong>Branch:</strong> {status.github.info.config?.branch}</p>
              </>
            )}
            {!status.github.configured && (
              <div className="text-xs text-gray-600">
                <p>Add to .env:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>VITE_GITHUB_OWNER</li>
                  <li>VITE_GITHUB_REPO</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Local Files */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full mr-3 bg-blue-500"></div>
            <h3 className="text-lg font-bold">Local Files</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> Always Available</p>
            <p><strong>Path:</strong> /public/database/json/</p>
            <p><strong>Role:</strong> Fallback source</p>
          </div>
        </div>
      </div>

      {/* Service Priority */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Service Priority Order</h3>
        <div className="space-y-2">
          {status.available.map((service, index) => (
            <div key={service.name} className="flex items-center space-x-3">
              <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <span className="font-medium">{service.name.toUpperCase()}</span>
              {service.name === status.primary.name && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  ACTIVE
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-white rounded border">
          <p className="text-xs text-gray-600 mb-2">
            <strong>How it works:</strong>
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• If VITE_DATA_SOURCE is set, that source is used first</li>
            <li>• If not set or source unavailable, auto-detection is used</li>
            <li>• Auto-detection priority: S3 → GitHub → Local</li>
            <li>• If primary source fails, system falls back to next available</li>
          </ul>
        </div>
      </div>

      {/* Configuration Examples */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Configuration Examples</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-blue-900">Force S3 only:</p>
            <code className="block bg-white p-2 rounded text-xs">VITE_DATA_SOURCE=s3</code>
            
            <p className="font-medium text-blue-900">Force GitHub only:</p>
            <code className="block bg-white p-2 rounded text-xs">VITE_DATA_SOURCE=github</code>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-blue-900">Force Local only:</p>
            <code className="block bg-white p-2 rounded text-xs">VITE_DATA_SOURCE=local</code>
            
            <p className="font-medium text-blue-900">Auto-detect (default):</p>
            <code className="block bg-white p-2 rounded text-xs">VITE_DATA_SOURCE=auto</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataSourcesStatus

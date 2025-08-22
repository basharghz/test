import React, { useState, useEffect } from 'react'
import { cdnService } from '../../services/cdnService'

const CDNStatus = () => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkCDNStatus = async () => {
      try {
        // Try to fetch a test file
        const testData = await cdnService.fetchJsonFile('/cdn-test')
        setStatus({
          connected: true,
          message: 'Successfully connected to CloudFront CDN',
          domain: import.meta.env.VITE_CDN_DOMAIN,
          basePath: import.meta.env.VITE_CDN_PATH || 'database/json',
          data: testData
        })
      } catch (error) {
        setStatus({
          connected: false,
          message: error.message,
          domain: import.meta.env.VITE_CDN_DOMAIN,
          fallback: 'Using local files'
        })
      } finally {
        setLoading(false)
      }
    }

    checkCDNStatus()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">Testing CloudFront CDN connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`border rounded-lg p-6 ${
        status.connected 
          ? 'bg-green-50 border-green-200' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`w-3 h-3 rounded-full mr-3 ${
            status.connected ? 'bg-green-500' : 'bg-orange-500'
          }`}></div>
          <h2 className="text-xl font-bold">
            CloudFront CDN Connection {status.connected ? 'Active' : 'Inactive'}
          </h2>
        </div>
        
        <div className="space-y-2 text-sm">
          <p><strong>CDN Domain:</strong> {status.domain || 'Not configured'}</p>
          <p><strong>Base Path:</strong> {status.basePath || 'database/json'}</p>
          <p><strong>Status:</strong> {status.message}</p>
          {status.fallback && (
            <p className="text-orange-700"><strong>Fallback:</strong> {status.fallback}</p>
          )}
        </div>

        {status.connected && (
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="font-medium text-green-800">✅ Successfully loaded JSON from CDN!</p>
            <p className="text-xs text-gray-600 mt-1">
              Data source: CloudFront CDN → {status.domain}/{status.basePath}/cdn-test.json
            </p>
          </div>
        )}

        {!status.connected && (
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="font-medium text-orange-800">⚠️ CDN not configured</p>
            <p className="text-xs text-gray-600 mt-1">
              Add VITE_CDN_DOMAIN to your .env file
            </p>
            <div className="mt-2 text-xs text-gray-600">
              <p><strong>Required:</strong></p>
              <ul className="list-disc list-inside ml-2">
                <li>VITE_CDN_DOMAIN=d1234567890.cloudfront.net</li>
              </ul>
              <p className="mt-1"><strong>Optional:</strong></p>
              <ul className="list-disc list-inside ml-2">
                <li>VITE_CDN_PATH=database/json</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CDNStatus

/*
 * CloudFront CDN Service for Dynamic JSON Loading
 * 
 * Configuration in .env:
 * VITE_CDN_DOMAIN=d1234567890.cloudfront.net (required)
 * VITE_CDN_PATH=database/json (optional, defaults to database/json)
 * 
 * This service only reads from CloudFront CDN. Content is uploaded to S3
 * by AI agents in a separate workspace.
 */

class CDNService {
  constructor() {
    this.cdnDomain = import.meta.env.VITE_CDN_DOMAIN
    this.basePath = import.meta.env.VITE_CDN_PATH || 'database/json'
    this.baseUrl = this.cdnDomain ? `https://${this.cdnDomain}` : null
  }

  // Check if CDN is configured
  isConfigured() {
    const hasValidConfig = !!(this.cdnDomain && 
                             this.cdnDomain !== 'd1234567890.cloudfront.net' &&
                             !this.cdnDomain.includes('placeholder'))
    
    if (!hasValidConfig) {
      if (!import.meta.env.PROD) {
        console.log('CDN not configured or using placeholder values, defaulting to local files')
      }
    }
    
    return hasValidConfig
  }

  // Get headers for CDN requests
  getHeaders() {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300' // 5 minute cache
    }
    
    // Add caching headers for CDN
    if (this.cdnDomain) {
      headers['Cache-Control'] = 'max-age=300' // 5 minutes cache
    }
    
    return headers
  }

  // Fetch JSON file from S3
  async fetchJsonFile(path) {
    try {
      // If CDN is not configured, fallback to local immediately
      if (!this.isConfigured()) {
        if (!import.meta.env.PROD) {
          console.log('CDN not configured, using local files')
        }
        return this.fallbackToLocal(path)
      }

      // Convert URL path to CDN path
      const cdnPath = this.urlToCDNPath(path)
      const url = `${this.baseUrl}/${cdnPath}`
      
      console.log('Fetching from CDN:', url)
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      })
      
      if (!response.ok) {
        if (response.status === 404) {
          const error = new Error(`Page not found: ${path}`)
          error.status = 404
          error.type = 'NOT_FOUND'
          throw error
        }
        if (response.status === 403) {
          const error = new Error(`CDN access denied. Check CloudFront configuration.`)
          error.status = 403
          error.type = 'ACCESS_DENIED'
          throw error
        }
        if (response.status >= 500) {
          const error = new Error(`CDN server error: ${response.status} ${response.statusText}`)
          error.status = response.status
          error.type = 'SERVER_ERROR'
          throw error
        }
        const error = new Error(`CDN error: ${response.status} ${response.statusText}`)
        error.status = response.status
        error.type = 'CDN_ERROR'
        throw error
      }
      
      const jsonData = await response.json()
      
      console.log('Successfully loaded from CDN:', path)
      return jsonData
      
    } catch (error) {
      console.error('Error fetching from CDN:', error)
      
      // If it's a 404 from CDN, don't fallback - just throw it
      if (error.status === 404) {
        throw error
      }
      
      // For other CDN errors, try fallback to local files
      console.log('Falling back to local files...')
      try {
        return await this.fallbackToLocal(path)
      } catch (fallbackError) {
        // If fallback also fails, enhance the original error
        if (error.status) {
          throw error
        } else {
          const networkError = new Error(`Network error: Unable to connect to CDN`)
          networkError.status = 0
          networkError.type = 'NETWORK_ERROR'
          throw networkError
        }
      }
    }
  }

  // Convert URL path to CDN path
  urlToCDNPath(urlPath) {
    let path = urlPath === '/' ? 'index' : urlPath.replace(/^\//, '').replace(/\/$/, '')
    return `${this.basePath}/${path}.json`
  }

  // Fallback to local files
  async fallbackToLocal(path) {
    try {
      const jsonPath = path === '/' ? '/database/json/index.json' : `/database/json${path}.json`
      console.log('Loading local file:', jsonPath)
      
      const response = await fetch(jsonPath)
      
      if (!response.ok) {
        if (response.status === 404) {
          const error = new Error(`Page not found: ${path}`)
          error.status = 404
          error.type = 'NOT_FOUND'
          throw error
        }
        const error = new Error(`Failed to load local file: ${jsonPath}`)
        error.status = response.status
        error.type = 'FILE_ERROR'
        throw error
      }
      
      const data = await response.json()
      console.log('Successfully loaded local file:', path)
      return data
      
    } catch (error) {
      console.error('Error loading local fallback:', error)
      
      // If it's already a structured error, re-throw it
      if (error.status) {
        throw error
      }
      
      // Otherwise, create a structured error
      const structuredError = new Error(`Failed to load page: ${path}`)
      structuredError.status = 500
      structuredError.type = 'FILE_ERROR'
      throw structuredError
    }
  }

  // Get service info
  getServiceInfo() {
    return {
      name: 'CloudFront CDN',
      configured: this.isConfigured(),
      config: {
        basePath: this.basePath,
        baseUrl: this.baseUrl
      }
    }
  }
}

export const cdnService = new CDNService()

/*
 * Data Service Manager
 * 
 * Manages multiple data sources with priority fallback:
 * 1. CloudFront CDN (if configured)
 * 2. Local files (always available as fallback)
 * 
 * Configuration in .env:
 * VITE_DATA_SOURCE=cdn|local|auto (optional, defaults to auto)
 * 
 * CDN Configuration:
 * VITE_CDN_DOMAIN=d1234567890.cloudfront.net
 * VITE_CDN_PATH=database/json
 */

import { cdnService } from './cdnService'

class DataServiceManager {
  constructor() {
    this.preferredSource = import.meta.env.VITE_DATA_SOURCE || 'auto'
    this.services = {
      cdn: cdnService,
      local: { 
        name: 'Local Files',
        isConfigured: () => true,
        fetchJsonFile: this.fetchLocalFile.bind(this),
        getServiceInfo: () => ({
          configured: true,
          name: 'Local Files',
          status: 'ready'
        })
      }
    }
  }

  // Get available services in priority order
  getAvailableServices() {
    const available = []
    
    // Check CDN
    if (this.services.cdn.isConfigured()) {
      available.push({ name: 'cdn', service: this.services.cdn, priority: 1 })
    }
    
    // Local is always available
    available.push({ name: 'local', service: this.services.local, priority: 2 })
    
    return available.sort((a, b) => a.priority - b.priority)
  }

  // Get the primary service to use
  getPrimaryService() {
    const available = this.getAvailableServices()
    
    // If user specified a preferred source, try to use it
    if (this.preferredSource && this.preferredSource !== 'auto') {
      const preferred = available.find(s => s.name === this.preferredSource)
      if (preferred) {
        console.log(`Using preferred data source: ${this.preferredSource}`)
        return preferred
      } else {
        console.warn(`Preferred data source "${this.preferredSource}" not available, using auto-detect`)
      }
    }
    
    // Auto-detect: use the highest priority available service
    const primary = available[0]
    if (!import.meta.env.PROD) {
      console.log(`Auto-detected primary data source: ${primary.name}`)
    }
    return primary
  }

  // Fetch JSON file using the primary service with optional fallback
  async fetchJsonFile(path) {
    // If user has specified a preferred source (not 'auto'), use only that service
    if (this.preferredSource && this.preferredSource !== 'auto') {
      const availableServices = this.getAvailableServices()
      const preferredService = availableServices.find(s => s.name === this.preferredSource)
      
      if (preferredService) {
        try {
          console.log(`Using specified data source: ${this.preferredSource} for: ${path}`)
          const data = await preferredService.service.fetchJsonFile(path)
          
          if (!import.meta.env.PROD) {
            console.log(`Successfully loaded from ${this.preferredSource}:`, path)
          }
          
          return data
        } catch (error) {
          // Don't fallback when user specified a particular source
          console.error(`${this.preferredSource} failed (no fallback):`, error.message)
          
          // Create a more descriptive error for the user
          const enhancedError = new Error(`${this.preferredSource.toUpperCase()} connection failed: ${error.message}`)
          enhancedError.status = error.status || 500
          enhancedError.type = error.type || 'CONNECTION_ERROR'
          enhancedError.originalError = error
          enhancedError.dataSource = this.preferredSource
          throw enhancedError
        }
      } else {
        throw new Error(`Specified data source "${this.preferredSource}" is not configured or available`)
      }
    }

    // Auto mode: Use fallback mechanism through all available services
    const available = this.getAvailableServices()
    let lastError = null

    for (const serviceInfo of available) {
      try {
        console.log(`Trying ${serviceInfo.name} service for: ${path}`)
        const data = await serviceInfo.service.fetchJsonFile(path)
        
        if (!import.meta.env.PROD) {
          console.log(`Successfully loaded from ${serviceInfo.name}:`, path)
        }
        
        return data
      } catch (error) {
        lastError = error
        console.warn(`${serviceInfo.name} failed:`, error.message)
        
        // Continue to next service for all errors (including 404)
        // Each service might have different files available
        continue
      }
    }

    // If all services failed, throw the last error
    throw lastError || new Error(`All data services failed for: ${path}`)
  }

  // Local file fetcher
  async fetchLocalFile(path) {
    try {
      let jsonPath
      
      if (path === '/') {
        jsonPath = '/database/json/index.json'
      } else {
        // First try folder structure (e.g., /company -> /database/json/company/index.json)
        jsonPath = `/database/json${path}/index.json`
      }
      
      console.log('Loading local file:', jsonPath)
      
      let response = await fetch(jsonPath)
      
      // If folder structure fails and it's not root, try flat file fallback
      if (!response.ok && path !== '/') {
        console.log(`Folder structure failed, trying flat file: /database/json${path}.json`)
        jsonPath = `/database/json${path}.json`
        response = await fetch(jsonPath)
      }
      
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
      return data
      
    } catch (error) {
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

  // Get status of all services
  getServicesStatus() {
    return {
      primary: this.getPrimaryService(),
      available: this.getAvailableServices(),
      cdn: {
        configured: this.services.cdn.isConfigured(),
        info: this.services.cdn.getServiceInfo ? this.services.cdn.getServiceInfo() : null
      },
      local: {
        configured: true,
        info: { name: 'Local Files', baseUrl: window.location.origin + '/database/json' }
      }
    }
  }
}

export const dataServiceManager = new DataServiceManager()

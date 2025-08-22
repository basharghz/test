// Component Library Registry - NOW JSON-DRIVEN & PERFORMANCE OPTIMIZED
// 
// 🎯 BREAKTHROUGH: No longer loads ALL components upfront!
// Now uses lazy loading - only loads components specified in JSON files.
// This dramatically improves performance and eliminates chunk warnings.

import { loadComponent, getAllComponentNames, getComponentRegistry } from './DynamicComponentLoader.js'

// 📊 Component Registry Info (for debugging - no actual loading)
class ComponentRegistryInfo {
  // Get info about available components (no loading)
  static getAvailableComponents() {
    return getAllComponentNames()
  }

  // Get registry structure (for debugging)
  static getRegistryInfo() {
    return getComponentRegistry()
  }

  // Load component on demand (this is what DynamicPage uses)
  static async loadComponent(componentType) {
    return await loadComponent(componentType)
  }

  // Check if component exists (no loading)
  static isComponentAvailable(componentType) {
    return getAllComponentNames().includes(componentType)
  }

  // Get stats for performance monitoring
  static getStats() {
    const folders = Object.keys(getComponentRegistry())
    const totalComponents = getAllComponentNames().length
    
    return {
      totalFolders: folders.length,
      totalComponents,
      folders,
      message: `🚀 Found ${totalComponents} components in ${folders.length} folders. All loaded lazily on-demand!`
    }
  }
}

// Export for backward compatibility (but now it's just info, not loaded components)
export default ComponentRegistryInfo

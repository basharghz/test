/*
 * AI CMS - Main Export File
 * 
 * This is the main entry point for the AI CMS library.
 * Import everything you need from here for a clean API.
 * 
 * Components are dynamically imported from their respective folders
 * to make the system more maintainable and extensible.
 */

// Core Components - The main CMS engine
export { default as DynamicPage } from './core/DynamicPage.jsx'
export { default as DynamicRouter } from './core/DynamicRouter.jsx'
export { default as ErrorBoundary } from './core/ErrorBoundary.jsx'
export { default as ComponentRegistry } from './core/ComponentRegistry.js'

// 🚀 COMPONENTS ARE NOW FULLY DYNAMIC! 🚀
// No need to manually register components anymore!
// The Enhanced Dynamic System automatically discovers ALL components from ANY folder.
// 
// To use components:
// 1. Built-in: const Navigation = await loadComponent('Navigation')
// 2. Custom: const ProductCard = await loadComponent('ProductCard')
// 3. Any folder: const MyComponent = await loadComponent('MyComponent')
//
// To discover components:
// - getAvailableFolders() - See all folders
// - getComponentsByFolder('ecommerce') - See folder contents
// - getAllComponentNames() - See all component names

// Services - Data management
export { cdnService } from './services/cdnService.js'
export { dataServiceManager } from './services/dataServiceManager.js'
export { languageService } from './services/languageService.js'

// Translations
export * from '../user/translations/index.js'

// 🚀 JSON-Driven Dynamic Component System - PERFORMANCE OPTIMIZED
// Only loads components specified in JSON files (not all components!)
export {
  // 🎯 Core Functions (only load what's needed)
  loadComponent,              // Load individual component lazily
  
  // 📁 Discovery Functions (fast - no loading)
  getAvailableFolders,        // Get all discovered folders
  getComponentsByFolder,      // Get components from any folder
  getAvailableComponents,     // Enhanced: Returns components by folder
  getAllComponentNames,       // Flat list of all component names
  getComponentRegistry,       // Debug: See all available components
  
  // 🔄 Legacy Collections (backward compatibility - info only, not loaded components)
  LayoutComponents,
  ContentComponents,
  FormComponents,
  UIComponents,
  AdminComponents,
  getAllComponentsInfo,       // NEW: Get info about all components (not loaded)
  getComponentsByCategory
} from './core/DynamicComponentLoader.js'

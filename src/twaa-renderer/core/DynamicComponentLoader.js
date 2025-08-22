/*
 * Enhanced Dynamic Component Loader - JSON-Driven Performance Optimized
 * 
 * 🎯 PERFORMANCE BREAKTHROUGH:
 * - Only loads components specified in JSON files (not all components!)
 * - True lazy loading with automatic code splitting
 * - Zero eager loading = faster initial page loads
 * - Auto-discovers unlimited user folders in custom/ directory
 * 
 * 📁 COMPONENT STRUCTURE:
 * - components/admin/ - Core CMS admin components (don't modify)
 * - components/ui/ - Core CMS UI components (don't modify)  
 * - ../../user/components/ - USER COMPONENTS (fork and customize!)
 *   ├── layout/ - Navigation, headers, footers
 *   ├── content/ - Content blocks, grids
 *   ├── forms/ - Contact forms, newsletters
 *   ├── ecommerce/ - Product cards, shopping
 *   ├── social/ - Social sharing components
 *   └── [any-folder]/ - Users can create unlimited folders!
 */

// Get all .jsx files from components/ and user/components/ folders - LAZY LOADING ONLY
const allComponentModules = {
  ...import.meta.glob('../components/**/*.jsx', { eager: false }),
  ...import.meta.glob('../../user/components/**/*.jsx', { eager: false })
}

// Extract all unique folder names from the discovered files
const getAllComponentFolders = () => {
  const folders = new Set()
  
  Object.keys(allComponentModules).forEach(path => {
    // Extract folder name from path like '../components/admin/TestsDashboard.jsx' or '../../user/components/layout/Hero.jsx'
    let match = path.match(/\.\.\/components\/([^\/]+)\//)
    if (match) {
      folders.add(match[1])
    } else {
      // Handle user components path like '../../user/components/layout/Hero.jsx'
      match = path.match(/\.\.\/\.\.\/user\/components\/([^\/]+)\//)
      if (match) {
        folders.add(match[1])
      }
    }
  })
  
  return Array.from(folders).sort()
}

// Create collections organized by folder
const createFolderCollections = () => {
  const collections = {}
  const folders = getAllComponentFolders()
  
  folders.forEach(folder => {
    collections[folder] = {}
    
    // Find all components in this folder from both core and user locations
    Object.entries(allComponentModules).forEach(([path, importFn]) => {
      if (path.includes(`/components/${folder}/`) || path.includes(`/user/components/${folder}/`)) {
        const componentName = path.split('/').pop().replace('.jsx', '')
        collections[folder][componentName] = importFn
      }
    })
  })
  
  return collections
}

// Create the collections
const folderCollections = createFolderCollections()

// Get all available folders (including user-added ones)
export const getAvailableFolders = () => {
  return getAllComponentFolders()
}

// Get components from any specific folder
export const getComponentsByFolder = (folderName) => {
  if (!folderCollections[folderName]) {
    console.warn(`Folder '${folderName}' not found. Available folders:`, getAvailableFolders())
    return {}
  }
  
  return folderCollections[folderName] || {}
}

// Enhanced component discovery - returns all components organized by folder
export const getAvailableComponents = () => {
  const result = {}
  const folders = getAllComponentFolders()
  
  folders.forEach(folder => {
    const components = folderCollections[folder] || {}
    result[folder] = Object.keys(components)
  })
  
  return result
}

// Get flat list of all component names
export const getAllComponentNames = () => {
  const allNames = []
  const folders = getAllComponentFolders()
  
  folders.forEach(folder => {
    const components = folderCollections[folder] || {}
    allNames.push(...Object.keys(components))
  })
  
  return allNames.sort()
}

// 🚀 Load individual component (TRUE LAZY LOADING)
export const loadComponent = async (componentName) => {
  console.log(`⚡ Loading component: ${componentName}`)
  
  const folders = getAllComponentFolders()
  
  for (const folder of folders) {
    const folderComponents = folderCollections[folder] || {}
    if (folderComponents[componentName]) {
      try {
        const module = await folderComponents[componentName]()
        console.log(`✅ Successfully loaded: ${componentName} from ${folder}`)
        return module.default
      } catch (error) {
        console.error(`❌ Failed to load ${componentName}:`, error)
        throw error
      }
    }
  }
  
  throw new Error(`Component '${componentName}' not found in any folder. Available components: ${getAllComponentNames().join(', ')}`)
}

// Legacy exports for backward compatibility (now return lazy loading info, not eager components)
export const LayoutComponents = getComponentsByFolder('layout')
export const ContentComponents = getComponentsByFolder('content')  
export const FormComponents = getComponentsByFolder('forms')
export const UIComponents = getComponentsByFolder('ui')
export const AdminComponents = getComponentsByFolder('admin')

// Enhanced function - get available component info (not loaded components)
export const getAllComponentsInfo = () => {
  const info = {}
  const folders = getAllComponentFolders()
  
  folders.forEach(folder => {
    const components = getComponentsByFolder(folder)
    Object.assign(info, components)
  })
  
  return info
}

// 📊 Get component registry info for debugging (no eager loading!)
export const getComponentRegistry = () => {
  const registry = {}
  const folders = getAllComponentFolders()
  
  folders.forEach(folder => {
    registry[folder] = getComponentsByFolder(folder)
  })
  
  return registry
}

// Get component names by category (backward compatibility)
export const getComponentsByCategory = () => {
  return getAvailableComponents()
}

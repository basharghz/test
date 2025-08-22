/**
 * User Configuration File
 * 
 * This file allows users to customize various aspects of the AI CMS
 * without modifying the core library files.
 */

// Theme configuration
export const themeConfig = {
  // Primary brand colors
  colors: {
    primary: '#3B82F6',     // Blue-500
    secondary: '#6B7280',   // Gray-500
    accent: '#10B981',      // Green-500
    warning: '#F59E0B',     // Yellow-500
    danger: '#EF4444',      // Red-500
  },
  
  // Typography settings
  fonts: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
    serif: 'ui-serif, Georgia, serif',
    mono: 'ui-monospace, SFMono-Regular, monospace'
  },
  
  // Spacing and sizing
  spacing: {
    containerMaxWidth: '1280px',
    sectionPadding: '4rem 0',
    elementSpacing: '1.5rem'
  }
}

// Site metadata
export const siteConfig = {
  name: 'My AI CMS Site',
  description: 'A modern website built with AI CMS',
  url: 'https://example.com',
  logo: '/logo.svg',
  
  // Social media links
  social: {
    twitter: 'https://twitter.com/example',
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/company/example'
  },
  
  // Contact information
  contact: {
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345'
  }
}

// Navigation configuration
export const navigationConfig = {
  // Main navigation items
  mainNav: [
    { text: 'Home', url: '/', active: true },
    { text: 'About', url: '/about' },
    { text: 'Blog', url: '/blog' },
    { text: 'Contact', url: '/contact' }
  ],
  
  // Footer navigation
  footerNav: [
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
    { text: 'Sitemap', url: '/sitemap' }
  ]
}

// Feature flags for enabling/disabling functionality
export const featureFlags = {
  enableAnalytics: false,
  enableChat: false,
  enableNewsletter: true,
  enableBlog: true,
  enableEcommerce: false,
  enableMultiLanguage: true
}

// API configuration
export const apiConfig = {
  baseUrl: process.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
  retryAttempts: 3,
  
  // External service keys (store in .env in production)
  services: {
    analytics: process.env.VITE_ANALYTICS_ID,
    maps: process.env.VITE_MAPS_API_KEY,
    payment: process.env.VITE_PAYMENT_KEY
  }
}

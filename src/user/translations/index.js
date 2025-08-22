// Translation Service
import { languageService } from '../../twaa-renderer/services/languageService'

// Import all translations statically to avoid build issues with dynamic imports
import { translations as enTranslations } from './en.js'
import { translations as esTranslations } from './es.js'
import { translations as frTranslations } from './fr.js'
import { translations as deTranslations } from './de.js'
import { translations as ptTranslations } from './pt.js'

// Create translations map
const translationsMap = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  pt: ptTranslations
}

class TranslationService {
  constructor() {
    this.translations = {}
    this.currentLanguage = 'en'
    this.init()
  }

  init() {
    this.currentLanguage = languageService.getCurrentLanguage()
    this.loadTranslations(this.currentLanguage)
  }

  loadTranslations(language) {
    try {
      if (translationsMap[language]) {
        this.translations = translationsMap[language]
        this.currentLanguage = language
      } else {
        console.warn(`Translations for ${language} not found, falling back to English`)
        this.translations = translationsMap.en
        this.currentLanguage = 'en'
      }
    } catch (error) {
      console.error('Failed to load translations:', error)
      this.translations = translationsMap.en || {}
      this.currentLanguage = 'en'
    }
  }

  setLanguage(language) {
    this.loadTranslations(language)
    languageService.setLanguage(language)
  }

  translate(key, params = {}) {
    const keys = key.split('.')
    let translation = this.translations
    
    // Navigate through the nested object
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k]
      } else {
        // Return the key if translation not found
        return key
      }
    }
    
    // If we found a string, process parameter substitution
    if (typeof translation === 'string') {
      return this.interpolate(translation, params)
    }
    
    // Return the key if no valid translation found
    return key
  }

  interpolate(text, params) {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key] !== undefined ? params[key] : match
    })
  }

  getCurrentLanguage() {
    return this.currentLanguage
  }

  getAvailableLanguages() {
    return languageService.getSupportedLanguages()
  }
}

// Create and export singleton instance
export const translationService = new TranslationService()

// Export convenience function
export const t = (key, params = {}) => translationService.translate(key, params)

// Export function to change language
export const setLanguage = (language) => translationService.setLanguage(language)

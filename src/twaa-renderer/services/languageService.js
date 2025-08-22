// Language detection and management
class LanguageService {
  constructor() {
    this.currentLanguage = this.detectLanguage()
    this.fallbackLanguage = 'en'
  }

  // Detect user's preferred language
  detectLanguage() {
    // Check URL parameter first (e.g., ?lang=es)
    const urlParams = new URLSearchParams(window.location.search)
    const urlLang = urlParams.get('lang')
    if (urlLang && this.isSupported(urlLang)) {
      return urlLang
    }

    // Check localStorage
    const storedLang = localStorage.getItem('preferred-language')
    if (storedLang && this.isSupported(storedLang)) {
      return storedLang
    }

    // Check browser language
    const browserLang = navigator.language.split('-')[0] // e.g., 'en-US' -> 'en'
    if (this.isSupported(browserLang)) {
      return browserLang
    }

    // Fallback to English
    return this.fallbackLanguage
  }

  // Check if language is supported
  isSupported(lang) {
    return ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'ru'].includes(lang)
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage
  }

  // Set language and persist preference
  setLanguage(lang) {
    if (this.isSupported(lang)) {
      this.currentLanguage = lang
      localStorage.setItem('preferred-language', lang)
      return true
    }
    return false
  }

  // Get supported languages list
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'de', name: 'German', nativeName: 'Deutsch' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'it', name: 'Italian', nativeName: 'Italiano' },
      { code: 'ja', name: 'Japanese', nativeName: '日本語' },
      { code: 'ko', name: 'Korean', nativeName: '한국어' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'ru', name: 'Russian', nativeName: 'Русский' }
    ]
  }
}

export const languageService = new LanguageService()

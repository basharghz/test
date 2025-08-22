import React, { useState, useEffect } from 'react'
import { languageService } from '../../services/languageService'
import { setLanguage } from '../../../user/translations'

const LanguageSelector = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languageService.getCurrentLanguage())
  const [isOpen, setIsOpen] = useState(false)
  const supportedLanguages = languageService.getSupportedLanguages()

  const handleLanguageChange = (languageCode) => {
    try {
      setLanguage(languageCode)
      setCurrentLanguage(languageCode)
      setIsOpen(false)
      // Reload page to apply new language
      window.location.reload()
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  }

  const getCurrentLanguageName = () => {
    const lang = supportedLanguages.find(l => l.code === currentLanguage)
    return lang ? lang.nativeName : 'English'
  }

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {getCurrentLanguageName()}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {supportedLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`${
                  currentLanguage === language.code
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } group flex items-center w-full px-4 py-2 text-sm text-left`}
              >
                <span className="font-medium">{language.nativeName}</span>
                <span className="ml-2 text-xs text-gray-500">({language.name})</span>
                {currentLanguage === language.code && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector

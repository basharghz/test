import { useState, useEffect } from 'react'

/**
 * Custom hook for API data fetching
 * Example of how users can create their own hooks
 * for extending AI CMS functionality
 */
export const useCustomAPI = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, JSON.stringify(options)])

  return { data, loading, error }
}

/**
 * Custom hook for form state management
 * Simplifies form handling in custom components
 */
export const useFormState = (initialState = {}) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const setValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const setError = (name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const reset = () => {
    setValues(initialState)
    setErrors({})
  }

  const validate = (validationRules) => {
    const newErrors = {}
    
    Object.keys(validationRules).forEach(field => {
      const value = values[field]
      const rules = validationRules[field]
      
      if (rules.required && (!value || value.toString().trim() === '')) {
        newErrors[field] = `${field} is required`
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`
      } else if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || `${field} format is invalid`
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return {
    values,
    errors,
    setValue,
    setError,
    reset,
    validate
  }
}

import React from 'react'

/**
 * Example custom component for user extensions
 * This shows how users can create their own components
 * and integrate them with the AI CMS system
 */
const CustomButton = ({ 
  text = 'Click Me', 
  variant = 'primary', 
  size = 'medium',
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  }
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.medium}
    ${className}
  `.trim()

  return (
    <button 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export default CustomButton

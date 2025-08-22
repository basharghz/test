import React from 'react'

const Hero = ({ title, subtitle, backgroundImage, ctaText, ctaLink }) => (
  <div 
    className="relative bg-gray-900 text-white py-24"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
      <p className="text-xl md:text-2xl mb-8 text-gray-200">{subtitle}</p>
      {ctaText && ctaLink && (
        <a
          href={ctaLink}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {ctaText}
        </a>
      )}
    </div>
  </div>
)

export default Hero

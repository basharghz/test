import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const HeroSection = ({ 
  headline, 
  description, 
  ctaPrimaryLabel, 
  ctaPrimaryLink, 
  ctaSecondaryLabel, 
  ctaSecondaryLink,
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 0.5,
  textAlignment = 'center',
  features = []
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo && !isVideoPlaying ? (
          <div className="relative w-full h-full">
            <img 
              src={backgroundImage} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button>
          </div>
        ) : backgroundVideo && isVideoPlaying ? (
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
            src={backgroundVideo}
          />
        ) : (
          <img 
            src={backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-gray-900"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`${textAlignment === 'center' ? 'text-center' : textAlignment === 'right' ? 'text-right' : 'text-left'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Features List */}
          {features.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-white bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {ctaPrimaryLabel && ctaPrimaryLink && (
              <a
                href={ctaPrimaryLink}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {ctaPrimaryLabel}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
            
            {ctaSecondaryLabel && ctaSecondaryLink && (
              <a
                href={ctaSecondaryLink}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                {ctaSecondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

HeroSection.schema = defineSchema("HeroSection", {
  role: ["hero_section", "landing_banner", "call_to_action"],
  props: {
    headline: { tags: ["headline", "main_text"] },
    description: { tags: ["description_text", "paragraph"] },
    ctaPrimaryLabel: { tags: ["call_to_action", "button_text"], optional: true },
    ctaPrimaryLink: { tags: ["url", "link"], optional: true },
    ctaSecondaryLabel: { tags: ["call_to_action", "button_text"], optional: true },
    ctaSecondaryLink: { tags: ["url", "link"], optional: true },
    backgroundImage: { tags: ["image", "background_media"] },
    backgroundVideo: { tags: ["video", "background_media"], optional: true },
    overlayOpacity: { 
      type: "number", 
      tags: ["style_setting"], 
      default: 0.5,
      optional: true 
    },
    textAlignment: { 
      type: "string", 
      tags: ["layout_setting"], 
      options: ["left", "center", "right"],
      default: "center",
      optional: true 
    },
    features: {
      type: "array",
      tags: ["feature_list", "highlights"],
      optional: true,
      items: { type: "string", tags: ["feature_text"] }
    }
  },
  examples: [
    {
      headline: "Transform Your Business with AI",
      description: "Unlock the power of artificial intelligence to streamline operations, boost productivity, and drive innovation across your organization.",
      ctaPrimaryLabel: "Get Started Free",
      ctaPrimaryLink: "/signup",
      ctaSecondaryLabel: "Watch Demo",
      ctaSecondaryLink: "/demo",
      backgroundImage: "/images/hero-bg.jpg",
      backgroundVideo: "/videos/hero-bg.mp4",
      overlayOpacity: 0.6,
      textAlignment: "center",
      features: [
        "AI-Powered Analytics",
        "Real-time Insights", 
        "Enterprise Security",
        "24/7 Support"
      ]
    }
  ]
});

export default HeroSection

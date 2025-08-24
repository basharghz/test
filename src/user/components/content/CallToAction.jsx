import React from 'react'

const CallToAction = ({ 
  title, 
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  layout = 'centered',
  backgroundStyle = 'gradient',
  backgroundImage,
  showIcon = true,
  icon = 'rocket',
  features = []
}) => {
  const backgroundClasses = {
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-700',
    solid: 'bg-blue-600',
    dark: 'bg-gray-900',
    image: 'bg-cover bg-center bg-no-repeat'
  }

  const IconComponent = ({ iconName }) => {
    if (!showIcon || !iconName) return null
    
    return (
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <i className={`fas fa-${iconName} text-2xl text-white`}></i>
        </div>
      </div>
    )
  }

  if (layout === 'split') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div>
              <IconComponent iconName={icon} />
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-xl text-gray-600 mb-6">
                  {subtitle}
                </p>
              )}
              
              {description && (
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {description}
                </p>
              )}

              {features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {primaryButton && (
                  <a
                    href={primaryButton.link}
                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    {primaryButton.text}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
                
                {secondaryButton && (
                  <a
                    href={secondaryButton.link}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    {secondaryButton.text}
                  </a>
                )}
              </div>
            </div>

            {/* Visual Side */}
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'banner') {
    return (
      <section 
        className={`py-12 text-white ${backgroundClasses[backgroundStyle]}`}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/50"></div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-lg opacity-90">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {primaryButton && (
                <a
                  href={primaryButton.link}
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {primaryButton.text}
                </a>
              )}
              
              {secondaryButton && (
                <a
                  href={secondaryButton.link}
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  {secondaryButton.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className={`py-20 text-white ${backgroundClasses[backgroundStyle]} relative`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50"></div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <IconComponent iconName={icon} />
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {features.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-white/90">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {primaryButton && (
            <a
              href={primaryButton.link}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {primaryButton.text}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
          
          {secondaryButton && (
            <a
              href={secondaryButton.link}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

CallToAction.schema = {
  role: ["cta_section", "call_to_action", "conversion"],
  props: {
    title: { tags: ["headline", "cta_title"] },
    subtitle: { tags: ["subtitle", "supporting_text"], optional: true },
    description: { tags: ["description_text", "detailed_text"], optional: true },
    layout: { 
      type: "string", 
      tags: ["layout_style"], 
      options: ["centered", "split", "banner"],
      default: "centered",
      optional: true 
    },
    backgroundStyle: { 
      type: "string", 
      tags: ["background_style"], 
      options: ["gradient", "solid", "dark", "image"],
      default: "gradient",
      optional: true 
    },
    backgroundImage: { 
      type: "string", 
      tags: ["background_image"], 
      optional: true 
    },
    showIcon: { 
      type: "boolean", 
      tags: ["show_icon"], 
      default: true,
      optional: true 
    },
    icon: { 
      type: "string", 
      tags: ["icon_name"], 
      default: "rocket",
      optional: true 
    },
    primaryButton: {
      type: "object",
      tags: ["primary_cta"],
      optional: true,
      properties: {
        text: { type: "string", tags: ["button_text"] },
        link: { type: "string", tags: ["button_link"] }
      }
    },
    secondaryButton: {
      type: "object",
      tags: ["secondary_cta"],
      optional: true,
      properties: {
        text: { type: "string", tags: ["button_text"] },
        link: { type: "string", tags: ["button_link"] }
      }
    },
    features: {
      type: "array",
      tags: ["feature_highlights", "benefit_list"],
      optional: true,
      items: { type: "string", tags: ["feature_text"] }
    }
  },
  examples: [
    {
      title: "Ready to Transform Your Business?",
      subtitle: "Join thousands of companies already using our platform",
      description: "Start your free trial today and see the difference our solutions can make for your organization.",
      layout: "centered",
      backgroundStyle: "gradient",
      showIcon: true,
      icon: "rocket",
      primaryButton: {
        text: "Start Free Trial",
        link: "/signup"
      },
      secondaryButton: {
        text: "Schedule Demo",
        link: "/demo"
      },
      features: [
        "No credit card required",
        "14-day free trial",
        "Cancel anytime"
      ]
    }
  ]
}

export default CallToAction

import React from 'react'

const ProcessSteps = ({ 
  title, 
  subtitle, 
  steps = [],
  layout = 'horizontal',
  showNumbers = true,
  showConnectors = true,
  iconStyle = 'gradient'
}) => {
  const IconComponent = ({ icon, number, style }) => {
    const iconClasses = style === 'gradient' 
      ? 'w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg'
      : style === 'outlined'
      ? 'w-16 h-16 border-3 border-blue-500 text-blue-500 rounded-full flex items-center justify-center bg-white'
      : 'w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg'

    return (
      <div className={iconClasses}>
        {showNumbers ? (
          <span className="text-xl font-bold">{number}</span>
        ) : icon ? (
          <i className={`fas fa-${icon} text-xl`}></i>
        ) : (
          <span className="text-xl font-bold">{number}</span>
        )}
      </div>
    )
  }

  const ConnectorLine = ({ isLast, layout }) => {
    if (!showConnectors || isLast) return null
    
    if (layout === 'vertical') {
      return (
        <div className="flex justify-center my-6">
          <div className="w-px h-16 bg-gradient-to-b from-blue-300 to-purple-300"></div>
        </div>
      )
    }
    
    return (
      <div className="hidden lg:flex items-center justify-center flex-1 px-4">
        <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-purple-300"></div>
        <svg className="w-6 h-6 text-blue-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-purple-300"></div>
      </div>
    )
  }

  if (layout === 'vertical') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.id || index}>
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <IconComponent 
                      icon={step.icon} 
                      number={index + 1} 
                      style={iconStyle} 
                    />
                  </div>
                  
                  <div className="flex-1 pb-12">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.duration && (
                      <div className="mt-4 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {step.duration}
                      </div>
                    )}
                  </div>
                </div>
                
                <ConnectorLine isLast={index === steps.length - 1} layout="vertical" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'cards') {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.id || index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group">
                <div className="flex justify-center mb-6">
                  <IconComponent 
                    icon={step.icon} 
                    number={index + 1} 
                    style={iconStyle} 
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {step.details && (
                  <ul className="space-y-2 text-left mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {step.duration && (
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {step.duration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Horizontal Steps */}
        <div className="hidden lg:flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id || index}>
              <div className="flex flex-col items-center text-center max-w-xs">
                <IconComponent 
                  icon={step.icon} 
                  number={index + 1} 
                  style={iconStyle} 
                />
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>

                {step.duration && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {step.duration}
                  </div>
                )}
              </div>
              
              <ConnectorLine isLast={index === steps.length - 1} layout="horizontal" />
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Steps */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={step.id || index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <IconComponent 
                  icon={step.icon} 
                  number={index + 1} 
                  style={iconStyle} 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                
                {step.duration && (
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {step.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ProcessSteps.schema = {
  role: ["process_steps", "workflow", "how_it_works"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_style"], 
      options: ["horizontal", "vertical", "cards"],
      default: "horizontal",
      optional: true 
    },
    showNumbers: { 
      type: "boolean", 
      tags: ["show_step_numbers"], 
      default: true,
      optional: true 
    },
    showConnectors: { 
      type: "boolean", 
      tags: ["show_connecting_lines"], 
      default: true,
      optional: true 
    },
    iconStyle: { 
      type: "string", 
      tags: ["icon_style"], 
      options: ["gradient", "outlined", "filled"],
      default: "gradient",
      optional: true 
    },
    steps: {
      type: "array",
      tags: ["process_steps", "workflow_steps"],
      maxItems: 10,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        title: { type: "string", tags: ["step_title"] },
        description: { type: "string", tags: ["step_description"] },
        icon: { type: "string", tags: ["step_icon"], optional: true },
        duration: { type: "string", tags: ["step_duration"], optional: true },
        details: {
          type: "array",
          tags: ["step_details"],
          optional: true,
          items: { type: "string", tags: ["detail_text"] }
        }
      }
    }
  },
  examples: [
    {
      title: "How It Works",
      subtitle: "Get started in just three simple steps",
      layout: "horizontal",
      showNumbers: true,
      showConnectors: true,
      iconStyle: "gradient",
      steps: [
        {
          id: "1",
          title: "Sign Up",
          description: "Create your account in less than 2 minutes",
          icon: "user-plus",
          duration: "2 min",
          details: [
            "Enter basic information",
            "Verify your email",
            "Choose your plan"
          ]
        },
        {
          id: "2",
          title: "Configure",
          description: "Set up your workspace and invite your team",
          icon: "cog",
          duration: "10 min",
          details: [
            "Customize settings",
            "Import existing data",
            "Invite team members"
          ]
        },
        {
          id: "3",
          title: "Launch",
          description: "Start using all the powerful features",
          icon: "rocket",
          duration: "5 min",
          details: [
            "Complete onboarding",
            "Access all features",
            "Get support when needed"
          ]
        }
      ]
    }
  ]
}

export default ProcessSteps

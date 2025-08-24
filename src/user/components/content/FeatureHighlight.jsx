import React from 'react'

const FeatureHighlight = ({ 
  title, 
  subtitle, 
  features = [],
  layout = 'grid',
  columns = 3,
  showIcons = true,
  iconStyle = 'gradient'
}) => {
  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }

  const IconComponent = ({ icon, style }) => {
    if (!icon || !showIcons) return null
    
    const iconClasses = style === 'gradient' 
      ? 'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center'
      : style === 'outlined'
      ? 'w-12 h-12 border-2 border-blue-500 text-blue-500 rounded-xl flex items-center justify-center'
      : 'w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center'

    return (
      <div className={iconClasses}>
        <i className={`fas fa-${icon} text-xl`}></i>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>

          {/* Features List */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={feature.id || index} className="flex items-start space-x-6">
                <IconComponent icon={feature.icon} style={iconStyle} />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  {feature.benefits && (
                    <ul className="mt-3 space-y-1">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 ${gridColumns[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div key={feature.id || index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group">
              <div className="flex justify-center mb-6">
                <IconComponent icon={feature.icon} style={iconStyle} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {feature.benefits && (
                <ul className="space-y-2 text-left">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}

              {feature.link && (
                <div className="mt-6">
                  <a 
                    href={feature.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

FeatureHighlight.schema = {
  role: ["features_section", "highlights", "capabilities"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["grid", "list"],
      default: "grid",
      optional: true 
    },
    columns: { 
      type: "number", 
      tags: ["grid_columns"], 
      options: [2, 3, 4],
      default: 3,
      optional: true 
    },
    showIcons: { 
      type: "boolean", 
      tags: ["show_feature_icons"], 
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
    features: {
      type: "array",
      tags: ["feature_list", "capabilities"],
      maxItems: 20,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        title: { type: "string", tags: ["feature_title", "capability_name"] },
        description: { type: "string", tags: ["feature_description"] },
        icon: { type: "string", tags: ["icon_class"], optional: true },
        link: { type: "string", tags: ["feature_link"], optional: true },
        benefits: {
          type: "array",
          tags: ["benefit_list"],
          optional: true,
          items: { type: "string", tags: ["benefit_text"] }
        }
      }
    }
  },
  examples: [
    {
      title: "Powerful Features",
      subtitle: "Everything you need to succeed, built into one platform",
      layout: "grid",
      columns: 3,
      showIcons: true,
      iconStyle: "gradient",
      features: [
        {
          id: "1",
          title: "Advanced Analytics",
          description: "Get deep insights into your data with our powerful analytics engine",
          icon: "chart-line",
          benefits: [
            "Real-time reporting",
            "Custom dashboards",
            "Export capabilities"
          ],
          link: "/features/analytics"
        },
        {
          id: "2",
          title: "Team Collaboration",
          description: "Work together seamlessly with built-in collaboration tools",
          icon: "users",
          benefits: [
            "Shared workspaces",
            "Comment system",
            "Role-based permissions"
          ]
        },
        {
          id: "3",
          title: "API Integration",
          description: "Connect with your favorite tools through our robust API",
          icon: "plug",
          benefits: [
            "RESTful API",
            "Webhook support",
            "SDK libraries"
          ]
        }
      ]
    }
  ]
}

export default FeatureHighlight

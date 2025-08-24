import React, { useState } from 'react'

const ComparisonTable = ({ 
  title, 
  subtitle, 
  plans = [],
  features = [],
  highlightColumn = 1,
  showPricing = true,
  currency = '$',
  billingPeriod = 'month'
}) => {
  const [activeFeatureGroup, setActiveFeatureGroup] = useState('all')

  const featureGroups = ['all', ...new Set(features.map(f => f.group).filter(Boolean))]
  const filteredFeatures = activeFeatureGroup === 'all' 
    ? features 
    : features.filter(f => f.group === activeFeatureGroup)

  const CheckIcon = ({ available }) => {
    if (available === true) {
      return (
        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    } else if (available === false) {
      return (
        <svg className="w-5 h-5 text-red-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return (
        <span className="text-sm text-gray-600 text-center block">{available}</span>
      )
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Feature Group Filter */}
        {featureGroups.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {featureGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveFeatureGroup(group)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFeatureGroup === group
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                }`}
              >
                {group === 'all' ? 'All Features' : group}
              </button>
            ))}
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header Row */}
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-6 px-6 bg-gray-50">
                    <span className="text-lg font-semibold text-gray-900">Features</span>
                  </th>
                  {plans.map((plan, index) => (
                    <th 
                      key={plan.id || index} 
                      className={`text-center py-6 px-6 ${
                        index === highlightColumn 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <h3 className={`text-lg font-bold mb-2 ${
                          index === highlightColumn ? 'text-white' : 'text-gray-900'
                        }`}>
                          {plan.name}
                        </h3>
                        {plan.description && (
                          <p className={`text-sm mb-3 ${
                            index === highlightColumn ? 'text-blue-100' : 'text-gray-600'
                          }`}>
                            {plan.description}
                          </p>
                        )}
                        {showPricing && plan.price && (
                          <div className={`${
                            index === highlightColumn ? 'text-white' : 'text-gray-900'
                          }`}>
                            <span className="text-2xl font-bold">
                              {currency}{plan.price}
                            </span>
                            <span className={`text-sm ml-1 ${
                              index === highlightColumn ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              /{billingPeriod}
                            </span>
                          </div>
                        )}
                        {index === highlightColumn && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                              Most Popular
                            </span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Features Rows */}
              <tbody>
                {filteredFeatures.map((feature, featureIndex) => (
                  <tr 
                    key={feature.id || featureIndex}
                    className={`border-b border-gray-100 ${
                      featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{feature.name}</span>
                        {feature.tooltip && (
                          <div className="ml-2 relative group">
                            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                              {feature.tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    {plans.map((plan, planIndex) => (
                      <td 
                        key={`${feature.id || featureIndex}-${plan.id || planIndex}`}
                        className={`py-4 px-6 text-center ${
                          planIndex === highlightColumn ? 'bg-blue-50' : ''
                        }`}
                      >
                        <CheckIcon available={feature.availability[planIndex]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-50 px-6 py-6">
            <div className="flex flex-wrap justify-center gap-4">
              {plans.map((plan, index) => (
                <button
                  key={plan.id || index}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    index === highlightColumn
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {plan.buttonText || 'Get Started'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ComparisonTable.schema = {
  role: ["comparison_table", "pricing_comparison", "feature_comparison"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    highlightColumn: { 
      type: "number", 
      tags: ["highlighted_plan_index"], 
      default: 1,
      optional: true 
    },
    showPricing: { 
      type: "boolean", 
      tags: ["show_pricing"], 
      default: true,
      optional: true 
    },
    currency: { 
      type: "string", 
      tags: ["currency_symbol"], 
      default: "$",
      optional: true 
    },
    billingPeriod: { 
      type: "string", 
      tags: ["billing_period"], 
      default: "month",
      optional: true 
    },
    plans: {
      type: "array",
      tags: ["comparison_plans", "pricing_tiers"],
      maxItems: 6,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["plan_name"] },
        description: { type: "string", tags: ["plan_description"], optional: true },
        price: { type: "string", tags: ["plan_price"], optional: true },
        buttonText: { type: "string", tags: ["cta_button_text"], optional: true }
      }
    },
    features: {
      type: "array",
      tags: ["feature_list", "comparison_features"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["feature_name"] },
        group: { type: "string", tags: ["feature_group"], optional: true },
        tooltip: { type: "string", tags: ["feature_description"], optional: true },
        availability: {
          type: "array",
          tags: ["feature_availability"],
          items: {
            oneOf: [
              { type: "boolean", tags: ["available"] },
              { type: "string", tags: ["custom_value"] }
            ]
          }
        }
      }
    }
  },
  examples: [
    {
      title: "Choose Your Plan",
      subtitle: "Compare features across all our pricing tiers",
      highlightColumn: 1,
      showPricing: true,
      currency: "$",
      billingPeriod: "month",
      plans: [
        {
          id: "starter",
          name: "Starter",
          description: "For individuals",
          price: "9",
          buttonText: "Start Free"
        },
        {
          id: "pro",
          name: "Professional",
          description: "For teams",
          price: "29",
          buttonText: "Get Started"
        },
        {
          id: "enterprise",
          name: "Enterprise",
          description: "For large organizations",
          price: "99",
          buttonText: "Contact Sales"
        }
      ],
      features: [
        {
          id: "1",
          name: "Projects",
          group: "Basic",
          availability: ["5", "Unlimited", "Unlimited"]
        },
        {
          id: "2",
          name: "Team Members",
          group: "Basic",
          availability: ["3", "10", "Unlimited"]
        },
        {
          id: "3",
          name: "Advanced Analytics",
          group: "Analytics",
          tooltip: "Detailed reporting and insights",
          availability: [false, true, true]
        },
        {
          id: "4",
          name: "Priority Support",
          group: "Support",
          availability: [false, true, true]
        },
        {
          id: "5",
          name: "Custom Integrations",
          group: "Advanced",
          availability: [false, false, true]
        }
      ]
    }
  ]
}

export default ComparisonTable

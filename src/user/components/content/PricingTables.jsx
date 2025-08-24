import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const PricingTables = ({ 
  title, 
  subtitle, 
  plans = [], 
  billingToggle = true,
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  currency = "$",
  highlightPopular = true
}) => {
  const [isYearly, setIsYearly] = useState(false)

  const formatPrice = (price) => {
    if (typeof price === 'object') {
      return isYearly ? price.yearly : price.monthly
    }
    return price
  }

  const getDiscount = (plan) => {
    if (plan.discount && isYearly) {
      return plan.discount
    }
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{subtitle}</p>
          
          {/* Billing Toggle */}
          {billingToggle && (
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                {monthlyLabel}
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isYearly ? 'text-blue-600' : 'text-gray-500'}`}>
                {yearlyLabel}
              </span>
              {isYearly && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                  Save up to 20%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const discount = getDiscount(plan)
            const isPopular = highlightPopular && plan.popular
            
            return (
              <div 
                key={plan.id || index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {currency}{formatPrice(plan.price)}
                      </span>
                      <span className="text-gray-500 ml-1">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    {discount && (
                      <div className="mt-2">
                        <span className="text-sm text-green-600 font-medium">
                          Save {discount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <button 
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.buttonText || 'Get Started'}
                    </button>
                  </div>

                  {/* Additional Info */}
                  {plan.additionalInfo && (
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500">{plan.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a custom solution?</p>
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}

PricingTables.schema = defineSchema("PricingTables", {
  role: ["pricing_section", "subscription_plans", "payment_plans"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    billingToggle: { 
      type: "boolean", 
      tags: ["billing_toggle"], 
      default: true,
      optional: true 
    },
    monthlyLabel: { 
      type: "string", 
      tags: ["monthly_label"], 
      default: "Monthly",
      optional: true 
    },
    yearlyLabel: { 
      type: "string", 
      tags: ["yearly_label"], 
      default: "Yearly",
      optional: true 
    },
    currency: { 
      type: "string", 
      tags: ["currency_symbol"], 
      default: "$",
      optional: true 
    },
    highlightPopular: { 
      type: "boolean", 
      tags: ["highlight_popular_plan"], 
      default: true,
      optional: true 
    },
    plans: {
      type: "array",
      tags: ["pricing_plans", "subscription_tiers"],
      maxItems: 6,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["plan_name", "tier_name"] },
        description: { type: "string", tags: ["plan_description"] },
        price: { 
          oneOf: [
            { type: "number", tags: ["price_amount"] },
            { 
              type: "object", 
              tags: ["price_object"],
              properties: {
                monthly: { type: "number", tags: ["monthly_price"] },
                yearly: { type: "number", tags: ["yearly_price"] }
              }
            }
          ]
        },
        popular: { type: "boolean", tags: ["is_popular"], optional: true },
        discount: { type: "string", tags: ["discount_text"], optional: true },
        buttonText: { type: "string", tags: ["cta_button_text"], optional: true },
        additionalInfo: { type: "string", tags: ["additional_info"], optional: true },
        features: {
          type: "array",
          tags: ["plan_features", "feature_list"],
          items: { type: "string", tags: ["feature_item"] }
        }
      }
    }
  },
  examples: [
    {
      title: "Simple, Transparent Pricing",
      subtitle: "Choose the perfect plan for your business needs. No hidden fees, cancel anytime.",
      billingToggle: true,
      monthlyLabel: "Monthly",
      yearlyLabel: "Yearly",
      currency: "$",
      highlightPopular: true,
      plans: [
        {
          id: "starter",
          name: "Starter",
          description: "Perfect for individuals and small projects",
          price: { monthly: 9, yearly: 99 },
          discount: "2 months free",
          buttonText: "Start Free Trial",
          additionalInfo: "No credit card required",
          features: [
            "Up to 5 projects",
            "10GB storage",
            "Basic support",
            "Core features included",
            "Mobile app access"
          ]
        },
        {
          id: "professional",
          name: "Professional",
          description: "Best for growing businesses and teams",
          price: { monthly: 29, yearly: 299 },
          popular: true,
          discount: "2 months free",
          buttonText: "Get Started",
          features: [
            "Unlimited projects",
            "100GB storage",
            "Priority support",
            "Advanced analytics", 
            "Team collaboration",
            "Custom integrations",
            "API access"
          ]
        },
        {
          id: "enterprise",
          name: "Enterprise",
          description: "Advanced features for large organizations",
          price: { monthly: 99, yearly: 999 },
          discount: "2 months free",
          buttonText: "Contact Sales",
          additionalInfo: "Custom pricing available",
          features: [
            "Everything in Professional",
            "Unlimited storage",
            "24/7 dedicated support",
            "Custom workflows",
            "Advanced security",
            "SSO & compliance",
            "Custom training"
          ]
        }
      ]
    }
  ]
});

export default PricingTables

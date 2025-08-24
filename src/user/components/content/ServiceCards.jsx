import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const ServiceCards = ({ 
  title, 
  subtitle, 
  services = [], 
  layout = 'grid',
  columns = 3 
}) => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeService, setActiveService] = useState(0)

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  if (layout === 'tabs') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
            {services.map((service, index) => (
              <button
                key={service.id || index}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-300 ${
                  activeService === index
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {services[activeService] && (
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    {services[activeService].icon && (
                      <img 
                        src={services[activeService].icon} 
                        alt={services[activeService].name}
                        className="w-12 h-12 mr-4"
                      />
                    )}
                    <h3 className="text-2xl font-bold text-gray-900">
                      {services[activeService].name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {services[activeService].description}
                  </p>

                  {services[activeService].features && (
                    <div className="space-y-3 mb-6">
                      {services[activeService].features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {services[activeService].link && (
                    <a
                      href={services[activeService].link}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>

                {services[activeService].image && (
                  <div className="relative">
                    <img
                      src={services[activeService].image}
                      alt={services[activeService].name}
                      className="rounded-lg shadow-lg w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Service Icon/Image */}
              <div className="p-8 text-center">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : service.icon ? (
                  <div className="w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img src={service.icon} alt={service.name} className="w-full h-full" />
                  </div>
                ) : (
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && (
                  <div className="space-y-2 mb-6 text-left">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing */}
                {service.price && (
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-blue-600">
                      {service.price}
                      {service.priceUnit && (
                        <span className="text-lg text-gray-500 font-normal">/{service.priceUnit}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {service.link && (
                  <a
                    href={service.link}
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                      hoveredCard === index
                        ? 'bg-blue-600 text-white transform -translate-y-1 shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {service.ctaText || 'Learn More'}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

ServiceCards.schema = defineSchema("ServiceCards", {
  role: ["service_section", "product_grid", "feature_showcase"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["grid", "tabs"],
      default: "grid",
      optional: true 
    },
    columns: { 
      type: "number", 
      tags: ["grid_columns"], 
      options: [1, 2, 3, 4],
      default: 3,
      optional: true 
    },
    services: {
      type: "array",
      tags: ["service_list", "product_items"],
      maxItems: 20,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["service_name", "title"] },
        description: { type: "string", tags: ["description_text", "service_description"] },
        icon: { type: "string", tags: ["image", "icon"], optional: true },
        image: { type: "string", tags: ["image", "service_image"], optional: true },
        features: {
          type: "array",
          tags: ["feature_list", "service_features"],
          optional: true,
          items: { type: "string", tags: ["feature_text"] }
        },
        price: { type: "string", tags: ["price", "cost"], optional: true },
        priceUnit: { type: "string", tags: ["price_unit"], optional: true },
        link: { type: "string", tags: ["url", "service_link"], optional: true },
        ctaText: { type: "string", tags: ["button_text", "cta_text"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "Our Services",
      subtitle: "Comprehensive solutions tailored to your business needs",
      layout: "grid",
      columns: 3,
      services: [
        {
          id: "consulting",
          name: "Business Consulting",
          description: "Strategic guidance to transform your business operations and drive growth",
          icon: "/icons/consulting.svg",
          features: [
            "Strategic Planning",
            "Process Optimization",
            "Change Management",
            "Performance Analytics"
          ],
          price: "$299",
          priceUnit: "hour",
          link: "/services/consulting",
          ctaText: "Get Started"
        },
        {
          id: "development",
          name: "Custom Development",
          description: "Tailored software solutions built specifically for your business requirements",
          icon: "/icons/development.svg",
          features: [
            "Custom Software",
            "API Integration",
            "Cloud Solutions",
            "Mobile Apps"
          ],
          price: "Contact us",
          link: "/services/development",
          ctaText: "Learn More"
        }
      ]
    }
  ]
});

export default ServiceCards

import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const FeaturedContent = ({ 
  title, 
  subtitle, 
  featuredItems = [], 
  layout = 'grid' 
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredItem, setHoveredItem] = useState(null)

  if (layout === 'carousel') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
              >
                {featuredItems?.map((item, index) => (
                  <div key={item.id || index} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href={item.primaryLink}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            {item.primaryCTA || 'Learn More'}
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                          {item.secondaryLink && (
                            <a
                              href={item.secondaryLink}
                              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                              {item.secondaryCTA || 'Learn More'}
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="rounded-xl shadow-2xl w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredItems?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeTab === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems?.map((item, index) => (
            <div
              key={item.id || index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image */}
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className={`absolute inset-0 flex items-end p-6 transition-all duration-300 ${
                  hoveredItem === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="text-white">
                    <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-medium mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                {/* Meta Info */}
                {item.author && (
                  <div className="flex items-center mb-4">
                    <img
                      src={item.author.avatar}
                      alt={item.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.author.name}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action */}
                <a
                  href={item.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

FeaturedContent.schema = defineSchema("FeaturedContent", {
  role: ["featured_section", "content_showcase", "interactive_grid"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["grid", "carousel"],
      default: "grid",
      optional: true 
    },
    featuredItems: {
      type: "array",
      tags: ["featured_content", "content_items"],
      maxItems: 20,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        title: { type: "string", tags: ["headline", "item_title"] },
        description: { type: "string", tags: ["description_text", "item_description"] },
        category: { type: "string", tags: ["category", "tag"] },
        image: { type: "string", tags: ["image", "media"] },
        link: { type: "string", tags: ["url", "item_link"] },
        primaryLink: { type: "string", tags: ["url", "primary_cta"], optional: true },
        secondaryLink: { type: "string", tags: ["url", "secondary_cta"], optional: true },
        primaryCTA: { type: "string", tags: ["button_text", "cta_text"], optional: true },
        secondaryCTA: { type: "string", tags: ["button_text", "cta_text"], optional: true },
        date: { type: "string", tags: ["date", "publish_date"], optional: true },
        author: {
          type: "object",
          tags: ["author_info"],
          optional: true,
          properties: {
            name: { type: "string", tags: ["author_name"] },
            avatar: { type: "string", tags: ["image", "avatar"] }
          }
        },
        tags: {
          type: "array",
          tags: ["content_tags", "labels"],
          optional: true,
          items: { type: "string", tags: ["tag_name"] }
        }
      }
    }
  },
  examples: [
    {
      title: "Featured Solutions",
      subtitle: "Discover our most popular products and services",
      layout: "grid",
      featuredItems: [
        {
          id: "1",
          title: "AI-Powered Analytics",
          description: "Transform your data into actionable insights with our advanced analytics platform",
          category: "Analytics",
          image: "/images/ai-analytics.jpg",
          link: "/products/analytics",
          primaryLink: "/demo/analytics",
          primaryCTA: "Try Demo",
          secondaryLink: "/pricing/analytics",
          secondaryCTA: "View Pricing",
          date: "2024-08-20",
          author: {
            name: "Product Team",
            avatar: "/images/team/product.jpg"
          },
          tags: ["AI", "Analytics", "Enterprise"]
        }
      ]
    }
  ]
});

export default FeaturedContent

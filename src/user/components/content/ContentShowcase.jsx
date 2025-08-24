import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const ContentShowcase = ({ 
  title, 
  subtitle, 
  items = [], 
  displayType = 'masonry' 
}) => {
  const [filter, setFilter] = useState('All')
  const [viewMode, setViewMode] = useState(displayType)

  const categories = ['All', ...new Set(items?.map(item => item.category) || [])]
  const filteredItems = filter === 'All' ? items : items?.filter(item => item.category === filter)

  const MasonryView = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {filteredItems?.map((item, index) => (
        <div
          key={item.id || index}
          className="break-inside-avoid bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {item.image && (
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {item.description}
            </p>
            
            {item.stats && (
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {item.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <div className="text-lg font-bold text-blue-600">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            {item.features && (
              <div className="space-y-2 mb-4">
                {item.features.slice(0, 3).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <a
                href={item.link}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center group"
              >
                Explore
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              {item.date && (
                <span className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems?.map((item, index) => (
        <div
          key={item.id || index}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          {item.image && (
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {item.category}
              </span>
              {item.priority && (
                <span className="text-orange-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-xs mb-3 line-clamp-2">
              {item.description}
            </p>
            
            <a
              href={item.link}
              className="text-blue-600 hover:text-blue-800 font-medium text-xs inline-flex items-center group"
            >
              View Details
              <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('masonry')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'masonry'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Masonry
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cards
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'masonry' ? <MasonryView /> : <CardView />}
      </div>
    </section>
  )
}

ContentShowcase.schema = defineSchema("ContentShowcase", {
  role: ["content_gallery", "showcase_section", "filterable_grid"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    displayType: { 
      type: "string", 
      tags: ["display_mode"], 
      options: ["masonry", "cards"],
      default: "masonry",
      optional: true 
    },
    items: {
      type: "array",
      tags: ["showcase_items", "content_collection"],
      maxItems: 100,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        title: { type: "string", tags: ["headline", "item_title"] },
        description: { type: "string", tags: ["description_text", "item_description"] },
        category: { type: "string", tags: ["category", "filter_tag"] },
        image: { type: "string", tags: ["image", "media"], optional: true },
        link: { type: "string", tags: ["url", "item_link"] },
        date: { type: "string", tags: ["date", "publish_date"], optional: true },
        priority: { type: "boolean", tags: ["featured_flag"], optional: true },
        stats: {
          type: "array",
          tags: ["statistics", "metrics"],
          optional: true,
          items: {
            type: "object",
            properties: {
              value: { type: "string", tags: ["stat_value"] },
              label: { type: "string", tags: ["stat_label"] }
            }
          }
        },
        features: {
          type: "array",
          tags: ["feature_list", "highlights"],
          optional: true,
          items: { type: "string", tags: ["feature_text"] }
        }
      }
    }
  },
  examples: [
    {
      title: "Content Showcase",
      subtitle: "Explore our diverse collection of content and resources",
      displayType: "masonry",
      items: [
        {
          id: "1",
          title: "Customer Success Story",
          description: "How Company X achieved 300% ROI with our solutions",
          category: "Case Studies",
          image: "/images/case-study-1.jpg",
          link: "/case-studies/company-x",
          date: "2024-08-15",
          priority: true,
          stats: [
            { value: "300%", label: "ROI Increase" },
            { value: "50%", label: "Time Saved" }
          ],
          features: [
            "Automated workflows",
            "Real-time analytics",
            "24/7 support"
          ]
        }
      ]
    }
  ]
});

export default ContentShowcase

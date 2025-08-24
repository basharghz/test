import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const InteractiveTimeline = ({
  title,
  subtitle,
  timelineItems
}) => {
  const [activeItem, setActiveItem] = useState(0)
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full"></div>
          
          <div className="space-y-16">
            {timelineItems?.map((item, index) => (
              <div
                key={item.id || index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Timeline Point */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 cursor-pointer ${
                    activeItem === index || hoveredItem === index
                      ? 'scale-150'
                      : 'scale-100'
                  }`}
                  onClick={() => setActiveItem(index)}
                >
                  <div className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                    activeItem === index
                      ? 'bg-blue-600 border-blue-200 shadow-lg'
                      : 'bg-white border-gray-300 hover:border-blue-300'
                  }`}>
                    {activeItem === index && (
                      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping"></div>
                    )}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${
                    activeItem === index ? 'ring-2 ring-blue-500 transform scale-105' : ''
                  }`}>
                    {/* Date Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                      {item.date}
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    {/* Features/Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    {/* Action Button */}
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {timelineItems?.map((item, index) => (
            <div
              key={item.id || index}
              className="relative pl-8"
            >
              {/* Timeline Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
              
              {/* Timeline Point */}
              <div 
                className={`absolute left-0 top-6 w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                  activeItem === index
                    ? 'bg-blue-600 border-blue-200 scale-110'
                    : 'bg-white border-gray-300'
                }`}
                onClick={() => setActiveItem(index)}
              ></div>

              {/* Content Card */}
              <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
                activeItem === index ? 'ring-2 ring-blue-500' : ''
              }`}>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  {item.date}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {highlight}
                      </div>
                    ))}
                  </div>
                )}

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                
                {item.link && (
                  <a
                    href={item.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {timelineItems?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveItem(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeItem === index
                  ? 'bg-blue-600 transform scale-125'
                  : 'bg-gray-300 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

InteractiveTimeline.schema = defineSchema("InteractiveTimeline", {
  role: ["timeline", "content_section", "interactive_element"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    timelineItems: {
      type: "array",
      tags: ["timeline_items", "content_list"],
      maxItems: 10,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        date: { type: "string", tags: ["date", "timeline_date"] },
        title: { type: "string", tags: ["headline", "timeline_title"] },
        description: { type: "string", tags: ["description_text", "timeline_description"] },
        highlights: { 
          type: "array", 
          tags: ["feature_list", "highlights"],
          optional: true,
          items: { type: "string", tags: ["feature_text"] }
        },
        image: { type: "string", tags: ["image", "media"], optional: true },
        link: { type: "string", tags: ["url", "timeline_link"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "Our Journey",
      subtitle: "Discover the milestones that shaped our company",
      timelineItems: [
        {
          id: "1",
          date: "2020",
          title: "Company Founded",
          description: "Started with a vision to transform business processes",
          highlights: ["Initial team of 5", "First office in Berlin", "Seed funding secured"],
          image: "/images/timeline-2020.jpg",
          link: "/about/history"
        },
        {
          id: "2", 
          date: "2021",
          title: "First Product Launch",
          description: "Released our flagship process management solution",
          highlights: ["100+ early adopters", "First enterprise client", "Product-market fit achieved"],
          image: "/images/timeline-2021.jpg",
          link: "/products/flagship"
        },
        {
          id: "3",
          date: "2022",
          title: "International Expansion",
          description: "Opened offices in 5 new countries",
          highlights: ["500+ customers", "Series A funding", "Team grew to 50"],
          image: "/images/timeline-2022.jpg",
          link: "/about/expansion"
        }
      ]
    }
  ]
});

export default InteractiveTimeline;

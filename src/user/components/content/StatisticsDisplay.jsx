import React, { useState, useEffect } from 'react'
import { defineSchema } from './schemaHelper'

const StatisticsDisplay = ({ 
  title, 
  subtitle, 
  statistics = [], 
  layout = 'grid',
  animated = true 
}) => {
  const [counters, setCounters] = useState({})

  useEffect(() => {
    if (animated) {
      const animateCounters = () => {
        statistics.forEach((stat, index) => {
          if (stat.value && !isNaN(parseFloat(stat.value))) {
            const target = parseFloat(stat.value)
            const duration = 2000
            const steps = 60
            const stepValue = target / steps
            let current = 0

            const timer = setInterval(() => {
              current += stepValue
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              setCounters(prev => ({
                ...prev,
                [stat.id || index]: Math.floor(current)
              }))
            }, duration / steps)
          }
        })
      }

      const timer = setTimeout(animateCounters, 100)
      return () => clearTimeout(timer)
    }
  }, [statistics, animated])

  const formatValue = (stat, index) => {
    if (!animated) return stat.value
    const animatedValue = counters[stat.id || index]
    if (animatedValue !== undefined) {
      return `${animatedValue}${stat.suffix || ''}`
    }
    return stat.value
  }

  if (layout === 'horizontal') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
            </div>
          )}

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {statistics.map((stat, index) => (
              <div key={stat.id || index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.prefix}{formatValue(stat, index)}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                {stat.description && (
                  <div className="text-sm text-gray-500 mt-1 max-w-32">{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div 
              key={stat.id || index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center group hover:-translate-y-2"
            >
              {stat.icon && (
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <img src={stat.icon} alt={stat.label} className="w-8 h-8" />
                </div>
              )}
              
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.prefix}{formatValue(stat, index)}
              </div>
              
              <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
              
              {stat.description && (
                <div className="text-sm text-gray-600">{stat.description}</div>
              )}

              {stat.trend && (
                <div className={`inline-flex items-center mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend.direction === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : stat.trend.direction === 'down'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {stat.trend.direction === 'up' && (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  )}
                  {stat.trend.direction === 'down' && (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  )}
                  {stat.trend.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

StatisticsDisplay.schema = defineSchema("StatisticsDisplay", {
  role: ["statistics_section", "metrics_display", "data_visualization"],
  props: {
    title: { tags: ["headline", "main_text"], optional: true },
    subtitle: { tags: ["description_text", "paragraph"], optional: true },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["grid", "horizontal"],
      default: "grid",
      optional: true 
    },
    animated: { 
      type: "boolean", 
      tags: ["animation_enabled"], 
      default: true,
      optional: true 
    },
    statistics: {
      type: "array",
      tags: ["statistics_data", "metrics"],
      maxItems: 12,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        value: { type: "string", tags: ["statistic_value", "number"] },
        label: { type: "string", tags: ["statistic_label", "metric_name"] },
        description: { type: "string", tags: ["description_text"], optional: true },
        prefix: { type: "string", tags: ["value_prefix"], optional: true },
        suffix: { type: "string", tags: ["value_suffix"], optional: true },
        icon: { type: "string", tags: ["image", "icon"], optional: true },
        trend: {
          type: "object",
          tags: ["trend_data", "change_indicator"],
          optional: true,
          properties: {
            direction: { 
              type: "string", 
              tags: ["trend_direction"],
              options: ["up", "down", "neutral"]
            },
            value: { type: "string", tags: ["trend_value"] }
          }
        }
      }
    }
  },
  examples: [
    {
      title: "Our Impact in Numbers",
      subtitle: "See how we're making a difference across the globe",
      layout: "grid",
      animated: true,
      statistics: [
        {
          id: "customers",
          value: "1000",
          label: "Happy Customers",
          description: "Businesses transformed worldwide",
          suffix: "+",
          icon: "/icons/customers.svg",
          trend: {
            direction: "up",
            value: "+25% this quarter"
          }
        },
        {
          id: "revenue",
          value: "50",
          label: "Revenue Growth",
          description: "Average client improvement",
          suffix: "%",
          icon: "/icons/growth.svg",
          trend: {
            direction: "up",
            value: "+12% YoY"
          }
        },
        {
          id: "countries",
          value: "25",
          label: "Countries Served",
          description: "Global reach and presence",
          icon: "/icons/globe.svg"
        },
        {
          id: "satisfaction",
          value: "99",
          label: "Client Satisfaction",
          description: "Customer satisfaction rate",
          suffix: "%",
          icon: "/icons/satisfaction.svg",
          trend: {
            direction: "up",
            value: "+2% this month"
          }
        }
      ]
    }
  ]
});

export default StatisticsDisplay

import React, { useState } from 'react'

const BlogHeader = ({ 
  title, 
  subtitle, 
  categories = [],
  backgroundGradient = 'from-purple-600 to-blue-600',
  showCategoryFilter = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className={`bg-gradient-to-r ${backgroundGradient} text-white py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 text-purple-100">{subtitle}</p>
        
        {/* Category Filter */}
        {showCategoryFilter && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-white text-purple-600'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-purple-600'
                    : 'bg-purple-500 text-white hover:bg-purple-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

BlogHeader.schema = {
  role: ["blog_header", "page_header", "category_filter"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    backgroundGradient: { 
      type: "string", 
      tags: ["gradient_colors"], 
      default: "from-purple-600 to-blue-600",
      optional: true 
    },
    showCategoryFilter: { 
      type: "boolean", 
      tags: ["show_category_filter"], 
      default: true,
      optional: true 
    },
    categories: {
      type: "array",
      tags: ["category_list", "filter_options"],
      optional: true,
      items: { type: "string", tags: ["category_name"] }
    }
  },
  examples: [
    {
      title: "Our Blog",
      subtitle: "Insights, tips, and stories from our team",
      backgroundGradient: "from-purple-600 to-blue-600",
      showCategoryFilter: true,
      categories: ["Technology", "Design", "Business", "Marketing"]
    }
  ]
}

export default BlogHeader

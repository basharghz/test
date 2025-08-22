import React, { useState } from 'react'

const BlogHeader = ({ title, subtitle, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 text-purple-100">{subtitle}</p>
        
        {/* Category Filter */}
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
      </div>
    </div>
  )
}

export default BlogHeader

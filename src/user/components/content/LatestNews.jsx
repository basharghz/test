import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const LatestNews = ({ 
  title, 
  subtitle, 
  articles = [], 
  categories = [],
  articlesPerPage = 6 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter articles by category
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles?.filter(article => article.category === selectedCategory)

  // Pagination
  const totalPages = Math.ceil((filteredArticles?.length || 0) / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const paginatedArticles = filteredArticles?.slice(startIndex, startIndex + articlesPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Category Filter */}
        {categories && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => {
                setSelectedCategory('All')
                setCurrentPage(1)
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              All News
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedArticles?.map((article, index) => (
            <article 
              key={article.id || index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={article.image || '/images/placeholder-news.jpg'}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <time>{formatDate(article.date)}</time>
                  <span className="mx-2">•</span>
                  <span>{article.readTime || '5 min read'}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={article.author?.avatar || '/images/default-avatar.jpg'}
                      alt={article.author?.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {article.author?.name}
                    </span>
                  </div>
                  
                  <a
                    href={article.link}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center group"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

LatestNews.schema = defineSchema("LatestNews", {
  role: ["news_section", "content_grid", "filterable_content"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    articles: {
      type: "array",
      tags: ["news_articles", "content_feed"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        title: { type: "string", tags: ["headline", "article_title"] },
        excerpt: { type: "string", tags: ["description_text", "article_excerpt"] },
        category: { type: "string", tags: ["category", "tag"] },
        date: { type: "string", tags: ["date", "publish_date"] },
        readTime: { type: "string", tags: ["meta_info"], optional: true },
        image: { type: "string", tags: ["image", "media"], optional: true },
        link: { type: "string", tags: ["url", "article_link"] },
        author: {
          type: "object",
          tags: ["author_info"],
          optional: true,
          properties: {
            name: { type: "string", tags: ["author_name"] },
            avatar: { type: "string", tags: ["image", "avatar"], optional: true }
          }
        }
      }
    },
    categories: {
      type: "array",
      tags: ["filter_categories", "navigation"],
      items: { type: "string", tags: ["category_name"] }
    },
    articlesPerPage: { 
      type: "number", 
      tags: ["pagination_size"], 
      default: 6,
      optional: true 
    }
  },
  examples: [
    {
      title: "Latest News & Updates",
      subtitle: "Stay informed with our latest articles and industry insights",
      articles: [
        {
          id: "1",
          title: "The Future of AI in Business",
          excerpt: "Exploring how artificial intelligence is transforming modern business operations",
          category: "Technology",
          date: "2024-08-20",
          readTime: "5 min read",
          image: "/images/ai-business.jpg",
          link: "/news/ai-business-future",
          author: {
            name: "Sarah Johnson",
            avatar: "/images/authors/sarah.jpg"
          }
        },
        {
          id: "2",
          title: "Digital Transformation Strategies",
          excerpt: "Key strategies for successful digital transformation in enterprise environments",
          category: "Business",
          date: "2024-08-18",
          readTime: "7 min read",
          image: "/images/digital-transformation.jpg",
          link: "/news/digital-transformation",
          author: {
            name: "Michael Chen",
            avatar: "/images/authors/michael.jpg"
          }
        }
      ],
      categories: ["Technology", "Business", "Innovation", "Industry News"],
      articlesPerPage: 6
    }
  ]
});

export default LatestNews

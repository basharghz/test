import React from 'react'

const BlogGrid = ({ 
  title,
  subtitle,
  posts = [],
  showFeatured = true,
  columns = 3
}) => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>}
          {subtitle && <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Post */}
        {showFeatured && posts?.filter(post => post.featured).map((post) => (
          <div key={post.id} className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">{post.author}</span>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    {post.buttonText || 'Read More'} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Posts */}
        <div className="space-y-6">
          {posts?.filter(post => !post.featured).map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{post.author}</span>
                  <span className="text-gray-500">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

BlogGrid.schema = {
  role: ["blog_section", "articles_grid", "content_listing"],
  props: {
    title: { tags: ["headline", "main_text"], optional: true },
    subtitle: { tags: ["description_text", "paragraph"], optional: true },
    showFeatured: { 
      type: "boolean", 
      tags: ["show_featured_posts"], 
      default: true,
      optional: true 
    },
    columns: { 
      type: "number", 
      tags: ["grid_columns"], 
      options: [2, 3, 4],
      default: 3,
      optional: true 
    },
    posts: {
      type: "array",
      tags: ["blog_posts", "articles"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"] },
        title: { type: "string", tags: ["post_title", "article_title"] },
        excerpt: { type: "string", tags: ["post_excerpt", "summary"] },
        content: { type: "string", tags: ["post_content", "article_content"], optional: true },
        author: { type: "string", tags: ["author_name"] },
        date: { type: "string", tags: ["publish_date"] },
        readTime: { type: "string", tags: ["reading_time"], optional: true },
        category: { type: "string", tags: ["post_category"] },
        image: { type: "string", tags: ["featured_image"] },
        featured: { type: "boolean", tags: ["is_featured"], optional: true },
        buttonText: { type: "string", tags: ["cta_text"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "Latest Articles",
      subtitle: "Stay updated with our latest insights and news",
      showFeatured: true,
      columns: 3,
      posts: [
        {
          id: "1",
          title: "The Future of Web Development",
          excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
          author: "John Smith",
          date: "March 15, 2024",
          readTime: "5 min read",
          category: "Technology",
          image: "/images/blog/web-dev-future.jpg",
          featured: true,
          buttonText: "Read More"
        },
        {
          id: "2",
          title: "Building Scalable Applications",
          excerpt: "Best practices for creating applications that can grow with your business.",
          author: "Sarah Johnson",
          date: "March 12, 2024",
          readTime: "7 min read",
          category: "Development",
          image: "/images/blog/scalable-apps.jpg",
          featured: false
        },
        {
          id: "3",
          title: "UX Design Principles",
          excerpt: "Essential principles every designer should know for creating better user experiences.",
          author: "Mike Chen",
          date: "March 10, 2024",
          readTime: "4 min read",
          category: "Design",
          image: "/images/blog/ux-principles.jpg",
          featured: false
        }
      ]
    }
  ]
}

export default BlogGrid

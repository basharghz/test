import React from 'react'

const BlogGrid = ({ posts }) => (
  <div className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Post */}
        {posts?.filter(post => post.featured).map((post) => (
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
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
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

export default BlogGrid

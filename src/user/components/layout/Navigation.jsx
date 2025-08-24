import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ logo, links = [] }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-900">
              {logo || 'AI CMS'}
            </Link>
            <div className="hidden md:flex space-x-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className={`text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                    link.active ? 'bg-gray-100' : ''
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Show Tests link only in development mode */}
            {!import.meta.env.PROD && (
              <Link
                to="/tests"
                className="px-4 py-2 rounded-md text-sm bg-gray-600 text-white hover:bg-gray-700"
              >
                Tests
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

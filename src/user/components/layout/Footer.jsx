import React from 'react'

const Footer = ({ 
  copyright = '© 2025 AI CMS. Built with React and Tailwind CSS.',
  links = [],
  socialLinks = [],
  backgroundColor = 'bg-gray-800',
  textColor = 'text-white'
}) => {
  return (
    <footer className={`${backgroundColor} ${textColor} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {links.length > 0 && (
          <div className="flex justify-center space-x-8 mb-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="hover:text-gray-300 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
        
        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-6 mb-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                {social.icon ? (
                  <div dangerouslySetInnerHTML={{ __html: social.icon }} />
                ) : (
                  social.text
                )}
              </a>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

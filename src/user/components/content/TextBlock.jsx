import React from 'react'

const TextBlock = ({ 
  title, 
  subtitle,
  content,
  author,
  publishDate,
  readTime,
  layout = 'article',
  textAlign = 'left',
  maxWidth = 'max-w-4xl',
  showMeta = true,
  highlightQuotes = true
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    justify: 'text-justify'
  }

  const processContent = (text) => {
    if (!highlightQuotes || !text) return text
    
    // Simple quote highlighting - replace text in quotes with styled spans
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('"') && paragraph.trim().endsWith('"')) {
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-6 italic text-lg text-gray-700 bg-blue-50 py-4 rounded-r-lg">
            {paragraph.trim().slice(1, -1)}
          </blockquote>
        )
      }
      
      if (paragraph.trim() === '') {
        return <br key={index} />
      }
      
      return (
        <p key={index} className="mb-6 leading-relaxed">
          {paragraph}
        </p>
      )
    })
  }

  if (layout === 'minimal') {
    return (
      <section className="py-16 bg-white">
        <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className={alignmentClasses[textAlign]}>
            {title && (
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className="text-xl text-gray-600 mb-8">
                {subtitle}
              </p>
            )}

            <div className="prose prose-lg max-w-none text-gray-700">
              {typeof content === 'string' ? processContent(content) : content}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'featured') {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Meta Information */}
              {showMeta && (author || publishDate || readTime) && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                  {author && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      By {author}
                    </div>
                  )}
                  {publishDate && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {publishDate}
                    </div>
                  )}
                  {readTime && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {readTime}
                    </div>
                  )}
                </div>
              )}

              <div className={alignmentClasses[textAlign]}>
                {title && (
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                  </h1>
                )}
                
                {subtitle && (
                  <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                    {subtitle}
                  </p>
                )}

                <div className="prose prose-lg max-w-none text-gray-700">
                  {typeof content === 'string' ? processContent(content) : content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        {/* Meta Information */}
        {showMeta && (author || publishDate || readTime) && (
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-8">
            {author && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                By {author}
              </div>
            )}
            {publishDate && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {publishDate}
              </div>
            )}
            {readTime && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {readTime}
              </div>
            )}
          </div>
        )}

        <div className={alignmentClasses[textAlign]}>
          {title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
          )}
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="prose prose-lg max-w-none text-gray-700">
            {typeof content === 'string' ? processContent(content) : content}
          </div>
        </div>
      </div>
    </section>
  )
}

TextBlock.schema = {
  role: ["text_content", "article", "content_block"],
  props: {
    title: { tags: ["headline", "article_title"], optional: true },
    subtitle: { tags: ["subtitle", "lead_text"], optional: true },
    content: { tags: ["main_content", "article_body"] },
    author: { tags: ["author_name"], optional: true },
    publishDate: { tags: ["publish_date"], optional: true },
    readTime: { tags: ["reading_time"], optional: true },
    layout: { 
      type: "string", 
      tags: ["layout_style"], 
      options: ["article", "minimal", "featured"],
      default: "article",
      optional: true 
    },
    textAlign: { 
      type: "string", 
      tags: ["text_alignment"], 
      options: ["left", "center", "justify"],
      default: "left",
      optional: true 
    },
    maxWidth: { 
      type: "string", 
      tags: ["content_width"], 
      options: ["max-w-2xl", "max-w-4xl", "max-w-6xl", "max-w-full"],
      default: "max-w-4xl",
      optional: true 
    },
    showMeta: { 
      type: "boolean", 
      tags: ["show_metadata"], 
      default: true,
      optional: true 
    },
    highlightQuotes: { 
      type: "boolean", 
      tags: ["highlight_quotes"], 
      default: true,
      optional: true 
    }
  },
  examples: [
    {
      title: "The Future of Digital Transformation",
      subtitle: "How modern businesses are adapting to technological change",
      content: "Digital transformation has become more than just a buzzword—it's a fundamental shift in how organizations operate and deliver value to customers.\n\n\"The companies that survive long-term are those that work out what they uniquely can give to the world not just growth or money but their excellence, their respect for others, or their ability to make people happy.\"\n\nThis transformation encompasses not just technology adoption, but cultural change, process optimization, and strategic thinking. Organizations must embrace new ways of working while maintaining their core values and mission.",
      author: "Jane Smith",
      publishDate: "March 15, 2024",
      readTime: "8 min read",
      layout: "article",
      textAlign: "left",
      maxWidth: "max-w-4xl",
      showMeta: true,
      highlightQuotes: true
    }
  ]
}

export default TextBlock

import React, { useState, useEffect } from 'react'
import { defineSchema } from './schemaHelper'

const TestimonialsCarousel = ({ 
  title, 
  subtitle, 
  testimonials = [], 
  autoPlay = true,
  autoPlayInterval = 5000,
  showRatings = true,
  layout = 'carousel'
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    if (autoPlay && testimonials.length > 1) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, testimonials.length])

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (layout === 'grid') {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                {/* Rating */}
                {showRatings && testimonial.rating && (
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    {testimonial.company && (
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id || index} className="w-full flex-shrink-0 px-4">
                  <div className="text-center">
                    {/* Large Quote Icon */}
                    <div className="text-blue-600 mb-6">
                      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>

                    {/* Rating */}
                    {showRatings && testimonial.rating && (
                      <div className="flex justify-center items-center mb-6">
                        {renderStars(testimonial.rating)}
                      </div>
                    )}

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      {testimonial.avatar && (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mb-4 object-cover border-4 border-blue-100"
                        />
                      )}
                      <div>
                        <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                        {testimonial.company && (
                          <div className="text-blue-600 font-medium">{testimonial.company}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? 'bg-blue-600 transform scale-125'
                      : 'bg-gray-300 hover:bg-blue-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

TestimonialsCarousel.schema = defineSchema("TestimonialsCarousel", {
  role: ["testimonials_section", "social_proof", "customer_reviews"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["carousel", "grid"],
      default: "carousel",
      optional: true 
    },
    autoPlay: { 
      type: "boolean", 
      tags: ["carousel_autoplay"], 
      default: true,
      optional: true 
    },
    autoPlayInterval: { 
      type: "number", 
      tags: ["carousel_interval"], 
      default: 5000,
      optional: true 
    },
    showRatings: { 
      type: "boolean", 
      tags: ["show_ratings"], 
      default: true,
      optional: true 
    },
    testimonials: {
      type: "array",
      tags: ["testimonial_list", "customer_reviews"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["customer_name", "author_name"] },
        role: { type: "string", tags: ["customer_role", "job_title"] },
        company: { type: "string", tags: ["company_name"], optional: true },
        content: { type: "string", tags: ["testimonial_text", "review_content"] },
        rating: { type: "number", tags: ["rating", "stars"], optional: true },
        avatar: { type: "string", tags: ["image", "customer_photo"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "What Our Customers Say",
      subtitle: "Real feedback from businesses that trust our solutions",
      layout: "carousel",
      autoPlay: true,
      autoPlayInterval: 5000,
      showRatings: true,
      testimonials: [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "CEO",
          company: "TechCorp Inc.",
          content: "This solution transformed our business operations completely. The ROI was evident within the first quarter.",
          rating: 5,
          avatar: "/images/testimonials/sarah.jpg"
        },
        {
          id: "2", 
          name: "Michael Chen",
          role: "CTO",
          company: "InnovateLabs",
          content: "Outstanding support and incredibly powerful features. Our team productivity increased by 40%.",
          rating: 5,
          avatar: "/images/testimonials/michael.jpg"
        },
        {
          id: "3",
          name: "Emma Davis",
          role: "Operations Manager", 
          company: "Global Solutions",
          content: "The implementation was seamless and the results exceeded our expectations. Highly recommended!",
          rating: 5,
          avatar: "/images/testimonials/emma.jpg"
        }
      ]
    }
  ]
});

export default TestimonialsCarousel

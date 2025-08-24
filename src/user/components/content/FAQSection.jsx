import React, { useState } from 'react'
import { defineSchema } from './schemaHelper'

const FAQSection = ({ 
  title, 
  subtitle, 
  faqs = [], 
  layout = 'accordion',
  searchable = true,
  categories = [],
  showContactCTA = true
}) => {
  const [openItems, setOpenItems] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || 
      !faq.category || 
      faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (layout === 'grid') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            {searchable && (
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}

            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredFAQs.map((faq, index) => (
              <div key={faq.id || index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                {faq.category && (
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {categories.find(cat => cat.id === faq.category)?.name || faq.category}
                  </span>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          {searchable && (
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={faq.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openItems.has(index) ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  {faq.category && (
                    <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {categories.find(cat => cat.id === faq.category)?.name || faq.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
          </div>
        )}

        {/* Contact CTA */}
        {showContactCTA && (
          <div className="text-center mt-12 p-8 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Can't find the answer you're looking for? Our team is here to help.</p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

FAQSection.schema = defineSchema("FAQSection", {
  role: ["faq_section", "help_section", "questions_answers"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["accordion", "grid"],
      default: "accordion",
      optional: true 
    },
    searchable: { 
      type: "boolean", 
      tags: ["enable_search"], 
      default: true,
      optional: true 
    },
    showContactCTA: { 
      type: "boolean", 
      tags: ["show_contact_cta"], 
      default: true,
      optional: true 
    },
    categories: {
      type: "array",
      tags: ["faq_categories"],
      optional: true,
      items: {
        id: { type: "string", tags: ["category_id"] },
        name: { type: "string", tags: ["category_name"] }
      }
    },
    faqs: {
      type: "array",
      tags: ["faq_list", "questions_answers"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        question: { type: "string", tags: ["faq_question", "question_text"] },
        answer: { type: "string", tags: ["faq_answer", "answer_text"] },
        category: { type: "string", tags: ["faq_category"], optional: true }
      }
    }
  },
  examples: [
    {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our products and services",
      layout: "accordion",
      searchable: true,
      showContactCTA: true,
      categories: [
        { id: "general", name: "General" },
        { id: "billing", name: "Billing" },
        { id: "technical", name: "Technical" },
        { id: "support", name: "Support" }
      ],
      faqs: [
        {
          id: "1",
          question: "How do I get started with your platform?",
          answer: "Getting started is easy! Simply sign up for a free account, complete the onboarding process, and you'll be ready to use all our features. Our getting started guide will walk you through the first steps.",
          category: "general"
        },
        {
          id: "2",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment system.",
          category: "billing"
        },
        {
          id: "3",
          question: "Can I integrate your API with my existing systems?",
          answer: "Yes! Our REST API is well-documented and supports integration with most modern systems. We provide SDKs for popular programming languages and comprehensive documentation to help developers get started quickly.",
          category: "technical"
        },
        {
          id: "4",
          question: "What kind of support do you offer?",
          answer: "We offer 24/7 email support for all users, live chat for Pro users, and dedicated phone support for Enterprise customers. Our average response time is under 2 hours for urgent issues.",
          category: "support"
        },
        {
          id: "5",
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 14-day free trial with access to all Pro features. No credit card required to start your trial. You can upgrade or downgrade your plan at any time.",
          category: "billing"
        },
        {
          id: "6",
          question: "How secure is my data?",
          answer: "We take security very seriously. All data is encrypted at rest and in transit using industry-standard encryption. We're SOC 2 compliant and undergo regular security audits. Your data is backed up daily to multiple secure locations.",
          category: "technical"
        }
      ]
    }
  ]
});

export default FAQSection

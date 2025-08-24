import React, { useState } from 'react'

const TeamShowcase = ({ 
  title, 
  subtitle, 
  team = [], 
  layout = 'grid',
  showSocial = true,
  showBio = true,
  columnsDesktop = 4
}) => {
  const [selectedMember, setSelectedMember] = useState(null)

  const gridColumns = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3', 
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5'
  }

  if (layout === 'carousel') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
          </div>

          {/* Team Carousel */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ width: `${team.length * 300}px` }}>
              {team.map((member, index) => (
                <div 
                  key={member.id || index} 
                  className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image || '/images/team/placeholder.jpg'}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Social Links Overlay */}
                    {showSocial && member.social && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="bg-white/90 hover:bg-white text-blue-400 p-2 rounded-full transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.email && (
                          <a href={`mailto:${member.social.email}`} className="bg-white/90 hover:bg-white text-gray-600 p-2 rounded-full transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    {showBio && member.bio && (
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Team Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColumns[columnsDesktop]} gap-8`}>
          {team.map((member, index) => (
            <div 
              key={member.id || index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image || '/images/team/placeholder.jpg'}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Social Links Overlay */}
                {showSocial && member.social && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.social.linkedin && (
                      <a 
                        href={member.social.linkedin} 
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a 
                        href={member.social.twitter}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 hover:bg-white text-blue-400 p-2 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.email && (
                      <a 
                        href={`mailto:${member.social.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white/90 hover:bg-white text-gray-600 p-2 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                {showBio && member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={selectedMember.image || '/images/team/placeholder.jpg'}
                      alt={selectedMember.name}
                      className="w-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                    <p className="text-blue-600 font-medium text-lg mb-4">{selectedMember.role}</p>
                    {selectedMember.bio && (
                      <p className="text-gray-600 leading-relaxed mb-6">{selectedMember.bio}</p>
                    )}
                    
                    {/* Social Links */}
                    {selectedMember.social && (
                      <div className="flex space-x-4">
                        {selectedMember.social.linkedin && (
                          <a href={selectedMember.social.linkedin} className="text-blue-600 hover:text-blue-700 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {selectedMember.social.twitter && (
                          <a href={selectedMember.social.twitter} className="text-blue-400 hover:text-blue-500 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {selectedMember.social.email && (
                          <a href={`mailto:${selectedMember.social.email}`} className="text-gray-600 hover:text-gray-700 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

TeamShowcase.schema = {
  role: ["team_section", "about_team", "company_team"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"] },
    layout: { 
      type: "string", 
      tags: ["layout_type"], 
      options: ["grid", "carousel"],
      default: "grid",
      optional: true 
    },
    showSocial: { 
      type: "boolean", 
      tags: ["show_social_links"], 
      default: true,
      optional: true 
    },
    showBio: { 
      type: "boolean", 
      tags: ["show_biography"], 
      default: true,
      optional: true 
    },
    columnsDesktop: { 
      type: "number", 
      tags: ["grid_columns"], 
      options: [2, 3, 4, 5],
      default: 4,
      optional: true 
    },
    team: {
      type: "array",
      tags: ["team_members", "staff_list"],
      maxItems: 50,
      strategy: true,
      items: {
        id: { type: "string", tags: ["identifier"], optional: true },
        name: { type: "string", tags: ["member_name", "person_name"] },
        role: { type: "string", tags: ["job_title", "position"] },
        bio: { type: "string", tags: ["biography", "description"], optional: true },
        image: { type: "string", tags: ["photo", "profile_image"] },
        social: {
          type: "object",
          tags: ["social_links"],
          optional: true,
          properties: {
            linkedin: { type: "string", tags: ["linkedin_url"], optional: true },
            twitter: { type: "string", tags: ["twitter_url"], optional: true },
            email: { type: "string", tags: ["email_address"], optional: true }
          }
        }
      }
    }
  },
  examples: [
    {
      title: "Meet Our Team",
      subtitle: "Passionate professionals dedicated to delivering exceptional results",
      layout: "grid",
      showSocial: true,
      showBio: true,
      columnsDesktop: 4,
      team: [
        {
          id: "1",
          name: "Alex Thompson",
          role: "CEO & Founder",
          bio: "Visionary leader with 15+ years of experience in technology and business strategy. Passionate about innovation and building great teams.",
          image: "/images/team/alex.jpg",
          social: {
            linkedin: "https://linkedin.com/in/alexthompson",
            twitter: "https://twitter.com/alexthompson",
            email: "alex@company.com"
          }
        },
        {
          id: "2",
          name: "Sarah Mitchell",
          role: "CTO",
          bio: "Technical expert specializing in scalable architecture and modern web technologies. Leads our engineering team with innovation.",
          image: "/images/team/sarah.jpg",
          social: {
            linkedin: "https://linkedin.com/in/sarahmitchell",
            email: "sarah@company.com"
          }
        },
        {
          id: "3",
          name: "David Rodriguez",
          role: "Head of Design",
          bio: "Creative designer focused on user experience and beautiful interfaces. Transforms complex ideas into intuitive designs.",
          image: "/images/team/david.jpg",
          social: {
            linkedin: "https://linkedin.com/in/davidrodriguez",
            twitter: "https://twitter.com/daviddesign"
          }
        },
        {
          id: "4",
          name: "Emily Chen",
          role: "Marketing Director", 
          bio: "Strategic marketer with expertise in digital campaigns and brand development. Drives growth through innovative marketing.",
          image: "/images/team/emily.jpg",
          social: {
            linkedin: "https://linkedin.com/in/emilychen",
            email: "emily@company.com"
          }
        }
      ]
    }
  ]
}

export default TeamShowcase

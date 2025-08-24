import React from 'react'

const AboutHero = ({ 
  title, 
  subtitle,
  mission, 
  vision, 
  established, 
  employees, 
  countries,
  backgroundGradient = 'from-green-600 to-teal-600',
  showStats = true
}) => (
  <div className={`bg-gradient-to-r ${backgroundGradient} text-white py-20`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        {subtitle && <p className="text-xl mb-8 text-green-100">{subtitle}</p>}
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {mission && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-green-100">{mission}</p>
              </div>
            )}
            {vision && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-green-100">{vision}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stats */}
      {showStats && (established || employees || countries) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {established && (
            <div>
              <div className="text-3xl font-bold mb-2">{established}</div>
              <div className="text-green-200">Established</div>
            </div>
          )}
          {employees && (
            <div>
              <div className="text-3xl font-bold mb-2">{employees}</div>
              <div className="text-green-200">Team Members</div>
            </div>
          )}
          {countries && (
            <div>
              <div className="text-3xl font-bold mb-2">{countries}</div>
              <div className="text-green-200">Countries Served</div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)

AboutHero.schema = {
  role: ["about_hero", "company_intro", "mission_vision"],
  props: {
    title: { tags: ["headline", "main_text"] },
    subtitle: { tags: ["description_text", "paragraph"], optional: true },
    mission: { tags: ["mission_text", "company_mission"], optional: true },
    vision: { tags: ["vision_text", "company_vision"], optional: true },
    backgroundGradient: { 
      type: "string", 
      tags: ["gradient_colors"], 
      default: "from-green-600 to-teal-600",
      optional: true 
    },
    showStats: { 
      type: "boolean", 
      tags: ["show_statistics"], 
      default: true,
      optional: true 
    },
    established: { type: "string", tags: ["founding_year"], optional: true },
    employees: { type: "string", tags: ["team_size"], optional: true },
    countries: { type: "string", tags: ["global_reach"], optional: true }
  },
  examples: [
    {
      title: "About Our Company",
      subtitle: "Leading innovation in technology solutions",
      mission: "To empower businesses with cutting-edge technology solutions that drive growth and success.",
      vision: "A world where technology seamlessly enhances every aspect of business operations.",
      backgroundGradient: "from-green-600 to-teal-600",
      showStats: true,
      established: "2015",
      employees: "500+",
      countries: "25+"
    }
  ]
}

export default AboutHero

import React from 'react'

const AboutHero = ({ title, mission, vision, established, employees, countries }) => (
  <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-green-100">{mission}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-green-100">{vision}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold mb-2">{established}</div>
          <div className="text-green-200">Established</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2">{employees}</div>
          <div className="text-green-200">Team Members</div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2">{countries}</div>
          <div className="text-green-200">Countries Served</div>
        </div>
      </div>
    </div>
  </div>
)

export default AboutHero

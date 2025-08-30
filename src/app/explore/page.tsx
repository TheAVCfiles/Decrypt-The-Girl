import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Explore Military Careers',
  description: 'Discover diverse military career opportunities across all branches of the armed forces',
}

export default function ExplorePage() {
  const militaryRoles = [
    {
      category: "Technology & Cybersecurity",
      icon: "🔒",
      roles: [
        {
          title: "Cybersecurity Specialist",
          branches: ["Army", "Navy", "Air Force", "Marines"],
          description: "Protect military networks and information systems from cyber threats",
          requirements: "High school diploma, strong analytical skills"
        },
        {
          title: "Information Systems Technician",
          branches: ["Navy", "Coast Guard"],
          description: "Maintain and operate computer networks and communications systems",
          requirements: "Technical aptitude, attention to detail"
        },
        {
          title: "Intelligence Analyst",
          branches: ["All Branches"],
          description: "Analyze data and intelligence to support military operations",
          requirements: "Critical thinking skills, security clearance eligible"
        }
      ]
    },
    {
      category: "Aviation & Aerospace",
      icon: "✈️",
      roles: [
        {
          title: "Pilot",
          branches: ["Army", "Navy", "Air Force", "Marines", "Coast Guard"],
          description: "Operate military aircraft for combat, transport, and reconnaissance missions",
          requirements: "College degree, physical fitness, vision requirements"
        },
        {
          title: "Aircraft Maintenance Technician",
          branches: ["All Branches"],
          description: "Maintain and repair military aircraft and systems",
          requirements: "Mechanical aptitude, attention to detail"
        },
        {
          title: "Air Traffic Controller",
          branches: ["Navy", "Air Force", "Marines"],
          description: "Direct aircraft movements to ensure safe and efficient operations",
          requirements: "Strong communication skills, ability to work under pressure"
        }
      ]
    },
    {
      category: "Engineering & Technical",
      icon: "🔧",
      roles: [
        {
          title: "Combat Engineer",
          branches: ["Army", "Marines"],
          description: "Build and destroy structures, clear obstacles, and support combat operations",
          requirements: "Physical fitness, problem-solving skills"
        },
        {
          title: "Nuclear Technician",
          branches: ["Navy"],
          description: "Operate and maintain nuclear reactors on ships and submarines",
          requirements: "Strong math/science background, security clearance"
        },
        {
          title: "Electronics Technician",
          branches: ["All Branches"],
          description: "Install, maintain, and repair electronic equipment and systems",
          requirements: "Technical training, troubleshooting skills"
        }
      ]
    },
    {
      category: "Medical & Healthcare",
      icon: "⚕️",
      roles: [
        {
          title: "Combat Medic",
          branches: ["Army", "Navy", "Air Force"],
          description: "Provide emergency medical care in combat and training environments",
          requirements: "Medical training, physical fitness, emotional resilience"
        },
        {
          title: "Dental Technician",
          branches: ["All Branches"],
          description: "Assist military dentists and provide dental care to service members",
          requirements: "Healthcare interest, attention to detail"
        },
        {
          title: "Mental Health Specialist",
          branches: ["All Branches"],
          description: "Provide counseling and mental health support to service members",
          requirements: "Psychology background, strong interpersonal skills"
        }
      ]
    },
    {
      category: "Special Operations",
      icon: "🎯",
      roles: [
        {
          title: "Special Forces",
          branches: ["Army", "Navy SEALs", "Air Force", "Marines"],
          description: "Elite military units conducting specialized missions",
          requirements: "Exceptional physical/mental fitness, leadership potential"
        },
        {
          title: "Explosive Ordnance Disposal (EOD)",
          branches: ["All Branches"],
          description: "Detect, disarm, and dispose of explosive devices",
          requirements: "Steady nerves, technical aptitude, attention to detail"
        },
        {
          title: "Military Police",
          branches: ["Army", "Navy", "Air Force", "Marines"],
          description: "Enforce military law and provide security for military installations",
          requirements: "Integrity, physical fitness, law enforcement interest"
        }
      ]
    },
    {
      category: "Logistics & Support",
      icon: "📦",
      roles: [
        {
          title: "Supply Chain Specialist",
          branches: ["All Branches"],
          description: "Manage procurement, storage, and distribution of military supplies",
          requirements: "Organizational skills, attention to detail"
        },
        {
          title: "Transportation Specialist",
          branches: ["All Branches"],
          description: "Coordinate movement of personnel, equipment, and supplies",
          requirements: "Logistics aptitude, communication skills"
        },
        {
          title: "Food Service Specialist",
          branches: ["All Branches"],
          description: "Prepare and serve meals for military personnel",
          requirements: "Culinary interest, teamwork skills"
        }
      ]
    }
  ]

  const benefits = [
    {
      title: "Education Benefits",
      description: "Up to 100% tuition coverage, student loan repayment programs, and professional certifications",
      icon: "🎓"
    },
    {
      title: "Healthcare",
      description: "Comprehensive medical, dental, and vision coverage for you and your family",
      icon: "🏥"
    },
    {
      title: "Job Security",
      description: "Stable employment with opportunities for advancement and skill development",
      icon: "🛡️"
    },
    {
      title: "Travel Opportunities",
      description: "See the world while serving your country and gaining valuable experience",
      icon: "🌍"
    },
    {
      title: "Leadership Training",
      description: "Develop leadership skills highly valued in both military and civilian careers",
      icon: "👑"
    },
    {
      title: "Retirement Benefits",
      description: "Pension plans and retirement savings programs for long-term financial security",
      icon: "💰"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-military-50 to-primary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-military-800 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore Military Careers
            </h1>
            <p className="text-xl md:text-2xl text-military-200 mb-8 max-w-3xl mx-auto">
              Discover your path to a rewarding military career with opportunities in technology, 
              aviation, healthcare, and more
            </p>
            <a href="/#apply" className="btn-accent text-lg px-8 py-4">
              Start Your Journey
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-military-800 mb-4">Why Choose a Military Career?</h2>
            <p className="text-xl text-military-600 max-w-3xl mx-auto">
              Military service offers unparalleled benefits, training, and opportunities for personal and professional growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-military-800 mb-3">{benefit.title}</h3>
                <p className="text-military-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-military-800 mb-4">Military Career Fields</h2>
            <p className="text-xl text-military-600 max-w-3xl mx-auto">
              Explore diverse career opportunities across all branches of the military
            </p>
          </div>

          <div className="space-y-12">
            {militaryRoles.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <div className="card-header">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{category.icon}</span>
                    <h3 className="text-2xl font-bold text-military-800">{category.category}</h3>
                  </div>
                </div>
                <div className="card-content">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {category.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="border border-military-200 rounded-lg p-6 hover:border-primary-300 transition-colors">
                        <h4 className="text-lg font-bold text-military-800 mb-2">{role.title}</h4>
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {role.branches.map((branch, branchIndex) => (
                              <span key={branchIndex} className="badge badge-info text-xs">
                                {branch}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-military-600 text-sm mb-3">{role.description}</p>
                        <div className="text-xs text-military-500">
                          <strong>Requirements:</strong> {role.requirements}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Serve Your Country?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Connect with a military recruiter today to learn more about career opportunities 
            and benefits that match your interests and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#apply" className="btn bg-white text-primary-600 hover:bg-military-50 px-8 py-4 text-lg font-semibold">
              Apply Now
            </a>
            <a href="/" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
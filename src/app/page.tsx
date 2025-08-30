'use client'

import { useState } from 'react'
import { validateEmail, validatePhone } from '@/lib/utils'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  branch: string
  role: string
  experience: string
  recruiterId?: string
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    branch: '',
    role: '',
    experience: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          branch: '',
          role: '',
          experience: '',
        })
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'There was an error submitting your information. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-military-50 to-primary-50">
        <div className="max-w-md w-full mx-4">
          <div className="card text-center">
            <div className="card-content p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-military-800 mb-2">Thank You!</h2>
              <p className="text-military-600 mb-6">
                Your information has been submitted successfully. A military recruiter will contact you within 24-48 hours to discuss your career opportunities.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-military-900 via-military-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Decrypt The Girl
            </h1>
            <p className="text-xl md:text-2xl text-military-200 mb-8 max-w-3xl mx-auto text-balance">
              Elite Military Recruitment Platform
            </p>
            <p className="text-lg text-military-300 mb-12 max-w-2xl mx-auto text-balance">
              Connect with specialized military career opportunities. From cybersecurity to aviation, 
              find your path to serve with purpose and advance your career in elite military roles.
            </p>
            <a href="#apply" className="btn-accent text-lg px-8 py-4 animate-pulse-glow">
              Start Your Military Career
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-military-800 mb-4">Why Choose Military Service?</h2>
            <p className="text-xl text-military-600 max-w-3xl mx-auto">
              Discover unparalleled opportunities for personal growth, technical training, and leadership development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-military-800 mb-4">Advanced Technology</h3>
              <p className="text-military-600">
                Work with cutting-edge technology in cybersecurity, aerospace, and defense systems
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-military-800 mb-4">Leadership Development</h3>
              <p className="text-military-600">
                Build exceptional leadership skills through proven military training and real-world experience
              </p>
            </div>

            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-military-800 mb-4">Career Benefits</h3>
              <p className="text-military-600">
                Comprehensive benefits including education, healthcare, housing, and retirement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-military-50 to-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-military-800 mb-4">Begin Your Journey</h2>
            <p className="text-xl text-military-600">
              Take the first step toward an elite military career. Connect with a specialized recruiter today.
            </p>
          </div>

          <div className="card">
            <div className="card-content p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-military-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input ${errors.firstName ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-military-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input ${errors.lastName ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-military-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-military-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-military-700 mb-2">
                      Preferred Branch
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="">Select a branch</option>
                      <option value="Army">Army</option>
                      <option value="Navy">Navy</option>
                      <option value="Air Force">Air Force</option>
                      <option value="Marines">Marines</option>
                      <option value="Space Force">Space Force</option>
                      <option value="Coast Guard">Coast Guard</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-military-700 mb-2">
                      Military Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="">Select experience level</option>
                      <option value="No military experience">No military experience</option>
                      <option value="ROTC">ROTC</option>
                      <option value="Military Academy">Military Academy</option>
                      <option value="Some military experience">Some military experience</option>
                      <option value="Veteran">Veteran</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-military-700 mb-2">
                    Interested Role/Career Field
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Cybersecurity, Aviation, Intelligence, Engineering"
                    className="input"
                  />
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                  </div>
                )}

                <div className="text-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Connect with a Recruiter'}
                  </button>
                </div>

                <p className="text-sm text-military-500 text-center">
                  By submitting this form, you agree to be contacted by a military recruiter. 
                  Your information will be handled with the utmost confidentiality.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
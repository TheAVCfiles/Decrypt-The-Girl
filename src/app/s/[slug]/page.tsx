'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { validateEmail, validatePhone } from '@/lib/utils'

interface Recruiter {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  branch: string
  rank?: string
  region?: string
  specialties: string[]
  bio?: string
  imageUrl?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  branch: string
  role: string
  experience: string
}

export default function RecruiterPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const response = await fetch(`/api/recruiters/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setRecruiter(data.recruiter)
          // Pre-fill branch if recruiter has one
          if (data.recruiter.branch && data.recruiter.branch !== 'Multi-Service') {
            setFormData(prev => ({ ...prev, branch: data.recruiter.branch }))
          }
        } else {
          setError('Recruiter not found')
        }
      } catch (error) {
        setError('Failed to load recruiter information')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchRecruiter()
    }
  }, [slug])

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

    setFormErrors(newErrors)
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
        body: JSON.stringify({
          ...formData,
          recruiterId: recruiter?.id,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          branch: recruiter?.branch !== 'Multi-Service' ? recruiter?.branch || '' : '',
          role: '',
          experience: '',
        })
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormErrors({ submit: 'There was an error submitting your information. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-military-600">Loading recruiter information...</p>
        </div>
      </div>
    )
  }

  if (error || !recruiter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-military-800 mb-4">Recruiter Not Found</h1>
          <p className="text-military-600 mb-6">{error || 'The recruiter you are looking for could not be found.'}</p>
          <a href="/" className="btn-primary">
            Return to Home
          </a>
        </div>
      </div>
    )
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
              <p className="text-military-600 mb-4">
                Your information has been submitted successfully to {recruiter.firstName} {recruiter.lastName}.
              </p>
              <p className="text-military-600 mb-6">
                They will contact you within 24-48 hours to discuss your {recruiter.branch} career opportunities.
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
    <div className="min-h-screen bg-gradient-to-br from-military-50 to-primary-50">
      {/* Recruiter Header */}
      <section className="bg-gradient-to-r from-military-800 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">
                {recruiter.firstName[0]}{recruiter.lastName[0]}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {recruiter.rank ? `${recruiter.rank} ` : ''}{recruiter.firstName} {recruiter.lastName}
            </h1>
            <p className="text-xl text-military-200 mb-4">{recruiter.branch} Recruiter</p>
            {recruiter.region && (
              <p className="text-military-300 mb-6">{recruiter.region} Region</p>
            )}
            {recruiter.specialties.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {recruiter.specialties.map((specialty, index) => (
                  <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recruiter Information */}
          <div>
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-military-800">About Your Recruiter</h2>
              </div>
              <div className="card-content">
                {recruiter.bio ? (
                  <p className="text-military-600 mb-6">{recruiter.bio}</p>
                ) : (
                  <p className="text-military-600 mb-6">
                    {recruiter.firstName} is a dedicated {recruiter.branch} recruiter committed to helping 
                    candidates find the right military career path and achieve their goals.
                  </p>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-military-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-military-700">{recruiter.email}</span>
                  </div>
                  
                  {recruiter.phone && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-military-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-military-700">{recruiter.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-military-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m-4 0H5a2 2 0 01-2-2V5a2 2 0 012-2h2m2 0h6m-6 0v2a1 1 0 001 1h4a1 1 0 001-1V3m-6 0V1" />
                    </svg>
                    <span className="text-military-700">{recruiter.branch}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-xl font-bold text-military-800">Why Work with {recruiter.firstName}?</h3>
              </div>
              <div className="card-content">
                <ul className="space-y-3 text-military-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized career guidance based on your interests and skills
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Expert knowledge of {recruiter.branch} opportunities and benefits
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Support throughout the entire enlistment process
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Access to exclusive training and career advancement opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-military-800">Get Started Today</h2>
                <p className="text-military-600">Connect directly with {recruiter.firstName} to explore your military career options</p>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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
                        className={`input ${formErrors.firstName ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
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
                        className={`input ${formErrors.lastName ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                        className={`input ${formErrors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
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
                        className={`input ${formErrors.phone ? 'border-red-500' : ''}`}
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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

                  {formErrors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <p className="text-red-600 text-sm">{formErrors.submit}</p>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : `Connect with ${recruiter.firstName}`}
                  </button>

                  <p className="text-sm text-military-500 text-center">
                    By submitting this form, you agree to be contacted by {recruiter.firstName} {recruiter.lastName}. 
                    Your information will be handled with complete confidentiality.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
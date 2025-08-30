'use client'

import { useState, useEffect } from 'react'
import { formatPhone } from '@/lib/utils'

interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  branch?: string
  role?: string
  experience?: string
  status: string
  source: string
  createdAt: string
  recruiter?: {
    firstName: string
    lastName: string
    email: string
    branch: string
  }
}

interface Recruiter {
  id: string
  slug: string
  firstName: string
  lastName: string
  email: string
  branch: string
  isActive: boolean
  leads: Lead[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [recruiters, setRecruiters] = useState<Recruiter[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'leads' | 'recruiters'>('leads')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        await loadData()
      } else {
        setError('Invalid passcode')
      }
    } catch (error) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      // Load leads
      const leadsResponse = await fetch('/api/leads?limit=50')
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json()
        setLeads(leadsData.leads || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new': return 'badge-info'
      case 'contacted': return 'badge-warning'
      case 'qualified': return 'badge-success'
      case 'converted': return 'badge-success'
      default: return 'badge-info'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-military-50 to-primary-50">
        <div className="max-w-md w-full mx-4">
          <div className="card">
            <div className="card-header text-center">
              <h1 className="text-2xl font-bold text-military-800">Admin Dashboard</h1>
              <p className="text-military-600">Enter admin passcode to continue</p>
            </div>
            <div className="card-content">
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label htmlFor="passcode" className="block text-sm font-medium text-military-700 mb-2">
                    Admin Passcode
                  </label>
                  <input
                    type="password"
                    id="passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="input"
                    placeholder="Enter admin passcode"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Access Dashboard'}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-military-50 rounded-md">
                <p className="text-xs text-military-600">
                  <strong>Demo Access:</strong> Use passcode "change-me" (or set ADMIN_PASSCODE environment variable)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-military-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-military-800 mb-2">Admin Dashboard</h1>
          <p className="text-military-600">Manage leads and recruiter information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-military-600">Total Leads</p>
                <p className="text-2xl font-bold text-military-800">{leads.length}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-military-600">New Leads</p>
                <p className="text-2xl font-bold text-military-800">
                  {leads.filter(lead => lead.status === 'new').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-military-600">Contacted</p>
                <p className="text-2xl font-bold text-military-800">
                  {leads.filter(lead => lead.status === 'contacted').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-2 bg-accent-100 rounded-lg">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-military-600">Qualified</p>
                <p className="text-2xl font-bold text-military-800">
                  {leads.filter(lead => lead.status === 'qualified').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="card">
          <div className="card-header">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'leads' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-military-600 hover:text-military-800'
                }`}
              >
                Lead Management
              </button>
              <button
                onClick={() => setActiveTab('recruiters')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'recruiters' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-military-600 hover:text-military-800'
                }`}
              >
                Recruiter Management
              </button>
            </div>
          </div>

          <div className="card-content">
            {activeTab === 'leads' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-military-800">Recent Leads</h3>
                  <button onClick={loadData} className="btn-secondary text-sm">
                    Refresh Data
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-military-600">Loading leads...</p>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-military-600">No leads found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-military-200">
                      <thead className="bg-military-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-military-500 uppercase tracking-wider">
                            Contact
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-military-500 uppercase tracking-wider">
                            Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-military-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-military-500 uppercase tracking-wider">
                            Recruiter
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-military-500 uppercase tracking-wider">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-military-200">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-military-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-military-900">
                                  {lead.firstName} {lead.lastName}
                                </div>
                                <div className="text-sm text-military-500">{lead.email}</div>
                                {lead.phone && (
                                  <div className="text-sm text-military-500">{formatPhone(lead.phone)}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-military-900">
                                {lead.branch && <div>Branch: {lead.branch}</div>}
                                {lead.role && <div>Role: {lead.role}</div>}
                                {lead.experience && <div>Experience: {lead.experience}</div>}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-military-900">
                              {lead.recruiter ? (
                                <div>
                                  <div>{lead.recruiter.firstName} {lead.recruiter.lastName}</div>
                                  <div className="text-military-500">{lead.recruiter.branch}</div>
                                </div>
                              ) : (
                                <span className="text-military-400">Unassigned</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-military-500">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recruiters' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-military-800">Recruiter Management</h3>
                </div>
                <div className="text-center py-8">
                  <p className="text-military-600">Recruiter management features coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
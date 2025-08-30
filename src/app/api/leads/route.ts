import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateEmail, validatePhone } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      firstName,
      lastName,
      email,
      phone,
      branch,
      role,
      experience,
      recruiterId
    } = body

    // Validation
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingLead) {
      return NextResponse.json(
        { error: 'A lead with this email already exists' },
        { status: 409 }
      )
    }

    // Get default recruiter if none specified
    let finalRecruiterId = recruiterId
    if (!finalRecruiterId) {
      const defaultRecruiter = await prisma.recruiter.findUnique({
        where: { slug: process.env.DEFAULT_RECRUITER_SLUG || 'default-recruiter' }
      })
      finalRecruiterId = defaultRecruiter?.id
    }

    // Create the lead
    const lead = await prisma.lead.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        branch: branch?.trim() || null,
        role: role?.trim() || null,
        experience: experience?.trim() || null,
        recruiterId: finalRecruiterId,
        status: 'new',
        source: 'website'
      },
      include: {
        recruiter: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            branch: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Lead created successfully',
      leadId: lead.id
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const branch = searchParams.get('branch')
    
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (branch) where.branch = branch

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: {
          recruiter: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              branch: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.lead.count({ where })
    ])

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
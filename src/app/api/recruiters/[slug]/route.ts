import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const recruiter = await prisma.recruiter.findUnique({
      where: { 
        slug,
        isActive: true 
      },
      include: {
        leads: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            status: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!recruiter) {
      return NextResponse.json(
        { error: 'Recruiter not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ recruiter })

  } catch (error) {
    console.error('Error fetching recruiter:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { passcode } = body

    if (!passcode) {
      return NextResponse.json(
        { error: 'Passcode is required' },
        { status: 400 }
      )
    }

    const adminPasscode = process.env.ADMIN_PASSCODE || 'change-me'
    
    // For demo purposes, we'll do a simple comparison
    // In production, you might want to hash the admin passcode
    const isValid = passcode === adminPasscode

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid passcode' },
        { status: 401 }
      )
    }

    // In a real app, you'd create a JWT token here
    // For simplicity, we'll just return success
    return NextResponse.json({
      message: 'Authentication successful',
      authenticated: true
    })

  } catch (error) {
    console.error('Error during authentication:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
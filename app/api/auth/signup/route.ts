import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/app/lib/db'
import User from '@/app/models/User'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      })

      console.log('User created:', user)

      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 201 }
      )
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { message: 'Failed to create user in database' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
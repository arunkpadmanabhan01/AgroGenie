import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    await connectDB();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        name,
        email,
        // Add a random password for Google users
        password: Math.random().toString(36).slice(-8),
      });
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
} 
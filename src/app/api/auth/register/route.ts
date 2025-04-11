import { NextRequest, NextResponse } from 'next/server';

// Mock database of pending OTP verifications
const pendingVerifications: Record<string, { otp: string, expiresAt: Date }> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body;
    
    // Validate phone number
    if (!phone || !/^\+[0-9]{10,15}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format. Please use format: +1234567890' },
        { status: 400 }
      );
    }
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry for 10 minutes
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Store in our mock database
    pendingVerifications[phone] = { otp, expiresAt };
    
    // In a real app, we would send the OTP via SMS here
    console.log(`[Mock SMS] Your SADAQAPP verification code is: ${otp}`);
    
    // For demo purposes, always return the same OTP for specific test numbers
    if (phone === '+123456789') {
      pendingVerifications[phone] = { otp: '123456', expiresAt };
    } else if (phone === '+987654321') {
      pendingVerifications[phone] = { otp: '654321', expiresAt };
    }
    
    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      // For demo purposes only - in production we would NEVER return the OTP
      demo_otp: pendingVerifications[phone].otp
    }, { status: 200 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
} 
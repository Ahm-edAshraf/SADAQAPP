import { NextRequest, NextResponse } from 'next/server';

// Mock database of pending OTP verifications - in a real app, this would be in a database
// Shared with the registration route through a proper database
const pendingVerifications: Record<string, { otp: string, expiresAt: Date }> = {};

// Mock database of registered users
const users = [
  {
    id: 'user-ben-123',
    phone: '+123456789',
    firstName: 'Ahmed',
    lastName: 'Abdullah',
    role: 'beneficiary',
    verified: true,
    createdAt: '2023-10-15'
  },
  {
    id: 'user-don-456',
    phone: '+987654321',
    firstName: 'Mohammed',
    lastName: 'Khan',
    role: 'donor',
    verified: true,
    createdAt: '2023-09-20'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, otp } = body;
    
    // Validate input
    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }
    
    // For demo purposes, hardcode verification for test accounts
    if ((phone === '+123456789' && otp === '123456') || 
        (phone === '+987654321' && otp === '654321')) {
      // Find the user
      const user = users.find(u => u.phone === phone);
      
      if (user) {
        // Generate a mock JWT token (in a real app, this would be a proper JWT)
        const token = `mock-jwt-token-${phone}-${Date.now()}`;
        
        return NextResponse.json({
          success: true,
          message: 'OTP verified successfully',
          user: {
            id: user.id,
            phone: user.phone,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          },
          token
        }, { status: 200 });
      } else {
        // New user - would go to registration flow
        return NextResponse.json({
          success: true,
          message: 'OTP verified successfully. Please complete registration.',
          isNewUser: true,
          token: `mock-jwt-token-${phone}-${Date.now()}`
        }, { status: 200 });
      }
    }
    
    // Check if there's a pending verification
    const verification = pendingVerifications[phone];
    if (!verification) {
      return NextResponse.json(
        { success: false, message: 'No verification pending for this phone number' },
        { status: 400 }
      );
    }
    
    // Check if OTP is expired
    if (new Date() > verification.expiresAt) {
      delete pendingVerifications[phone];
      return NextResponse.json(
        { success: false, message: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }
    
    // Check if OTP matches
    if (verification.otp !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }
    
    // OTP verified - clear from pending
    delete pendingVerifications[phone];
    
    // Check if user exists in our database
    const user = users.find(u => u.phone === phone);
    
    if (user) {
      // User exists - return user data
      const token = `mock-jwt-token-${phone}-${Date.now()}`;
      
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully',
        user: {
          id: user.id,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        token
      }, { status: 200 });
    } else {
      // New user - would go to registration flow
      return NextResponse.json({
        success: true,
        message: 'OTP verified successfully. Please complete registration.',
        isNewUser: true,
        token: `mock-jwt-token-${phone}-${Date.now()}`
      }, { status: 200 });
    }
    
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during OTP verification' },
      { status: 500 }
    );
  }
} 
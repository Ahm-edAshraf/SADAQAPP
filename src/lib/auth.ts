'use server';

import { cookies } from 'next/headers';
import { User as UserType } from '@/types/user';
import { seedUsers, getDemoVerificationCode, getUserByPhone } from './seed';

// Types
export type UserRole = 'beneficiary' | 'donor' | null;

// Simplified User interface used by the auth system
export interface User {
  id: string;
  phoneNumber: string;
  role: UserRole;
  name?: string;
}

// Helper function to work with cookies
function getCookies() {
  return cookies();
}

// Creates a one-time password for verification
const createOTP = () => {
  // In a real application, this would generate a secure random OTP
  // and store it with the phone number and a timestamp
  return getDemoVerificationCode(); // Use our demo code
};

// Simulate sending an OTP to a phone number
const sendOTP = async (phoneNumber: string): Promise<{ success: boolean, message?: string }> => {
  // In a real application, this would integrate with a SMS/messaging service
  console.log(`Sending OTP to ${phoneNumber}: ${createOTP()}`);
  
  // Mock validation - check phone number format
  if (!phoneNumber.match(/^\+[0-9]{10,15}$/)) {
    return { 
      success: false, 
      message: 'Invalid phone number format. Please use international format (e.g., +12345678901)' 
    };
  }
  
  // Mock success
  return { success: true };
};

// Find a user by phone number
const findUserByPhone = (phoneNumber: string): User | null => {
  const user = getUserByPhone(phoneNumber);
  
  if (!user) return null;
  
  // Convert from the full UserType to the simplified User interface
  return {
    id: user.id,
    phoneNumber: user.phoneNumber,
    role: user.role || null,
    name: user.name
  };
};

// Create a new user
const createUser = (phoneNumber: string, name?: string): User => {
  // In a real app, we would create a user in the database
  // For our demo, we'll just create a temporary user object
  const newId = `temp-${Date.now()}`;
  
  const newUser: User = {
    id: newId,
    phoneNumber,
    role: null,
    name
  };
  
  return newUser;
};

// Set the user's role
export const setUserRole = async (userId: string, role: UserRole): Promise<{ success: boolean, message?: string }> => {
  // In a real app, we would update the database
  // For our demo, we'll just update the cookie
  
  // Set a cookie to remember the user's role
  getCookies().set('userRole', role || '');
  
  return { success: true };
};

// Authentication functions
export const signIn = async (formData: FormData): Promise<{ success: boolean, message?: string, user?: User }> => {
  const phoneNumber = formData.get('phoneNumber') as string;

  if (!phoneNumber) {
    return { success: false, message: 'Phone number is required' };
  }
  
  // Send OTP (this is just a simulation)
  const otpResult = await sendOTP(phoneNumber);
  if (!otpResult.success) {
    return otpResult;
  }
  
  const demoCode = getDemoVerificationCode();
  
  return { 
    success: true, 
    message: `Verification code sent! For testing, use: ${demoCode}`
  };
};

export const verifyLogin = async (formData: FormData): Promise<{ success: boolean, message?: string, user?: User }> => {
  const phoneNumber = formData.get('phoneNumber') as string;
  const otp = formData.get('otp') as string;
  
  if (!phoneNumber || !otp) {
    return { success: false, message: 'Phone number and verification code are required' };
  }
  
  // Verify OTP
  const verifyResult = await verifyOTP(phoneNumber, otp);
  if (!verifyResult.success) {
    return verifyResult;
  }
  
  // Check if user exists
  let user = findUserByPhone(phoneNumber);
  
  // If not, create a new user
  if (!user) {
    user = createUser(phoneNumber);
  }
  
  // Set a session cookie
  getCookies().set('userId', user.id, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  if (user.role) {
    getCookies().set('userRole', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }
  
  return { 
    success: true, 
    message: 'Authentication successful',
    user
  };
};

export const signUp = async (formData: FormData): Promise<{ success: boolean, message?: string }> => {
  const phoneNumber = formData.get('phoneNumber') as string;
  
  if (!phoneNumber) {
    return { success: false, message: 'Phone number is required' };
  }
  
  // Send OTP (this is just a simulation)
  const otpResult = await sendOTP(phoneNumber);
  if (!otpResult.success) {
    return otpResult;
  }
  
  const demoCode = getDemoVerificationCode();
  
  return { 
    success: true, 
    message: `Verification code sent! For testing, use: ${demoCode}`
  };
};

export const verifySignUp = async (formData: FormData): Promise<{ success: boolean, message?: string, user?: User }> => {
  const phoneNumber = formData.get('phoneNumber') as string;
  const otp = formData.get('otp') as string;
  const name = formData.get('name') as string;
  
  if (!phoneNumber || !otp) {
    return { success: false, message: 'Phone number and verification code are required' };
  }
  
  // Verify OTP
  const verifyResult = await verifyOTP(phoneNumber, otp);
  if (!verifyResult.success) {
    return verifyResult;
  }
  
  // Check if user already exists in our seed data
  const existingUser = findUserByPhone(phoneNumber);
  
  // Use existing user if found, otherwise create a new one
  const user = existingUser || createUser(phoneNumber, name);
  
  // Set a session cookie
  getCookies().set('userId', user.id, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  if (user.role) {
    getCookies().set('userRole', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }
  
  return { 
    success: true, 
    message: existingUser ? 'Login successful' : 'Registration successful',
    user
  };
};

export const signOut = async (): Promise<{ success: boolean }> => {
  // Clear cookies
  getCookies().delete('userId');
  getCookies().delete('userRole');
  
  return { success: true };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userId = getCookies().get('userId')?.value;
  
  if (!userId) {
    return null;
  }
  
  // For demo accounts from seed data, find by ID (starts with 'ben-' or 'don-')
  if (userId.startsWith('ben-') || userId.startsWith('don-')) {
    const seedUser = seedUsers.find(user => user.id === userId);
    if (seedUser) {
      return {
        id: seedUser.id,
        phoneNumber: seedUser.phoneNumber,
        role: seedUser.role || null,
        name: seedUser.name
      };
    }
  }
  
  // For temp users created during session, try to reconstruct from cookies
  const phoneNumber = getCookies().get('phoneNumber')?.value;
  const name = getCookies().get('userName')?.value;
  const role = getCookies().get('userRole')?.value as UserRole;
  
  if (phoneNumber) {
    return {
      id: userId,
      phoneNumber,
      role: role || null,
      name: name || undefined
    };
  }
  
  return null;
};

// Verify the provided OTP
const verifyOTP = async (phoneNumber: string, otp: string): Promise<{ success: boolean, message?: string }> => {
  // In a real application, this would check a database or cache for the correct OTP
  // associated with the phone number and ensure it hasn't expired
  
  // For demonstration, we'll accept the demo code
  const demoCode = getDemoVerificationCode();
  
  if (otp !== demoCode) {
    return { 
      success: false, 
      message: `Invalid verification code. For testing, use: ${demoCode}` 
    };
  }
  
  // Mock success
  return { success: true };
}; 
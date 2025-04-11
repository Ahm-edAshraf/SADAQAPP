import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/beneficiary',
  '/donor',
  '/profile',
  '/settings',
];

// Routes that require a specific role
const roleProtectedRoutes = {
  '/beneficiary': 'beneficiary',
  '/donor': 'donor',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the requested path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute) {
    // Get the user ID from cookies
    const userId = request.cookies.get('userId')?.value;
    
    // If no user ID, redirect to login
    if (!userId) {
      const url = new URL('/auth/login', request.url);
      // Store the original URL to redirect back after login
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    
    // Check role-specific routes
    const requiredRole = Object.entries(roleProtectedRoutes).find(
      ([route]) => pathname === route || pathname.startsWith(`${route}/`)
    )?.[1];
    
    if (requiredRole) {
      const userRole = request.cookies.get('userRole')?.value;
      
      // If the user doesn't have the required role, redirect to role selection
      if (userRole !== requiredRole) {
        return NextResponse.redirect(new URL('/auth/role-selection', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all request paths except for:
  // - assets (images, fonts, etc.)
  // - api routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}; 
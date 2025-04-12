import { NextRequest, NextResponse } from 'next/server';

// Define protected route patterns
const beneficiaryRoutes = ['/beneficiary'];
const donorRoutes = ['/donor'];
const authRoutes = ['/auth/login', '/auth/register', '/auth/role-selection'];
const protectedRoutes = ['/profile', '/settings'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get the user ID and role from cookies
  const userId = request.cookies.get('userId')?.value;
  const userRole = request.cookies.get('userRole')?.value;
  
  // Public routes that are always accessible
  const isPublicRoute = 
    pathname === '/' || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('favicon') ||
    pathname.includes('.svg') ||
    pathname.includes('.png') ||
    pathname.includes('.jpg') ||
    pathname.includes('.jpeg') ||
    pathname.startsWith('/help');
    
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Check if the user is trying to access auth routes
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // If user is logged in and tries to access an auth route, redirect to appropriate dashboard
  if (userId && isAuthRoute) {
    // If they have a role, redirect to their role dashboard
    if (userRole === 'beneficiary') {
      return NextResponse.redirect(new URL('/beneficiary', request.url));
    } else if (userRole === 'donor') {
      return NextResponse.redirect(new URL('/donor', request.url));
    } else {
      // If they're logged in but don't have a role, send them to role selection
      if (pathname !== '/auth/role-selection') {
        return NextResponse.redirect(new URL('/auth/role-selection', request.url));
      }
    }
  }
  
  // If user is not logged in and tries to access a protected route, redirect to login
  if (!userId && (protectedRoutes.some(route => pathname.startsWith(route)) ||
                 beneficiaryRoutes.some(route => pathname.startsWith(route)) ||
                 donorRoutes.some(route => pathname.startsWith(route)))) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // Check role-specific access
  if (userId && userRole) {
    // Beneficiary specific routes
    if (beneficiaryRoutes.some(route => pathname.startsWith(route)) && userRole !== 'beneficiary') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Donor specific routes
    if (donorRoutes.some(route => pathname.startsWith(route)) && userRole !== 'donor') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!userId || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login?callbackUrl=/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 
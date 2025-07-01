import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  // Create a response early so we can use it for cookies if needed
  const res = NextResponse.next();

  try {
    // Initialize the Supabase client
    const supabase = await createClient();

    // Get the session - this validates the JWT automatically
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // No valid session/JWT found
    if (!session) {
      // Don't redirect on login/register pages
      if (
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register')
      ) {
        return res;
      }

      // Redirect to login for protected routes
      const redirectUrl = new URL('/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Optional: Add user info to request headers
    if (session.user) {
      res.headers.set('x-user-id', session.user.id);
      res.headers.set('x-user-email', session.user.email || '');
    }

    return res;
  } catch (error) {
    // If anything fails, redirect to login
    console.error('Auth error:', error);
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/protected/:path*',

    // Auth routes (to handle redirects if already logged in)
    '/login',
    '/register',
  ],
};

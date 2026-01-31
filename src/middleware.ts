import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // This matcher protects all routes under /dashboard
  // and skips static files
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

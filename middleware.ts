import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-razzuqrakukytiechpdl-auth-token"); // Replace with your actual token key

  // Redirect to login if no token is found and the user is not on the login page
  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*"], // Protect specific routes
};

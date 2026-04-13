import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/dashboard", "/admin"];

  // Auth routes
  const authRoutes = ["/login", "/register"];

  // Go to protected route without token
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Go to auth route with token
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin", "/login", "/register"],
};
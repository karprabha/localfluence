import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value;

  const isDashboardPath = request.nextUrl.pathname.startsWith("/dashboard");
  const isPublicPath = ["/", "/login", "/signup"].includes(
    request.nextUrl.pathname
  );

  if (isDashboardPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

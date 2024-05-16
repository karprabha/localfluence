"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = true; //temp solution

  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // } else if (["/", "/login", "/signup"].includes(request.nextUrl.pathname)) {
  //   if (token) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }

  return NextResponse.next();
}

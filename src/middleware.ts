import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./_lib/jwt";

export async function middleware(request: NextRequest) {
  const publicPaths = ['/signin', '/signup']

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isTokenValid = !!token ? await verifyJwt(token) : false;


  console.log({
    token,
    isTokenValid,
  })

  if (!isTokenValid && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isTokenValid && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', "/profile"],
};

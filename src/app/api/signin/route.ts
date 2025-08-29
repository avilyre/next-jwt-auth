import { signJwt } from "@/_lib/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await fetch(`http://localhost:8080/users?email=${email}`);
  const userData = (await user.json())[0];

  if (!userData || userData.password !== password) {
    return NextResponse.json({
      message: 'Email or password is incorrect',
    }, {
      status: 401
    })
  }

  const token = await signJwt({ email: userData.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: '/',
    maxAge: 60
  });

  return res;
}
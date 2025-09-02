import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, context: Context) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value;

  const { params } = context;

  if (!token || !params.id) {
    return NextResponse.json({
      message: 'Unauthorized',
    }, {
      status: 401
    })
  }

  const user = await fetch(`http://localhost:8080/users/${params.id}`);
  const userData = await user.json();
  const safeuser = { ...userData };
  delete safeuser.password

  return NextResponse.json({
    user: safeuser,
  });
}
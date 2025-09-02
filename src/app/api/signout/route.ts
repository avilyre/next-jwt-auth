import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({
      message: 'Unauthorized',
    }, {
      status: 401
    })
  }

  cookieStore.delete('token');
  
  return NextResponse.json({
    message: 'Success',
  }, {
    status: 200
  })
}
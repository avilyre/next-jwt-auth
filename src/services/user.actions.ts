'use server'

import { verifyJwt } from "@/_lib/jwt";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }

  const user = await verifyJwt(token);
  return user;
}
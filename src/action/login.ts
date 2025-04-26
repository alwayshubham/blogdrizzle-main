// Example: src/actions/login.ts
"use server";

import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth"; // implement with `jsonwebtoken`


export async function loginUser(email: string, password: string) {
  // 1. Check user credentials (mock example)
  const users = { id: "123", email }; // replace with real check
  const token = verifyJWT(users); // returns a JWT string

  // 2. Set token cookie
  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { success: true };
}

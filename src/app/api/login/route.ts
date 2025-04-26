import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

// export function verifyJWT(token: string) {
//   try {
//     return jwt.verify(token, JWT_SECRET) as { id: string };
//   } catch (err) {
//     console.error("JWT error:", err);
//     return null;
//   }
// };


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user in the database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const userr = user.length > 0 ? user[0] : null;

    if (!userr) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, userr.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      {
        id: userr.id,
        email: userr.email,
        username: userr.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send token in response
    return NextResponse.json(
      {
        message: "Login successful!",
        token,
      },
      { status: 200 }
    );

    // ✅ Optional: Set token as HttpOnly cookie
    // const response = NextResponse.json({ message: "Login successful!" });
    // response.cookies.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    // return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

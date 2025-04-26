import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs"; // Import for password hashing
import { users, posts } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    console.log("Received data:", { username, email, password });

    // Check if email or username already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    const existingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .execute();

    if (existingUser.length > 0) {
      console.log("Email already in use");
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    if (existingUsername.length > 0) {
      console.log("Username already taken");
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    

    // Insert new user into the database
    const insertResult = await db.insert(users).values({
      id: crypto.randomUUID(),
      username,
      email,
      password: hashedPassword,
    }).execute();

    console.log("User registered:", insertResult);

    // Fetch the posts created by the newly registered user (blog dashboard)
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();
    
    const userPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.userId, user[0].id))
      .execute();

    // Return user data along with their posts for the dashboard
    return NextResponse.json({ message: "User registered successfully", user: user[0], posts: userPosts }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
};

"use server";

// import { cookies } from "next/headers";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { verifyJWT } from "@/lib/auth";

// Server-side action function to create a post
export async function createPost(formData: FormData) {
  // const cookieStore = await cookies(); // Await here to get the cookies
  // const token = cookieStore.get("token")?.value; // Now you can access the token

  // // Verify JWT Token
  // const payload = token ? verifyJWT(token) : null;
  // if (!payload || !payload.id) {
  //   throw new Error("User not authenticated");
  // }

  // Extract title and content from formData
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // Insert the post into the database
  await db.insert(posts).values({
    title,
    content,
    // userId: payload.id.toString(),
  });

  revalidatePath("/");  // Revalidate the homepage path to reflect the new post
  redirect("/"); // Redirect user to the homepage after creating the post
}

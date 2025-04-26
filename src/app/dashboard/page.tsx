import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function Home() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 drop-shadow-md">
          📝 My Blog
        </h1>

        <div className="flex justify-end mb-6">
          <Link
            href="/create"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            + Create New Post
          </Link>
        </div>

        <div className="space-y-8">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 p-6"
            >
              <Link href={`/post/${post.id}`}>
                <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-4 text-gray-700">
                {post.content.substring(0, 150)}...
              </p>

              <div className="mt-4 flex gap-4">
                <Link
                  href={`/post/${post.id}`}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Read more
                </Link>
                <Link
                  href={`/edit/${post.id}`}
                  className="text-yellow-600 font-medium hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/delete/${post.id}`}
                  className="text-red-500 font-medium hover:underline"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

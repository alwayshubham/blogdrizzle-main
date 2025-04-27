// import { createPost } from "@/action/createpage";

// export default function Create() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4">
//       <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-all">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 drop-shadow">
//           ✍️ Create New Post
//         </h1>

//         <form action={createPost} className="space-y-6">
//           <div>
//             <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               required
//               placeholder="Enter post title"
//               className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
//               Content
//             </label>
//             <textarea
//               name="content"
//               id="content"
//               required
//               placeholder="Write your thoughts..."
//               rows={6}
//               className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//             ></textarea>
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200"
//             >
//               🚀 Create Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import { db } from "@/db";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreatePage() {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await db.insert(posts).values({ title, content });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form action={createPost}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            required
            name="title"
            id="title"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            className="w-full p-2 border rounded"
            required
            rows={5}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
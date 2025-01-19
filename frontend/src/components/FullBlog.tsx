import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-white to-gray-300">
      <Appbar />
      <div className="flex justify-center py-12">
        <div className="grid grid-cols-12 gap-8 px-6 w-full max-w-screen-xl">
          {/* Blog Content Section */}
          <div className="col-span-12 md:col-span-8 bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              {blog.title}
            </h1>
            <p className="text-gray-500 pt-2 text-sm md:text-base">
              Published on:{" "}
              <span className="font-medium">
                {blog.publishedDate
                  ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </span>
            </p>
            <div className="border-t border-gray-200 my-6"></div>
            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              {blog.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-600">About the Author</h2>
              <div className="flex items-center mt-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                <div className="ml-4">
                  <p className="text-xl font-bold text-gray-800">
                    {blog.author.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Enthusiast writer with a knack for capturing moments and sharing stories.
                  </p>
                </div>
              </div>
              <div className="mt-6 text-gray-700 text-sm leading-relaxed">
                "A good writer is a magician who turns words into images and stories into
                emotions."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

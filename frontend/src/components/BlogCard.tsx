import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${id}`}
      className="block transform hover:scale-[1.02] hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md w-screen max-w-screen-md mx-auto mt-2 mb-6 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          {/* Avatar */}
          <Avatar name={authorName} />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-800">{authorName}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Circle />
              <span className="ml-1">{publishedDate}</span>
            </div>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Blog Content Preview */}
        <p className="text-sm text-gray-600 mb-4">{content.slice(0, 100) + "..."}</p>

        {/* Read Time */}
        <div className="text-xs text-gray-500 font-light">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-2 w-2 rounded-full bg-gray-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const initial = name.trim().charAt(0).toUpperCase(); // Get the first letter of the name

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full ${
        size === "small" ? "w-10 h-10" : "w-14 h-14"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-medium text-gray-700`}
      >
        {initial}
      </span>
    </div>
  );
}


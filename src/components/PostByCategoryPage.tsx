import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByCategoryApi } from "../service/TaungooService";

export default function PostByCategoryPage() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      if (!categoryName) return;

      try {
        setLoading(true);
        const postsData = await getPostByCategoryApi(categoryName);
        setPosts(postsData);
      } catch (err) {
        setError("Failed to fetch posts for this category");
        console.error("Error fetching posts by category:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCategory();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-bars loading-xl text-purple-500"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {" "}
      {/* Account for fixed navbar */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Posts in {categoryName}
        </h1>
        <p className="text-gray-600 mb-8">
          {posts.length} post{posts.length !== 1 ? "s" : ""} found in this
          category
        </p>

        {posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">
              No posts found in this category
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <article
                key={post.postId}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-transparent hover:ring-2 hover:ring-blue-400/50"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {post.imageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${post.imageBase64}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xl tracking-wider">
                        Taungoo
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category || categoryName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {post.username?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="text-sm text-gray-700 ml-2 font-medium">
                        {post.username || "Unknown"}
                      </span>
                    </div>
                    <Link
                      to={`/posts/${post.postId}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-300"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostByIdApi, deletePostApi } from "../service/TaungooService";
import type { PostDto } from "../dto/PostDto";
import { toast } from "react-toastify";
import { CgMoreVerticalAlt } from "react-icons/cg";
import { PiPencil } from "react-icons/pi";
import { BiTrash } from "react-icons/bi";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const token = localStorage.getItem("token");
  const loggedIn = !!token;

  useEffect(() => {
    if (!id) return;

    getPostByIdApi(Number(id))
      .then((res) => setPost(res))
      .catch(() => toast.error("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePostApi(post.postId);
      toast.success("Post deleted successfully!");
      navigate("/posts");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl text-purple-500"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <span className="text-red-500 text-lg">Post not found</span>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 relative">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-md relative">
        {loggedIn && (
          <div className="absolute top-4 right-4">
            <button
              className="px-2 py-1 rounded-full hover:bg-gray-200"
              onClick={() => setShowOptions(!showOptions)}
            >
              <CgMoreVerticalAlt size={24} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-2xl shadow-lg z-10">
                <button
                  onClick={() => navigate(`/posts/edit/${post.postId}`)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-2xl"
                >
                  <PiPencil size={20} className="inline-block mr-1" /> Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-2xl"
                >
                  <BiTrash size={20} className="inline-block mr-1" /> Delete
                  Post
                </button>
              </div>
            )}
          </div>
        )}

        {post.featured && (
          <span className="inline-block bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold mb-4">
            Featured
          </span>
        )}

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between mb-6 text-gray-500 text-sm">
          <span>By {post.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {post.imageBase64 && (
          <img
            src={`data:image/jpeg;base64,${post.imageBase64}`}
            alt={post.title}
            className="w-full h-screen object-cover rounded-lg mb-6"
          />
        )}

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        <div className="mt-6">
          <Link
            to="/posts"
            className="inline-block text-blue-600 hover:underline"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

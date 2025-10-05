"use client";
import { useEffect, useState } from "react";
import {
  createPostApi,
  updatePostApi,
  getCategoriesApi,
  getPostByIdApi,
} from "../service/TaungooService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function CreatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { id: number; categoryName: string }[]
  >([]);

  // 🔹 Load username and token
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (savedUsername) setUsername(savedUsername);

    // Check if user is authenticated
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
  }, [navigate]);

  // 🔹 Fetch categories
  useEffect(() => {
    getCategoriesApi()
      .then((res) => setCategories(res))
      .catch((err) => {
        console.error("Categories error:", err);
        toast.error("Failed to load categories");
      });
  }, []);

  // 🔹 If editing, load post details
  useEffect(() => {
    if (id) {
      getPostByIdApi(Number(id))
        .then((res) => {
          setTitle(res.title);
          setContent(res.content);
          setCategoryName(res.category);
          setFeatured(res.featured);
          if (res.imageBase64) {
            setPreview(`data:image/jpeg;base64,${res.imageBase64}`);
          }
        })
        .catch((err) => {
          console.error("Load post error:", err);
          toast.error("Failed to load post data");
        });
    }
  }, [id]);

  // 🔹 Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Handle create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !categoryName.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("featured", String(featured));
    formData.append("categoryName", categoryName.trim());
    formData.append("username", username);

    if (image) {
      formData.append("image", image);
    }

    // For debugging - log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      setLoading(true);
      let response: string;

      if (id) {
        response = await updatePostApi(Number(id), formData);
        toast.success(response || "Post updated successfully!");
      } else {
        response = await createPostApi(formData);
        toast.success(response || "Post created successfully!");
      }

      // Redirect after short delay
      setTimeout(() => {
        navigate("/posts");
      }, 1000);
    } catch (err: any) {
      console.error("Submit error:", err);

      // More detailed error handling
      if (err.response) {
        // Server responded with error status
        toast.error(err.response.data || `Error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        toast.error("Network error - please check your connection");
      } else {
        // Other errors
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mt-6">
        <h1 className="text-xl font-semibold mb-4">
          {id ? "Edit Post" : "Create Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 mb-2">Content *</label>
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 h-40 resize-none focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>

          {/* Category dropdown */}
          <div>
            <label className="block text-gray-700 mb-2">Category *</label>
            <select
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
              className="h-4 w-4 text-sky-600"
            />
            <label htmlFor="featured" className="text-gray-700">
              Mark as featured post
            </label>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-gray-700 mb-2">
              {id ? "Change image (optional)" : "Upload image (optional)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-xl p-2"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-w-xs rounded-xl shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium ${
              loading
                ? "bg-sky-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            } transition`}
          >
            {loading
              ? id
                ? "Updating..."
                : "Posting..."
              : id
              ? "Update Post"
              : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

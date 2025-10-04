"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategoriesApi } from "../service/TaungooService";
import type { CategoryDto } from "../dto/CategoryDto";
import { isLoggedIn, logoutApi } from "../service/AuthService";
import {
  FaChevronDown,
  FaUser,
  FaPlus,
  FaSignOutAlt,
  FaTags,
} from "react-icons/fa";

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      setLoggedIn(isLoggedIn());
    };

    checkAuthStatus();
    const handleStorageChange = () => checkAuthStatus();

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logoutApi();
    setLoggedIn(false);
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoryData = await getCategoriesApi();
        setCategories(categoryData);
        setError(null);
      } catch (error) {
        console.error("Error fetching categories", error);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsCategoryOpen(false);
      setIsUserDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleUserDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleDropdownItemClick = (action: string) => {
    setIsUserDropdownOpen(false);
    switch (action) {
      case "logout":
        handleLogout();
        break;
      case "post":
        navigate("/create-post");
        break;
      case "category":
        navigate("/manage-category");
        break;
      case "profile":
        navigate("/profile");
        break;
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 fixed top-0 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Taungoo
            </span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
            >
              Posts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={handleCategoryClick}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
              >
                Categories
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {isCategoryOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl z-50 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {loading ? (
                    <div className="px-4 py-3 text-gray-500 flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                      <span>Loading categories...</span>
                    </div>
                  ) : error ? (
                    <div className="px-4 py-3 text-red-500 text-sm">
                      {error}
                    </div>
                  ) : categories && categories.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/categories-posts/${cat.categoryName}`}
                          className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-300 border-b border-gray-100 last:border-b-0"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                            <span>{cat.categoryName}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No categories available
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4 user-dropdown">
            {loggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Create Post Button */}
                <Link
                  to="/create-post"
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaPlus size={14} />
                  <span>Create Post</span>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={handleUserDropdownClick}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100/50 transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      <FaUser size={12} />
                    </div>
                    <FaChevronDown
                      size={12}
                      className={`text-gray-600 transition-transform duration-300 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <p className="text-sm font-semibold text-gray-900">
                          Welcome back!
                        </p>
                        <p className="text-xs text-gray-500">
                          Manage your account
                        </p>
                      </div>

                      <div className="py-2">
                        <button
                          onClick={() => handleDropdownItemClick("profile")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-300"
                        >
                          <FaUser size={14} className="text-gray-400" />
                          <span>Profile</span>
                        </button>

                        <button
                          onClick={() => handleDropdownItemClick("post")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-300 sm:hidden"
                        >
                          <FaPlus size={14} className="text-gray-400" />
                          <span>Create Post</span>
                        </button>

                        <button
                          onClick={() => handleDropdownItemClick("category")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-300"
                        >
                          <FaTags size={14} className="text-gray-400" />
                          <span>Manage Categories</span>
                        </button>
                      </div>

                      <div className="border-t border-gray-200/50 pt-2">
                        <button
                          onClick={() => handleDropdownItemClick("logout")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-colors duration-300"
                        >
                          <FaSignOutAlt size={14} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

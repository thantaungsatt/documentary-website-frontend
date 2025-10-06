import React, { useState, useEffect } from "react";
import type { CategoryDto } from "../dto/CategoryDto";
import {
  createCategoriesApi,
  getCategoriesApi,
  updateCategoryApi,
} from "../service/TaungooService";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    categoryName: string;
    description: string;
  }>({
    categoryName: "",
    description: "",
  });
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await getCategoriesApi();
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      if (editingCategory && editingCategory.id) {
        // Update existing category - send formData directly
        await updateCategoryApi(editingCategory.id, formData);
        setSuccess("Category updated successfully!");
      } else {
        // Create new category
        await createCategoriesApi(formData);
        setSuccess("Category created successfully!");
      }

      // Reset form and refresh categories
      setFormData({ categoryName: "", description: "" });
      setEditingCategory(null);
      await fetchCategories();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Operation failed";
      setError(
        editingCategory
          ? `Failed to update category: ${errorMessage}`
          : `Failed to create category: ${errorMessage}`
      );
      console.error("Error saving category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category: CategoryDto) => {
    setEditingCategory(category);
    setFormData({
      categoryName: category.categoryName || "",
      description: category.description || "",
    });
    setError(null);
    setSuccess(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setFormData({ categoryName: "", description: "" });
    setError(null);
    setSuccess(null);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {editingCategory ? "Edit Category" : "Create Category"}
        </h1>
        <p className="text-gray-600 mb-8">
          {editingCategory
            ? "Update the category details below"
            : "Add a new category to organize your posts"}
        </p>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-green-600 text-sm">{success}</div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-600 text-sm">{error}</div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </div>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  onFocus={clearMessages}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={clearMessages}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter category description (optional)"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.categoryName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

                {editingCategory && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column - Categories List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                All Categories ({categories.length})
              </h2>
              <button
                onClick={fetchCategories}
                disabled={loading}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">Loading categories...</div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No categories found. Create your first category!
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {category.categoryName}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleEdit(category)}
                      className="ml-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

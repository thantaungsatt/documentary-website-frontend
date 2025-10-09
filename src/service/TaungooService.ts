import axios from "axios";
import type { CategoryDto } from "../dto/CategoryDto";

const BACKEND_URL = "http://localhost:8080/taungoo";

export const getCategoriesApi = async (): Promise<CategoryDto[]> => {
  const response = await axios.get<CategoryDto[]>(
    `${BACKEND_URL}/list/categories`
  );
  return response.data;
};

export const createCategoriesApi = async (categoryDto: {
  categoryName: string;
  description: string;
}) => {
  const response = await axios.post(
    `${BACKEND_URL}/create-category`,
    categoryDto
  );
  return response.data;
};

export const updateCategoryApi = async (
  id: number,
  categoryDto: { categoryName: string; description: string }
) => {
  const response = await axios.put(
    `${BACKEND_URL}/update-category/${id}`,
    categoryDto
  );
  return response.data;
};

export const getPostByIdApi = async (id: number) => {
  const response = await axios.get(`${BACKEND_URL}/list/posts/${id}`);
  return response.data;
};

export const createPostApi = async (
  postFormData: FormData
): Promise<string> => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BACKEND_URL}/create-post`,
    postFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updatePostApi = async (
  id: number,
  data: FormData
): Promise<string> => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${BACKEND_URL}/update-post/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePostApi = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.delete(`${BACKEND_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllPostsApi = async () => {
  const response = await axios.get(`${BACKEND_URL}/list/all-posts`);
  return response.data;
};

export const getPostByCategoryApi = async (categoryName: string) => {
  const response = await axios.get(
    `${BACKEND_URL}/list/all-posts/${categoryName}`
  );
  return response.data;
};

export const getRecentPostApi = async () => {
  const response = await axios.get(`${BACKEND_URL}/list/recent-posts`);
  return response.data;
};

export const getFeaturedPostApi = async () => {
  const response = await axios.get(`${BACKEND_URL}/list/featured-posts`);
  return response.data;
};

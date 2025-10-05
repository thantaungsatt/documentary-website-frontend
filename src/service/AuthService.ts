import axios from "axios";
import type { LoginDto } from "../dto/LoginDto";

const AUTH_BACKEND_URL = "http://localhost:8080/auth";

// Axios interceptor to add auth header to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors

export const loginApi = async (login: LoginDto): Promise<string> => {
  const response = await axios.post(`${AUTH_BACKEND_URL}/login`, login, {
    headers: {
      Authorization: `Basic ${btoa(`${login.username}:${login.password}`)}`,
    },
  });
  return response.data;
};

export const logoutApi = () => {
  localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export function isLoggedIn(): boolean {
  return !!getToken();
}

// (Duplicate interceptors removed)

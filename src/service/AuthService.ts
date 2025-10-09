import axios from "axios";
import type { LoginDto } from "../dto/LoginDto";
import type { LoginResponse } from "../dto/LoginResponse";

const AUTH_BACKEND_URL = "http://localhost:8080/auth";

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

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const loginApi = async (login: LoginDto): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${AUTH_BACKEND_URL}/login`,
    login,
    {
      headers: {
        Authorization: `Basic ${btoa(`${login.username}:${login.password}`)}`,
      },
    }
  );

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
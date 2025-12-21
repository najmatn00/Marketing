import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api/v1",
  withCredentials: true,
});

// Optional: Add request/response interceptors for auth, error handling, etc.

export default api;


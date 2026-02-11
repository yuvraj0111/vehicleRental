import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {
  api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Do NOT attach token to auth endpoints
  if (token && !config.url.includes("/api/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


  return config;
});

export default api;

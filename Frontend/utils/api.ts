// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // this is an environment variable that stores the base URL of your backend api
// });

// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// export default api;
// src/utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5255/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && cfg.headers) cfg.headers["Authorization"] = `Bearer ${token}`;
  } catch (e) {}
  return cfg;
});

export default api;

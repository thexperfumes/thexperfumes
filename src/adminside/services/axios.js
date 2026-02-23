// // src/admin/services/adminApi.js
// import axios from "axios";

// const adminApi = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// // Add token to headers
// adminApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("admin_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle 401 errors globally
// adminApi.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       // Clear storage and redirect
//       localStorage.removeItem("admin_token");
//       localStorage.removeItem("admin");
//       window.location.href = "/admin/login";
//     }
//     return Promise.reject(err);
//   }
// );

// export default adminApi;

import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach token to all requests except login
adminApi.interceptors.request.use((config) => {
  if (!config.url.includes("admin/login")) {
    const token = localStorage.getItem("admin_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 handler
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && !err.config.url.includes("admin/login")) {
      // Clear storage and redirect
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");
      alert("after some time try again.");
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export default adminApi;
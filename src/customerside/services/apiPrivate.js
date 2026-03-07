import axios from "axios";

const apiPrivate = axios.create({
   baseURL: "https://backend-sxms.onrender.com/api/",
});

apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiPrivate;

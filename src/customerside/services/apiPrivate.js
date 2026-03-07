import axios from "axios";
import baseAxios from "@shared/services/baseAxios";
// const apiPrivate = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

const apiPrivate =baseAxios.create();
apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiPrivate;

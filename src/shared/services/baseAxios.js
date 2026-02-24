import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://backend-sxms.onrender.com/api/",
   withCredentials: true, 
  timeout: 10000,
});

export default baseAxios;

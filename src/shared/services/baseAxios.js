import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8000/api/",
   withCredentials: true, 
  timeout: 10000,
});

export default baseAxios;

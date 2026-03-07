import axios from "axios";

const apiPublic = axios.create({
   baseURL: "https://backend-sxms.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});baseAxios.create();


export default apiPublic;

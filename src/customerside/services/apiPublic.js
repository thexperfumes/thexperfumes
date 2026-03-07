import axios from "axios";

const apiPublic = axios.create({
   baseURL: "https://backend-sxms.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiPublic;

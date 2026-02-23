// import baseAxios from "@shared/services/baseAxios";

// const customerApi = baseAxios.create(); // 🔑 IMPORTANT

// customerApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// customerApi.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("access");
//       localStorage.removeItem("user");

//       // 🔥 DO NOT redirect here
//       window.dispatchEvent(new Event("authChanged"));
//     }

//     return Promise.reject(err);
//   }
// );

// export default customerApi;



import baseAxios from "@shared/services/baseAxios";

const customerApi = baseAxios.create();

customerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

customerApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // 🔥 Clear only auth data
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      // 🔥 Notify app (NO redirect here)
      window.dispatchEvent(new Event("authChanged"));
    }

    return Promise.reject(err);
  }
);

export default customerApi;

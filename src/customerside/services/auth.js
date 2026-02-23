// // // // // // // import apiPublic from "./apiPublic";

// // // // // // // /* LOGIN */
// // // // // // // export const loginUser = async (data) => {
// // // // // // //   const res = await apiPublic.post("auth/login/", data);

// // // // // // //   localStorage.setItem("access", res.data.access);
// // // // // // //   localStorage.setItem("refresh", res.data.refresh);
// // // // // // //   localStorage.setItem("user", JSON.stringify(res.data.user)); // ⭐ VERY IMPORTANT

// // // // // // //   return res.data;
// // // // // // // };

// // // // // // // /* LOGOUT */
// // // // // // // export const logoutUser = () => {
// // // // // // //   localStorage.removeItem("access");
// // // // // // //   localStorage.removeItem("refresh");
// // // // // // //   localStorage.removeItem("user");
// // // // // // // };

// // // // // // // /* AUTH CHECK */
// // // // // // // export const isAuthenticated = () => {
// // // // // // //   return !!localStorage.getItem("access");
// // // // // // // };

// // // // // // // /* CURRENT USER */
// // // // // // // export const getCurrentUser = () => {
// // // // // // //   const user = localStorage.getItem("user");
// // // // // // //   return user ? JSON.parse(user) : null;
// // // // // // // };
// // // // // // import apiPublic from "./apiPublic";

// // // // // // /* ================= LOGIN ================= */
// // // // // // export const loginUser = async (data) => {
// // // // // //   const res = await apiPublic.post("auth/login/", data);

// // // // // //   localStorage.setItem("access", res.data.access);
// // // // // //   localStorage.setItem("refresh", res.data.refresh);
// // // // // //   localStorage.setItem("user", JSON.stringify(res.data.user));

// // // // // //   // 🔔 notify app
// // // // // //   window.dispatchEvent(new Event("authChanged"));

// // // // // //   return res.data;
// // // // // // };

// // // // // // /* ================= LOGOUT ================= */
// // // // // // export const logoutUser = () => {
// // // // // //   localStorage.removeItem("access");
// // // // // //   localStorage.removeItem("refresh");
// // // // // //   localStorage.removeItem("user");

// // // // // //   window.dispatchEvent(new Event("authChanged"));
// // // // // // };

// // // // // // /* ================= AUTH CHECK ================= */
// // // // // // export const isAuthenticated = () => {
// // // // // //   return !!localStorage.getItem("access");
// // // // // // };

// // // // // // /* ================= CURRENT USER ================= */
// // // // // // export const getCurrentUser = () => {
// // // // // //   const user = localStorage.getItem("user");
// // // // // //   return user ? JSON.parse(user) : null;
// // // // // // };

// // // // // import apiPublic from "./apiPublic";

// // // // // /* LOGIN */
// // // // // export const loginUser = async (data) => {
// // // // //   const res = await apiPublic.post("auth/login/", data);

// // // // //   localStorage.setItem("access", res.data.access);
// // // // //   localStorage.setItem("refresh", res.data.refresh);
// // // // //   localStorage.setItem("user", JSON.stringify(res.data.user));

// // // // //   window.dispatchEvent(new Event("authChanged"));
// // // // //   return res.data;
// // // // // };

// // // // // /* LOGOUT */
// // // // // export const logoutUser = () => {
// // // // //   localStorage.removeItem("access");
// // // // //   localStorage.removeItem("refresh");
// // // // //   localStorage.removeItem("user");

// // // // //   window.dispatchEvent(new Event("authChanged"));
// // // // // };

// // // // // /* AUTH CHECK */
// // // // // export const isAuthenticated = () => {
// // // // //   return !!localStorage.getItem("access");
// // // // // };

// // // // // /* CURRENT USER */
// // // // // export const getCurrentUser = () => {
// // // // //   const user = localStorage.getItem("user");
// // // // //   return user ? JSON.parse(user) : null;
// // // // // };
// // // // import apiPublic from "./apiPublic";

// // // // /* ================= LOGIN ================= */
// // // // export const loginUser = async (data) => {
// // // //   try {
// // // //     const res = await apiPublic.post("auth/login/", data);

// // // //     if (res.data?.access && res.data?.user) {
// // // //       localStorage.setItem("access", res.data.access);
// // // //       localStorage.setItem("refresh", res.data.refresh);
// // // //       localStorage.setItem("user", JSON.stringify(res.data.user));

// // // //       // notify the app
// // // //       window.dispatchEvent(new Event("authChanged"));

// // // //       return res.data.user; // return user for further use
// // // //     } else {
// // // //       throw new Error("Invalid login response");
// // // //     }
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     throw err;
// // // //   }
// // // // };

// // // // /* ================= LOGOUT ================= */
// // // // export const logoutUser = () => {
// // // //   localStorage.removeItem("access");
// // // //   localStorage.removeItem("refresh");
// // // //   localStorage.removeItem("user");
// // // //   window.dispatchEvent(new Event("authChanged"));
// // // // };

// // // // /* ================= AUTH CHECK ================= */
// // // // export const isAuthenticated = () => !!localStorage.getItem("access");

// // // // /* ================= CURRENT USER ================= */
// // // // export const getCurrentUser = () => {
// // // //   const user = localStorage.getItem("user");
// // // //   return user ? JSON.parse(user) : null;
// // // // };
// // // import apiPublic from "./apiPublic";

// // // export const loginUser = async (data) => {
// // //   try {
// // //     const res = await apiPublic.post("auth/login/", data);

// // //     if (res.data?.access && res.data?.user) {
// // //       localStorage.setItem("access", res.data.access);
// // //       localStorage.setItem("refresh", res.data.refresh);
// // //       localStorage.setItem("user", JSON.stringify(res.data.user));

// // //       // 🔔 notify app for Navbar
// // //       window.dispatchEvent(new Event("authChanged"));

// // //       return res.data.user;
// // //     } else {
// // //       throw new Error("Invalid login response");
// // //     }
// // //   } catch (err) {
// // //     throw err;
// // //   }
// // // };

// // // export const logoutUser = () => {
// // //   localStorage.clear(); // ⚠ clears ALL keys
// // //   window.dispatchEvent(new Event("authChanged"));
// // // };


// // // export const isAuthenticated = () => !!localStorage.getItem("access");

// // // export const getCurrentUser = () => {
// // //   const user = localStorage.getItem("user");
// // //   return user ? JSON.parse(user) : null;
// // // };
// // // import apiPublic from "./apiPublic";

// // // /* ================= LOGIN ================= */
// // // export const loginUser = async (data) => {
// // //   try {
// // //     const res = await apiPublic.post("auth/login/", data);

// // //     if (res.data?.access && res.data?.user) {
// // //       const user = res.data.user;

// // //       // ✅ Merge anonymous cart with user cart
// // //       const anonCart = JSON.parse(localStorage.getItem("cart")) || [];
// // //       const userCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

// // //       // Simple merge: add all items (you can customize to sum quantity if same product)
// // //       const mergedCart = [...userCart, ...anonCart];

// // //       // Save merged cart for this user
// // //       localStorage.setItem(`cart_${user.id}`, JSON.stringify(mergedCart));
// // //       localStorage.removeItem("cart"); // remove anonymous cart

// // //       // Save auth tokens
// // //       localStorage.setItem("access", res.data.access);
// // //       localStorage.setItem("refresh", res.data.refresh);
// // //       localStorage.setItem("user", JSON.stringify(user));

// // //       // notify app (Navbar, etc.)
// // //       window.dispatchEvent(new Event("authChanged"));

// // //       return user;
// // //     } else {
// // //       throw new Error("Invalid login response");
// // //     }
// // //   } catch (err) {
// // //     throw err;
// // //   }
// // // };

// // // /* ================= LOGOUT ================= */
// // // export const logoutUser = () => {
// // //   const user = getCurrentUser();
// // //   if (user) {
// // //     // Optionally, keep cart in localStorage for this user
// // //     const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
// // //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
// // //   }

// // //   // Remove auth data
// // //   localStorage.removeItem("access");
// // //   localStorage.removeItem("refresh");
// // //   localStorage.removeItem("user");

// // //   window.dispatchEvent(new Event("authChanged"));
// // // };

// // // /* ================= AUTH CHECK ================= */
// // // export const isAuthenticated = () => !!localStorage.getItem("access");

// // // /* ================= CURRENT USER ================= */
// // // export const getCurrentUser = () => {
// // //   const user = localStorage.getItem("user");
// // //   return user ? JSON.parse(user) : null;
// // // };

// // // /* ================= GET CURRENT CART ================= */
// // // export const getCurrentCart = () => {
// // //   const user = getCurrentUser();
// // //   if (user) {
// // //     return JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
// // //   }
// // //   return JSON.parse(localStorage.getItem("cart")) || [];
// // // };

// // // /* ================= SAVE CURRENT CART ================= */
// // // export const saveCart = (cart) => {
// // //   const user = getCurrentUser();
// // //   if (user) {
// // //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
// // //   } else {
// // //     localStorage.setItem("cart", JSON.stringify(cart));
// // //   }
// // // };


// // import apiPublic from "./apiPublic";

// // /* ================= LOGIN ================= */
// // export const loginUser = async (data) => {
// //   try {
// //     const res = await apiPublic.post("auth/login/", data);

// //     if (res.data?.access && res.data?.user) {
// //       const user = res.data.user;

// //       // 🔹 Load anonymous cart (if any)
// //       const anonCart = JSON.parse(localStorage.getItem("cart")) || [];
// //       // 🔹 Load saved user cart
// //       const userCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

// //       // 🔹 Merge carts (simple merge; you can later sum quantities if needed)
// //       const mergedCart = [...userCart, ...anonCart];

// //       // 🔹 Save merged cart for user
// //       localStorage.setItem(`cart_${user.id}`, JSON.stringify(mergedCart));
// //       // 🔹 Save merged cart in session cart so app can use it immediately
// //       localStorage.setItem("cart", JSON.stringify(mergedCart));
// //       // 🔹 Remove anonymous cart key (optional)
// //       // localStorage.removeItem("cart"); // Already overwritten above

// //       // 🔹 Save auth tokens
// //       localStorage.setItem("access", res.data.access);
// //       localStorage.setItem("refresh", res.data.refresh);
// //       localStorage.setItem("user", JSON.stringify(user));

// //       // 🔹 Notify app for updates (Navbar, cart badge, etc.)
// //       window.dispatchEvent(new Event("authChanged"));

// //       return user;
// //     } else {
// //       throw new Error("Invalid login response");
// //     }
// //   } catch (err) {
// //     throw err;
// //   }
// // };

// // /* ================= LOGOUT ================= */
// // export const logoutUser = () => {
// //   const user = getCurrentUser();
// //   if (user) {
// //     // 🔹 Save current session cart to user-specific cart
// //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
// //   }

// //   // 🔹 Remove auth data
// //   localStorage.removeItem("access");
// //   localStorage.removeItem("refresh");
// //   localStorage.removeItem("user");
// //   // 🔹 Remove session cart (anonymous cart remains for next guest)
// //   localStorage.removeItem("cart");

// //   // 🔹 Notify app
// //   window.dispatchEvent(new Event("authChanged"));
// // };

// // /* ================= AUTH CHECK ================= */
// // export const isAuthenticated = () => !!localStorage.getItem("access");

// // /* ================= CURRENT USER ================= */
// // export const getCurrentUser = () => {
// //   const user = localStorage.getItem("user");
// //   return user ? JSON.parse(user) : null;
// // };

// // /* ================= GET CURRENT CART ================= */
// // export const getCurrentCart = () => {
// //   const user = getCurrentUser();
// //   if (user) {
// //     return JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
// //   }
// //   return JSON.parse(localStorage.getItem("cart")) || [];
// // };

// // /* ================= SAVE CURRENT CART ================= */
// // export const saveCart = (cart) => {
// //   const user = getCurrentUser();
// //   if (user) {
// //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
// //   }
// //   // Always update session cart for app
// //   localStorage.setItem("cart", JSON.stringify(cart));
// // };
// // import apiPublic from "./apiPublic";

// // /* ================= LOGIN ================= */
// // import { mergeAnonCart } from "./cart";

// // export const loginUser = async (data) => {
// //   const res = await apiPublic.post("auth/login/", data);
// //   const user = res.data.user;

// //   localStorage.setItem("access", res.data.access);
// //   localStorage.setItem("refresh", res.data.refresh);
// //   localStorage.setItem("user", JSON.stringify(user));

// //   // Merge any anonymous cart
// //   mergeAnonCart();

// //   window.dispatchEvent(new Event("authChanged"));
// //   return user;
// // };

// // /* ================= LOGOUT ================= */
// // export const logoutUser = () => {
// //   const user = getCurrentUser();
// //   if (user) {
// //     // 🔹 Save session cart to user-specific cart
// //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
// //     localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
// //   }

// //   // 🔹 Remove auth data
// //   localStorage.removeItem("access");
// //   localStorage.removeItem("refresh");
// //   localStorage.removeItem("user");

// //   // 🔹 Clear session cart (anonymous cart remains for next guest)
// //   localStorage.removeItem("cart");

// //   window.dispatchEvent(new Event("authChanged"));
// // };

// // /* ================= AUTH CHECK ================= */
// // export const isAuthenticated = () => !!localStorage.getItem("access");

// // /* ================= CURRENT USER ================= */
// // export const getCurrentUser = () => {
// //   const user = localStorage.getItem("user");
// //   return user ? JSON.parse(user) : null;
// // };


// import apiPublic from "./apiPublic";

// /* ================= LOGIN ================= */
// export const loginUser = async (data) => {
//   const res = await apiPublic.post("auth/login/", data);

//   const { access, refresh, user } = res.data;

//   if (!access) {
//     throw new Error("Login failed: No access token received");
//   }

//   // Save tokens
//   localStorage.setItem("access", access);
//   localStorage.setItem("refresh", refresh);

//   // If backend sends user
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(user));
//   } else {
//     // Fallback: create minimal user object
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         id: Date.now(), // temporary fallback
//         email: data.email,
//       })
//     );
//   }

//   window.dispatchEvent(new Event("authChanged"));

//   return getCurrentUser();
// };

// /* ================= LOGOUT ================= */
// export const logoutUser = () => {
//   localStorage.removeItem("access");
//   localStorage.removeItem("refresh");
//   localStorage.removeItem("user");

//   window.dispatchEvent(new Event("authChanged"));
// };

// /* ================= AUTH CHECK ================= */
// export const isAuthenticated = () =>
//   !!localStorage.getItem("access");

// /* ================= CURRENT USER ================= */
// export const getCurrentUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };


// import apiPublic from "./apiPublic";

// /* ================= LOGIN ================= */
// export const loginUser = async (data) => {
//   const res = await apiPublic.post("auth/login/", data);

//   const { access, refresh, user } = res.data;

//   if (!access || !user) {
//     throw new Error("Invalid login response from server");
//   }

//   // Save tokens
//   localStorage.setItem("access", access);
//   localStorage.setItem("refresh", refresh);

//   // Save real backend user
//   localStorage.setItem("user", JSON.stringify(user));

//   return user;
// };

// /* ================= LOGOUT ================= */
// export const logoutUser = () => {
//   localStorage.clear();
// };

// /* ================= AUTH CHECK ================= */
// export const isAuthenticated = () => {
//   return !!localStorage.getItem("access");
// };

// /* ================= CURRENT USER ================= */
// export const getCurrentUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };



import apiPublic from "./apiPublic";

/* ================= LOGIN ================= */
export const loginUser = async (data) => {
  const res = await apiPublic.post("auth/login/", data);

  const { access, refresh, user } = res.data;

  if (!access || !user) {
    throw new Error("Invalid login response from server");
  }

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  // 🔥 Notify app
  window.dispatchEvent(new Event("authChanged"));

  return user;
};

/* ================= LOGOUT ================= */
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChanged"));
};

/* ================= AUTH CHECK ================= */
export const isAuthenticated = () => {
  return !!localStorage.getItem("access");
};

/* ================= CURRENT USER ================= */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

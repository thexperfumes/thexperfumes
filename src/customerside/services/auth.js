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

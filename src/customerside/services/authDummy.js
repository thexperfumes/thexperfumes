// // =====================
// // Dummy Auth Service
// // =====================

// // Register a user (frontend only)
// export const registerUser = (data) => {
//   let users = JSON.parse(localStorage.getItem("users")) || [];

//   // Check if email already exists
//   const exists = users.find((u) => u.email === data.email);
//   if (exists) return { success: false, message: "Email already registered" };

//   // Save new user
//   users.push(data);
//   localStorage.setItem("users", JSON.stringify(users));
//   return { success: true, message: "Registration successful!" };
// };

// // Login user
// export const loginUser = (data) => {
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   // Check email + password
//   const user = users.find(
//     (u) => u.email === data.email && u.password === data.password
//   );

//   if (user) {
//     // Save dummy session
//     localStorage.setItem("currentUser", JSON.stringify(user));
//     return { success: true, user };
//   } else {
//     return { success: false, message: "Invalid email or password" };
//   }
// };

// // Logout user
// export const logoutUser = () => {
//   localStorage.removeItem("currentUser");
// };

// // Check if user is logged in
// export const isAuthenticated = () => {
//   return !!localStorage.getItem("currentUser");
// };

// // Get current logged-in user
// export const getCurrentUser = () => {
//   const user = localStorage.getItem("currentUser");
//   return user ? JSON.parse(user) : null;
// };


// Dummy Auth Service
// ================= REGISTER =================
export const registerUser = (data) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.email === data.email);
  if (exists) {
    return { success: false, message: "Email already registered" };
  }

  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Registration successful!" };
};

// ================= LOGIN =================
export const loginUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  return { success: true, user };
};

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

// ================= AUTH CHECK =================
export const isAuthenticated = () => {
  return !!localStorage.getItem("currentUser");
};

// ================= CURRENT USER =================
export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

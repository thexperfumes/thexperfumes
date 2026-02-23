// // src/admin/pages/AdminLogin.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import adminApi from "../services/axios";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await adminApi.post("admin/login/", { email, password });

//       // Save token and admin info
//       localStorage.setItem("admin_token", res.data.access);
//       localStorage.setItem("admin", JSON.stringify(res.data.admin));

//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black flex justify-center items-center">
//       <div className="w-full max-w-md bg-gray-900 border border-yellow-400/60 shadow-2xl rounded-xl p-9">
//         <h2 className="text-center text-2xl text-yellow-400 mb-6 font-semibold tracking-wider">
//           Admin Login
//         </h2>

//         {error && (
//           <p className="bg-red-100 border border-red-500 text-red-500 p-3 rounded mb-5 text-center text-sm">
//             {error}
//           </p>
//         )}

//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="h-12 px-4 rounded-md bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="h-12 px-4 rounded-md bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="h-12 mt-1 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../services/axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminApi.post("admin/login/", { email, password });

      // Save token and admin info
      localStorage.setItem("admin_token", res.data.access);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard"); // navigate after successful login
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid email or password"
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-900 border border-yellow-400/60 shadow-2xl rounded-xl p-9">
        <h2 className="text-center text-2xl text-yellow-400 mb-6 font-semibold tracking-wider">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 border border-red-500 text-red-500 p-3 rounded mb-5 text-center text-sm">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 px-4 rounded-md bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 px-4 rounded-md bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 mt-1 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
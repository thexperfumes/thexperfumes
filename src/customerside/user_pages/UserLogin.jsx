// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser, isAuthenticated } from "../services/auth";
// import Navbar from "../user_components/Navbar";
// import { FiMail, FiLock } from "react-icons/fi";

// export default function UserLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate("/products", { replace: true });
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const user = await loginUser({ email, password });
//       if (user) navigate("/products", { replace: true });
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//         err.response?.data?.detail ||
//         "Invalid email or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-md p-8 rounded-xl bg-gray-900 border border-gold/30 shadow-lg flex flex-col gap-6"
//         >
//           <h2 className="text-3xl text-gold font-serif text-center tracking-widest mb-6">
//             LOGIN
//           </h2>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           {/* Email */}
//           <div className="relative">
//             <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full bg-gray-800 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-gold focus:outline-none transition"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full bg-gray-800 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-gold focus:outline-none transition"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
//           >
//             {loading ? "Logging in..." : "LOGIN"}
//           </button>

//           <p className="text-gray-400 text-sm text-center mt-2">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-gold hover:underline">
//               Register
//             </Link>
//           </p>

//           <p className="text-gray-400 text-sm text-center">
//             <Link to="/forgot-password" className="text-gold hover:underline">
//               Forgot Password?
//             </Link>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, isAuthenticated } from "../services/auth";
import Navbar from "../user_components/Navbar";
import { FiMail, FiLock } from "react-icons/fi";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) navigate("/products", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser({ email, password });
      if (user) navigate("/products", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-xl bg-gray-900 border border-gold/30 shadow-lg flex flex-col gap-6"
        >
          <h2 className="text-3xl text-gold font-serif text-center tracking-widest mb-6">
            LOGIN
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-gold focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 text-white px-10 py-3 rounded-lg border border-gray-600 focus:border-gold focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p className="text-gray-400 text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold hover:underline">
              Register
            </Link>
          </p>

          <p className="text-gray-400 text-sm text-center">
            <Link to="/forgot-password" className="text-gold hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

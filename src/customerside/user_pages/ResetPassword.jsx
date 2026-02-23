import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLock, FiCheck, FiX } from "react-icons/fi";
import customerApi from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation
  const passwordRules = {
    length: password.length >= 8,
    capital: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (!isPasswordValid) {
      toast.error("Password does not meet requirements");
      return;
    }

    try {
      setLoading(true);
      await customerApi.post("reset-password/", { uid, token, new_password: password });

      // Clear auth tokens
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChanged"));

      toast.success("Password reset successful! Please login again.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.error || "Invalid or expired reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 sm:px-6">
      <Toaster position="top-right" />
      <div className="bg-gray-900/80 backdrop-blur-lg border border-yellow-500/20 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl sm:text-4xl font-serif text-yellow-400 text-center mb-4 sm:mb-6">
          Reset Password
        </h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-6">
          Enter your new password below. You will need to login again with the new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <Input icon={<FiLock />} type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Password rules */}
          <div className="text-sm space-y-1 mt-2">
            <Rule label="Minimum 8 characters" valid={passwordRules.length} />
            <Rule label="One uppercase letter" valid={passwordRules.capital} />
            <Rule label="One number" valid={passwordRules.number} />
            <Rule label="One special character" valid={passwordRules.special} />
          </div>

          {/* Confirm Password */}
          <Input icon={<FiLock />} type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
              loading || !isPasswordValid
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:scale-105 hover:shadow-lg"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center text-sm sm:text-base">
          Remember your password?{" "}
          <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */
const Input = ({ icon, ...props }) => (
  <div className="relative">
    {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
    <input
      {...props}
      className="w-full bg-gray-800/70 text-white px-10 py-3 rounded-xl border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all duration-300 text-sm sm:text-base"
    />
  </div>
);

const Rule = ({ label, valid }) => (
  <div className={`flex items-center gap-2 transition-colors duration-300 ${valid ? "text-green-400" : "text-gray-400"}`}>
    {valid ? <FiCheck /> : <FiX />} <span>{label}</span>
  </div>
);
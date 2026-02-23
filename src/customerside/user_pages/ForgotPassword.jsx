import { useState } from "react";
import { FiMail } from "react-icons/fi";
import customerApi from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await customerApi.post("forgot-password/", { email });
      toast.success(res.data.message || "Reset link sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <Toaster position="top-right" />
      <div className="bg-gray-900 border border-gold/30 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-serif text-gold mb-6 text-center">
          Forgot Password
        </h2>

        <p className="text-gray-400 mb-6 text-center text-sm">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gold/30 rounded-lg px-3 py-2 focus-within:border-gold transition">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-gray-400 mt-4 text-center text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-gold underline hover:text-yellow-400">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import adminApi from "../services/axios";

export default function ChangePassword() {
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (form.new_password !== form.confirm_password) {
      return setMessage({ type: "error", text: "Passwords do not match." });
    }

    try {
      setLoading(true);
      await adminApi.post("admin/change-password/", {
        new_password: form.new_password,
        confirm_password: form.confirm_password,
      });

      setMessage({ type: "success", text: "Password changed successfully!" });
      setForm({ new_password: "", confirm_password: "" });
    } catch (err) {
      console.error(err.response?.data);
      const errMsg =
        err.response?.data?.error ||
        "Failed to change password. Please try again.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const messageColor =
    message.type === "error"
      ? "text-red-500"
      : message.type === "success"
      ? "text-yellow-400"
      : "text-gray-300";

  return (
    <div className="min-h-screen bg-black flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-yellow-400">
        <h2 className="text-center text-2xl font-bold text-yellow-400 mb-6">
          Change Password
        </h2>

        {message.text && (
          <p className={`text-center mb-4 ${messageColor}`}>{message.text}</p>
        )}

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            required
            className="h-12 px-4 rounded-md bg-black border border-yellow-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm New Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
            className="h-12 px-4 rounded-md bg-black border border-yellow-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 mt-2 rounded-md bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-500 hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

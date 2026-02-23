import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;
  const [countdown, setCountdown] = useState(5);

  /* ===== Auto Redirect Countdown ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/my-orders");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black text-white px-6">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-neutral-900/70 backdrop-blur-md border border-green-500/30 rounded-2xl p-8 text-center shadow-2xl"
      >
        {/* Animated Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <span className="text-green-400 text-4xl">✔</span>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-400 mb-6">
          Your invoice has been sent to your email.
        </p>

        {/* Order Preview */}
        {order && (
          <div className="bg-black/40 rounded-xl p-4 text-left mb-6 border border-neutral-800">
            <p className="text-sm text-gray-400 mb-1">Order ID</p>
            <p className="text-green-400 font-semibold mb-3">
              #{order.order_id}
            </p>

            <div className="flex justify-between text-sm text-gray-300">
              <span>Total Paid</span>
              <span className="text-green-400 font-semibold">
                ₹ {order.total_amount}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-3 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/10 transition"
          >
            View Orders
          </button>
        </div>

        {/* Auto Redirect Info */}
        <p className="text-xs text-gray-500 mt-6">
          Redirecting to My Orders in {countdown}s...
        </p>
      </motion.div>
    </div>
  );
}
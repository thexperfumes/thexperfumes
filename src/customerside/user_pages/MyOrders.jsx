import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import customerApi from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);

  useEffect(() => {
    customerApi
      .get("orders/my-orders/", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pt-24 px-4">
        <div className="animate-pulse space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-400">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-sm">Your confirmed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 text-white">
      <h1 className="text-3xl md:text-4xl text-yellow-400 mb-10 font-bold text-center">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.order_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-2xl p-6 shadow-lg hover:shadow-yellow-400/10 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="text-sm text-gray-400">Order ID</p>
                <p className="text-yellow-400 font-semibold text-lg">
                  #{order.order_id}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold ${
                    order.status === "CONFIRMED"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-600/30 text-gray-300"
                  }`}
                >
                  {order.status}
                </span>

                <button
                  onClick={() =>
                    setOpenOrder(
                      openOrder === order.order_id ? null : order.order_id
                    )
                  }
                  className="text-yellow-400 text-sm hover:underline"
                >
                  {openOrder === order.order_id ? "Hide Details" : "View Details"}
                </button>
              </div>
            </div>

            {/* Expand Section */}
            <AnimatePresence>
              {openOrder === order.order_id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="divide-y divide-gray-800">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between py-3 text-sm text-gray-300"
                      >
                        <span>
                          {item.perfume_name} × {item.quantity}
                        </span>
                        <span className="text-yellow-400">
                          ₹ {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mt-6 font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-yellow-400">
                      ₹ {order.total_amount}
                    </span>
                  </div>

                  <div className="mt-4 text-gray-400 text-xs">
                    Ordered on{" "}
                    {new Date(order.created_at).toLocaleDateString()} at{" "}
                    {new Date(order.created_at).toLocaleTimeString()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
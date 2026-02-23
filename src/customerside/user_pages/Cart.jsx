import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../services/cart";
import { getCurrentUser } from "../services/auth";
import { FiTrash2 } from "react-icons/fi";
import shopping from "../assets/shopping.png";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  /* ================= LOAD CART ================= */
  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(Array.isArray(data) ? data : []);
    };

    const handleAuthChange = async () => {
      setUser(getCurrentUser());
      await loadCart();
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  /* ================= SUBTOTAL ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="bg-black min-h-screen pt-20 sm:pt-24 md:pt-28 pb-32 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl text-center font-bold mb-12
          bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
          bg-clip-text text-transparent">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (

          /* ================= EMPTY CART ================= */
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <img src={shopping} alt="Empty Cart" className="w-48 opacity-80 mb-6" />
            <p className="text-2xl text-gray-300 mb-2">Your cart feels lonely 🛒</p>
            <p className="text-gray-500 mb-8">
              {user
                ? "Start adding your favorite products."
                : "Login to save items permanently."}
            </p>
            <Link
              to="/"
              className="px-8 py-3 rounded-full
                bg-gradient-to-r from-yellow-500 to-yellow-600
                text-black font-semibold
                hover:scale-105 transition duration-300"
            >
              Explore Products
            </Link>
          </div>

        ) : (

          /* ================= CART GRID ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* LEFT: CART ITEMS */}
            <div className="md:col-span-2 space-y-5 sm:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.perfume}
                  className="
                    flex flex-col sm:flex-row
                    gap-4 sm:gap-6
                    p-4 sm:p-5 md:p-6
                    rounded-2xl
                    bg-neutral-900
                    border border-neutral-800
                    hover:border-yellow-500
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                    transition-all duration-300
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full sm:w-28 md:w-32
                      h-48 sm:h-28 md:h-32
                      object-cover
                      rounded-xl
                    "
                  />

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-yellow-500 mt-1 text-sm sm:text-base">
                        ₹ {item.price}
                      </p>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQty(item.perfume)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full
                          bg-neutral-800 hover:bg-yellow-500
                          transition"
                      >
                        −
                      </button>

                      <span className="text-base sm:text-lg font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.perfume)}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full
                          bg-neutral-800 hover:bg-yellow-500
                          transition"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.perfume)}
                        className="sm:ml-auto text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                      >
                        <FiTrash2 /> Remove
                      </button>

                      <div className="w-full sm:w-auto text-right text-yellow-500 text-lg font-bold">
                        ₹ {item.price * item.quantity}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div
              className="
                lg:sticky lg:top-28
                p-6 sm:p-8
                rounded-3xl
                bg-white/5 backdrop-blur-xl
                border border-yellow-500/20
                shadow-2xl
                h-fit
              "
            >
              <h2 className="text-2xl font-semibold text-yellow-500 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                {cartItems.map((item) => (
                  <div key={item.perfume} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-yellow-500/20 my-6"></div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-yellow-500 transition-all duration-300">
                  ₹ {subtotal}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 py-3 rounded-full
                  bg-gradient-to-r from-yellow-500 to-yellow-600
                  text-black font-semibold
                  hover:scale-105 transition duration-300"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-4 py-3 rounded-full
                  border border-red-500 text-red-500
                  hover:bg-red-500 hover:text-white
                  transition duration-300"
              >
                Clear Cart
              </button>
            </div>

          </div>
        )}

      </div>

      {/* MOBILE STICKY CHECKOUT */}
      {cartItems.length > 0 && (
        <div className="
          lg:hidden fixed bottom-0 left-0 right-0
          bg-neutral-900 border-t border-yellow-500/30
          p-4 flex justify-between items-center
        ">
          <div>
            <p className="text-sm text-gray-400">Total</p>
            <p className="text-yellow-500 text-lg font-bold">
              ₹ {subtotal}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-2 rounded-full
              bg-yellow-500 text-black font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
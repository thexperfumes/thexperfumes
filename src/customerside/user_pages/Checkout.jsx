import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiPhone, FiUser, FiTag } from "react-icons/fi";
import customerApi from "../services/api";
import { getCart, clearCart } from "../services/cart";

/* ---------------- CONFIG ---------------- */
const CGST_PERCENT = 9;
const SGST_PERCENT = 9;
const SHIPPING_CHARGE = 500;

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    const loadCart = async () => {
      const items = await getCart();
      setCartItems(Array.isArray(items) ? items : []);
    };
    loadCart();
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const cgst = Math.round((subtotal * CGST_PERCENT) / 100);
  const sgst = Math.round((subtotal * SGST_PERCENT) / 100);
  const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;

  /* ---------------- AUTO APPLY COUPON ---------------- */
  useEffect(() => {
    if (!subtotal) return;

    const applyCoupon = async () => {
      try {
        const { data } = await customerApi.post("/coupons/apply-best/", {
          subtotal,
        });

        if (data.applied) {
          setDiscount(data.discount);
          setAppliedCoupon(data.code);
        } else {
          setDiscount(0);
          setAppliedCoupon("");
        }
      } catch {
        setDiscount(0);
        setAppliedCoupon("");
      }
    };

    applyCoupon();
  }, [subtotal]);

  const total = subtotal - discount + cgst + sgst + shipping;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------------- PLACE ORDER ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.mobile || !form.address || !form.pincode) {
      alert("Please fill all shipping details");
      return;
    }

    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      const items = cartItems.map((item) => ({
        perfume_id: item.perfume,
        quantity: item.quantity,
      }));

      const { data } = await customerApi.post("/orders/create-order/", {
        items,
        shippingDetails: form,
        coupon: appliedCoupon || null,
        discount,
      });

      const options = {
        key: data.razorpay_key,
        amount: data.amount,
        currency: "INR",
        name: "XPerfumes",
        order_id: data.order_id,
        handler: async (response) => {
          setVerifying(true);
          try {
            await customerApi.post("/orders/verify-payment/", response);
            await clearCart();
            navigate("/success");
          } catch {
            alert("Payment verification failed");
            setVerifying(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", () => {
        alert("Payment Failed");
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      alert(err.response?.data?.error || "Order failed");
      setLoading(false);
    }
  };

  /* ---------------- VERIFY SCREEN ---------------- */
  if (verifying) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400"></div>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-black min-h-screen pt-24 px-4 md:px-12 lg:px-20 text-white">
      <h1 className="text-center text-3xl md:text-4xl font-semibold text-yellow-400 mb-10">
        CHECKOUT
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* SHIPPING FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 p-6 md:p-8 rounded-2xl space-y-5 border border-yellow-500/20 shadow-xl"
        >
          <h2 className="text-lg font-semibold text-yellow-400">
            Shipping Details
          </h2>

          <Input icon={<FiUser />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <Input icon={<FiPhone />} name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />
          <Textarea icon={<FiMapPin />} name="address" placeholder="Full Address" value={form.address} onChange={handleChange} />
          <Input icon={<FiTag />} name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />

          {discount > 0 && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded text-sm">
              Coupon <b>{appliedCoupon}</b> applied — You saved ₹{discount}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition"
          >
            {loading ? "Processing..." : `PAY ₹${total}`}
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="bg-neutral-900 p-6 md:p-8 rounded-2xl border border-yellow-500/20 shadow-xl">
          <h2 className="text-lg font-semibold text-yellow-400 mb-5">
            Order Summary
          </h2>

          {cartItems.length === 0 && (
            <p className="text-gray-400 text-sm">Cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div key={item.perfume} className="flex justify-between text-sm mb-3">
              <span>{item.name} × {item.quantity}</span>
              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4 border-yellow-500/20" />

          <SummaryRow label="Subtotal" value={subtotal} />
          {discount > 0 && (
            <SummaryRow label={`Discount (${appliedCoupon})`} value={`- ${discount}`} />
          )}
          <SummaryRow label="CGST (9%)" value={cgst} />
          <SummaryRow label="SGST (9%)" value={sgst} />
          <SummaryRow label="Shipping" value={shipping} />

          <hr className="my-4 border-yellow-500/20" />

          <SummaryRow label="Total" value={total} bold />
        </div>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Input = ({ icon, ...props }) => (
  <div className="flex items-center border border-yellow-500/20 px-3 py-2 rounded-lg bg-black/40 focus-within:border-yellow-400 transition">
    <span className="mr-3 text-yellow-400">{icon}</span>
    <input {...props} className="w-full bg-transparent outline-none text-sm" />
  </div>
);

const Textarea = ({ icon, ...props }) => (
  <div className="flex items-start border border-yellow-500/20 px-3 py-2 rounded-lg bg-black/40 focus-within:border-yellow-400 transition">
    <span className="mr-3 mt-2 text-yellow-400">{icon}</span>
    <textarea {...props} className="w-full bg-transparent outline-none text-sm h-24 resize-none" />
  </div>
);

const SummaryRow = ({ label, value, bold }) => (
  <div className={`flex justify-between text-sm ${bold ? "text-yellow-400 font-semibold text-lg" : ""}`}>
    <span>{label}</span>
    <span>₹ {value}</span>
  </div>
);
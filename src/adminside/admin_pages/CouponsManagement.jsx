import { useEffect, useState } from "react";
import adminApi from "../services/axios";
import { format } from "date-fns";

const initialForm = {
  id: null,
  code: "",
  discount_type: "flat",
  discount_value: "",
  min_order_value: "",
  expiry_date: "",
};

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");

  /* ================= Fetch Coupons ================= */
  const loadCoupons = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("coupons/");
      setCoupons(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  /* ================= Form Handling ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => setForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      code: form.code,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_value: form.min_order_value ? Number(form.min_order_value) : null,
      expiry_date: form.expiry_date || null,
    };
    try {
      if (form.id) {
        await adminApi.put(`coupons/${form.id}/`, payload);
      } else {
        await adminApi.post("coupons/", payload);
      }
      resetForm();
      loadCoupons();
    } catch (err) {
      console.error(err.response?.data);
      alert("Invalid coupon details");
    }
  };

  const editCoupon = (c) => {
    setForm({
      id: c.id,
      code: c.code,
      discount_type: c.discount_type,
      discount_value: c.discount_value,
      min_order_value: c.min_order_value || "",
      expiry_date: c.expiry_date || "",
    });
  };

  const toggleActive = async (id) => {
    try {
      await adminApi.post(`coupons/toggle/${id}/`);
      loadCoupons();
    } catch (err) {
      alert("Permission denied");
    }
  };

  /* ================= Search Filter ================= */
  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-semibold mb-6 text-yellow-400">
        Coupons Management
      </h1>

      {/* ================= Form ================= */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium mb-4">
          {form.id ? "Edit Coupon" : "Add New Coupon"}
        </h3>
        <form className="grid md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
          <input
            name="code"
            placeholder="Coupon Code"
            value={form.code}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400"
          />

          <select
            name="discount_type"
            value={form.discount_type}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400"
          >
            <option value="flat">Flat</option>
            <option value="percent">Percentage</option>
          </select>

          <input
            type="number"
            name="discount_value"
            placeholder="Discount Value"
            value={form.discount_value}
            onChange={handleChange}
            required
            className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400"
          />

          <input
            type="number"
            name="min_order_value"
            placeholder="Min Order Value (optional)"
            value={form.min_order_value}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400"
          />

          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold transition"
            >
              {form.id ? "Update Coupon" : "Add Coupon"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md font-semibold transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ================= Search ================= */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by coupon code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-md bg-gray-900 border border-gray-600 focus:outline-yellow-400 w-full md:w-1/3"
        />
      </div>

      {/* ================= Table ================= */}
      <div className="overflow-x-auto rounded-md border border-gray-700">
        <table className="min-w-full bg-gray-800">
          <thead className="bg-gray-700 text-yellow-400">
            <tr>
              {["Code", "Type", "Value", "Min Order", "Expiry", "Status", "Actions"].map(
                (h) => (
                  <th key={h} className="px-4 py-3 text-left">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  Loading coupons...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredCoupons.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No coupons found
                </td>
              </tr>
            ) : (
              filteredCoupons.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-gray-700 border-b border-gray-600"
                >
                  <td className="px-4 py-3">{c.code}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        c.discount_type === "flat"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {c.discount_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{c.discount_value}</td>
                  <td className="px-4 py-3">
                    {c.min_order_value ? `₹${c.min_order_value}` : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {c.expiry_date
                      ? format(new Date(c.expiry_date), "dd MMM yyyy")
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        c.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => editCoupon(c)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(c.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium text-white ${
                        c.is_active
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {c.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import adminApi from "../services/axios";

/* ================= CONSTANTS ================= */
const initialForm = {
  id: null,
  name: "",
  brand: "",
  category: "",
  sku: "",
  price: "",
  discount: "",
  finalPrice: "",
  stock: "",
  description: "",
  is_active: true,
  image: null,
};

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("admin/perfumes/");
      const list = Array.isArray(res.data?.results) ? res.data.results : [];
      setProducts(list);
      setFiltered(list);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= FILTER LOGIC ================= */
  useEffect(() => {
    let data = Array.isArray(products) ? [...products] : [];

    if (search) {
      data = data.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "all") data = data.filter((p) => p.category === category);
    if (status !== "all") data = data.filter((p) =>
      status === "active" ? p.is_active : !p.is_active
    );

    setFiltered(data);
  }, [search, category, status, products]);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updated = { ...form };
    if (name === "image") updated.image = files[0];
    else updated[name] = value;

    if (name === "price" || name === "discount") {
      const price = Number(updated.price || 0);
      const discount = Number(updated.discount || 0);
      updated.finalPrice = (price - (price * discount) / 100).toFixed(2);
    }

    setForm(updated);
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const openModal = (product = null) => {
    if (product) {
      setForm({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        sku: product.sku,
        price: product.price,
        discount: product.discount,
        finalPrice: product.final_price,
        stock: product.stock,
        description: product.description || "",
        is_active: product.is_active,
        image: null,
      });
    } else setForm(initialForm);

    setError({});
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setForm(initialForm);
    setError({});
    setFieldErrors({});
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setFieldErrors({});

    const formData = new FormData();
    Object.entries({
      name: form.name,
      brand: form.brand,
      category: form.category,
      sku: form.sku,
      price: form.price,
      discount: form.discount,
      stock: form.stock,
      description: form.description,
      is_active: form.is_active,
    }).forEach(([k, v]) => formData.append(k, v));

    if (form.image) formData.append("image", form.image);

    try {
      if (form.id) await adminApi.put(`admin/perfumes/${form.id}/`, formData);
      else await adminApi.post("admin/perfumes/create/", formData);

      fetchProducts();
      closeModal();
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        setFieldErrors(data);
        const key = Object.keys(data)[0];
        setError({ message: `${key.toUpperCase()}: ${data[key][0]}` });
      } else {
        setError({ message: "Failed to save product" });
      }
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await adminApi.delete(`admin/perfumes/${id}/delete/`);
      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= STATUS TOGGLE ================= */
  const toggleStatus = async (id, current) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !current } : p))
    );

    try {
      await adminApi.post(`admin/perfumes/${id}/toggle/`);
    } catch {
      fetchProducts();
    }
  };

  const categories = Array.isArray(products)
    ? [...new Set(products.map((p) => p.category).filter(Boolean))]
    : [];

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-[#0b0b0b] min-h-screen text-white">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        Product Management
      </h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-[#111] border border-gray-700 px-4 py-2 rounded text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#111] border border-gray-700 px-4 py-2 rounded text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#111] border border-gray-700 px-4 py-2 rounded text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={() => openModal()}
          className="ml-auto bg-yellow-400 text-black px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead className="bg-black text-yellow-400">
              <tr>
                {[
                  "Image",
                  "Name",
                  "Brand",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="p-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-800 hover:bg-yellow-400/10 transition"
                >
                  <td className="p-2">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-800 flex items-center justify-center rounded-md text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3">{p.brand}</td>

                  {/* Category Badge */}
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-indigo-900 text-indigo-300 border border-indigo-700">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-3 font-semibold text-green-400">₹{p.final_price}</td>

                  {/* Stock Alert */}
                  <td className="p-3 text-center">
                    {p.stock === 0 ? (
                      <span className="text-red-400 font-semibold">Out</span>
                    ) : p.stock < 10 ? (
                      <span className="text-yellow-400 font-semibold">
                        {p.stock} (Low)
                      </span>
                    ) : (
                      <span className="text-green-400 font-semibold">{p.stock}</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleStatus(p.id, p.is_active)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        p.is_active
                          ? "bg-green-900 text-green-300 border border-green-700"
                          : "bg-red-900 text-red-300 border border-red-700"
                      }`}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openModal(p)}
                      className="bg-yellow-500 hover:bg-yellow-400 px-2 py-1 rounded text-black"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b1b1b] w-full max-w-lg rounded-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              {form.id ? "Edit Product" : "Add Product"}
            </h2>

            {error.message && (
              <div className="bg-red-100 text-red-700 px-3 py-2 mb-4 rounded">
                {error.message}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full p-2 border rounded-md ${
                  fieldErrors.name ? "border-red-500" : "border-gray-500"
                } text-white bg-[#111] placeholder-gray-400`}
              />
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className={`w-full p-2 border rounded-md ${
                  fieldErrors.brand ? "border-red-500" : "border-gray-500"
                } text-white bg-[#111] placeholder-gray-400`}
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  fieldErrors.category ? "border-red-500" : "border-gray-500"
                } text-white bg-[#111]`}
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="SKU"
                className={`w-full p-2 border rounded-md ${
                  fieldErrors.sku ? "border-red-500" : "border-gray-500"
                } text-white bg-[#111] placeholder-gray-400`}
              />
              <div className="flex gap-2">
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="flex-1 p-2 border rounded-md border-gray-500 text-white bg-[#111]"
                />
                <input
                  name="discount"
                  type="number"
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="Discount %"
                  className="flex-1 p-2 border rounded-md border-gray-500 text-white bg-[#111]"
                />
                <input
                  value={form.finalPrice}
                  readOnly
                  placeholder="Final Price"
                  className="flex-1 p-2 border rounded-md border-gray-500 text-white bg-gray-800"
                />
              </div>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full p-2 border rounded-md border-gray-500 text-white bg-[#111]"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border rounded-md border-gray-500 text-white bg-[#111] placeholder-gray-400"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full text-sm text-gray-400"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

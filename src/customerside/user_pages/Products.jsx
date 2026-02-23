import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../user_components/ProductCard";
import customerApi from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await customerApi.get("public/perfumes/");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load perfumes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SEARCH + SORT =================
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [products, search, sort]);

  return (
    <div className="bg-gradient-to-br from-black via-neutral-900 to-black min-h-screen px-4 md:px-12 py-12 text-white">
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-gold font-serif tracking-widest mb-8 text-center">
          ALL PERFUMES
        </h1>

        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Search */}
          <input
            type="text"
            placeholder="Search perfume..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400 text-white transition"
          />

          {/* Sort + Refresh */}
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 md:flex-auto px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:border-gold text-white"
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>

            <button
              onClick={fetchProducts}
              className="px-5 py-3 bg-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* ================= LOADING SKELETON ================= */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-neutral-800 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ================= PRODUCT GRID ================= */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <h2 className="text-xl mb-2">No perfumes found</h2>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
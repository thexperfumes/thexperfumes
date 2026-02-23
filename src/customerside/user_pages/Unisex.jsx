import { useEffect, useState } from "react";
import ProductCard from "../user_components/ProductCard";
import customerApi from "../services/api";

export default function Unisex() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUnisexPerfumes = async () => {
    try {
      const res = await customerApi.get("public/perfumes/?category=Unisex");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load unisex perfumes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnisexPerfumes();
  }, []);

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 md:px-12 py-12">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-gold font-serif tracking-widest mb-10 text-center animate-fade-in">
        UNISEX COLLECTION
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-center text-lg animate-pulse">Loading...</p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <p className="text-gray-400 text-center mt-10 text-lg">
          No unisex perfumes available
        </p>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import ProductCard from "../user_components/ProductCard";
import customerApi from "../services/api";

export default function Men() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenPerfumes = async () => {
    try {
      const res = await customerApi.get("public/perfumes/?category=Men");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load men perfumes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenPerfumes();
  }, []);

  return (
    <div className="bg-black min-h-screen px-4 md:px-12 py-10">
      <h1 className="text-3xl text-gold font-serif tracking-widest mb-8 text-center">
        MEN COLLECTION
      </h1>

      {loading && (
        <p className="text-gray-400 text-center">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && products.length === 0 && (
        <p className="text-gray-400 text-center mt-10">
          No men perfumes available
        </p>
      )}
    </div>
  );
}

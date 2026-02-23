import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import publicApi from "../services/apiPublic";
import { addToCart } from "../services/cart";
import { isAuthenticated } from "../services/auth";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicApi.get(`public/perfumes/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!product?.id) return;

    // ✅ CORRECT WAY
    await addToCart(product.id, quantity);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return <p className="text-white text-center pt-28">Loading...</p>;

  if (error || !product)
    return <p className="text-red-500 text-center pt-28">Product not found</p>;

  const hasDiscount = product.discount > 0;
  const savings = hasDiscount
    ? (product.price - product.final_price).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md h-[480px] bg-[#111] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

            {hasDiscount && (
              <div className="absolute top-6 left-6 bg-gold text-black px-4 py-2 rounded-full font-semibold shadow-lg">
                {product.discount}% OFF
              </div>
            )}

            <img
              src={product.image_url || product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain p-8 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gold mb-6">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-gray-400 mb-6 leading-relaxed text-lg">
              {product.description}
            </p>
          )}

          {/* PRICE */}
          <div className="mb-8">
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-3xl font-semibold text-white">
                    ₹{product.final_price}
                  </p>

                  <p className="text-xl text-gray-500 line-through">
                    ₹{product.price}
                  </p>

                  <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>

                <p className="text-green-400 mt-2 text-sm">
                  You save ₹{savings}
                </p>
              </>
            ) : (
              <p className="text-3xl font-semibold text-white">
                ₹{product.price}
              </p>
            )}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400">Quantity:</span>
            <div className="flex items-center border border-gray-600 rounded-full overflow-hidden">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2 hover:bg-gray-800"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-800"
              >
                +
              </button>
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={handleAddToCart}
            className="bg-gold text-black px-10 py-3 font-semibold tracking-wide rounded-full hover:scale-105 transition duration-300"
          >
            ADD TO CART
          </button>

          {added && (
            <p className="text-green-400 mt-4">
              ✔ Added to cart successfully
            </p>
          )}

          {/* TRUST */}
          <div className="mt-8 space-y-3 text-sm text-gray-400">
            <p>🚚 Free delivery in 3–5 days</p>
            <p>✅ 100% authentic products</p>
            <p>🔄 Easy returns within 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
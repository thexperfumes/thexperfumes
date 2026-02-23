import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = product.image_url || product.image;
  const price = product.final_price || product.price;

  return (
    <div
      className="group bg-neutral-900 rounded-2xl overflow-hidden
                 transition-all duration-500
                 hover:-translate-y-2 md:hover:-translate-y-3
                 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={product.name}
          className="w-full 
                     h-48 sm:h-56 md:h-64 lg:h-72
                     object-cover
                     transition-transform duration-700
                     group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 md:p-6 text-center space-y-2 sm:space-y-3">

        {/* PRODUCT NAME (Gold) */}
        <h3 className="font-medium tracking-wide
                       text-base sm:text-lg md:text-xl
                       bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                       bg-clip-text text-transparent
                       line-clamp-1">
          {product.name}
        </h3>

        {/* PRICE (Gold) */}
        <p className="font-semibold
                      text-sm sm:text-base md:text-lg
                      bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                      bg-clip-text text-transparent">
          ₹{price}
        </p>

        {/* BUTTON */}
        <Link
          to={`/products/${product.id}`}
          className="inline-block mt-3 sm:mt-4
                     px-5 sm:px-6 md:px-8
                     py-2
                     text-[10px] sm:text-xs md:text-sm
                     tracking-[0.2em]
                     border border-yellow-500/40
                     text-yellow-500
                     rounded-full
                     transition-all duration-300
                     hover:bg-yellow-500 hover:text-black"
        >
          EXPLORE
        </Link>
      </div>
    </div>
  );
}
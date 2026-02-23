import ProductCard from "./ProductCard";

export default function ProductGrid({ items }) {
  return (
    <div className="bg-black w-full py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4 sm:gap-6 md:gap-8 lg:gap-10
          "
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="
                group
                relative
                rounded-2xl
                overflow-hidden
                border border-gray-800
                hover:border-yellow-500
                transition-all duration-500
                shadow-md hover:shadow-2xl
                bg-neutral-900
                hover:-translate-y-2
              "
            >
              <ProductCard product={product} />

              {/* Hover overlay */}
              <div className="
                absolute inset-0
                bg-black/20
                opacity-0
                group-hover:opacity-100
                transition-opacity duration-300
              "></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
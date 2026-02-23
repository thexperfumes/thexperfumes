import { useEffect, useState } from "react";
import products from "../../data/products";
import { Link } from "react-router-dom";
import customerApi from "../services/api";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Luxury In Every Drop",
      subtitle: "Premium fragrances for timeless elegance",
      image:
        "https://images.unsplash.com/photo-1615634260167-c8cdede054de",
    },
    {
      id: 2,
      title: "Signature Scents",
      subtitle: "Crafted for confidence & class",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f",
    },
    {
      id: 3,
      title: "Unforgettable Essence",
      subtitle: "Because fragrance defines you",
      image:
        "https://images.unsplash.com/photo-1547887537-6158d64c35b3",
    },
  ];

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[85vh] sm:h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === i ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-105 transition-transform duration-[7000ms]"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-3xl animate-fadeInUp">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-gold tracking-widest mb-6">
                  {slide.title}
                </h1>
                <p className="text-gray-300 text-sm sm:text-lg mb-8">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="px-8 sm:px-12 py-3 border border-gold text-gold tracking-widest hover:bg-gold hover:text-black transition duration-300"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= FEATURED ================= */}
      <Section title="Featured Perfumes" subtitle="Curated for distinction">
        <ResponsiveGrid>
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ResponsiveGrid>
      </Section>

      {/* ================= BEST SELLERS ================= */}
      <Section title="Best Sellers" subtitle="Loved by our customers">
        <ResponsiveGrid>
          {products.slice(0, 8).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={`#${idx + 1}`}
            />
          ))}
        </ResponsiveGrid>
      </Section>

      {/* ================= CATEGORY ================= */}
      <Section title="Shop By Category">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Men", "Women", "Unisex"].map((cat) => (
            <Link to={`/${cat.toLowerCase()}`} key={cat}>
              <div className="h-40 sm:h-52 border border-gold/40 flex items-center justify-center text-gold text-xl sm:text-3xl tracking-widest hover:bg-gold hover:text-black transition duration-300">
                {cat}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ================= NEWSLETTER ================= */}
      <Section title="Subscribe to Our Newsletter">
        <div className="max-w-md mx-auto text-center px-4">
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Get updates on new arrivals and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gold text-black"
            />
            <button className="bg-gold px-6 py-3 rounded-lg text-black font-semibold hover:bg-yellow-400 transition">
              Subscribe
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}

/* ================= RESPONSIVE GRID ================= */
function ResponsiveGrid({ children }) {
  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-6
    ">
      {children}
    </div>
  );
}

/* ================= PRODUCT CARD ================= */
function ProductCard({ product, badge }) {
  return (
    <div className="relative border border-gold/20 rounded-xl p-4 bg-white/5 backdrop-blur-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {badge && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          {badge}
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover rounded-lg"
      />
      <div className="mt-4 text-center">
        <h3 className="text-gold font-semibold">{product.name}</h3>
        <p className="text-gray-300 mt-1">₹{product.price}</p>
        <Link
          to={`/products/${product.id}`}
          className="mt-3 inline-block px-6 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-black transition"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

/* ================= SECTION ================= */
function Section({ title, subtitle, children }) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-20">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl text-gold font-serif tracking-widest mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-400 text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
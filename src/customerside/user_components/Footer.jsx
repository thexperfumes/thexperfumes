import { Instagram, Facebook, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-black text-neutral-300 pt-16 pb-8 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-light tracking-[0.25em] text-white mb-4">
              XPERFUMES
            </h2>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Premium fragrances crafted for confidence and timeless elegance.
              Discover your signature scent.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center md:justify-start gap-5 mt-6">
              <a
                href="https://www.instagram.com/_x.perfumes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition duration-300"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/xperfumes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition duration-300"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://wa.me/918610871752"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-700 hover:border-yellow-500 hover:text-yellow-500 transition duration-300"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium mb-4 tracking-wide">
              Contact
            </h3>

            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Shop 3, South street 6</li>
              <li>Avarampalayam, Coimbatore – 641006</li>
              <li className="hover:text-white transition cursor-pointer">
                +91 8610871752
              </li>
              <li className="hover:text-white transition cursor-pointer">
                thexperfumes@gmail.com
              </li>
            </ul>
          </div>

          {/* LOCATION */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium mb-4 tracking-wide">
              Location
            </h3>

            <div className="w-full h-40 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="XPerfumes Location"
                src="https://www.google.com/maps?q=Coimbatore&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} XPERFUMES. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
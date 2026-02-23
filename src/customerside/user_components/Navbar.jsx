import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import Logo from "../../../public/Logo.jpg";
import { getCartCountFromBackend } from "../services/cart";
import { isAuthenticated, getCurrentUser, logoutUser } from "../services/auth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(
    isAuthenticated() ? getCurrentUser() : null
  );
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Unisex", path: "/unisex" },
    { name: "Contact" },
  ];

  /* ================= SYNC AUTH + CART ================= */
  const syncUserAndCart = useCallback(async () => {
    const authUser = isAuthenticated() ? getCurrentUser() : null;
    setUser(authUser);

    if (authUser) {
      try {
        const count = await getCartCountFromBackend();
        setCartCount(count || 0);
      } catch {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    syncUserAndCart();
    window.addEventListener("authChanged", syncUserAndCart);
    window.addEventListener("cartUpdated", syncUserAndCart);

    return () => {
      window.removeEventListener("authChanged", syncUserAndCart);
      window.removeEventListener("cartUpdated", syncUserAndCart);
    };
  }, [syncUserAndCart]);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setCartCount(0);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login", { replace: true });
  };

  /* ================= CONTACT SCROLL ================= */
  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="h-20 md:h-24 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            {menu.map((m) =>
              m.name === "Contact" ? (
                <button
                  key={m.name}
                  onClick={handleContactClick}
                  className="text-sm uppercase tracking-wider text-neutral-400 hover:text-white transition"
                >
                  {m.name}
                </button>
              ) : (
                <Link
                  key={m.name}
                  to={m.path}
                  className={`text-sm uppercase tracking-wider transition ${
                    location.pathname === m.path
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {m.name}
                </Link>
              )
            )}
          </div>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6 relative">

            {user && (
              <Link
                to="/cart"
                className="relative text-sm uppercase text-neutral-400 hover:text-white transition"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-white text-black text-[11px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-semibold shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm uppercase border border-neutral-600 rounded-md hover:border-white hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm uppercase bg-white text-black rounded-md hover:bg-neutral-200 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="text-sm uppercase text-neutral-300 hover:text-white transition"
                  >
                    {user.name} ▾
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-4 w-56 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl overflow-hidden animate-fadeIn">
                      
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="block px-5 py-3 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setOpen(false)}
                        className="block px-5 py-3 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/forgot-password"
                        onClick={() => setOpen(false)}
                        className="block px-5 py-3 text-sm text-neutral-300 hover:bg-neutral-800 transition"
                      >
                        Change Password
                      </Link>

                      <div className="border-t border-neutral-700" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-neutral-800 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-neutral-800 px-6 py-6 space-y-5 animate-fadeIn">
          {menu.map((m) =>
            m.name === "Contact" ? (
              <button
                key={m.name}
                onClick={handleContactClick}
                className="block w-full text-left text-sm uppercase text-neutral-400 hover:text-white"
              >
                {m.name}
              </button>
            ) : (
              <Link
                key={m.name}
                to={m.path}
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                {m.name}
              </Link>
            )
          )}

          {user && (
            <>
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                Cart ({cartCount})
              </Link>

              <Link
                to="/my-orders"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                My Orders
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                Profile
              </Link>
              <Link
                to="/forgot-password"
                onClick={() => setMobileOpen(false)}
                className="block text-sm uppercase text-neutral-400 hover:text-white"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="block text-sm uppercase text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
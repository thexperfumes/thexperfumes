import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PromotionPopup from "./PromotionPopup";

export default function CustomerLayout() {
  const location = useLocation();
  const [popupRendered, setPopupRendered] = useState(false);

  return (
    <>
      <Navbar />

      {/* Promotion popup only on home page */}
      {location.pathname === "/" && !popupRendered && (
        <PromotionPopup onClose={() => setPopupRendered(true)} />
      )}

      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer only on home page */}
      {location.pathname === "/" && <Footer />}
    </>
  );
}

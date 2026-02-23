import { useEffect, useRef, useState } from "react";
import customerApi from "../services/api";
import { X } from "lucide-react";

const POPUP_KEY = "promo_popup_id";

export default function PromotionPopup() {
  const hasRun = useRef(false);
  const [popup, setPopup] = useState(null);
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const loadPopup = async () => {
      try {
        const res = await customerApi.get("/promotions/active-popup/");
        if (!res.data?.id || !res.data?.image_url) return;

        const seenPopupId = sessionStorage.getItem(POPUP_KEY);
        if (seenPopupId == res.data.id) return;

        setPopup(res.data);
        setShow(true);
        setTimeout(() => setAnimate(true), 50); // trigger animation
        sessionStorage.setItem(POPUP_KEY, res.data.id);
      } catch {
        console.log("No popup available");
      }
    };

    loadPopup();
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [show]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setShow(false), 300); // wait animation
  };

  if (!show || !popup) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        bg-black/60 backdrop-blur-md p-4
        transition-opacity duration-300
        ${animate ? "opacity-100" : "opacity-0"}
      `}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-full max-w-4xl
          transform transition-all duration-300 ease-out
          ${animate
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
            absolute -top-4 -right-4
            bg-white text-black
            rounded-full p-3
            shadow-lg
            hover:scale-110
            transition
          "
        >
          <X size={18} />
        </button>

        {/* Promotion Image */}
        <img
          src={popup.image_url}
          alt="Promotion"
          className="
            max-h-[85vh]
            w-full
            object-contain
            rounded-3xl
            shadow-2xl
          "
        />
      </div>
    </div>
  );
}
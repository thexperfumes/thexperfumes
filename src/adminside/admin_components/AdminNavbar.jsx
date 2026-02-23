import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../public/Logo.jpg";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-1 pb-1 transition relative ${
      isActive
        ? "text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-400"
        : "text-gray-400 hover:text-yellow-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 h-16 bg-black/95 backdrop-blur-md border-b border-yellow-400/30 shadow-lg flex items-center px-6">

      {/* LOGO */}
      <div
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center cursor-pointer mr-8"
      >
        <img
  src={Logo}
  alt="Perfume Admin"
  className="h-12 md:h-14 w-auto object-contain hover:opacity-90 transition"
/>

      </div>

      {/* NAV LINKS */}
      <div className="hidden lg:flex flex-1 justify-center gap-7">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/productmanagement" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/ordermanagement" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/admin/couponmanagement" className={linkClass}>
          Coupons
        </NavLink>
        <NavLink to="/admin/popupmanagement" className={linkClass}>
          Popups
        </NavLink>
        <NavLink to="/admin/report" className={linkClass}>
          Reports
        </NavLink>
      </div>

      {/* PROFILE MENU */}
      <div className="relative min-w-[130px] flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="border border-yellow-400 text-yellow-400 px-4 py-1.5 rounded-md font-semibold flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition"
        >
          👤 Profile
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-44 bg-[#0f0f0f] border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/admin/change-password");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-yellow-400 hover:text-black transition"
            >
              Change Password
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

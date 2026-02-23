import { NavLink, Outlet } from "react-router-dom";

export default function ReportsLayout() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Reports</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-6">
        <NavLink
          to="sales"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          Sales
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          Users
        </NavLink>
      </div>

      {/* Nested routes */}
      <Outlet />
    </div>
  );
}

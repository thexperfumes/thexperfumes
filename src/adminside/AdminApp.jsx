import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./admin_components/AdminLayout";
import AdminProtectedRoute from "./admin_components/AdminProtectedRoute";
import AdminLogin from "./admin_pages/AdminLogin";

import Dashboard from "./admin_pages/Dashboard";
import Users from "./admin_pages/Users";
import ProductManagement from "./admin_pages/ProductManagement";
import OrderManagement from "./admin_pages/OrderManagement";
import CouponsManagement from "./admin_pages/CouponsManagement";
import PopupManagement from "./admin_pages/PopupManagement";
import ChangePassword from "./admin_pages/ChangePassword";
import ReportsLayout from "./reports/ReportsLayout";
import SalesReport from "./reports/SalesReport";
import ProductReport from "./reports/ProductReport";
import UserReport from "./reports/UserReport";

export default function AdminApp() {
  return (
    <Routes>

      {/* 🔓 ADMIN LOGIN (NO NAVBAR, NO PROTECTION) */}
      <Route path="login" element={<AdminLogin />} />

      {/* 🔐 PROTECTED ADMIN AREA */}
      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="productmanagement" element={<ProductManagement />} />
        <Route path="ordermanagement" element={<OrderManagement />} />
        <Route path="couponmanagement" element={<CouponsManagement />} />
        <Route path="popupmanagement" element={<PopupManagement />} />
        <Route path="change-password" element={<ChangePassword />} />

        <Route path="report" element={<ReportsLayout />}>
          <Route index element={<Navigate to="sales" />} />
          <Route path="sales" element={<SalesReport />} />
          <Route path="products" element={<ProductReport />} />
          <Route path="users" element={<UserReport />} />
        </Route>
      </Route>


    </Routes>
  );
}

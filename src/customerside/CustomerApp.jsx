import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./user_components/ScrollToTop";

import Home from "./user_pages/Home";
import Products from "./user_pages/Products";
import ProductDetail from "./user_pages/ProductDetail";
import Men from "./user_pages/Men";
import Women from "./user_pages/Women";
import Unisex from "./user_pages/Unisex";
import Cart from "./user_pages/Cart";
import Checkout from "./user_pages/Checkout";
import UserLogin from "./user_pages/UserLogin";
import Register from "./user_pages/Register";
import OrderSuccess from "./user_pages/OrderSuccess";
import Profile from "./user_pages/Profile";
import MyOrders from "./user_pages/MyOrders";
import ForgotPassword from "./user_pages/ForgotPassword";
import ResetPassword from "./user_pages/ResetPassword";

import CustomerLayout from "./user_components/CustomerLayout";
import ProtectedRoute from "./user_components/ProtectedRoute";
import PromotionPopup from "./user_components/PromotionPopup";

export default function CustomerApp() {
  return (
    <>
    
  
      <ScrollToTop />

      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/unisex" element={<Unisex />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}

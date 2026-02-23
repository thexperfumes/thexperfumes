import customerApi from "./api";
import { isAuthenticated } from "./auth";

/* ================= GET CART ================= */
export const getCart = async () => {
  try {
    // 🔥 Prevent API call if user not logged in
    if (!isAuthenticated()) {
      return [];
    }

    const res = await customerApi.get("cart/");
    return Array.isArray(res.data) ? res.data : [];

  } catch (error) {
    // ✅ Ignore 401 (happens after logout)
    if (error.response?.status === 401) {
      return [];
    }

    console.error("Get Cart Error:", error);
    return [];
  }
};

/* ================= GET CART COUNT ================= */
export const getCartCountFromBackend = async () => {
  try {
    const cart = await getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  } catch {
    return 0;
  }
};

/* ================= ADD ================= */
export const addToCart = async (perfumeId, qty = 1) => {
  try {
    if (!isAuthenticated()) return;

    await customerApi.post("cart/", {
      perfume: perfumeId,
      quantity: qty,
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Add To Cart Error:", error);
  }
};

/* ================= INCREASE QUANTITY ================= */
export const increaseQty = async (perfumeId) => {
  try {
    if (!isAuthenticated()) return;

    await customerApi.patch("cart/update/", {
      perfume: perfumeId,
      action: "increase",
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Increase Qty Error:", error);
  }
};

/* ================= DECREASE QUANTITY ================= */
export const decreaseQty = async (perfumeId) => {
  try {
    if (!isAuthenticated()) return;

    await customerApi.patch("cart/update/", {
      perfume: perfumeId,
      action: "decrease",
    });

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Decrease Qty Error:", error);
  }
};

/* ================= REMOVE ITEM ================= */
export const removeFromCart = async (perfumeId) => {
  try {
    if (!isAuthenticated()) return;

    await customerApi.delete(`cart/remove/${perfumeId}/`);

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Remove Error:", error);
  }
};

/* ================= CLEAR CART ================= */
export const clearCart = async () => {
  try {
    if (!isAuthenticated()) return;

    await customerApi.delete("cart/clear/");

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Clear Cart Error:", error);
  }
};

const ORDER_KEY = "orders";

export function getOrders() {
  return JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
}

export function createOrder(cartItems, total) {
  const orders = getOrders();

  const newOrder = {
    id: "ORD-" + Date.now(),
    date: new Date().toLocaleDateString(),
    total,
    items: cartItems,
  };

  orders.unshift(newOrder); // latest order first
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
}

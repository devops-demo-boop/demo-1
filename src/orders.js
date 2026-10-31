const TAX_RATE = Number(process.env.TAX_RATE || 0.1);

function round(value) {
  return Math.round(value * 100) / 100;
}

function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = round(subtotal * TAX_RATE);
  return { subtotal: round(subtotal), tax, total: round(subtotal + tax) };
}

function sortByNewest(orders) {
  return orders.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = { calculateTotal, sortByNewest, round };

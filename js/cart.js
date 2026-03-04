/* js/cart.js - Cart Module */

window.Cart = (function () {
  const STORAGE_KEY = 'ganapati_cart';

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function addItem(product, quantity) {
    quantity = parseInt(quantity, 10) || 1;
    const items = getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        carat: product.carat,
        cut: product.cut,
        certification: product.certification,
        quantity: quantity
      });
    }
    saveItems(items);
    updateBadge();
  }

  function removeItem(productId) {
    const items = getItems().filter(i => i.id !== productId);
    saveItems(items);
    updateBadge();
  }

  function updateQuantity(productId, quantity) {
    quantity = parseInt(quantity, 10);
    if (quantity < 1) { removeItem(productId); return; }
    const items = getItems().map(i => i.id === productId ? { ...i, quantity } : i);
    saveItems(items);
    updateBadge();
  }

  function getTotal() {
    return getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  function getCount() {
    return getItems().reduce((sum, i) => sum + i.quantity, 0);
  }

  function clear() {
    localStorage.removeItem(STORAGE_KEY);
    updateBadge();
  }

  function updateBadge() {
    const count = getCount();
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
    });
  }

  return { getItems, addItem, removeItem, updateQuantity, getTotal, getCount, clear, updateBadge };
})();

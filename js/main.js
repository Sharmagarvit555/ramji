/* js/main.js - Global Utilities */

// --- Page Loader ---
window.addEventListener('load', function () {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
  Cart.updateBadge();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initSmoothScroll();
  initAOS();
  initWishlistIcons();
  highlightActiveNav();
  if (typeof renderFeaturedProducts === 'function') renderFeaturedProducts();
});

// --- Navbar Sticky ---
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Mobile Menu ---
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    }
  });
}

// --- Back to Top ---
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Toast Notifications ---
function showToast(message, type) {
  type = type || 'default';
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', default: 'fa-gem' };
  const icon = icons[type] || icons.default;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span><button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>`;
  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  container.appendChild(toast);
  setTimeout(() => removeToast(toast), 3500);
}

function removeToast(toast) {
  if (!toast.parentNode) return;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- AOS (Animate on Scroll) ---
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

// --- Wishlist ---
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('ramji_wishlist')) || []; }
  catch (e) { return []; }
}

function saveWishlist(list) {
  localStorage.setItem('ramji_wishlist', JSON.stringify(list));
}

function toggleWishlist(productId) {
  productId = parseInt(productId);
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    list.push(productId);
    showToast('Added to wishlist!', 'success');
  }
  saveWishlist(list);
  updateWishlistIcons();
}

function isWishlisted(productId) {
  return getWishlist().includes(parseInt(productId));
}

function updateWishlistIcons() {
  document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
    const id = parseInt(btn.dataset.wishlistId);
    btn.classList.toggle('wishlisted', isWishlisted(id));
    const icon = btn.querySelector('i');
    if (icon) icon.className = isWishlisted(id) ? 'fas fa-heart' : 'far fa-heart';
  });
}

function initWishlistIcons() {
  updateWishlistIcons();
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-wishlist-id]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(btn.dataset.wishlistId);
    }
  });
}

// --- Active Nav Link ---
function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html') || (href !== 'index.html' && page.startsWith(href.replace('.html', ''))))) {
      link.classList.add('active');
    }
  });
}

// --- Featured Products on Home Page ---
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-grid');
  if (!grid || !window.products) return;
  const featured = window.products.slice(0, 6);
  grid.innerHTML = featured.map(p => buildProductCard(p)).join('');
}

// --- Shared Product Card Builder ---
function buildProductCard(product) {
  const stars = buildStars(product.rating);
  const badge = product.badge ? `<span class="product-badge ${product.badge.toLowerCase()}">${product.badge}</span>` : '';
  const wishClass = isWishlisted(product.id) ? 'wishlisted' : '';
  const wishIcon = isWishlisted(product.id) ? 'fas fa-heart' : 'far fa-heart';
  return `
    <div class="product-card" data-aos="fade-up">
      <div class="product-img-wrap">
        <div class="gem-img" style="background:${product.image}">
          <div class="gem-shape" style="background:${product.image}"></div>
        </div>
        ${badge}
        <div class="product-actions">
          <button class="action-btn ${wishClass}" data-wishlist-id="${product.id}" title="Wishlist" aria-label="Toggle wishlist">
            <i class="${wishIcon}"></i>
          </button>
          <a href="product.html?id=${product.id}" class="action-btn" title="View Details" aria-label="View details">
            <i class="fas fa-eye"></i>
          </a>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name"><a href="product.html?id=${product.id}" style="color:inherit;text-decoration:none">${product.name}</a></h3>
        <div class="product-carat">${product.carat} Carats · ${product.cut} Cut</div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${product.reviews.length})</span>
        </div>
        <div class="product-pricing">
          <span class="product-price">$${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="product-card-footer">
          <button class="btn-add-cart" onclick="handleAddToCart(${product.id})">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button class="btn-quick-view" onclick="openQuickView(${product.id})">
            Quick View
          </button>
        </div>
      </div>
    </div>`;
}

function buildStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
    '<i class="far fa-star"></i>'.repeat(empty);
}

function handleAddToCart(productId) {
  const product = (window.products || []).find(p => p.id === productId);
  if (!product) return;
  Cart.addItem(product, 1);
  showToast(`${product.name} added to cart!`, 'success');
}

function openQuickView(productId) {
  const product = (window.products || []).find(p => p.id === productId);
  if (!product) return;
  const overlay = document.getElementById('quick-view-modal');
  if (!overlay) return;
  const stars = buildStars(product.rating);
  overlay.querySelector('.modal-category').textContent = product.category.toUpperCase();
  overlay.querySelector('.modal-name').textContent = product.name;
  overlay.querySelector('.modal-price').textContent = '$' + product.price.toLocaleString();
  overlay.querySelector('.modal-desc').textContent = product.description;
  overlay.querySelector('.modal-gem-shape').style.background = product.image;
  overlay.querySelector('.modal-img-side').style.background = product.image;
  overlay.querySelector('.modal-rating').innerHTML = stars;
  overlay.querySelector('.modal-carat').textContent = product.carat + ' ct';
  overlay.querySelector('.modal-cut').textContent = product.cut;
  overlay.querySelector('.modal-color').textContent = product.color;
  overlay.querySelector('.modal-origin').textContent = product.origin;
  overlay.querySelector('.modal-cert').textContent = product.certification;
  overlay.querySelector('.modal-view-link').href = 'product.html?id=' + product.id;
  overlay.querySelector('.modal-add-cart').onclick = function () {
    handleAddToCart(product.id);
    overlay.classList.remove('open');
  };
  overlay.classList.add('open');
}

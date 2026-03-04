/* js/product-detail.js - Product Detail Page Logic */

(function () {
  var currentProduct = null;
  var currentImageIndex = 0;

  function init() {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'));
    if (!id || !window.products) { showNotFound(); return; }
    currentProduct = window.products.find(p => p.id === id);
    if (!currentProduct) { showNotFound(); return; }
    renderProduct();
    renderRelated();
    renderReviews();
    initTabs();
    initQtySelector();
    initWishlistBtn();
    Cart.updateBadge();
    initAOS();
  }

  function showNotFound() {
    var section = document.getElementById('product-detail-section');
    if (section) section.innerHTML = `<div class="container" style="padding:120px 20px;text-align:center"><i class="fas fa-gem" style="font-size:3rem;color:var(--border-color);margin-bottom:20px"></i><h2>Product Not Found</h2><p style="color:var(--text-muted);margin:12px 0 28px">The requested gemstone could not be found.</p><a href="shop.html" class="btn btn-primary">Browse Collection</a></div>`;
  }

  function renderProduct() {
    var p = currentProduct;
    document.title = p.name + ' — Ganapati Gems';
    setEl('product-category-label', p.category.toUpperCase());
    setEl('product-name', p.name);
    setEl('product-price', '$' + p.price.toLocaleString());
    setEl('product-orig-price', p.originalPrice ? '$' + p.originalPrice.toLocaleString() : '');
    setEl('product-desc', p.description);
    setEl('product-carat', p.carat + ' ct');
    setEl('product-cut', p.cut);
    setEl('product-color', p.color);
    setEl('product-origin', p.origin);
    setEl('product-cert', p.certification);
    setEl('spec-carat', p.carat + ' ct');
    setEl('spec-cut', p.cut);
    setEl('spec-color', p.color);
    setEl('spec-origin', p.origin);
    setEl('spec-cert', p.certification);
    setEl('spec-instock', p.inStock ? 'In Stock' : 'Out of Stock');

    var badgeEl = document.getElementById('product-badge');
    if (badgeEl) { badgeEl.textContent = p.badge || ''; badgeEl.style.display = p.badge ? '' : 'none'; }

    var ratingEl = document.getElementById('product-rating-stars');
    if (ratingEl) ratingEl.innerHTML = buildStars(p.rating) + ` <span style="color:var(--text-muted);font-size:0.85rem">${p.rating} (${p.reviews.length} reviews)</span>`;

    var certBadge = document.getElementById('cert-badge');
    if (certBadge) certBadge.textContent = p.certification;

    renderGallery();
    updateAddToCartBtn();
  }

  function renderGallery() {
    var p = currentProduct;
    var mainImg = document.getElementById('main-gem-shape');
    var mainBox = document.getElementById('main-image-box');
    if (mainImg) mainImg.style.background = p.images[0];
    if (mainBox) mainBox.style.background = p.images[0] + ', linear-gradient(135deg, #1a1a2e, #16213e)';

    var thumbsContainer = document.getElementById('thumbnails-row');
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = p.images.map((img, i) => `
      <div class="thumbnail ${i === 0 ? 'active' : ''}" data-index="${i}" style="background:${img}">
        <div class="thumb-gem" style="background:${img}"></div>
      </div>`).join('');

    thumbsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.addEventListener('click', function () {
        currentImageIndex = parseInt(this.dataset.index);
        thumbsContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        var img = p.images[currentImageIndex];
        if (mainImg) mainImg.style.background = img;
        if (mainBox) mainBox.style.background = img + ', linear-gradient(135deg, #1a1a2e, #16213e)';
      });
    });
  }

  function updateAddToCartBtn() {
    var btn = document.getElementById('btn-add-to-cart');
    if (!btn) return;
    if (!currentProduct.inStock) {
      btn.textContent = 'Out of Stock';
      btn.disabled = true;
      btn.style.opacity = '0.5';
    } else {
      btn.onclick = function () {
        var qty = parseInt(document.getElementById('qty-input').value) || 1;
        Cart.addItem(currentProduct, qty);
        showToast(currentProduct.name + ' added to cart!', 'success');
      };
    }
  }

  function initQtySelector() {
    var input = document.getElementById('qty-input');
    var minusBtn = document.getElementById('qty-minus');
    var plusBtn = document.getElementById('qty-plus');
    if (!input) return;
    input.value = 1;
    if (minusBtn) minusBtn.addEventListener('click', function () { var v = parseInt(input.value) || 1; input.value = Math.max(1, v - 1); });
    if (plusBtn) plusBtn.addEventListener('click', function () { var v = parseInt(input.value) || 1; input.value = Math.min(10, v + 1); });
    input.addEventListener('change', function () { this.value = Math.max(1, Math.min(10, parseInt(this.value) || 1)); });
  }

  function initWishlistBtn() {
    var btn = document.getElementById('btn-wishlist');
    if (!btn) return;
    var id = currentProduct.id;
    function updateBtn() {
      var wishlisted = isWishlisted(id);
      btn.classList.toggle('active', wishlisted);
      btn.innerHTML = `<i class="${wishlisted ? 'fas' : 'far'} fa-heart"></i> ${wishlisted ? 'In Wishlist' : 'Add to Wishlist'}`;
    }
    updateBtn();
    btn.addEventListener('click', function () { toggleWishlist(id); updateBtn(); });
  }

  function renderRelated() {
    var container = document.getElementById('related-grid');
    if (!container || !window.products) return;
    var related = window.products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
    if (!related.length) { document.getElementById('related-section').style.display = 'none'; return; }
    container.innerHTML = related.map(p => buildProductCard(p)).join('');
    updateWishlistIcons();
  }

  function renderReviews() {
    var container = document.getElementById('reviews-list');
    if (!container) return;
    var reviews = currentProduct.reviews || [];
    if (!reviews.length) { container.innerHTML = '<p style="color:var(--text-muted)">No reviews yet.</p>'; return; }
    var colors = ['linear-gradient(135deg,#9b59b6,#6c3483)', 'linear-gradient(135deg,#1a6fc4,#0d4a8c)', 'linear-gradient(135deg,#e67e22,#d35400)', 'linear-gradient(135deg,#27ae60,#1e8449)'];
    container.innerHTML = reviews.map((r, i) => `
      <div class="review-card" data-aos="fade-up">
        <div class="review-header">
          <div class="reviewer">
            <div class="reviewer-avatar" style="background:${colors[i % colors.length]}">${r.author[0]}</div>
            <div>
              <div class="reviewer-name">${r.author}</div>
              <div class="review-date">${r.date}</div>
            </div>
          </div>
          <div class="stars">${buildStars(r.rating)}</div>
        </div>
        <p class="review-text">${r.text}</p>
      </div>`).join('');
    var countEl = document.getElementById('reviews-count');
    if (countEl) countEl.textContent = reviews.length + ' Reviews';
  }

  function initTabs() {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        var target = document.getElementById('tab-' + this.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  function setEl(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  document.addEventListener('DOMContentLoaded', init);
})();

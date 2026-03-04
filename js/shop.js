/* js/shop.js - Shop Page Logic */

(function () {
  var currentFilters = {
    category: 'all',
    search: '',
    minPrice: '',
    maxPrice: '',
    color: '',
    cut: '',
    sort: 'newest'
  };

  function init() {
    loadFiltersFromURL();
    renderProducts();
    bindFilters();
    Cart.updateBadge();
    initAOS();
  }

  function loadFiltersFromURL() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('category')) currentFilters.category = params.get('category');
    if (params.get('search')) currentFilters.search = params.get('search');
    if (params.get('sort')) currentFilters.sort = params.get('sort');
    if (params.get('minPrice')) currentFilters.minPrice = params.get('minPrice');
    if (params.get('maxPrice')) currentFilters.maxPrice = params.get('maxPrice');
    applyFilterState();
  }

  function applyFilterState() {
    var catBtn = document.querySelector(`.cat-btn[data-cat="${currentFilters.category}"]`);
    if (catBtn) { document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active')); catBtn.classList.add('active'); }
    var searchEl = document.getElementById('search-input');
    if (searchEl) searchEl.value = currentFilters.search;
    var sortEl = document.getElementById('sort-select');
    if (sortEl) sortEl.value = currentFilters.sort;
    var minEl = document.getElementById('min-price');
    if (minEl) minEl.value = currentFilters.minPrice;
    var maxEl = document.getElementById('max-price');
    if (maxEl) maxEl.value = currentFilters.maxPrice;
    var colorEl = document.getElementById('color-filter');
    if (colorEl) colorEl.value = currentFilters.color;
    var cutEl = document.getElementById('cut-filter');
    if (cutEl) cutEl.value = currentFilters.cut;
  }

  function getFilteredProducts() {
    var products = (window.products || []).slice();
    if (currentFilters.category !== 'all') {
      products = products.filter(p => p.category === currentFilters.category);
    }
    if (currentFilters.search) {
      var q = currentFilters.search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.color.toLowerCase().includes(q));
    }
    if (currentFilters.minPrice !== '') {
      products = products.filter(p => p.price >= parseFloat(currentFilters.minPrice));
    }
    if (currentFilters.maxPrice !== '') {
      products = products.filter(p => p.price <= parseFloat(currentFilters.maxPrice));
    }
    if (currentFilters.color) {
      var c = currentFilters.color.toLowerCase();
      products = products.filter(p => p.color.toLowerCase().includes(c));
    }
    if (currentFilters.cut) {
      products = products.filter(p => p.cut.toLowerCase() === currentFilters.cut.toLowerCase());
    }
    switch (currentFilters.sort) {
      case 'price-asc':  products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   products.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'newest':     products.sort((a, b) => b.id - a.id); break;
      case 'rating':     products.sort((a, b) => b.rating - a.rating); break;
    }
    return products;
  }

  function renderProducts() {
    var grid = document.getElementById('products-grid');
    var countEl = document.getElementById('results-count');
    if (!grid) return;
    var products = getFilteredProducts();
    if (countEl) countEl.innerHTML = `Showing <strong>${products.length}</strong> of <strong>${(window.products || []).length}</strong> gemstones`;
    if (!products.length) {
      grid.innerHTML = `<div class="no-products"><i class="fas fa-gem"></i><h3>No gemstones found</h3><p>Try adjusting your filters or search query.</p><button class="btn btn-outline" onclick="resetFilters()">Reset Filters</button></div>`;
      return;
    }
    grid.innerHTML = products.map(p => buildProductCard(p)).join('');
    updateWishlistIcons();
    initAOS();
  }

  function bindFilters() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilters.category = this.dataset.cat;
        renderProducts();
        updateURL();
      });
    });

    var searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce(function () {
        currentFilters.search = this.value.trim();
        renderProducts();
        updateURL();
      }, 300));
    }

    var sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        currentFilters.sort = this.value;
        renderProducts();
        updateURL();
      });
    }

    var minPrice = document.getElementById('min-price');
    var maxPrice = document.getElementById('max-price');
    if (minPrice) minPrice.addEventListener('input', debounce(function () { currentFilters.minPrice = this.value; renderProducts(); updateURL(); }, 400));
    if (maxPrice) maxPrice.addEventListener('input', debounce(function () { currentFilters.maxPrice = this.value; renderProducts(); updateURL(); }, 400));

    var colorFilter = document.getElementById('color-filter');
    if (colorFilter) colorFilter.addEventListener('change', function () { currentFilters.color = this.value; renderProducts(); updateURL(); });

    var cutFilter = document.getElementById('cut-filter');
    if (cutFilter) cutFilter.addEventListener('change', function () { currentFilters.cut = this.value; renderProducts(); updateURL(); });

    var resetBtn = document.getElementById('reset-filters');
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
  }

  window.resetFilters = function () {
    currentFilters = { category: 'all', search: '', minPrice: '', maxPrice: '', color: '', cut: '', sort: 'newest' };
    applyFilterState();
    renderProducts();
    updateURL();
  };

  function updateURL() {
    var params = new URLSearchParams();
    if (currentFilters.category !== 'all') params.set('category', currentFilters.category);
    if (currentFilters.search) params.set('search', currentFilters.search);
    if (currentFilters.sort !== 'newest') params.set('sort', currentFilters.sort);
    if (currentFilters.minPrice) params.set('minPrice', currentFilters.minPrice);
    if (currentFilters.maxPrice) params.set('maxPrice', currentFilters.maxPrice);
    var newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    history.replaceState(null, '', newUrl);
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      var ctx = this, args = arguments;
      timer = setTimeout(() => fn.apply(ctx, args), delay);
    };
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* js/checkout.js - Checkout Page Logic */

(function () {
  function init() {
    renderOrderSummary();
    bindPaymentToggle();
    bindCardFormatting();
    bindFormSubmit();
    Cart.updateBadge();
    initModalClose();
  }

  function renderOrderSummary() {
    var items = Cart.getItems();
    var listEl = document.getElementById('order-items-list');
    var subtotalEl = document.getElementById('order-subtotal');
    var shippingEl = document.getElementById('order-shipping');
    var taxEl = document.getElementById('order-tax');
    var totalEl = document.getElementById('order-total');
    var formSubtotalEl = document.getElementById('form-subtotal');

    if (!listEl) return;
    if (!items.length) {
      listEl.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px 0">Your cart is empty. <a href="shop.html">Shop now</a></p>';
    } else {
      listEl.innerHTML = items.map(item => `
        <div class="order-item">
          <div class="order-item-img" style="background:${item.image}">
            <div class="order-item-gem" style="background:${item.image}"></div>
          </div>
          <div class="order-item-info">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-qty">Qty: ${item.quantity}</div>
          </div>
          <div class="order-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
        </div>`).join('');
    }

    var subtotal = Cart.getTotal();
    var shipping = subtotal > 500 ? 0 : 25;
    var tax = Math.round(subtotal * 0.08 * 100) / 100;
    var total = subtotal + shipping + tax;

    if (subtotalEl) subtotalEl.textContent = '$' + subtotal.toLocaleString();
    if (formSubtotalEl) formSubtotalEl.textContent = '$' + subtotal.toLocaleString();
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
    if (taxEl) taxEl.textContent = '$' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '$' + total.toLocaleString();
  }

  function bindPaymentToggle() {
    var radios = document.querySelectorAll('input[name="payment"]');
    var ccFields = document.getElementById('cc-fields');
    var paypalMsg = document.getElementById('paypal-msg');
    radios.forEach(radio => {
      radio.addEventListener('change', function () {
        document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
        this.closest('.payment-option').classList.add('selected');
        if (this.value === 'card') {
          if (ccFields) ccFields.classList.add('visible');
          if (paypalMsg) paypalMsg.classList.remove('visible');
        } else {
          if (ccFields) ccFields.classList.remove('visible');
          if (paypalMsg) paypalMsg.classList.add('visible');
        }
      });
    });
    var defaultCard = document.querySelector('input[name="payment"][value="card"]');
    if (defaultCard) { defaultCard.checked = true; defaultCard.dispatchEvent(new Event('change')); }
  }

  function bindCardFormatting() {
    var cardInput = document.getElementById('card-number');
    if (!cardInput) return;
    cardInput.addEventListener('input', function () {
      var digits = this.value.replace(/\D/g, '').slice(0, 16);
      this.value = digits.replace(/(.{4})/g, '$1 ').trim();
    });
    var expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
      expiryInput.addEventListener('input', function () {
        var val = this.value.replace(/\D/g, '').slice(0, 4);
        if (val.length >= 3) this.value = val.slice(0, 2) + '/' + val.slice(2);
        else this.value = val;
      });
    }
    var cvvInput = document.getElementById('card-cvv');
    if (cvvInput) cvvInput.addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 4); });
  }

  function bindFormSubmit() {
    var form = document.getElementById('checkout-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var valid = validateForm(form);
      if (!valid) return;
      placeOrder();
    });
  }

  function clearErrors() {
    document.querySelectorAll('.form-control.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
  }

  function validateForm(form) {
    var valid = true;
    var required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        showFieldError(field, 'This field is required.');
        valid = false;
      }
    });
    var emailField = form.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      showFieldError(emailField, 'Please enter a valid email address.');
      valid = false;
    }
    var paymentType = document.querySelector('input[name="payment"]:checked');
    if (paymentType && paymentType.value === 'card') {
      var cardNum = document.getElementById('card-number');
      if (cardNum && cardNum.value.replace(/\s/g, '').length < 16) {
        showFieldError(cardNum, 'Please enter a valid 16-digit card number.');
        valid = false;
      }
    }
    return valid;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    var msg = field.parentNode.querySelector('.error-msg');
    if (!msg) { msg = document.createElement('div'); msg.className = 'error-msg'; field.parentNode.appendChild(msg); }
    msg.textContent = message;
    msg.classList.add('show');
  }

  function placeOrder() {
    var orderNum = 'RG-' + Date.now().toString().slice(-8);
    var orderNumEl = document.getElementById('order-number');
    if (orderNumEl) orderNumEl.textContent = orderNum;
    Cart.clear();
    renderOrderSummary();
    var modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('open');
  }

  function initModalClose() {
    var modal = document.getElementById('success-modal');
    if (!modal) return;
    modal.querySelector('.modal-close').addEventListener('click', function () {
      modal.classList.remove('open');
      window.location.href = 'index.html';
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) { modal.classList.remove('open'); window.location.href = 'index.html'; }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();

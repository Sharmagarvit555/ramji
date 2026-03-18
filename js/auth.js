/* js/auth.js - Authentication Logic */

(function () {
  var SESSION_KEY = 'ramji_session';
  var USERS_KEY = 'ramji_users';

  function init() {
    if (redirectIfLoggedIn()) return;
    bindTabs();
    bindPasswordToggles();
    bindLoginForm();
    bindRegisterForm();
    updateNavbarUser();
  }

  function redirectIfLoggedIn() {
    if (getSession()) {
      window.location.href = 'index.html';
      return true;
    }
    return false;
  }

  function bindTabs() {
    var tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        document.querySelectorAll('.auth-form').forEach(f => {
          f.classList.remove('active');
          var form = f.querySelector('form');
          if (form) clearErrors(form);
        });
        var target = document.getElementById('form-' + this.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    var switchLinks = document.querySelectorAll('[data-switch-tab]');
    switchLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = this.dataset.switchTab;
        var tab = document.querySelector(`.auth-tab[data-tab="${target}"]`);
        if (tab) tab.click();
      });
    });
  }

  function bindPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        var input = this.previousElementSibling;
        if (!input) return;
        var show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        this.innerHTML = `<i class="fas fa-eye${show ? '-slash' : ''}"></i>`;
      });
    });
  }

  function bindLoginForm() {
    var form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);
      var email = form.querySelector('#login-email').value.trim();
      var password = form.querySelector('#login-password').value;
      var remember = form.querySelector('#remember-me') && form.querySelector('#remember-me').checked;
      if (!email || !password) { showFormError(form, 'Please fill in all fields.'); return; }
      if (!validateEmail(email)) { showFieldError(form.querySelector('#login-email'), 'Please enter a valid email.'); return; }

      var users = getUsers();
      var user = users.find(u => u.email === email && u.password === password);
      if (!user) { showFormError(form, 'Invalid email or password.'); return; }

      setSession({ name: user.name, email: user.email }, remember);
      showToast('Welcome back, ' + user.name.split(' ')[0] + '!', 'success');
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }

  function bindRegisterForm() {
    var form = document.getElementById('register-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);
      var name = form.querySelector('#reg-name').value.trim();
      var email = form.querySelector('#reg-email').value.trim();
      var password = form.querySelector('#reg-password').value;
      var confirmPwd = form.querySelector('#reg-confirm-password').value;
      var terms = form.querySelector('#terms-checkbox') && form.querySelector('#terms-checkbox').checked;

      if (!name || !email || !password || !confirmPwd) { showFormError(form, 'Please fill in all fields.'); return; }
      if (!validateEmail(email)) { showFieldError(form.querySelector('#reg-email'), 'Please enter a valid email.'); return; }
      if (password.length < 6) { showFieldError(form.querySelector('#reg-password'), 'Password must be at least 6 characters.'); return; }
      if (password !== confirmPwd) { showFieldError(form.querySelector('#reg-confirm-password'), 'Passwords do not match.'); return; }
      if (!terms) { showFormError(form, 'Please agree to the Terms of Service.'); return; }

      var users = getUsers();
      if (users.find(u => u.email === email)) { showFieldError(form.querySelector('#reg-email'), 'An account with this email already exists.'); return; }

      users.push({ name, email, password });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setSession({ name, email }, false);
      showToast('Account created! Welcome, ' + name.split(' ')[0] + '!', 'success');
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch (e) { return null; }
  }

  function setSession(user, remember) {
    var data = JSON.stringify(user);
    sessionStorage.setItem(SESSION_KEY, data);
    if (remember) localStorage.setItem(SESSION_KEY, data);
  }

  window.logoutUser = function () {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    showToast('You have been logged out.', 'info');
    setTimeout(() => window.location.href = 'index.html', 1000);
  };

  function updateNavbarUser() {
    if (typeof updateNavbarUserState === 'function') {
      updateNavbarUserState();
    }
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    var group = field.closest('.form-group') || field.parentNode;
    var msg = group.querySelector('.error-msg');
    if (!msg) { msg = document.createElement('div'); msg.className = 'error-msg'; group.appendChild(msg); }
    msg.textContent = message;
    msg.classList.add('show');
  }

  function showFormError(form, message) {
    var alert = form.querySelector('.form-alert');
    if (!alert) {
      alert = document.createElement('div');
      alert.className = 'form-alert';
      alert.style.cssText = 'color:#dc3545;background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.3);border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:0.88rem;';
      form.prepend(alert);
    }
    alert.textContent = message;
  }

  function clearErrors(form) {
    form.querySelectorAll('.form-control.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
    var alert = form.querySelector('.form-alert');
    if (alert) alert.remove();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  document.addEventListener('DOMContentLoaded', init);
})();

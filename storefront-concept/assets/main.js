// Alhisan Alriyadi — storefront concept behavior (language toggle, drawers, filter sheet)
(function () {
  'use strict';

  var STORAGE_KEY = 'alhisan-lang';

  function applyLang(lang) {
    var root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-ar]').forEach(function (el) {
      var value = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value === null) return;
      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), value);
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var initial = saved || document.documentElement.lang || 'ar';
    applyLang(initial);

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang'));
      });
    });
  }

  function initDrawer() {
    var openBtn = document.querySelector('[data-drawer-open]');
    var closeBtn = document.querySelector('[data-drawer-close]');
    var drawer = document.querySelector('.mobile-drawer');
    var overlay = document.querySelector('[data-overlay]');
    if (!openBtn || !drawer || !overlay) return;

    function open() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function initFilterSheet() {
    var openBtn = document.querySelector('[data-filter-open]');
    var closeBtn = document.querySelector('[data-filter-close]');
    var applyBtn = document.querySelector('[data-filter-apply]');
    var sheet = document.querySelector('.filter-sheet');
    var overlay = document.querySelector('[data-filter-overlay]');
    if (!openBtn || !sheet) return;

    function open() {
      sheet.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sheet.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (applyBtn) applyBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
  }

  function initAnnouncement() {
    var bar = document.querySelector('.announcement');
    var closeBtn = document.querySelector('.announcement__close');
    if (!bar || !closeBtn) return;
    closeBtn.addEventListener('click', function () {
      bar.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initDrawer();
    initFilterSheet();
    initAnnouncement();
  });
})();

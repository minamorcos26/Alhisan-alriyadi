// Alhisan Alriyadi — theme behavior (nav drawer, filters, announcement, product gallery)
(function () {
  'use strict';

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
    overlay.addEventListener('click', function () {
      close();
      closeFilters();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); closeFilters(); }
    });
  }

  var filtersEl = null;
  function closeFilters() {
    if (filtersEl) filtersEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initFilters() {
    var openBtn = document.querySelector('[data-filter-open]');
    var closeBtn = document.querySelector('[data-filter-close]');
    var applyBtn = document.querySelector('[data-filter-apply]');
    filtersEl = document.querySelector('[data-filters]');
    var overlay = document.querySelector('[data-overlay]');
    if (!openBtn || !filtersEl) return;

    function open() {
      filtersEl.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', closeFilters);
    if (applyBtn) applyBtn.addEventListener('click', function () {
      var form = document.getElementById('facets');
      if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
    });
  }

  function initSortAutoSubmit() {
    var select = document.querySelector('[data-sort-select]');
    if (!select) return;
    select.addEventListener('change', function () {
      var form = document.getElementById('facets');
      if (form) form.requestSubmit ? form.requestSubmit() : form.submit();
    });
  }

  function initAnnouncement() {
    var bar = document.querySelector('[data-announcement]');
    var closeBtn = document.querySelector('[data-announcement-close]');
    if (!bar || !closeBtn) return;
    closeBtn.addEventListener('click', function () {
      bar.style.display = 'none';
    });
  }

  function initProductGallery() {
    var mainImg = document.querySelector('.product-detail__media > img');
    var thumbs = document.querySelectorAll('[data-thumb]');
    if (!mainImg || !thumbs.length) return;
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        mainImg.src = thumb.getAttribute('data-src');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDrawer();
    initFilters();
    initSortAutoSubmit();
    initAnnouncement();
    initProductGallery();
  });
})();

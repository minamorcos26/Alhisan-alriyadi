// Alhisan Alriyadi — theme behavior (nav drawer, filters, quick-add, product gallery/zoom)
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
      if (e.key === 'Escape') { close(); closeFilters(); closeZoom(); }
    });
  }

  function initDrawerAccordion() {
    var groups = document.querySelectorAll('[data-accordion-toggle]');
    groups.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var group = toggle.closest('[data-accordion-group]');
        if (!group) return;
        var isOpen = group.classList.contains('is-open');
        // Close sibling groups for a clean single-open accordion
        var parent = group.parentElement;
        if (parent) {
          parent.querySelectorAll('[data-accordion-group].is-open').forEach(function (openGroup) {
            if (openGroup !== group) {
              openGroup.classList.remove('is-open');
              var t = openGroup.querySelector('[data-accordion-toggle]');
              if (t) t.setAttribute('aria-expanded', 'false');
            }
          });
        }
        group.classList.toggle('is-open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
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

  function updateCartCount(count) {
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  function initQuickAdd() {
    document.querySelectorAll('.product-card__form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('.product-card__cart-btn');
        if (!btn || btn.disabled) return;
        var originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.classList.add('is-loading');

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            id: form.querySelector('input[name="id"]').value,
            quantity: 1
          })
        })
          .then(function (res) {
            if (!res.ok) return res.json().then(function (err) { throw err; });
            return res.json();
          })
          .then(function () {
            return fetch('/cart.js').then(function (r) { return r.json(); });
          })
          .then(function (cart) {
            updateCartCount(cart.item_count);
            btn.classList.remove('is-loading');
            btn.classList.add('is-added');
            btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg> ' + (btn.getAttribute('data-added-label') || 'Added');
            setTimeout(function () {
              btn.classList.remove('is-added');
              btn.innerHTML = originalHtml;
              btn.disabled = false;
            }, 1600);
          })
          .catch(function () {
            // Fall back to a normal form submission (full page) if the AJAX call fails
            btn.disabled = false;
            btn.classList.remove('is-loading');
            HTMLFormElement.prototype.submit.call(form);
          });
      });
    });
  }

  function initQtyStepper() {
    document.querySelectorAll('.qty-stepper').forEach(function (stepper) {
      var input = stepper.querySelector('.qty-stepper__input');
      var dec = stepper.querySelector('[data-qty-decrease]');
      var inc = stepper.querySelector('[data-qty-increase]');
      if (!input) return;
      if (dec) dec.addEventListener('click', function () {
        var v = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
        input.value = v;
      });
      if (inc) inc.addEventListener('click', function () {
        var v = (parseInt(input.value, 10) || 1) + 1;
        input.value = v;
      });
    });
  }

  var zoomOverlay = null;
  function closeZoom() {
    if (zoomOverlay) zoomOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initProductGallery() {
    var mainImg = document.querySelector('.product-detail__media > img');
    var thumbs = document.querySelectorAll('[data-thumb]');
    if (!mainImg) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        mainImg.src = thumb.getAttribute('data-src');
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
      });
    });

    // Click-to-zoom lightbox
    zoomOverlay = document.querySelector('[data-zoom-overlay]');
    var zoomImg = document.querySelector('[data-zoom-image]');
    var trigger = document.querySelector('[data-zoom-trigger]');
    if (!zoomOverlay || !zoomImg) return;

    function openZoom() {
      zoomImg.src = mainImg.getAttribute('data-zoom-src') || mainImg.src;
      zoomOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    if (trigger) trigger.addEventListener('click', openZoom);
    mainImg.addEventListener('click', openZoom);
    zoomOverlay.addEventListener('click', closeZoom);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDrawer();
    initDrawerAccordion();
    initFilters();
    initSortAutoSubmit();
    initAnnouncement();
    initQuickAdd();
    initProductGallery();
    initQtyStepper();
  });
})();

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
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); closeZoom(); }
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

  function initSortAutoSubmit() {
    var select = document.querySelector('[data-sort-select]');
    if (!select) return;
    select.addEventListener('change', function () {
      var opt = select.options[select.selectedIndex];
      var params = new URLSearchParams();
      if (opt.dataset.filterParam) {
        params.set(opt.dataset.filterParam, opt.dataset.filterValue);
      } else if (opt.dataset.sort) {
        params.set('sort_by', opt.dataset.sort);
      }
      var base = (select.form && select.form.getAttribute('action')) || window.location.pathname;
      window.location.href = base + (params.toString() ? '?' + params.toString() : '');
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

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function formatMoney(cents, format) {
    format = format || window.themeMoneyFormat || '{{amount}}';
    var value = (cents / 100).toFixed(2);
    var noDecimals = Math.round(cents / 100).toString();
    var withComma = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    var withSpace = value.replace('.', ' ');
    return format
      .replace('{{amount_no_decimals}}', noDecimals)
      .replace('{{amount_with_comma_separator}}', withComma)
      .replace('{{amount_with_space_separator}}', withSpace)
      .replace('{{amount}}', value);
  }

  var VAT_RATE = 1.15; // Standard Saudi VAT — prices are tax-inclusive on this store

  function renderCartDrawer(cart) {
    var drawer = document.querySelector('[data-cart-drawer]');
    var body = document.querySelector('[data-cart-drawer-body]');
    var foot = document.querySelector('[data-cart-drawer-foot]');
    if (!drawer || !body || !foot) return;
    var str = drawer.dataset;

    if (!cart.items.length) {
      body.innerHTML = '<div class="cart-drawer__empty"><p>' + escapeHtml(str.strEmpty) + '</p><a href="' + str.allProductsUrl + '" class="btn btn-primary">' + escapeHtml(str.strContinue) + '</a></div>';
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = '<ul class="cart-drawer__list">' + cart.items.map(function (item) {
      var variantLine = (item.variant_title && item.variant_title !== 'Default Title')
        ? '<div class="cart-drawer__variant">' + escapeHtml(item.variant_title) + '</div>' : '';
      return '' +
        '<li class="cart-drawer__row" data-cart-drawer-item data-key="' + item.key + '">' +
          '<a href="' + item.url + '" class="cart-drawer__media">' + (item.image ? '<img src="' + item.image.replace(/(\.[a-z0-9]+)(\?|$)/i, '_200x$1$2') + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' : '') + '</a>' +
          '<div class="cart-drawer__info">' +
            '<a href="' + item.url + '" class="cart-drawer__title">' + escapeHtml(item.product_title) + '</a>' +
            variantLine +
            '<div class="qty-stepper qty-stepper--sm" data-drawer-qty>' +
              '<button type="button" class="qty-stepper__btn" data-drawer-qty-decrease aria-label="Decrease quantity">&minus;</button>' +
              '<input type="number" class="qty-stepper__input" value="' + item.quantity + '" min="0" data-drawer-qty-input>' +
              '<button type="button" class="qty-stepper__btn" data-drawer-qty-increase aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<button type="button" class="cart-drawer__remove" data-drawer-remove>' + escapeHtml(str.strRemove) + '</button>' +
          '</div>' +
          '<div class="cart-drawer__total">' + formatMoney(item.final_line_price) + '</div>' +
        '</li>';
    }).join('') + '</ul>';

    var totalIncl = cart.total_price;
    var subtotalExcl = Math.round(totalIncl / VAT_RATE);
    var taxAmount = totalIncl - subtotalExcl;
    var discountHtml = '';
    if (cart.cart_level_discount_applications && cart.cart_level_discount_applications.length) {
      discountHtml = cart.cart_level_discount_applications.map(function (d) {
        return '<div class="cart-drawer__totals-row cart-drawer__totals-row--discount"><span>' + escapeHtml(d.title) + '</span><span>&minus;' + formatMoney(d.total_allocated_amount) + '</span></div>';
      }).join('');
    }

    foot.innerHTML = '' +
      '<form class="coupon-form" data-coupon-form>' +
        '<input type="text" name="coupon" placeholder="' + escapeHtml(str.strCouponPlaceholder) + '" class="coupon-form__input" autocomplete="off">' +
        '<button type="submit" class="btn btn-ghost coupon-form__btn">' + escapeHtml(str.strApply) + '</button>' +
      '</form>' +
      '<div class="cart-drawer__totals">' +
        '<div class="cart-drawer__totals-row"><span>' + escapeHtml(str.strSubtotalExcl) + '</span><span>' + formatMoney(subtotalExcl) + '</span></div>' +
        discountHtml +
        '<div class="cart-drawer__totals-row"><span>' + escapeHtml(str.strVat) + '</span><span>' + formatMoney(taxAmount) + '</span></div>' +
        '<div class="cart-drawer__totals-row cart-drawer__totals-row--total"><span>' + escapeHtml(str.strTotal) + '</span><span>' + formatMoney(totalIncl) + '</span></div>' +
      '</div>' +
      '<a href="/checkout" class="btn btn-primary btn-block">' + escapeHtml(str.strCheckout) + '</a>' +
      '<a href="' + str.cartUrl + '" class="cart-drawer__view-cart">' + escapeHtml(str.strViewCart) + '</a>';

    initCouponForms();
    wireDrawerRowEvents();
  }

  function fetchCart() {
    return fetch('/cart.js', { headers: { Accept: 'application/json' } }).then(function (r) { return r.json(); });
  }

  function refreshCartDrawer() {
    return fetchCart().then(function (cart) {
      updateCartCount(cart.item_count);
      renderCartDrawer(cart);
      return cart;
    });
  }

  function wireDrawerRowEvents() {
    document.querySelectorAll('[data-cart-drawer-item]').forEach(function (row) {
      var key = row.getAttribute('data-key');
      var input = row.querySelector('[data-drawer-qty-input]');
      var dec = row.querySelector('[data-drawer-qty-decrease]');
      var inc = row.querySelector('[data-drawer-qty-increase]');
      var removeBtn = row.querySelector('[data-drawer-remove]');

      function changeQty(qty) {
        row.classList.add('is-updating');
        fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: key, quantity: qty })
        })
          .then(function (res) { return res.json(); })
          .then(function () { return refreshCartDrawer(); })
          .catch(function () { row.classList.remove('is-updating'); });
      }

      if (dec) dec.addEventListener('click', function () {
        var v = Math.max(0, (parseInt(input.value, 10) || 1) - 1);
        changeQty(v);
      });
      if (inc) inc.addEventListener('click', function () {
        changeQty((parseInt(input.value, 10) || 1) + 1);
      });
      if (input) input.addEventListener('change', function () {
        changeQty(Math.max(0, parseInt(input.value, 10) || 0));
      });
      if (removeBtn) removeBtn.addEventListener('click', function () { changeQty(0); });
    });
  }

  function initCouponForms() {
    document.querySelectorAll('[data-coupon-form]').forEach(function (form) {
      if (form.dataset.wired) return;
      form.dataset.wired = 'true';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[name="coupon"]');
        var code = input && input.value.trim();
        if (!code) return;
        window.location.href = '/discount/' + encodeURIComponent(code) + '?redirect=' + encodeURIComponent('/cart');
      });
    });
  }

  function openCartDrawer() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-drawer-overlay]');
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    var drawer = document.querySelector('[data-cart-drawer]');
    var overlay = document.querySelector('[data-cart-drawer-overlay]');
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function initCartDrawer() {
    var drawer = document.querySelector('[data-cart-drawer]');
    if (!drawer) return;
    var overlay = document.querySelector('[data-cart-drawer-overlay]');
    var closeBtn = drawer.querySelector('[data-cart-drawer-close]');

    document.querySelectorAll('[data-cart-drawer-open]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openCartDrawer();
        refreshCartDrawer();
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (overlay) overlay.addEventListener('click', closeCartDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCartDrawer();
    });
  }

  function addToCart(id, quantity, btn) {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: id, quantity: quantity || 1 })
    }).then(function (res) {
      if (!res.ok) return res.json().then(function (err) { throw err; });
      return res.json();
    });
  }

  function initQuickAdd() {
    // Delegated on document (not per-form) so product cards appended later by
    // infinite scroll are covered without needing to be re-initialized.
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('.product-card__form');
      if (!form) return;
      e.preventDefault();
      var btn = form.querySelector('.product-card__cart-btn');
      if (!btn || btn.disabled) return;
      var originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.classList.add('is-loading');

      addToCart(form.querySelector('input[name="id"]').value, 1)
        .then(function () {
          btn.classList.remove('is-loading');
          btn.classList.add('is-added');
          btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg> ' + (btn.getAttribute('data-added-label') || 'Added');
          setTimeout(function () {
            btn.classList.remove('is-added');
            btn.innerHTML = originalHtml;
            btn.disabled = false;
          }, 1600);
          openCartDrawer();
          return refreshCartDrawer();
        })
        .catch(function () {
          // Fall back to a normal form submission (full page) if the AJAX call fails
          btn.disabled = false;
          btn.classList.remove('is-loading');
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  }

  function initPdpAddToCart() {
    var form = document.querySelector('.product-detail__form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[data-add-to-cart]');
      var idInput = form.querySelector('input[name="id"]');
      var qtyInput = form.querySelector('input[name="quantity"]');
      if (!btn || btn.disabled || !idInput) return;
      btn.disabled = true;

      addToCart(idInput.value, parseInt(qtyInput && qtyInput.value, 10) || 1)
        .then(function () {
          btn.disabled = false;
          openCartDrawer();
          return refreshCartDrawer();
        })
        .catch(function () {
          btn.disabled = false;
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  }

  function initInfiniteScroll() {
    document.querySelectorAll('[data-infinite-scroll]').forEach(function (container) {
      var grid = container.querySelector('[data-infinite-grid]');
      var sentinel = container.querySelector('[data-infinite-sentinel]');
      var nextUrl = container.getAttribute('data-next-url');
      var loading = false;
      if (!grid || !sentinel || !nextUrl) return;

      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) loadNext();
      }, { rootMargin: '600px' });

      function loadNext() {
        if (!nextUrl || loading) return;
        loading = true;
        sentinel.classList.add('is-loading');
        fetch(nextUrl)
          .then(function (res) { return res.text(); })
          .then(function (html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var newGrid = doc.querySelector('[data-infinite-grid]');
            var newContainer = doc.querySelector('[data-infinite-scroll]');
            if (newGrid) {
              Array.prototype.slice.call(newGrid.children).forEach(function (child) {
                grid.appendChild(child);
              });
            }
            nextUrl = newContainer ? newContainer.getAttribute('data-next-url') : '';
            loading = false;
            sentinel.classList.remove('is-loading');
            if (!nextUrl) observer.disconnect();
          })
          .catch(function () {
            loading = false;
            sentinel.classList.remove('is-loading');
          });
      }

      observer.observe(sentinel);
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
    var mainImg = document.querySelector('.product-detail__main-image img');
    var thumbs = document.querySelectorAll('[data-thumb]');
    if (!mainImg) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        // The main image carries a srcset from the initial render; browsers prefer
        // srcset over src, so it must be cleared or the swap silently has no effect.
        mainImg.removeAttribute('srcset');
        mainImg.removeAttribute('sizes');
        mainImg.src = thumb.getAttribute('data-src');
        mainImg.setAttribute('data-zoom-src', thumb.getAttribute('data-src'));
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

  function initHeroSlider() {
    var slider = document.querySelector('[data-hero-slider]');
    if (!slider) return;
    var track = slider.querySelector('[data-slider-track]');
    if (!track || track.children.length < 2) return;
    var slideCount = track.children.length;
    var dots = slider.querySelectorAll('[data-slider-dot]');
    var prevBtn = slider.querySelector('[data-slider-prev]');
    var nextBtn = slider.querySelector('[data-slider-next]');
    var index = 0;
    var autoplayMs = parseInt(slider.getAttribute('data-autoplay'), 10) || 0;
    var timer = null;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === index); });
    }
    function goTo(i) {
      index = (i + slideCount) % slideCount;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function startAutoplay() {
      if (!autoplayMs || reduceMotion) return;
      stopAutoplay();
      timer = setInterval(next, autoplayMs);
    }
    function stopAutoplay() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAutoplay(); });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.getAttribute('data-index'), 10) || 0);
        startAutoplay();
      });
    });

    var startX = 0, deltaX = 0, dragging = false;
    track.addEventListener('pointerdown', function (e) {
      dragging = true;
      startX = e.clientX;
      stopAutoplay();
    });
    track.addEventListener('pointermove', function (e) {
      if (dragging) deltaX = e.clientX - startX;
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > 50) { deltaX < 0 ? next() : prev(); }
      deltaX = 0;
      startAutoplay();
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointerleave', endDrag);
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    render();
    startAutoplay();
  }

  function initVariantPicker() {
    document.querySelectorAll('[data-product-json]').forEach(function (scriptEl) {
      var product;
      try { product = JSON.parse(scriptEl.textContent); } catch (e) { return; }
      var root = scriptEl.closest('[data-product-root]');
      if (!root || !product.options || !product.variants) return;

      var idInput = root.querySelector('[data-variant-id]');
      var submitBtn = root.querySelector('[data-add-to-cart]');
      var mainImg = root.querySelector('.product-detail__main-image img');
      var selected = {};

      root.querySelectorAll('[data-option-name].is-selected').forEach(function (el) {
        selected[el.getAttribute('data-option-name')] = el.getAttribute('data-value');
      });

      function findVariant() {
        return product.variants.filter(function (variant) {
          return product.options.every(function (name, i) {
            var key = 'option' + (i + 1);
            return !(name in selected) || selected[name] === variant[key];
          });
        })[0];
      }

      function updateUI() {
        var variant = findVariant();
        if (!variant) return;
        if (idInput) idInput.value = variant.id;
        if (submitBtn) {
          submitBtn.disabled = !variant.available;
          submitBtn.textContent = variant.available
            ? submitBtn.getAttribute('data-label-available')
            : submitBtn.getAttribute('data-label-unavailable');
        }
        if (mainImg && variant.featured_image && variant.featured_image.src) {
          // The main image carries a srcset from the initial render; browsers prefer
          // srcset over src, so it must be cleared or the swap silently has no effect.
          mainImg.removeAttribute('srcset');
          mainImg.removeAttribute('sizes');
          mainImg.src = variant.featured_image.src;
          mainImg.setAttribute('data-zoom-src', variant.featured_image.src);
        }
      }

      root.querySelectorAll('[data-option-name]').forEach(function (el) {
        el.addEventListener('click', function () {
          var name = el.getAttribute('data-option-name');
          var value = el.getAttribute('data-value');
          root.querySelectorAll('[data-option-name="' + name + '"]').forEach(function (sib) {
            sib.classList.remove('is-selected');
          });
          el.classList.add('is-selected');
          var group = el.closest('.product-option');
          var label = group && group.querySelector('[data-selected-label]');
          if (label) label.textContent = value;
          selected[name] = value;
          updateUI();
        });
      });
    });
  }

  function initProductSwiper() {
    document.querySelectorAll('[data-product-swiper]').forEach(function (swiper) {
      var track = swiper.querySelector('[data-swiper-track]');
      var prevBtn = swiper.querySelector('[data-swiper-prev]');
      var nextBtn = swiper.querySelector('[data-swiper-next]');
      if (!track) return;

      function step() {
        var item = track.querySelector('.product-swiper__item');
        var itemWidth = item ? item.getBoundingClientRect().width : track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
        return itemWidth + gap;
      }
      function dirMultiplier() {
        return getComputedStyle(track).direction === 'rtl' ? -1 : 1;
      }
      if (prevBtn) prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -step() * dirMultiplier(), behavior: 'smooth' });
      });
      if (nextBtn) nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: step() * dirMultiplier(), behavior: 'smooth' });
      });
    });
  }

  function initStickyAtc() {
    var bar = document.querySelector('[data-sticky-atc]');
    var trigger = document.querySelector('[data-add-to-cart]');
    if (!bar || !trigger) return;

    var stickyBtn = bar.querySelector('[data-sticky-atc-btn]');
    if (stickyBtn) stickyBtn.addEventListener('click', function () { trigger.click(); });

    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      var scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      bar.classList.toggle('is-visible', scrolledPast);
    }, { threshold: 0 });
    observer.observe(trigger);
  }

  function initSizeGuide() {
    var trigger = document.querySelector('[data-size-guide-trigger]');
    var overlay = document.querySelector('[data-size-guide-overlay]');
    var closeBtn = document.querySelector('[data-size-guide-close]');
    if (!trigger || !overlay) return;

    function open() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDrawer();
    initDrawerAccordion();
    initSortAutoSubmit();
    initAnnouncement();
    initQuickAdd();
    initProductGallery();
    initQtyStepper();
    initHeroSlider();
    initVariantPicker();
    initSizeGuide();
    initCartDrawer();
    initPdpAddToCart();
    initInfiniteScroll();
    initCouponForms();
    initProductSwiper();
    initStickyAtc();
  });
})();

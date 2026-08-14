/* Astro International — clean static site behaviour. Vanilla JS, no deps. */
(function () {
  'use strict';

  /* Sticky header glass-on-scroll */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile drawer */
  var drawer = document.getElementById('drawer');
  var overlay = document.getElementById('drawer-overlay');
  function openDrawer() { if (drawer) { drawer.classList.add('open'); overlay.classList.add('open'); } }
  function closeDrawer() { if (drawer) { drawer.classList.remove('open'); overlay.classList.remove('open'); } }
  var menuBtn = document.querySelector('[data-menu-open]');
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  document.querySelectorAll('[data-menu-close]').forEach(function (el) {
    el.addEventListener('click', closeDrawer);
  });

  /* Search bar toggle */
  var searchBar = document.getElementById('search-bar');
  var searchBtn = document.querySelector('[data-search-toggle]');
  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', function () {
      var open = searchBar.classList.toggle('open');
      if (open) { var i = searchBar.querySelector('input'); if (i) i.focus(); }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); if (searchBar) searchBar.classList.remove('open'); }
  });

  /* Reveal-on-scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Demo form handling — static site, so just show the success state */
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successId = form.getAttribute('data-success');
      var success = successId ? document.getElementById(successId) : null;
      if (success) {
        form.style.display = 'none';
        success.style.display = '';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* Reset-to-form buttons on success panels */
  document.querySelectorAll('[data-reset-form]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-reset-form');
      var form = document.getElementById(id);
      var success = document.getElementById(btn.getAttribute('data-success'));
      if (form) { form.reset(); form.style.display = ''; }
      if (success) success.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* Product list: category filter + search + sort (client-side) */
  var productGrid = document.getElementById('product-grid');
  if (productGrid) {
    var cards = Array.prototype.slice.call(productGrid.querySelectorAll('[data-name]'));
    var searchInput = document.getElementById('product-search');
    var sortSelect = document.getElementById('product-sort');
    var filterBtns = document.querySelectorAll('[data-filter]');
    var activeCat = 'all';
    var empty = document.getElementById('product-empty');

    function apply() {
      var q = (searchInput && searchInput.value || '').toLowerCase().trim();
      var visible = 0;
      cards.forEach(function (c) {
        var okCat = activeCat === 'all' || c.getAttribute('data-category') === activeCat;
        var hay = (c.getAttribute('data-name') + ' ' + c.getAttribute('data-desc')).toLowerCase();
        var okSearch = !q || hay.indexOf(q) !== -1;
        var show = okCat && okSearch;
        c.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? '' : 'none';
      if (sortSelect && sortSelect.value === 'name') {
        var sorted = cards.slice().sort(function (a, b) {
          return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        });
        sorted.forEach(function (c) { productGrid.appendChild(c); });
      }
    }
    if (searchInput) searchInput.addEventListener('input', apply);
    if (sortSelect) sortSelect.addEventListener('change', apply);
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCat = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        apply();
      });
    });
  }

  /* Downloads list: type filter + search */
  var dlGrid = document.getElementById('dl-grid');
  if (dlGrid) {
    var dls = Array.prototype.slice.call(dlGrid.querySelectorAll('[data-title]'));
    var dlSearch = document.getElementById('dl-search');
    var dlType = document.getElementById('dl-type');
    var dlEmpty = document.getElementById('dl-empty');
    function applyDl() {
      var q = (dlSearch && dlSearch.value || '').toLowerCase().trim();
      var t = dlType && dlType.value || 'all';
      var visible = 0;
      dls.forEach(function (c) {
        var okType = t === 'all' || c.getAttribute('data-doctype') === t;
        var hay = (c.getAttribute('data-title') + ' ' + c.getAttribute('data-desc')).toLowerCase();
        var okSearch = !q || hay.indexOf(q) !== -1;
        var show = okType && okSearch;
        c.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (dlEmpty) dlEmpty.style.display = visible === 0 ? '' : 'none';
    }
    if (dlSearch) dlSearch.addEventListener('input', applyDl);
    if (dlType) dlType.addEventListener('change', applyDl);
  }

  /* Enquiry modal */
  var eOverlay = document.getElementById('enquiry-overlay');
  var eModal = document.getElementById('enquiry-modal');
  if (eModal) {
    var eBody = document.getElementById('enquiry-body');
    var eSuccess = document.getElementById('enquiry-success');
    var eForm = document.getElementById('enquiry-form');
    var eInterest = document.getElementById('enquiry-interest');
    var eTitle = document.getElementById('enquiry-title');

    function openEnquiry(interest) {
      if (eBody) eBody.style.display = '';
      if (eSuccess) eSuccess.style.display = 'none';
      if (eForm) eForm.reset();
      if (eInterest) eInterest.value = interest || '';
      if (eTitle) eTitle.textContent = interest ? ('Enquire About ' + interest) : 'Request Information';
      eOverlay.classList.add('open');
      eModal.classList.add('open');
      document.body.classList.add('modal-open');
      var first = eModal.querySelector('input:not([readonly])');
      if (first) setTimeout(function () { first.focus(); }, 60);
    }
    function closeEnquiry() {
      eOverlay.classList.remove('open');
      eModal.classList.remove('open');
      document.body.classList.remove('modal-open');
    }

    document.querySelectorAll('[data-enquiry]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openEnquiry(el.getAttribute('data-enquiry'));
      });
    });
    document.querySelectorAll('[data-enquiry-close]').forEach(function (el) {
      el.addEventListener('click', closeEnquiry);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && eModal.classList.contains('open')) closeEnquiry();
    });
    if (eForm) {
      eForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (eBody) eBody.style.display = 'none';
        if (eSuccess) eSuccess.style.display = '';
      });
    }
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Shared behaviour for every page: theme toggle, mobile menu, header border,
// scroll reveal. The initial theme is set by an inline script in <head> so the
// page never flashes the wrong colours; this file only handles changes.
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode: theme just won't persist */ }
  }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });
  }

  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('primary-nav');
  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    };
    menuBtn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    // Anchor links on the home page scroll in place, so the menu has to close
    // itself or it would sit over the section the user just jumped to.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

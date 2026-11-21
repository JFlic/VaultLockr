// Home-page-only behaviour. main.js still owns the menu, header and reveal;
// this adds the three things only the home page has.
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pattern faces: drawn from one data-path string so the markup stays readable
  // and the 25 dots are not hand-written twice.
  document.querySelectorAll('.face svg[data-path]').forEach(function (svg) {
    var pts = svg.getAttribute('data-path').trim().split(/\s+/);
    var hit = {};
    pts.forEach(function (p) { hit[p] = true; });
    for (var y = 20; y <= 180; y += 40) {
      for (var x = 20; x <= 180; x += 40) {
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', hit[x + ',' + y] ? 9 : 6);
        c.setAttribute('class', hit[x + ',' + y] ? 'hit' : 'grid-dot');
        svg.appendChild(c);
      }
    }
    var line = document.createElementNS(NS, 'polyline');
    line.setAttribute('points', pts.join(' '));
    line.setAttribute('class', 'trace');
    svg.appendChild(line);
  });

  // Hero lock screen: 5x5 grid like the app's, with the points the drawn
  // trace passes through picked out so the pattern reads at thumbnail size.
  var lsDots = document.querySelector('.lock-screen .ls-dots');
  var lsTrace = document.querySelector('.lock-screen .ls-trace');
  if (lsDots && lsTrace) {
    var onPath = {};
    lsTrace.getAttribute('points').split(/\s+/).forEach(function (p) { onPath[p] = true; });
    for (var r = 0; r < 5; r++) {
      for (var c = 0; c < 5; c++) {
        var x = 65 + 65 * c, y = 330 + 65 * r, key = x + ',' + y;
        if (onPath[key]) {
          var halo = document.createElementNS(NS, 'circle');
          halo.setAttribute('cx', x); halo.setAttribute('cy', y); halo.setAttribute('r', 21);
          halo.setAttribute('fill', '#d1e043'); halo.setAttribute('class', 'ls-halo');
          lsDots.appendChild(halo);
        }
        var d = document.createElementNS(NS, 'circle');
        d.setAttribute('cx', x); d.setAttribute('cy', y); d.setAttribute('r', onPath[key] ? 11 : 9);
        if (onPath[key]) d.setAttribute('fill', '#5b6f00');
        lsDots.appendChild(d);
      }
    }
  }

  // Sticky step index: highlights whichever step sits in the middle band of
  // the viewport, the way granola's before/during/after list does.
  var links = document.querySelectorAll('.flow-nav a');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        var a = byId[e.target.id];
        if (a) a.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('.flow-step').forEach(function (s) { io.observe(s); });
  }

  // Typed line in the lime card, standing in for granola's chat prompt.
  var q = document.querySelector('.lime-card .q[data-type]');
  if (q) {
    var lines = q.getAttribute('data-type').split('|');
    if (reduce) { q.textContent = lines[0]; return; }
    var li = 0, ci = 0, deleting = false;
    (function tick() {
      var full = lines[li];
      ci += deleting ? -1 : 1;
      q.textContent = full.slice(0, ci);
      var wait = deleting ? 22 : 48;
      if (!deleting && ci === full.length) { deleting = true; wait = 1800; }
      else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; wait = 400; }
      setTimeout(tick, wait);
    })();
  }
})();

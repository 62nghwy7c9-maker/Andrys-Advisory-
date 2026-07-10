/* Andrys Advisory — Interaktion im „Arctic“-System (siehe DESIGN-SYSTEM.md) */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Navigation: Scroll-Zustand + Mobile-Menü ---- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  if (nav && !nav.classList.contains("is-scrolled")) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Scroll-Reveals ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Kennzahlen zählen hoch ---- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reducedMotion || !isFinite(target)) { el.textContent = String(target); return; }
    var start = null;
    var dur = 1400;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---- Text-„Decode“ (Scramble) ---- */
  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—+";
  function scramble(el) {
    var original = el.dataset.originalText || el.textContent;
    el.dataset.originalText = original;
    if (reducedMotion) { el.textContent = original; return; }
    var frame = 0;
    var total = Math.max(14, original.length * 1.6);
    if (el._scrambleTimer) clearInterval(el._scrambleTimer);
    el._scrambleTimer = setInterval(function () {
      var out = "";
      for (var i = 0; i < original.length; i++) {
        var ch = original[i];
        if (ch === " ") { out += ch; continue; }
        var settled = (frame / total) * original.length;
        out += i < settled ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      frame++;
      if (frame > total) {
        clearInterval(el._scrambleTimer);
        el._scrambleTimer = null;
        el.textContent = original;
      }
    }, 28);
  }

  var scrambleEls = document.querySelectorAll("[data-scramble]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var scramObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          scramble(entry.target);
          scramObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    scrambleEls.forEach(function (el) { scramObs.observe(el); });
  }

  document.querySelectorAll("[data-scramble-hover]").forEach(function (el) {
    el.addEventListener("mouseenter", function () { scramble(el); });
  });

  /* ---- Signature: Drahtgitter-Kristall mit Tiefennebel ---- */
  var canvas = document.getElementById("crystal");
  if (canvas && canvas.getContext && !reducedMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;

    var resize = function () {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Ikosaeder: 12 Ecken, 30 Kanten */
    var t = (1 + Math.sqrt(5)) / 2;
    var V = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ].map(function (v) {
      var l = Math.hypot(v[0], v[1], v[2]);
      return [v[0] / l, v[1] / l, v[2] / l];
    });
    var E = [
      [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],[2,3],
      [2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],[4,5],[4,9],
      [4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],[7,10],[8,9],[10,11]
    ];

    /* Partikel-Drift („Schneestaub“) */
    var P = [];
    for (var i = 0; i < 60; i++) {
      P.push({
        x: Math.random(), y: Math.random(),
        r: 0.5 + Math.random() * 1.2,
        s: 0.006 + Math.random() * 0.02,
        o: 0.15 + Math.random() * 0.35
      });
    }

    var running = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        running = entries[0].isIntersecting;
      }).observe(canvas);
    }

    var a = 0;
    var frame = function () {
      requestAnimationFrame(frame);
      if (!running) return;
      a += 0.0022;
      ctx.clearRect(0, 0, W, H);

      /* Staub */
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        p.y -= p.s / 100;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        ctx.globalAlpha = p.o;
        ctx.fillStyle = "#b6bac5";
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* Kristall projizieren */
      var cx = W / 2, cy = H * 0.46;
      var scale = Math.min(W, H) * 0.34;
      var sinA = Math.sin(a), cosA = Math.cos(a);
      var tilt = 0.42, sinT = Math.sin(tilt), cosT = Math.cos(tilt);

      var proj = V.map(function (v) {
        var x = v[0] * cosA - v[2] * sinA;
        var z = v[0] * sinA + v[2] * cosA;
        var y = v[1] * cosT - z * sinT;
        z = v[1] * sinT + z * cosT;
        var d = 3.2 / (3.2 + z);
        return { x: cx + x * scale * d, y: cy + y * scale * d, z: z };
      });

      for (var j = 0; j < E.length; j++) {
        var p1 = proj[E[j][0]], p2 = proj[E[j][1]];
        var depth = (p1.z + p2.z) / 2;                  /* -1 … 1 */
        var alpha = 0.08 + (1 - (depth + 1) / 2) * 0.3; /* Tiefennebel */
        ctx.strokeStyle = "rgba(56, 62, 78, " + alpha.toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      /* Ecken als Messpunkte */
      for (var k = 0; k < proj.length; k++) {
        var q = proj[k];
        var va = 0.15 + (1 - (q.z + 1) / 2) * 0.5;
        ctx.fillStyle = "rgba(56, 62, 78, " + va.toFixed(3) + ")";
        ctx.fillRect(q.x - 1.5, q.y - 1.5, 3, 3);
      }
    };
    frame();
  }
})();

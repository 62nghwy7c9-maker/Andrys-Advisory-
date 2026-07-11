/* Andrys Advisory — Interaktion im „Arctic“-System (siehe DESIGN-SYSTEM.md).
   Kein Framework. Cinematik ohne Scroll-Hijacking: alles hängt am echten
   Scroll-Fortschritt, prefers-reduced-motion schaltet Bewegung ab. */
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

  /* ---- Cinematik: Hero-Fortschritt als CSS-Variable (--hp) ----
     Der Hero ist höher als der Viewport, sein Inhalt klebt (sticky).
     Der Fortschritt 0…1 steuert Headline-Abgang und HUD-Ausblendung;
     die WebGL-Szene liest denselben Scrollweg (scene.js). */
  var hero = document.querySelector(".hero[data-cinematic]");
  if (hero && !reducedMotion) {
    var heroTicking = false;
    var updateHero = function () {
      heroTicking = false;
      var track = hero.offsetHeight - window.innerHeight;
      var p = track > 0 ? Math.min(Math.max(-hero.getBoundingClientRect().top / track, 0), 1) : 0;
      hero.style.setProperty("--hp", p.toFixed(4));
    };
    window.addEventListener("scroll", function () {
      if (!heroTicking) { heroTicking = true; requestAnimationFrame(updateHero); }
    }, { passive: true });
    updateHero();
  }

  /* ---- Cinematik: Manifest — Wörter tauchen aus dem Nebel auf ---- */
  var manifests = document.querySelectorAll("[data-words]");
  manifests.forEach(function (el) {
    var text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.textContent = "";
    var frag = document.createDocumentFragment();
    text.split(/\s+/).forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "w";
      span.setAttribute("aria-hidden", "true");
      span.textContent = word;
      frag.appendChild(span);
      frag.appendChild(document.createTextNode(" "));
    });
    el.appendChild(frag);
  });
  if (manifests.length && !reducedMotion) {
    var wordsTicking = false;
    var updateWords = function () {
      wordsTicking = false;
      manifests.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var vh = window.innerHeight;
        /* Fortschritt: Element wandert von 85 % zu 35 % der Viewporthöhe */
        var p = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.5), 0), 1);
        var words = el.children;
        var lit = p * words.length;
        for (var i = 0; i < words.length; i++) {
          words[i].style.opacity = i < lit ? 1 : 0.18;
        }
      });
    };
    window.addEventListener("scroll", function () {
      if (!wordsTicking) { wordsTicking = true; requestAnimationFrame(updateWords); }
    }, { passive: true });
    updateWords();
  } else {
    manifests.forEach(function (el) {
      Array.prototype.forEach.call(el.children, function (w) { w.style.opacity = 1; });
    });
  }

  /* ---- Kontakt: Formular öffnet vorbefülltes E-Mail-Programm ---- */
  var form = document.getElementById("kontakt-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = (f.vorname.value + " " + f.nachname.value).trim();
      var teile = [
        "Guten Tag Herr Andrys,",
        "",
        f.nachricht.value.trim(),
        "",
        "—",
        name,
        "E-Mail: " + f.email.value.trim()
      ];
      if (f.telefon.value.trim()) teile.push("Telefon: " + f.telefon.value.trim());
      teile.push("Aufmerksam geworden über: " + f.quelle.value);
      var subject = encodeURIComponent("Angebot anfordern – " + name);
      var body = encodeURIComponent(teile.join("\r\n"));
      window.location.href = "mailto:info@andrys-advisory.de?subject=" + subject + "&body=" + body;
    });
  }
})();

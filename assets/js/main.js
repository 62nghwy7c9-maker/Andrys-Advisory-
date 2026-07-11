/* Andrys Advisory – Interaktion: Nav, Scroll-Reveals, Zahlen-Counter,
   Titel-Masken-Reveal, Grid-Parallax, Scroll-Fortschritt.
   Kein Framework, keine Abhängigkeiten. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Hero-Titel: in Zeilen aufteilen für Masken-Reveal ---- */
  var splitTitle = document.querySelector("[data-split]");
  if (splitTitle && !reduceMotion) {
    var originalText = splitTitle.textContent;
    var words = originalText.split(/\s+/).filter(Boolean);
    splitTitle.innerHTML = words
      .map(function (w) { return "<span class=\"w\">" + w + "</span>"; })
      .join(" ");
    var lines = [];
    var current = null;
    var lastTop = null;
    splitTitle.querySelectorAll(".w").forEach(function (span) {
      var top = span.offsetTop;
      if (top !== lastTop) {
        current = [];
        lines.push(current);
        lastTop = top;
      }
      current.push(span.textContent);
    });
    splitTitle.innerHTML = lines
      .map(function (line, i) {
        return (
          "<span class=\"line\"><span class=\"line-inner\" style=\"--ld:" +
          (0.3 + i * 0.14).toFixed(2) +
          "s\">" + line.join(" ") + "</span></span>"
        );
      })
      .join("");
    splitTitle.classList.add("is-split");
  }

  /* ---- Scroll-Fortschritt + Hero-Grid-Parallax ---- */
  var progress = document.getElementById("scroll-progress");
  var heroGrid = document.querySelector(".hero-grid");
  var onProgress = function () {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    if (progress && max > 0) {
      progress.style.transform = "scaleX(" + Math.min(window.scrollY / max, 1) + ")";
    }
    if (heroGrid && !reduceMotion && window.scrollY < window.innerHeight * 1.5) {
      heroGrid.style.transform = "translateY(" + window.scrollY * 0.18 + "px)";
    }
  };
  window.addEventListener("scroll", onProgress, { passive: true });
  window.addEventListener("resize", onProgress, { passive: true });
  onProgress();

  /* ---- Navigation: Hintergrund nach Scroll ---- */
  var nav = document.getElementById("nav");
  var onScroll = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobiles Menü ---- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  var closeMenu = function () {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
    links.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    if (open) {
      closeMenu();
    } else {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Menü schließen");
      links.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Scroll-Reveals (Inhalte + Sektions-Eckmarken) ---- */
  var revealTargets = document.querySelectorAll("[data-reveal], .corner-marks");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Zahlen-Counter im Kennzahlen-Band ---- */
  var counters = document.querySelectorAll("[data-count]");
  var runCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 1600;
    var start = null;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var frame = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(ease(p) * target);
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  if (reduceMotion || !("IntersectionObserver" in window)) {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  } else {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { countObserver.observe(el); });
  }
})();

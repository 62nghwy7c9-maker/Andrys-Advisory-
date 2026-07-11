/* Andrys Advisory – Interaktion & Animation: Nav, Scroll-Reveals, Zahlen-Counter,
   Wort-Masken-Reveals, Scramble-Labels, Cursor, Magnet-Buttons, Parallax, Skew.
   Kein Framework, keine Abhängigkeiten. Respektiert prefers-reduced-motion. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

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

  /* ---- Wort-Masken: Headlines in maskierte Wörter zerlegen ---- */
  var splitTargets = document.querySelectorAll("[data-split]");
  var wrapWord = function (content, delay) {
    var w = document.createElement("span");
    w.className = "w";
    var wi = document.createElement("span");
    wi.className = "wi";
    wi.style.setProperty("--wd", delay + "ms");
    wi.appendChild(content);
    w.appendChild(wi);
    return w;
  };
  var splitWords = function (el, baseDelay, stepDelay) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    var i = 0;
    el.textContent = "";
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            el.appendChild(document.createTextNode(" "));
          } else {
            el.appendChild(wrapWord(document.createTextNode(part), baseDelay + i++ * stepDelay));
          }
        });
      } else {
        el.appendChild(wrapWord(node, baseDelay + i++ * stepDelay));
      }
    });
    el.classList.add("is-split");
  };
  if (!reduceMotion) {
    splitTargets.forEach(function (el) {
      var isHero = el.classList.contains("hero-title");
      splitWords(el, isHero ? 300 : 0, isHero ? 70 : 50);
    });
    var heroTitle = document.querySelector(".hero-title.is-split");
    if (heroTitle) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          heroTitle.classList.add("in-view");
        });
      });
    }
  }

  /* ---- Scramble: Mono-Labels dekodieren sich beim Erscheinen ---- */
  var SCRAMBLE_CHARS = "AÄBCDEFGHIJKLMNOPQRSTUÜVWXYZ·—/+*";
  var prepScramble = function (el) {
    var text = el.textContent.trim();
    if (!text) return null;
    el.textContent = "";
    var sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = text;
    var sc = document.createElement("span");
    sc.className = "scramble";
    sc.setAttribute("aria-hidden", "true");
    sc.setAttribute("data-text", text);
    sc.textContent = text;
    el.appendChild(sr);
    el.appendChild(sc);
    return sc;
  };
  var runScramble = function (sc) {
    var original = sc.getAttribute("data-text");
    var totalFrames = Math.max(20, Math.round(original.length * 1.8));
    var frame = 0;
    var tick = function () {
      frame++;
      var resolved = Math.floor((frame / totalFrames) * original.length);
      if (resolved >= original.length) {
        sc.textContent = original;
        return;
      }
      var out = "";
      for (var i = 0; i < original.length; i++) {
        var ch = original.charAt(i);
        if (i < resolved || ch === " ") {
          out += ch;
        } else {
          out += SCRAMBLE_CHARS.charAt(Math.floor(Math.random() * SCRAMBLE_CHARS.length));
        }
      }
      sc.textContent = out;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!reduceMotion) {
    document.querySelectorAll(".eyebrow, .hero-eyebrow").forEach(function (el) {
      prepScramble(el);
    });
    var heroEyebrow = document.querySelector(".hero-eyebrow .scramble");
    if (heroEyebrow) {
      setTimeout(function () { runScramble(heroEyebrow); }, 250);
    }
  }

  /* ---- Scroll-Reveals (löst auch Wort-Masken & Scramble aus) ---- */
  var revealTargets = document.querySelectorAll("[data-reveal]");
  var activate = function (el) {
    el.classList.add("in-view");
    var sc = el.querySelector(".scramble");
    if (sc && !reduceMotion) runScramble(sc);
  };
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activate(entry.target);
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

  /* ---- Magnetische Buttons (nur feine Zeiger) ---- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.classList.add("magnetic");
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.22).toFixed(1) + "px," + (y * 0.32).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ---- Spotlight: Lichtkegel folgt dem Zeiger über Karten ---- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".step, .story").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---- Eigener Cursor: Punkt folgt direkt, Ring mit Trägheit ---- */
  var cursorActive = finePointer && !reduceMotion;
  var dot, ring, mx = -100, my = -100, rx = -100, ry = -100, cursorSeen = false;
  if (cursorActive) {
    dot = document.createElement("div");
    dot.className = "cursor-dot";
    ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!cursorSeen) {
        cursorSeen = true;
        rx = mx;
        ry = my;
        document.documentElement.classList.add("has-cursor");
      }
      var hot = e.target.closest("a, button, .service");
      ring.classList.toggle("is-active", !!hot);
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", function () {
      document.documentElement.classList.add("cursor-hidden");
    });
    document.documentElement.addEventListener("mouseenter", function () {
      document.documentElement.classList.remove("cursor-hidden");
    });
  }

  /* ---- Parallax (Hero) + Scroll-Velocity-Skew + Cursor-Loop ---- */
  var mainEl = document.querySelector("main");
  var heroLines = document.querySelector(".hero-lines");
  var heroWrap = document.querySelector(".hero .wrap");
  var scrollCue = document.querySelector(".hero-scrollcue");
  var lastY = window.scrollY;
  var skew = 0;

  if (!reduceMotion) {
    var loop = function () {
      var y = window.scrollY;

      /* Skew: die Seite lehnt sich minimal in die Scrollrichtung */
      var velocity = y - lastY;
      lastY = y;
      var targetSkew = Math.max(-0.6, Math.min(0.6, velocity * 0.045));
      skew += (targetSkew - skew) * 0.1;
      if (mainEl) {
        mainEl.style.transform = Math.abs(skew) > 0.002 ? "skewY(" + skew.toFixed(3) + "deg)" : "";
      }

      /* Parallax: Hero-Linien und -Text driften unterschiedlich schnell */
      if (heroLines && y < window.innerHeight * 1.2) {
        heroLines.style.transform = "translate3d(0," + (y * 0.3).toFixed(1) + "px,0)";
        if (heroWrap) {
          heroWrap.style.transform = "translate3d(0," + (y * 0.14).toFixed(1) + "px,0)";
          heroWrap.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.85)).toFixed(3);
        }
        if (scrollCue && y > 10) {
          scrollCue.classList.add("is-settled");
          scrollCue.style.opacity = Math.max(0, 1 - y / 220).toFixed(3);
        }
      }

      /* Cursor-Ring mit Trägheit nachziehen */
      if (cursorActive && cursorSeen) {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        dot.style.transform = "translate(" + mx + "px," + my + "px)";
        ring.style.transform = "translate(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px)";
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();

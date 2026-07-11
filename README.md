# Andrys Advisory – Website

Website der Andrys Advisory GmbH (Beratung für digitale Transformation) im
„Arctic“-Design mit WebGL-Kristall im Hero.

## Technik

- Pures HTML, CSS und Vanilla-JavaScript – kein Framework, kein Build-Schritt
- Ein-Seiten-App mit Hash-Router: `#/leistungen`, `#/referenzen`, `#/index/werte`,
  `#/karriere`, `#/ueber`, `#/kontakt`, `#/impressum`, `#/datenschutz`
- WebGL-Kristall (Three.js, gebündelt in `assets/js/crystal.js`), an den
  Scrollweg des Heros gekoppelt
- Animationen: Scroll-Reveals, Scramble-Decode, Wortnebel, Zähler, magnetische
  Buttons, HUD-Cursor – `prefers-reduced-motion` wird vollständig respektiert
- Alle Schriften self-hosted (`assets/fonts/`), keine externen Requests
  (DSGVO-freundlich)

## Struktur

```
index.html            Gesamte Site (alle Views + Hash-Router)
vercel.json           Vercel-Konfiguration (Header, Caching)
robots.txt
assets/css/style.css  Arctic-Design-System
assets/js/main.js     Interaktion, Animationen, Router
assets/js/crystal.js  Three.js + Kristall-Szene
assets/fonts/         Hanken Grotesk, IBM Plex Mono (woff2)
favicon.svg
```

## Lokal ansehen

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Mit Vercel veröffentlichen

1. Auf [vercel.com](https://vercel.com) anmelden und **Add New → Project** wählen
2. Dieses GitHub-Repository importieren
3. Framework-Preset: **Other** – kein Build-Command, kein Output-Directory nötig
4. Unter *Settings → Git* den gewünschten Production-Branch wählen
   (Standard ist `main`; diese Version liegt auf `claude/website-animations-90gp8p`,
   bis sie gemerged ist)
5. **Deploy** – fertig. Eigene Domain unter *Settings → Domains* verbinden
   (z. B. andrys-advisory.de)

## Vor Veröffentlichung

Platzhalter in den Views Impressum/Datenschutz füllen: Anschrift, Telefon,
Registergericht/HRB, USt-IdNr., Hosting-Anbieter. E-Mail-Adresse und
Kundenzitate prüfen.

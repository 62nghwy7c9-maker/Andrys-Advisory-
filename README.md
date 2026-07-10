# Andrys Advisory – Website

Statische Website für die Andrys Advisory GmbH (Beratung für digitale Transformation).

## Technik

- Pures HTML, CSS und Vanilla-JavaScript – kein Framework, kein Build-Schritt
- Alle Schriften self-hosted (`assets/fonts/`), keine externen Requests (DSGVO-freundlich)
- Animationen: CSS + `IntersectionObserver`, vollständige Unterstützung von `prefers-reduced-motion`
- Responsiv von 375 px bis Desktop

## Struktur

```
index.html          Startseite (One-Pager)
impressum.html      Impressum (enthält TODO-Platzhalter für Firmendaten)
datenschutz.html    Datenschutzerklärung (enthält TODO-Platzhalter)
assets/css/style.css
assets/js/main.js
assets/fonts/       Newsreader, Hanken Grotesk, IBM Plex Mono (woff2)
favicon.svg
```

## Lokal ansehen

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Vor Veröffentlichung

Die mit `<!-- TODO: ... -->` markierten Platzhalter füllen: Anschrift, Telefon,
Registergericht/HRB, USt-IdNr. (Impressum), Hosting-Anbieter (Datenschutz) sowie
E-Mail-Adresse und Kundenzitate prüfen.

# Andrys Arctic — WordPress-Theme

Das arktische Design-System der neuen Website als WordPress-Theme. Damit
bleibt WordPress das Backend: Seiten, Impressum/Datenschutz und der
Formularversand laufen über WordPress; das Frontend ist das neue Design
(WebGL-Kristall, cinematisches Scrollen, Mono-HUD-Typografie).

## Installation

1. Den Ordner `andrys-arctic` als ZIP packen
   (`zip -r andrys-arctic.zip andrys-arctic`).
2. Im WordPress-Admin: **Design → Themes → Theme hochladen** → ZIP wählen
   → **Aktivieren**. (Alternativ den Ordner per FTP nach
   `wp-content/themes/` legen.)
3. Unter **Einstellungen → Lesen** „Eine statische Seite“ als Startseite
   wählen und eine (auch leere) Seite als Startseite zuweisen —
   das Theme rendert die Startseite über `front-page.php`.

## Seiten anlegen (einmalig)

Für jede Unterseite eine WordPress-Seite mit **genau diesem Slug**
anlegen und rechts unter „Template“ das passende Template wählen.
Die Slugs entsprechen der bisherigen Live-Website, damit alle
bestehenden URLs und Google-Treffer weiter funktionieren:

| Seite | Slug | Template |
|---|---|---|
| Leistungen | `leistungen` | Leistungen |
| Success Stories | `success-stories-digitale-transformation` | Success Stories |
| Karriere | `karriere-berater-werden` | Karriere |
| Über uns | `ueber-uns` | Über uns |
| Kontakt | `kontakt` | Kontakt |
| Impressum | `impressum` | *(Standard)* — Inhalt aus dem Editor |
| Datenschutz | `datenschutz` | *(Standard)* — Inhalt aus dem Editor |

Impressum und Datenschutz werden ganz normal im WordPress-Editor
gepflegt. Die bestehenden Inhalte können aus den alten Seiten
übernommen werden.

## Kontaktformular

Das Formular auf der Kontakt-Seite sendet über `wp_mail()` an die
**Admin-E-Mail-Adresse** der WordPress-Installation (Einstellungen →
Allgemein). Es enthält Nonce-Schutz und ein Honeypot-Feld gegen Spam.
Falls E-Mails nicht ankommen: ein SMTP-Plugin (z. B. „WP Mail SMTP“)
einrichten — das ist bei IONOS-Hosting oft nötig.

## Texte ändern

Die Marketing-Texte (Startseite, Leistungen, Success Stories, Karriere,
Kontakt-Intro) liegen bewusst direkt in den Template-Dateien
(`front-page.php`, `template-*.php`) — dort ändern, wo sie stehen.
Wer die Texte lieber im WordPress-Admin pflegen möchte: Das lässt sich
in einem zweiten Schritt mit ACF-Feldern oder dem Customizer nachrüsten.

## Hinweise

- Alle Schriften und Three.js sind im Theme gebündelt (`assets/`) —
  keine externen CDN-Anfragen, DSGVO-freundlich.
- Der WebGL-Kristall lädt nur auf der Startseite; `prefers-reduced-motion`
  wird respektiert.
- Bricks Builder wird durch das Theme im Frontend abgelöst; die
  bestehenden WordPress-Inhalte bleiben in der Datenbank erhalten.

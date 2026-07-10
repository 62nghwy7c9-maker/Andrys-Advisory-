# Design-System „Arctic" — extrahiert von igloo.inc

Referenz: [igloo.inc](https://www.igloo.inc/) (Awwwards Site of the Day, Case Study).
Dieses Dokument hält fest, welche Gestaltungsprinzipien übernommen wurden und wie
sie auf Andrys Advisory übersetzt sind.

## 1. Farbe

Igloo arbeitet praktisch ohne Akzentfarbe: eine kalte, entsättigte Eis-Skala,
Hierarchie entsteht allein über Helligkeitskontrast.

| Token        | Wert      | Rolle |
|--------------|-----------|-------|
| `--ice-0`    | `#eef0f4` | Seitenhintergrund hell („Nebel") |
| `--ice-1`    | `#e2e5eb` | Flächen, Karten, abgesetzte Zonen |
| `--frost`    | `#f7f9fb` | Text/Flächen auf dunklem Grund |
| `--fog`      | `#b6bac5` | Sekundärtext, Linien, Labels (Original-Palette igloo.inc) |
| `--slate`    | `#383e4e` | Primärtext hell (Original-Palette igloo.inc) |
| `--ink`      | `#14171e` | Dunkle Kapitel, Footer („unter dem Eis") |

Regeln: keine Buntfarbe, keine Verläufe außer Nebel (radiale Aufhellung) und
vertikalem Licht-zu-Schatten zwischen Kapiteln. Haarlinien mit 1 px in
`--fog` bei niedriger Deckkraft.

## 2. Typografie

Zwei Rollen, streng getrennt:

- **Display:** sehr dünn geschnittene Grotesk, VERSALIEN, große Grade,
  minimales Tracking. Hier: *Hanken Grotesk* (variabel), Gewicht 250–320.
- **Technik/Utility:** Monospace für Navigation, Labels, Buttons, Metadaten,
  Zahlen — klein (11–13 px), VERSALIEN, weites Tracking (0.08–0.16 em).
  Hier: *IBM Plex Mono* 400/500.
- **Lesetext:** ruhige Grotesk in normaler Laufweite (Hanken Grotesk 400),
  bewusst klein und schmal gehalten.

## 3. UI-Grammatik („HUD")

Das Interface verhält sich wie ein Messinstrument, nicht wie eine Broschüre:

- Labels an Viewport-/Sektionsecken verankert (Koordinaten, Index, Status).
- Metadaten sind echte Daten, kein Dekor: `50.87° N / 6.69° O` (Kerpen),
  Kapitel-Indizes, Kennzahlen-Readouts.
- Fadenkreuz-Marker `+` an Rasterschnittpunkten, Haarlinien als Träger.
- Eckige Klammern als Interaktionssignal: `[ ERSTGESPRÄCH → ]`.
- Buttons ohne Radius, 1-px-Rahmen, Hover invertiert Fläche.

## 4. Motion

- Text-„Decode": Labels und Überschriften rastern sich beim Eintritt in den
  Viewport aus Zufallszeichen ein (Scramble-Effekt).
- Scroll-Reveals: kleine Translation + Fade, langsam und gleichmäßig.
- Kennzahlen zählen hoch, sobald sichtbar.
- Ambient: WebGL-Eiskristall (Three.js, self-hosted) mit Fresnel-Shader,
  Struktur-Drahtgitter und Schneestaub im Hero — das Signature-Element.
  Der Hero ist cinematisch: sein Inhalt klebt einen Viewport lang (sticky),
  der Scrollweg steuert Kristall-Rotation/Zoom und den Headline-Abgang.
  Kein Scroll-Hijacking; ohne WebGL bleibt der CSS-Nebel als Bühne.
- Korn-Overlay (SVG-Noise, ~4 % Deckkraft) über der gesamten Seite.
- `prefers-reduced-motion` deaktiviert Scramble, Rotation, Drift und Reveals.

## 5. Layout & Rhythmus

- Voll-Viewport-Hero mit zentriertem Objekt und HUD-Ecken.
- Lange Ein-Gedanke-Kapitel mit viel Leerraum, getrennt durch Haarlinien.
- Hell → dunkel → hell: Die Seite „taucht" in der Mitte (Ansatz/Referenzen)
  unter das Eis (`--ink`) und kommt zum Kontakt wieder an die Oberfläche.

## 6. Übersetzung auf Andrys Advisory

| igloo.inc | Andrys Advisory |
|---|---|
| Objekt im Eisblock | Drahtgitter-Kristall = Komplexität, in Struktur gefasst |
| Koordinaten/HUD-Daten | Standort Kerpen, Kapitel-Indizes, Mandats-Kennzahlen |
| Projekt-Index-Listen | Leistungs-Index `01–06` mit Haarlinien-Zeilen |
| Kapitel-Erzählung | Verstehen → Strukturieren → Umsetzen als Sequenz |

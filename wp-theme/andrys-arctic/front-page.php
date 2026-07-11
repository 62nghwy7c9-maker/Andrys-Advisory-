<?php
/** Startseite: cinematischer Hero mit WebGL-Kristall. */
get_header();
?>
<main id="main">

    <!-- ============================== HERO ============================== -->
    <section class="hero" id="top" data-cinematic aria-label="Einführung">
      <div class="hero-sticky">
        <canvas class="hero-canvas" id="crystal" aria-hidden="true"></canvas>

        <p class="hud hud-tl" aria-hidden="true">Beratung /<br>Digitale Transformation</p>
        <p class="hud hud-tr" aria-hidden="true">50.87° N / 6.69° O<br>Kerpen · DE</p>

        <div class="wrap">
          <div class="hero-stagger">
            <p class="hero-eyebrow" data-scramble>Assured Digital Transformation</p>
            <h1 class="hero-title">
              <span class="line"><span class="line-in">Transformation,</span></span>
              <span class="line"><span class="line-in">die nicht im</span></span>
              <span class="line"><span class="line-in"><span class="em">Konzept</span> endet.</span></span>
            </h1>
            <p class="hero-sub">Entscheidend ist das Ergebnis: klare Strukturen, verlässliche Prozesse, digitale Souveränität – und eine Organisation, die mit Zuversicht in die Zukunft blickt. Wir begleiten Organisationen durch komplexe Transformationen, individuell auf Sie zugeschnitten.</p>
            <div class="hero-cta">
              <a class="btn btn-solid" href="<?php echo esc_url( home_url( '/kontakt/' ) ); ?>">Kontakt aufnehmen <span class="arrow" aria-hidden="true">→</span></a>
              <a class="btn btn-ghost" href="<?php echo esc_url( home_url( '/leistungen/' ) ); ?>">Leistungen ansehen</a>
            </div>
          </div>
        </div>

        <p class="hud hud-bl" aria-hidden="true">Senior-Level / Hands-on<br>Messbar im Ergebnis</p>
        <p class="hero-scrollcue" aria-hidden="true">Scroll</p>
        <p class="hud hud-br" aria-hidden="true">Index 00 / 04<br>© 2026</p>
      </div>
    </section>

    <!-- ============================ KENNZAHLEN ============================ -->
    <section class="proof" aria-label="Kennzahlen">
      <div class="proof-grid">
        <div class="proof-item" data-reveal>
          <p class="proof-num"><span class="unit">&gt;</span><span data-count="12">0</span></p>
          <p class="proof-label">Jahre Erfahrung in Transformation, Projekt- und Programmleitung</p>
        </div>
        <div class="proof-item" data-reveal style="--rd:100ms">
          <p class="proof-num"><span class="unit">&gt;</span><span data-count="38">0</span></p>
          <p class="proof-label">erfolgreiche Projekte – von der Strategie bis zur Umsetzung</p>
        </div>
        <div class="proof-item" data-reveal style="--rd:200ms">
          <p class="proof-num"><span class="unit">&gt;</span><span data-count="100">0</span><span class="unit"> Mio&nbsp;€</span></p>
          <p class="proof-label">Projektverantwortung – termingerecht und im Budget</p>
        </div>
      </div>
    </section>

    <!-- ============================== VERSPRECHEN ============================== -->
    <section class="manifest section-pad" aria-label="Unser Versprechen">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>Unser Versprechen</p>
        <p class="manifest-text" data-words>Wir liefern nicht nur Konzepte, sondern Ergebnisse. Mit Senior ExpertInnen, die anpacken, heben wir Ihre Transformation auf das nächste Level – individuell und messbar.</p>
        <p class="manifest-foot"><a class="link-more" href="<?php echo esc_url( home_url( '/ueber-uns/' ) ); ?>">Wofür wir stehen <span aria-hidden="true">→</span></a></p>
      </div>
    </section>

    <!-- ============================ LEISTUNGEN ============================ -->
    <section class="section-pad" id="leistungen" aria-labelledby="leistungen-title" style="border-top: 1px solid var(--line);">
      <div class="wrap">
        <p class="section-index" data-scramble>01 / Leistungen</p>
        <h2 class="section-title" id="leistungen-title" data-reveal>Individuell auf Sie zugeschnitten.</h2>
        <p class="section-intro" data-reveal>Wir begleiten Organisationen durch komplexe Transformationen – mit Struktur, Verantwortung und messbaren Ergebnissen.</p>

        <ul class="services-list" style="margin-top: clamp(3rem, 6vw, 4.5rem);">
          <li data-reveal>
            <a class="service" href="<?php echo esc_url( home_url( '/leistungen/#projektmanagement' ) ); ?>">
              <span class="service-no" aria-hidden="true">/01</span>
              <span class="service-tag">Steuerung</span>
              <div>
                <h3 class="service-name">Projektmanagement &amp; Transformation</h3>
                <p class="service-desc">Internationalisierung, PRINCE2, IPMA – transparente Steuerung globaler Initiativen, termingerecht und budgettreu.</p>
              </div>
              <span class="service-mark" aria-hidden="true">↗</span>
            </a>
          </li>
          <li data-reveal>
            <a class="service" href="<?php echo esc_url( home_url( '/leistungen/#prozesse' ) ); ?>">
              <span class="service-no" aria-hidden="true">/02</span>
              <span class="service-tag">Prozesse</span>
              <div>
                <h3 class="service-name">Prozessoptimierung &amp; Industrialisierung</h3>
                <p class="service-desc">Harmonisierung, Standardisierung, KI‑Einsatz – effiziente, digital gestützte Abläufe mit messbarem Nutzen.</p>
              </div>
              <span class="service-mark" aria-hidden="true">↗</span>
            </a>
          </li>
          <li data-reveal>
            <a class="service" href="<?php echo esc_url( home_url( '/leistungen/#operationalisierung' ) ); ?>">
              <span class="service-no" aria-hidden="true">/03</span>
              <span class="service-tag">Strategie</span>
              <div>
                <h3 class="service-name">IT‑Strategie Operationalisierung</h3>
                <p class="service-desc">Zielbild‑Entwicklung, Roadmap und Business Case – Strategie, die in messbare Kennzahlen übersetzt wird.</p>
              </div>
              <span class="service-mark" aria-hidden="true">↗</span>
            </a>
          </li>
          <li data-reveal>
            <a class="service" href="<?php echo esc_url( home_url( '/leistungen/#governance' ) ); ?>">
              <span class="service-no" aria-hidden="true">/04</span>
              <span class="service-tag">Steuerungsrahmen</span>
              <div>
                <h3 class="service-name">Governance &amp; Compliance</h3>
                <p class="service-desc">ITIL, agile Organisationsmodelle, Risikomanagement – klare Leitplanken für schnelle, sichere Entscheidungen.</p>
              </div>
              <span class="service-mark" aria-hidden="true">↗</span>
            </a>
          </li>
          <li data-reveal>
            <a class="service" href="<?php echo esc_url( home_url( '/leistungen/#change' ) ); ?>">
              <span class="service-no" aria-hidden="true">/05</span>
              <span class="service-tag">Menschen</span>
              <div>
                <h3 class="service-name">Change Management</h3>
                <p class="service-desc">Stakeholder‑Kommunikation, Trainings, Kulturwandel – Akzeptanz für Ihr Programm und Ihre Transformation.</p>
              </div>
              <span class="service-mark" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
        <p class="section-foot" data-reveal><a class="link-more" href="<?php echo esc_url( home_url( '/leistungen/' ) ); ?>">Alle Leistungen im Detail <span aria-hidden="true">→</span></a></p>
      </div>
    </section>

    <!-- ============================== WARUM ============================== -->
    <section class="section-pad on-dark" id="warum" aria-labelledby="warum-title">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>02 / Warum Andrys Advisory</p>
        <h2 class="section-title" id="warum-title" data-reveal>Nachhaltige Zusammenarbeit auf Augenhöhe.</h2>
        <p class="approach-kicker" data-reveal>Mit Verlässlichkeit, Integrität und echter Verantwortung schaffen wir Transparenz – <strong>und begleiten Sie langfristig, persönlich und verbindlich.</strong></p>

        <ol class="steps">
          <li class="step" data-reveal>
            <span class="step-no">01</span>
            <h3 class="step-name">Ergebnisse</h3>
            <p class="step-desc">Wir beraten nicht nur, wir begleiten auf dem Weg in eine verlässliche digitale Zukunft – bis Fortschritt tragfähig wird und Bestand hat.</p>
          </li>
          <li class="step" data-reveal style="--rd:120ms">
            <span class="step-no">02</span>
            <h3 class="step-name">Senior-Expertise</h3>
            <p class="step-desc">ExpertInnen, die Verantwortung übernehmen und anpacken – partnerschaftlich, klar strukturiert und mit Erfahrung aus internationalen Programmen.</p>
          </li>
          <li class="step" data-reveal style="--rd:240ms">
            <span class="step-no">03</span>
            <h3 class="step-name">Kommunikation</h3>
            <p class="step-desc">Transparent und souverän – so schaffen wir Anerkennung und Akzeptanz für Ihr Programm und Ihre Transformation.</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ========================== SUCCESS STORIES ========================== -->
    <section class="section-pad on-dark" id="referenzen" aria-labelledby="referenzen-title" style="border-top: 1px solid var(--line-dark);">
      <div class="wrap">
        <p class="section-index" data-scramble>03 / Success Stories</p>
        <h2 class="section-title" id="referenzen-title" data-reveal>Ergebnisse, die wirken.</h2>

        <div class="stories-grid">
          <article class="story" data-reveal>
            <p class="story-figure">14<small>Länder</small></p>
            <div>
              <h3 class="story-name">Corporate IT‑Strategie Rollout</h3>
              <p class="story-desc">Internationale Standardisierung der IT‑Infrastruktur in 14 europäischen Ländern – von der Projektleitung bis zur länderspezifischen Abstimmung.</p>
            </div>
            <p class="story-result">Effizienz, Synergien und einheitliche Standards</p>
          </article>
          <article class="story" data-reveal style="--rd:120ms">
            <p class="story-figure">160+<small>Gesellschaften</small></p>
            <div>
              <h3 class="story-name">Zentrales IT‑Monitoring für Holding &amp; Gesellschaften</h3>
              <p class="story-desc">Skalierbare Monitoring‑Lösung mit Echtzeit‑Einblick in Systemverfügbarkeit und Performance von über 160 Gesellschaften weltweit.</p>
            </div>
            <p class="story-result">Transparenz und Kontrolle für globale IT‑Infrastrukturen</p>
          </article>
          <article class="story" data-reveal style="--rd:240ms">
            <p class="story-figure"><span class="em">S/4</span><small>HANA</small></p>
            <div>
              <h3 class="story-name">Digitale Transformation mit SAP S/4HANA</h3>
              <p class="story-desc">Finanzfunktion und Geschäftsprozesse effizienter und agiler gestaltet – Projektplanung, ‑steuerung und methodische Beratung.</p>
            </div>
            <p class="story-result">Zielvorgaben termingerecht erreicht</p>
          </article>
        </div>
        <p class="section-foot" data-reveal><a class="link-more" href="<?php echo esc_url( home_url( '/success-stories-digitale-transformation/' ) ); ?>">Alle Success Stories lesen <span aria-hidden="true">→</span></a></p>
      </div>
    </section>

    <!-- ============================ KUNDENSTIMMEN ============================ -->
    <section class="section-pad" aria-label="Kundenstimmen">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>04 / Meinungen unserer Kunden</p>
        <h2 class="section-title" data-reveal>Ergebnisse, die wirken – aus Kundensicht.</h2>
        <div class="quotes-grid" style="margin-top: clamp(2.5rem, 5vw, 3.5rem);">
          <figure class="quote" data-reveal>
            <p>Andrys Advisory hat maßgeblich zum Erfolg des Projekts beigetragen, das die Modernisierung und Standardisierung der IT‑Architektur und Infrastruktur für alle europäischen Tochtergesellschaften zum Ziel hatte.</p>
            <figcaption>— CIO, Branche Luftfiltersysteme und Technologien</figcaption>
          </figure>
          <figure class="quote" data-reveal style="--rd:120ms">
            <p>Die Andrys Advisory GmbH unterstützte uns äußerst erfolgreich im Rahmen des SAP‑Projekts, das Teil der digitalen Transformation des Unternehmens war.</p>
            <figcaption>— IT‑Leiter, Branche Entsorgung, Energie &amp; Wasser</figcaption>
          </figure>
          <figure class="quote" data-reveal style="--rd:240ms">
            <p>Wir vertrauen voll und ganz auf die Andrys Advisory GmbH. Sie war für unser Unternehmen über mehrere Jahre tätig und hat eine Vielzahl von Projekten erfolgreich umgesetzt.</p>
            <figcaption>— Head of IT Strategy &amp; Project Management, Branche Modeschmuck Großhandel</figcaption>
          </figure>
        </div>
        <p class="section-foot" data-reveal><a class="link-more" href="https://www.provenexpert.com/andrys-advisory-gmbh/" rel="noopener">Bewertungen auf ProvenExpert <span aria-hidden="true">↗</span></a></p>
      </div>
    </section>

    <!-- =============================== KONTAKT-BAND =============================== -->
    <section class="contact cta-band" aria-labelledby="kontakt-title">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>Kontakt</p>
        <h2 class="cta-title" id="kontakt-title" data-reveal>Ihre Transformation beginnt hier.</h2>
        <div class="contact-cta" data-reveal>
          <a class="btn btn-solid" href="<?php echo esc_url( home_url( '/kontakt/' ) ); ?>">[ Kontakt aufnehmen <span class="arrow" aria-hidden="true">→</span> ]</a>
        </div>
      </div>
    </section>

  </main>
<?php get_footer(); ?>

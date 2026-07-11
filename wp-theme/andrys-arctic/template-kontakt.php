<?php
/**
 * Template Name: Kontakt
 */
get_header();
?>
<main id="main">

    <header class="page-hero">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>Kontakt</p>
        <h1 class="page-hero-title" data-reveal>Ihre Transformation beginnt hier.</h1>
        <p class="page-hero-intro" data-reveal>Ob erste Orientierung, konkrete Herausforderung oder strategische Weichenstellung – wir hören zu und denken mit.</p>
      </div>
    </header>

    <!-- ======================= DREI WEGE ======================= -->
    <section class="section-pad" aria-label="Kontaktwege" style="padding-bottom: 0;">
      <div class="wrap">
        <div class="channels">
          <a class="channel" href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3_uqz3TkeUjfCa07YS_GQ2nQ-Uyit7l61m3bAlLoxjbRpQH9XgvPuZj8Px4n9h-I52rLPjmBTU?gv=true" rel="noopener" data-reveal>
            <span class="channel-no" aria-hidden="true">/01</span>
            <h2 class="channel-name">Termin buchen</h2>
            <p class="channel-desc">Sparen Sie Zeit und buchen Sie direkt einen Termin bei unserem CEO und Program Manager Marco Andrys.</p>
            <span class="channel-cta">Google Kalender öffnen <span aria-hidden="true">↗</span></span>
          </a>
          <a class="channel" href="tel:+4915565532059" data-reveal style="--rd:100ms">
            <span class="channel-no" aria-hidden="true">/02</span>
            <h2 class="channel-name">Direkt anrufen</h2>
            <p class="channel-desc">Sie haben eine dringende Frage? Rufen Sie einfach an. Wir helfen Ihnen gerne weiter.</p>
            <span class="channel-cta">+49 155 655 320 59</span>
          </a>
          <a class="channel" href="#formular" data-reveal style="--rd:200ms">
            <span class="channel-no" aria-hidden="true">/03</span>
            <h2 class="channel-name">Angebot anfordern</h2>
            <p class="channel-desc">Schildern Sie uns Ihr Anliegen – wir melden uns per Mail bei Ihnen zurück, innerhalb kürzester Zeit.</p>
            <span class="channel-cta">Zum Formular <span aria-hidden="true">↓</span></span>
          </a>
        </div>
      </div>
    </section>

    <!-- ======================= FORMULAR ======================= -->
    <section class="section-pad" id="formular" aria-label="Angebot anfordern">
      <div class="wrap">
        <div class="kontakt-grid">

          <div>
            <p class="section-index" data-scramble>Angebot anfordern</p>
            <h2 class="section-title" data-reveal style="font-size: clamp(1.6rem, 3vw, 2.4rem);">Schildern Sie uns Ihr Anliegen.</h2>
            <p class="section-intro" data-reveal>Hinterlassen Sie Ihre Kontaktdaten – wir melden uns umgehend bei Ihnen.</p>

            <?php if ( isset( $_GET['gesendet'] ) && '1' === $_GET['gesendet'] ) : ?>
              <p class="form-status form-status-ok" role="status">Vielen Dank – Ihre Nachricht wurde gesendet. Wir melden uns umgehend bei Ihnen.</p>
            <?php elseif ( isset( $_GET['gesendet'] ) && '0' === $_GET['gesendet'] ) : ?>
              <p class="form-status form-status-fehler" role="alert">Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben oder schreiben Sie direkt an <a href="mailto:info@andrys-advisory.de">info@andrys-advisory.de</a>.</p>
            <?php endif; ?>

            <form id="kontakt-form-wp" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-reveal style="margin-top: 2.5rem;">
              <input type="hidden" name="action" value="andrys_kontakt">
              <?php wp_nonce_field( 'andrys_kontakt', 'andrys_nonce' ); ?>
              <p class="hp-feld" aria-hidden="true"><label>Website (bitte leer lassen)<input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>
              <div class="field-row">
                <div class="field">
                  <label for="f-vorname">Vorname</label>
                  <input id="f-vorname" name="vorname" type="text" autocomplete="given-name" required>
                </div>
                <div class="field">
                  <label for="f-nachname">Nachname</label>
                  <input id="f-nachname" name="nachname" type="text" autocomplete="family-name" required>
                </div>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="f-email">E-Mail</label>
                  <input id="f-email" name="email" type="email" autocomplete="email" required>
                </div>
                <div class="field">
                  <label for="f-telefon">Telefon (optional)</label>
                  <input id="f-telefon" name="telefon" type="tel" autocomplete="tel">
                </div>
              </div>
              <div class="field">
                <label for="f-quelle">Wie haben Sie von uns erfahren?</label>
                <select id="f-quelle" name="quelle">
                  <option>TV Werbespot</option>
                  <option>Empfehlung von Freunden, Familie oder Kollegen</option>
                  <option>LinkedIn Beitrag</option>
                  <option>Sonstiges</option>
                </select>
              </div>
              <div class="field">
                <label for="f-nachricht">Nachricht</label>
                <textarea id="f-nachricht" name="nachricht" required></textarea>
              </div>
              <div class="field field-check">
                <input id="f-datenschutz" name="datenschutz" type="checkbox" required>
                <label for="f-datenschutz">Ich akzeptiere die <a href="<?php echo esc_url( home_url( '/datenschutz/' ) ); ?>">Datenschutzerklärung</a>.</label>
              </div>
              <button class="btn btn-solid" type="submit">[ Nachricht senden <span class="arrow" aria-hidden="true">→</span> ]</button>
              <p class="form-note">Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.<br>Details in der <a href="<?php echo esc_url( home_url( '/datenschutz/' ) ); ?>">Datenschutzerklärung</a>.</p>
            </form>
          </div>

          <aside class="kontakt-aside" data-reveal style="--rd:150ms">
            <dl class="about-facts">
              <div class="fact">
                <dt>E-Mail</dt>
                <dd><a href="mailto:info@andrys-advisory.de">info@andrys-advisory.de</a></dd>
              </div>
              <div class="fact">
                <dt>Telefon</dt>
                <dd><a href="tel:+4915565532059">+49 155 655 320 59</a></dd>
              </div>
              <div class="fact">
                <dt>Anschrift</dt>
                <dd>Andrys Advisory GmbH<br>Am Keuschenend 59<br>50170 Kerpen</dd>
              </div>
              <div class="fact">
                <dt>Ansprechpartner</dt>
                <dd>Marco Andrys, CEO &amp; Program Manager</dd>
              </div>
              <div class="fact">
                <dt>Bewertungen</dt>
                <dd><a href="https://www.provenexpert.com/andrys-advisory-gmbh/" rel="noopener">ProvenExpert-Profil ↗</a></dd>
              </div>
            </dl>
          </aside>

        </div>
      </div>
    </section>

    <section class="section-pad on-dark" aria-labelledby="ablauf-title">
      <span class="tick tick-tl" aria-hidden="true">+</span>
      <span class="tick tick-tr" aria-hidden="true">+</span>
      <div class="wrap">
        <p class="section-index" data-scramble>So läuft das Erstgespräch</p>
        <h2 class="section-title" id="ablauf-title" data-reveal>30 Minuten, drei Fragen.</h2>
        <ol class="steps">
          <li class="step" data-reveal>
            <span class="step-no">Frage 01</span>
            <h3 class="step-name">Wo stehen Sie?</h3>
            <p class="step-desc">Sie schildern Ihre Situation – wir hören zu und fragen nach. Ohne Verkaufsdruck, ohne Folien.</p>
          </li>
          <li class="step" data-reveal style="--rd:120ms">
            <span class="step-no">Frage 02</span>
            <h3 class="step-name">Was wollen Sie erreichen?</h3>
            <p class="step-desc">Gemeinsam schärfen wir das Ziel und benennen, was einer Umsetzung heute im Weg steht.</p>
          </li>
          <li class="step" data-reveal style="--rd:240ms">
            <span class="step-no">Frage 03</span>
            <h3 class="step-name">Passen wir zusammen?</h3>
            <p class="step-desc">Sie bekommen eine ehrliche Einschätzung – auch dann, wenn wir nicht die Richtigen sind.</p>
          </li>
        </ol>
      </div>
    </section>

  </main>
<?php get_footer(); ?>

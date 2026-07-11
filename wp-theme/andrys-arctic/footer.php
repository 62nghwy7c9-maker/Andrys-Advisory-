<?php /** Fußbereich mit Seiten- und Rechtslinks. */ ?>
  <footer class="footer">
    <div class="wrap footer-inner">
      <p>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Andrys Advisory GmbH · 50.87° N / 6.69° O</p>
      <ul class="footer-links">
        <li><a href="<?php echo esc_url( home_url( '/leistungen/' ) ); ?>">Leistungen</a></li>
        <li><a href="<?php echo esc_url( home_url( '/success-stories-digitale-transformation/' ) ); ?>">Success Stories</a></li>
        <li><a href="<?php echo esc_url( home_url( '/karriere-berater-werden/' ) ); ?>">Karriere</a></li>
        <li><a href="<?php echo esc_url( home_url( '/kontakt/' ) ); ?>">Kontakt</a></li>
        <li><a href="https://www.provenexpert.com/andrys-advisory-gmbh/" rel="noopener">Bewertungen</a></li>
        <li><a href="<?php echo esc_url( home_url( '/impressum/' ) ); ?>">Impressum</a></li>
        <li><a href="<?php echo esc_url( home_url( '/datenschutz/' ) ); ?>">Datenschutz</a></li>
      </ul>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>

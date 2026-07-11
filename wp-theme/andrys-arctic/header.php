<?php
/** Kopfbereich: Navigation im Arctic-HUD-Stil. */
$andrys_nav = array(
	'leistungen'                              => 'Leistungen',
	'success-stories-digitale-transformation' => 'Success Stories',
	'karriere-berater-werden'                 => 'Karriere',
	'ueber-uns'                               => 'Über uns',
);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

  <a class="skip-link" href="#main">Zum Inhalt springen</a>

  <header class="nav<?php echo is_front_page() ? '' : ' is-scrolled'; ?>" id="nav">
    <div class="wrap nav-inner">
      <a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Andrys Advisory – zur Startseite">Andrys&nbsp;Advisory<span class="brand-dot">®</span></a>
      <nav aria-label="Hauptnavigation">
        <ul class="nav-links" id="nav-links">
          <?php foreach ( $andrys_nav as $slug => $label ) : ?>
          <li><a class="nav-link" href="<?php echo esc_url( home_url( '/' . $slug . '/' ) ); ?>"<?php echo is_page( $slug ) ? ' aria-current="page"' : ''; ?> data-scramble-hover><?php echo esc_html( $label ); ?></a></li>
          <?php endforeach; ?>
          <li class="nav-cta"><a class="btn" href="<?php echo esc_url( home_url( '/kontakt/' ) ); ?>"<?php echo is_page( 'kontakt' ) ? ' aria-current="page"' : ''; ?>>[ Kontakt ]</a></li>
        </ul>
      </nav>
      <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menü öffnen">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

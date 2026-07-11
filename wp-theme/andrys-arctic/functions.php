<?php
/**
 * Andrys Arctic — Theme-Setup.
 * Marketing-Texte liegen bewusst in den Templates (siehe README.md);
 * Impressum/Datenschutz werden über den WordPress-Editor gepflegt.
 */

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	register_nav_menus( array( 'hauptmenu' => 'Hauptnavigation' ) );
} );

add_action( 'wp_enqueue_scripts', function () {
	$v = wp_get_theme()->get( 'Version' );
	wp_enqueue_style( 'andrys-arctic', get_template_directory_uri() . '/assets/css/style.css', array(), $v );
	wp_enqueue_script( 'andrys-main', get_template_directory_uri() . '/assets/js/main.js', array(), $v, array( 'in_footer' => true ) );
	if ( is_front_page() ) {
		wp_enqueue_script( 'andrys-scene', get_template_directory_uri() . '/assets/js/scene.js', array(), $v, array( 'in_footer' => true ) );
	}
} );

/* scene.js ist ein ES-Modul (importiert Three.js aus assets/js/vendor) */
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
	if ( 'andrys-scene' === $handle ) {
		return '<script type="module" src="' . esc_url( $src ) . '"></script>' . "\n";
	}
	return $tag;
}, 10, 3 );

/* ---- Kontaktformular: Versand über wp_mail an die Admin-Adresse ---- */
function andrys_kontakt_senden() {
	if ( ! isset( $_POST['andrys_nonce'] ) || ! wp_verify_nonce( $_POST['andrys_nonce'], 'andrys_kontakt' ) ) {
		wp_die( 'Ungültige Anfrage. Bitte gehen Sie zurück und versuchen Sie es erneut.' );
	}
	$zurueck = wp_get_referer() ? wp_get_referer() : home_url( '/kontakt/' );

	/* Honeypot: Feld "website" bleibt bei Menschen leer */
	if ( ! empty( $_POST['website'] ) ) {
		wp_safe_redirect( add_query_arg( 'gesendet', '1', $zurueck ) );
		exit;
	}

	$vorname   = sanitize_text_field( wp_unslash( $_POST['vorname'] ?? '' ) );
	$nachname  = sanitize_text_field( wp_unslash( $_POST['nachname'] ?? '' ) );
	$email     = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
	$telefon   = sanitize_text_field( wp_unslash( $_POST['telefon'] ?? '' ) );
	$quelle    = sanitize_text_field( wp_unslash( $_POST['quelle'] ?? '' ) );
	$nachricht = sanitize_textarea_field( wp_unslash( $_POST['nachricht'] ?? '' ) );

	if ( '' === $vorname || '' === $nachname || ! is_email( $email ) || '' === $nachricht ) {
		wp_safe_redirect( add_query_arg( 'gesendet', '0', $zurueck ) );
		exit;
	}

	$body  = "Neue Anfrage über das Kontaktformular:\n\n";
	$body .= "Name: {$vorname} {$nachname}\n";
	$body .= "E-Mail: {$email}\n";
	if ( $telefon ) {
		$body .= "Telefon: {$telefon}\n";
	}
	$body .= "Aufmerksam geworden über: {$quelle}\n\n";
	$body .= "Nachricht:\n{$nachricht}\n";

	$ok = wp_mail(
		get_option( 'admin_email' ),
		'Angebot anfordern – ' . $vorname . ' ' . $nachname,
		$body,
		array( 'Reply-To: ' . $vorname . ' ' . $nachname . ' <' . $email . '>' )
	);

	wp_safe_redirect( add_query_arg( 'gesendet', $ok ? '1' : '0', $zurueck ) );
	exit;
}
add_action( 'admin_post_nopriv_andrys_kontakt', 'andrys_kontakt_senden' );
add_action( 'admin_post_andrys_kontakt', 'andrys_kontakt_senden' );

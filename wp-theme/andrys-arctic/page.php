<?php
/**
 * Standard-Seitentemplate (z. B. Impressum, Datenschutz):
 * Inhalt kommt aus dem WordPress-Editor.
 */
get_header();
?>
  <main id="main">
    <section class="page">
      <div class="wrap">
        <?php
        while ( have_posts() ) :
        	the_post();
        	?>
        	<h1><?php the_title(); ?></h1>
        	<?php the_content(); ?>
        	<?php
        endwhile;
        ?>
      </div>
    </section>
  </main>
<?php get_footer(); ?>

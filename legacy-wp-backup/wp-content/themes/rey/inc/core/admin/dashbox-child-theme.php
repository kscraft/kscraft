<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
if ( ! is_child_theme() ){
	return;
}

$child_theme = wp_get_theme();

?>

<div class="rey-dashBox">
	<div class="rey-dashBox-inner">
		<h2 class="rey-dashBox-title">
			<span><?php esc_html_e('Rey Child theme', 'rey') ?></span>
		</h2>
		<div class="rey-dashBox-content">

			<!-- check if child theme active -->
			<!-- buton install child theme -->
			<!-- sync child theme with parent theme -->
			<p> <?php printf( __(  'You\'re using <strong>%1$s</strong> theme, which is a child theme of %2$s', 'rey' ), $child_theme->Name, ucfirst(REY_THEME_NAME) ); ?> </p>
			<p><?php printf( esc_html__(  "Child theme uses it's own theme setting name, would you like to copy setting data from parent theme to this child theme?", 'rey' ) ); ?></p>

		</div>
	</div>
</div>

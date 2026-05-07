<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$args = reycore_wc__get_account_panel_args(); ?>

<div class="rey-headerAccount rey-headerIcon <?php echo get_theme_mod('header_account_mobile', false) ? 'd-md-block d-none' : '' ?>">
    <button class="btn rey-headerIcon-btn rey-headerAccount-btn--<?php echo esc_attr($args['button_type']); ?> js-rey-headerAccount">
		<?php
			if( $args['button_type'] == 'text' ){
				$btn_text = $args['button_text'];

				if( is_user_logged_in() && $args['button_text_logged_in']  ){
					$btn_text = $args['button_text_logged_in'];
				}

				printf('<span class="rey-headerAccount-btnText">%s</span>', $btn_text );
			}

			if( $args['icon_type'] === 'reycore-icon-heart' ){
				echo reycore__get_svg_icon__core(['id' => 'reycore-icon-heart', 'class' => 'rey-headerAccount-btnIcon']);
			}
			else {
				echo reycore__get_svg_icon(['id' => 'rey-icon-user', 'class' => 'rey-headerAccount-btnIcon']);
			}

		reycore__get_template_part('template-parts/woocommerce/header-account-wishlist-count');
		?>
    </button>

</div>
<!-- .rey-headerAccount-wrapper -->

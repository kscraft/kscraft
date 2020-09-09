<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$args = reycore_wc__get_account_panel_args();

if( reycore_wc__get_account_panel_args('wishlist') ): ?>
	<div class="rey-accountWishlist-wrapper">
		<h2 class="rey-accountPanel-title">
			<a href="<?php echo esc_url( reycore__get_tinv_url() ); ?>"><?php esc_html_e('WISHLIST', 'rey-core'); ?></a>
			<?php
			echo do_shortcode('[ti_wishlist_products_counter]'); ?>
		</h2>
		<div class="rey-accountWishlist-container">
			<div class="rey-accountWishlist" id="js-wishlist-panel"></div>
			<div class="rey-lineLoader"></div>
		</div>
	</div>
	<?php
endif;

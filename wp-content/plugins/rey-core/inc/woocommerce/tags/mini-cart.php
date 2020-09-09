<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly


if(!function_exists('reycore_wc__add_cart_into_header')):
	/**
	 * Add Mini Cart to Header
	 */
	function reycore_wc__add_cart_into_header(){
		if( get_theme_mod('shop_catalog', false) != true && get_theme_mod('header_enable_cart', true) ){
			reycore__get_template_part('template-parts/woocommerce/header-shopping-cart');
		}
	}
endif;
add_action('rey/header/row', 'reycore_wc__add_cart_into_header', 40);


if(!function_exists('reycore_wc__add_cart_panel')):
	/**
	 * Add Cart Panel (triggered by header)
	 * @since 1.0.8
	 */
	function reycore_wc__add_cart_panel(){
		if( get_theme_mod('shop_catalog', false) != true && get_theme_mod('header_enable_cart', true) ){
			reycore__get_template_part('template-parts/woocommerce/header-shopping-cart-panel');
		}
	}
endif;
add_action('rey/after_site_wrapper', 'reycore_wc__add_cart_panel');


if ( ! function_exists( 'reycore_wc__cart_link' ) ) {
	/**
	 * Cart Counter
	 * Displayed a link to the cart including the number of items present
	 *
	 * @return void
	 * @since  1.0.0
	 */
	function reycore_wc__cart_link() {
		$cart_contents = is_object( WC()->cart ) ? WC()->cart->get_cart_contents_count() : '';
		?>
			<span class="rey-headerCart-nb">
				<?php echo sprintf( '%d', $cart_contents ); ?>
			</span>
		<?php
	}
}

if ( ! function_exists( 'reycore_wc__cart_total' ) ) {
	/**
	 * Cart total
	 *
	 * @since  1.4.5
	 */
	function reycore_wc__cart_total() {
		return sprintf('<span class="rey-headerCart-textTotal">%s</span>', is_object( WC()->cart ) ? WC()->cart->get_cart_total() : '');
	}
}


/**
 * Cart fragment
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'reycore_wc__cart_icon_fragment' ) ) {
	/**
	 * Cart Fragments
	 * Ensure cart contents update when products are added to the cart via AJAX
	 *
	 * @param  array $fragments Fragments to refresh via AJAX.
	 * @return array            Fragments to refresh via AJAX
	 */
	function reycore_wc__cart_icon_fragment( $fragments ) {

		ob_start();
		reycore_wc__cart_link();
		$fragments['.rey-siteHeader .rey-headerCart-nb'] = ob_get_clean();

		ob_start();
		echo reycore_wc__cart_total();
		$fragments['.rey-siteHeader .rey-headerCart-textTotal'] = ob_get_clean();

		ob_start();
		reycore_wc__cart_link();
		$fragments['.rey-cartPanel-title span'] = ob_get_clean();

		$fragments['div.widget_shopping_cart_content'] = str_replace(
			'button wc-forward',
			'button wc-forward button--cart',
			$fragments['div.widget_shopping_cart_content']
		);

		return $fragments;
	}
}

if ( defined( 'WC_VERSION' ) && version_compare( WC_VERSION, '2.3', '>=' ) ) {
	add_filter( 'woocommerce_add_to_cart_fragments', 'reycore_wc__cart_icon_fragment' );
} else {
	add_filter( 'add_to_cart_fragments', 'reycore_wc__cart_icon_fragment' );
}


if(!function_exists('reycore_wc__minicart_before_cart_items')):
	/**
	 * Wrap mini cart items
	 *
	 * @since 1.3.7
	 **/
	function reycore_wc__minicart_before_cart_items()
	{
		echo '<div class="woocommerce-mini-cart-inner">';
	}
endif;
add_action('woocommerce_before_mini_cart_contents', 'reycore_wc__minicart_before_cart_items', 0);


if(!function_exists('reycore_wc__minicart_after_cart_items')):
	/**
	 * Wrap mini cart items
	 *
	 * @since 1.3.7
	 **/
	function reycore_wc__minicart_after_cart_items()
	{
		echo '</div>';
	}
	endif;
add_action('woocommerce_mini_cart_contents', 'reycore_wc__minicart_after_cart_items', 999);


if(!function_exists('reycore_wc__minicart_custom_content_when_empty')):
	/**
	 * Adds content into Cart Panel when empty
	 *
	 * @since 1.4.3
	 **/
	function reycore_wc__minicart_custom_content_when_empty()
	{
		if( WC()->cart->is_empty() && ($header_cart_gs = get_theme_mod('header_cart_gs', 'none')) && $header_cart_gs !== 'none' ){
			echo ReyCore_GlobalSections::do_section( $header_cart_gs );
		}
	}
	endif;
add_action('woocommerce_after_mini_cart', 'reycore_wc__minicart_custom_content_when_empty');


if(!function_exists('reycore_wc__show_shipping_minicart')):
	/**
	 * Show Shipping in minicart
	 *
	 * @since 1.6.3
	 **/
	function reycore_wc__show_shipping_minicart()
	{
		printf( '<span class="minicart-shipping"><strong>%s</strong><span>%s</span></span>', esc_html__( 'Shipping', 'rey-core' ), WC()->cart->get_shipping_total() );
	}
	add_action('woocommerce_widget_shopping_cart_total', 'reycore_wc__show_shipping_minicart', 15);
endif;

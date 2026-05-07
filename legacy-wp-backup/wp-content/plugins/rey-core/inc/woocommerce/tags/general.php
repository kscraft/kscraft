<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'woocommerce_template_loop_product_title' ) ):
	/**
	 * Override native function, by adding link into H2 tag.
	 *
	 * Show the product title in the product loop. By default this is an H2.
	 *
	 * @since 1.0.0
	 */
	function woocommerce_template_loop_product_title() {
		echo sprintf(
			'<h2 class="%s"><a href="%s">%s</a></h2>',
			esc_attr( apply_filters( 'woocommerce_product_loop_title_classes', 'woocommerce-loop-product__title' ) ),
			esc_url(get_the_permalink()),
			get_the_title()
		);
	}
endif;


if(!function_exists('reycore_wc__add_account_btn')):
	/**
	 * Add account button and panel markup
	 * @since 1.0.0
	 **/
	function reycore_wc__add_account_btn(){
		if( get_theme_mod('header_enable_account', false) ) {
			reycore__get_template_part('template-parts/woocommerce/header-account');
		}
	}
endif;
add_action('rey/header/row', 'reycore_wc__add_account_btn', 50);


if(!function_exists('reycore_wc__get_account_panel_args')):
	/**
	 * Get account panel options
	 * @since 1.0.0
	 **/
	function reycore_wc__get_account_panel_args( $option = '' ){

		$options = wp_parse_args( get_query_var('rey__header_account'), [
			'enabled' => get_theme_mod('header_enable_account', false),
			'button_type' => get_theme_mod('header_account_type', 'text'),
			'button_text' => get_theme_mod('header_account_text', 'ACCOUNT'),
			'button_text_logged_in' => get_theme_mod('header_account_text_logged_in', ''),
			'icon_type' => get_theme_mod('header_account_icon_type', 'rey-icon-user'),
			'wishlist' =>  get_theme_mod('header_account_wishlist', true) && class_exists('TInvWL_Public_AddToWishlist'),
			'counter' => 'yes',
			'show_separately' => true,
			'login_register_redirect' => get_theme_mod('header_account_redirect_type', 'load_menu'),
			'login_register_redirect_url' => get_theme_mod('header_account_redirect_url', ''),
			'ajax_forms' => apply_filters('reycore/header/account/ajax_forms', true)
		]);

		if( !empty($option) && isset($options[$option]) ){
			return $options[$option];
		}

		return $options;
	}
endif;


if(!function_exists('reycore_wc__account_nav_wrap_start')):
	function reycore_wc__account_nav_wrap_start() {
		echo '<div class="woocommerce-MyAccount-navigation-wrapper">';
	}
	add_action('woocommerce_before_account_navigation', 'reycore_wc__account_nav_wrap_start');
	add_action('woocommerce_after_account_navigation', 'reycore_wc__generic_wrapper_end', 20);
endif;

if(!function_exists('reycore_wc__account_custom_nav')):
	/**
	 * Header Account custom menu items
	 *
	 * @since 1.6.3
	 **/
	function reycore_wc__account_custom_nav() {

		if( ! (($menu_items = get_theme_mod('header_account_menu_items', [])) && is_array($menu_items) ) ){
			return;
		} ?>
		<nav class="woocommerce-MyAccount-navigation --custom">
			<ul>
				<?php foreach ( $menu_items as $menu_item ) : ?>
					<li class="myaccount-nav-<?php echo sanitize_title_with_dashes($menu_item['text']) ?>">
						<a href="<?php echo esc_url( $menu_item['url'] ); ?>" target="<?php esc_attr_e($menu_item['target']) ?>"><?php echo esc_html($menu_item['text']) ?></a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav> <?php
	}
	add_action('woocommerce_after_account_navigation', 'reycore_wc__account_custom_nav');
endif;


if(!function_exists('reycore_wc__account_redirect_attrs')):
/**
 * Redirect attributes for account panel containing login register forms
 *
 * @since 1.4.5
 **/
function reycore_wc__account_redirect_attrs()
{
	$args = reycore_wc__get_account_panel_args();

	$redirect_type = $args['login_register_redirect'];
	$redirect_url = $args['login_register_redirect_url'];

	if( $redirect_type === 'myaccount' ){
		$redirect_url = wc_get_page_permalink( 'myaccount' );
	}

	printf( 'data-redirect-type="%s" data-redirect-url="%s" %s',
		esc_attr($redirect_type),
		esc_attr($redirect_url),
		! $args['ajax_forms'] ? 'data-no-ajax' : ''
	);

}
endif;


if(!function_exists('reycore_wc__add_account_panel')):
	/**
	 * Add account button and panel markup
	 * @since 1.0.0
	 **/
	function reycore_wc__add_account_panel(){
		if( reycore_wc__get_account_panel_args('enabled') ) {
			reycore__get_template_part('template-parts/woocommerce/header-account-panel');
		}
	}
endif;
add_action('rey/after_site_wrapper', 'reycore_wc__add_account_panel');


if(!function_exists('reycore_wc__generic_wrapper_end')):
	/**
	 * Ending wrapper
	 *
	 * @since 1.0.0
	 **/
	function reycore_wc__generic_wrapper_end()
	{ ?>
		</div>
	<?php }
endif;


if( !function_exists('reycore_wc__checkout_required_span') ):

	/**
	 * Add the required mark to the terms & comditions text
	 * to maintain it on the same line visually.
	 *
	 * @since 1.0.0
	 **/
	function reycore_wc__checkout_required_span($text)
	{
		return $text . '<span class="required">*</span>';
	}
endif;
add_filter('woocommerce_get_terms_and_conditions_checkbox_text', 'reycore_wc__checkout_required_span');


if(!function_exists('reycore_wc__placeholder_img_src')):
	/**
	 * Placeholder
	 */
	function reycore_wc__placeholder_img_src( $placeholder ) {
		return defined('REY_CORE_PLACEHOLDER') ? REY_CORE_PLACEHOLDER : $placeholder;
	}
endif;
add_filter('woocommerce_placeholder_img_src', 'reycore_wc__placeholder_img_src');
add_filter( 'option_woocommerce_placeholder_image', 'reycore_wc__placeholder_img_src' );


if(!function_exists('reycore_wc__get_product_images_ids')):
	/**
	 * Get product's image ids
	 *
	 * @since 1.0.0
	 **/
	function reycore_wc__get_product_images_ids( $add_main = true )
	{
		$product = wc_get_product();
		$ids = [];

		if( $product && $main_image_id = $product->get_image_id() ){

			if( $add_main ){
				// get main image' id
				$ids[] = $main_image_id;
			}

			// get gallery
			if( $gallery_image_ids = $product->get_gallery_image_ids() ){
				foreach ($gallery_image_ids as $key => $gallery_img_id) {
					$ids[] = $gallery_img_id;
				}
			}
		}

		return $ids;
	}
endif;


if(!function_exists('reycore_wc__add_mobile_nav_link')):
	/**
	 * Adds dashboard (my account) link into Mobile navigation's footer
	 * @since 1.0.0
	 */
	function reycore_wc__add_mobile_nav_link(){

		$show_account_links = true;

		if( get_theme_mod('shop_catalog', false) === true && apply_filters('reycore/catalog_mode/hide_account', false) ){
			$show_account_links = false;
		}

		if( $show_account_links ) {
			reycore__get_template_part('template-parts/woocommerce/header-mobile-navigation-footer-link');
		}
	}
endif;
add_action('rey/mobile_nav/footer', 'reycore_wc__add_mobile_nav_link', 5);


if(!function_exists('reycore_wc__exclude_cats_in_shop_page')):
	/**
	 * Exclude categories from shop page query
	 *
	 * @since 1.2.0
	 **/
	function reycore_wc__exclude_cats_in_shop_page( $q )
	{
		if( ! ($exclude_cats = get_theme_mod('shop_catalog_page_exclude', '')) ){
			return;
		}

		if(!is_shop()){
			return;
		}

		$tax_query = (array) $q->get( 'tax_query' );

		$tax_query[] = array(
			'taxonomy' => 'product_cat',
			'field' => 'slug',
			'terms' => $exclude_cats,
			'operator' => 'NOT IN'
		);

		$q->set( 'tax_query', $tax_query );
	}
endif;
add_action('woocommerce_product_query', 'reycore_wc__exclude_cats_in_shop_page');


if(!function_exists('reycore_wc__format_price_range')):
	/**
	 * Remove dash from grouped products
	 *
	 * @since 1.0.0
	 */
	function reycore_wc__format_price_range( $price, $from, $to ) {
		/* translators: 1: price from 2: price to */
		$price = sprintf( esc_html_x( '%1$s %2$s', 'Price range: from-to', 'rey-core' ), is_numeric( $from ) ? wc_price( $from ) : $from, is_numeric( $to ) ? wc_price( $to ) : $to );
		return $price;
	}
endif;
add_filter('woocommerce_format_price_range', 'reycore_wc__format_price_range', 10, 3);


if(!function_exists('reycore_wc__cart_remove_text')):
	/**
	 * Change cart remove text
	 *
	 * @since 1.0.0
	 */
	function reycore_wc__cart_remove_text($html, $cart_item, $cart_item_key) {

		$_product     = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
		$product_id   = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

		$new_cart_remove = apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
			'<a href="%s" class="remove remove_from_cart_button" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s">%s</a>',
			esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
			esc_html__( 'Remove this item', 'rey-core' ),
			esc_attr( $product_id ),
			esc_attr( $cart_item_key ),
			esc_attr( $_product->get_sku() ),
			esc_html__('Remove', 'rey-core')
		), $cart_item_key );

		// return $html;
		return $html . apply_filters('reycore/woocommerce_cart_item_remove_link', $new_cart_remove);

	}
endif;
add_filter('woocommerce_widget_cart_item_quantity', 'reycore_wc__cart_remove_text', 10, 3);


if(!function_exists('reycore_wc__move_banner')):
	/**
	 * Move WooCommerce banner store
	 *
	 * @since 1.0.0
	 **/
	function reycore_wc__move_banner()
	{
		remove_action( 'wp_footer', 'woocommerce_demo_store' );

		$hook = 'rey/before_site_wrapper';

		if( get_theme_mod('header_layout_type', 'default') !== 'none' ){
			$hook = 'rey/header/content';
		}

		add_action( $hook, 'woocommerce_demo_store' );
	}
endif;
add_action( 'wp', 'reycore_wc__move_banner' );


if(!function_exists('reycore__wrap_checkout_title')):
	/**
	 * Wrap Checkout title
	 *
	 * @since 1.3.2
	 **/
	function reycore__wrap_checkout_title($title) {

		if( is_checkout() && !is_wc_endpoint_url('order-received') ) {
			return sprintf('<span class="wc_payment_method-title">%s</span>', $title);
		}

		return $title;
	}
endif;
add_filter('woocommerce_gateway_title', 'reycore__wrap_checkout_title');

if(!function_exists('reycore__wrap_checkout_remove_span')):
	/**
	 * Remove span wrapper in order confirmation page
	 *
	 * @since 1.3.5
	 **/
	function reycore__wrap_checkout_remove_span($total_rows)
	{
		if( isset($total_rows['payment_method']['value']) ){
			$total_rows['payment_method']['value'] = str_replace('<span class="wc_payment_method-title">', '', $total_rows['payment_method']['value']);
			$total_rows['payment_method']['value'] = str_replace('</span>', '', $total_rows['payment_method']['value']);
		}

		return $total_rows;
	}
endif;
add_filter('woocommerce_get_order_item_totals', 'reycore__wrap_checkout_remove_span');


if(!function_exists('reycore_wc__qty_input_select')):
	/**
	 * Adds the ability to select number on focus.
	 *
	 * @since 1.3.5
	 */
	function reycore_wc__qty_input_select( $classes ) {
		$classes['select'] = '--select-text';
		return $classes;

	}
endif;
add_filter('woocommerce_quantity_input_classes', 'reycore_wc__qty_input_select');


if( ! function_exists( 'reycore_wc__ajax_add_to_cart' ) ):

	function reycore_wc__ajax_add_to_cart() {

		$data = [];

		// Notices
		ob_start();
		wc_print_notices();
		$data['notices'] = ob_get_clean();

		// Mini cart
		ob_start();
		woocommerce_mini_cart();
		$data['fragments']['div.widget_shopping_cart_content'] = sprintf('<div class="widget_shopping_cart_content">%s</div>', ob_get_clean() );
		$data['fragments'] = apply_filters( 'woocommerce_add_to_cart_fragments', $data['fragments']);

		// Cart Hash
		$data['cart_hash'] = apply_filters( 'woocommerce_add_to_cart_hash',
			WC()->cart->get_cart_for_session() ? md5( json_encode( WC()->cart->get_cart_for_session() ) ) : '',
			WC()->cart->get_cart_for_session()
		);

		wp_send_json( $data );
		die();
	}
endif;
add_action( 'wp_ajax_reycore_ajax_add_to_cart', 'reycore_wc__ajax_add_to_cart' );
add_action( 'wp_ajax_nopriv_reycore_ajax_add_to_cart', 'reycore_wc__ajax_add_to_cart' );

if(!function_exists('reycore_wc__add_variation_cart_scripts')):
	/**
	 * Add variations add to cart script
	 *
	 * @since 1.4.0
	 **/
	function reycore_wc__add_variation_cart_scripts()
	{
		if( ! get_theme_mod('loop_ajax_variable_products', false) ){
			return;
		}
		// Enqueue variation scripts.
		wp_enqueue_script( 'wc-add-to-cart-variation' );
	}
endif;
add_action( 'wp_enqueue_scripts', 'reycore_wc__add_variation_cart_scripts' );


if( ! function_exists( 'reycore_loop_variable_product_add_to_cart' ) ):
	function reycore_loop_variable_product_add_to_cart() {

		if( ! ( isset($_REQUEST['product_id']) && $product_id = absint($_REQUEST['product_id']) ) ){
			wp_send_json_error( esc_html__('Product ID not found.', 'rey-core') );
		}

		$product = wc_get_product($product_id);

		remove_all_actions('woocommerce_before_add_to_cart_button');
		remove_all_actions('woocommerce_after_add_to_cart_button');

		if( class_exists('ReyCore_WooCommerce_Single') ){
			add_action( 'woocommerce_before_add_to_cart_button', [ ReyCore_WooCommerce_Single::getInstance(), 'wrap_cart_qty' ], 10);
			add_action( 'woocommerce_after_add_to_cart_button', 'reycore_wc__generic_wrapper_end', 5);
		}

		if( $product && $product->is_purchasable() && $product->is_type('variable') ){
			ob_start();

			echo sprintf('<div class="rey-productLoop-variationsForm woocommerce" data-id="%s">', $product_id);
			echo '<div class="product">';
				echo sprintf('<span class="rey-productLoop-variationsForm-close">%s</span>', reycore__get_svg_icon(['id' => 'rey-icon-close']));
				$GLOBALS['product'] = $product;
				woocommerce_variable_add_to_cart();
			echo '</div>';
			echo '</div>';

			$data = ob_get_clean();

			wp_send_json_success( $data );
		}

		wp_send_json_error( esc_html__('Product not purchasable.', 'rey-core') );
	}
endif;
add_action( 'wp_ajax_reycore_loop_variable_product_add_to_cart', 'reycore_loop_variable_product_add_to_cart' );
add_action( 'wp_ajax_nopriv_reycore_loop_variable_product_add_to_cart', 'reycore_loop_variable_product_add_to_cart' );


if( ! function_exists( 'reycore_account_forms_ajax_process' ) ):
	function reycore_account_forms_ajax_process() {

		if( isset($_POST['action_type']) && ($action_type = $_POST['action_type']) && class_exists('WC_Form_Handler') ):

			$data = [];

			wc_clear_notices();

			if( 'register' === $action_type ){
				WC_Form_Handler::process_registration();
			}
			elseif( 'login' === $action_type ){
				WC_Form_Handler::process_login();
			}
			elseif( 'forgot' === $action_type ){
				WC_Form_Handler::process_lost_password();
			}

			ob_start();
			wc_print_notices();
			$data['notices'] = ob_get_clean();

			wp_send_json_success( $data );

		endif;

		wp_send_json_error( esc_html__('Something went wrong while submitting this form. Please try again!', 'rey-core') );
	}
endif;
add_action( 'wp_ajax_reycore_account_forms', 'reycore_account_forms_ajax_process' );
add_action( 'wp_ajax_nopriv_reycore_account_forms', 'reycore_account_forms_ajax_process' );


if(!function_exists('reycore_wc__modal_template')):

	function reycore_wc__modal_template(){
		?>
		<script type="text/html" id="tmpl-reycore-modal-tpl">
			<div class="rey-modal {{{data.wrapperClass}}}">
				<div class="rey-modalOverlay"></div>
				<div class="rey-modalInner">
					<button class="rey-modalClose"><?php echo reycore__get_svg_icon(['id' => 'rey-icon-close']) ?></button>
					<div class="rey-modalLoader">
						<div class="rey-lineLoader"></div>
					</div>
					<div class="rey-modalContent {{{data.contentClass}}}"></div>
				</div>
			</div>
		</script>
		<?php
	}
endif;
add_action('wp_footer', 'reycore_wc__modal_template');


if(!function_exists('reycore__woocommerce_filter_js')):
	/**
	 * Filter WC JS
	 *
	 * @since 1.0.0
	 **/
	function reycore__woocommerce_filter_js($js)
	{
		$search_for = '.selectWoo( {';
		$replace_with = '.selectWoo( {';
		$replace_with .= 'containerCssClass: "select2-reyStyles",';
		$replace_with .= 'dropdownCssClass: "select2-reyStyles",';
		$replace_with .= 'dropdownAutoWidth: true,';
		$replace_with .= 'width: "auto",';

		return str_replace($search_for, $replace_with, $js);
	}
endif;
add_filter('woocommerce_queued_js', 'reycore__woocommerce_filter_js');


if(!function_exists('reycore_wc__related_change_cols')):
	/**
	 * Filter related products columns no.
	 *
	 * @since 1.5.0
	 **/
	function reycore_wc__related_change_cols( $args )
	{
		$args['posts_per_page'] = reycore_wc_get_columns('desktop');
		$args['columns'] = reycore_wc_get_columns('desktop');

		return $args;
	}
add_filter('woocommerce_output_related_products_args', 'reycore_wc__related_change_cols', 10);
endif;


if(!function_exists('reycore_wc__track_product_view')):
	/**
	 * Track product views.
	 */
	function reycore_wc__track_product_view() {

		if ( ! is_singular( 'product' ) ) {
			return;
		}

		if( ! apply_filters('reycore/woocommerce/track_product_view', true) ){
			return;
		}

		global $post;

		if ( empty( $_COOKIE['woocommerce_recently_viewed'] ) ) { // @codingStandardsIgnoreLine.
			$viewed_products = array();
		} else {
			$viewed_products = wp_parse_id_list( (array) explode( '|', wp_unslash( $_COOKIE['woocommerce_recently_viewed'] ) ) ); // @codingStandardsIgnoreLine.
		}

		// Unset if already in viewed products list.
		$keys = array_flip( $viewed_products );

		if ( isset( $keys[ $post->ID ] ) ) {
			unset( $viewed_products[ $keys[ $post->ID ] ] );
		}

		$viewed_products[] = $post->ID;

		if ( count( $viewed_products ) > 15 ) {
			array_shift( $viewed_products );
		}

		// Store for session only.
		wc_setcookie( 'woocommerce_recently_viewed', implode( '|', $viewed_products ) );
	}
	add_action( 'template_redirect', 'reycore_wc__track_product_view', 20 );
endif;

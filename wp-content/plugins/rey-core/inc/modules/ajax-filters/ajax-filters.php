<?php
// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
}

if (class_exists('WooCommerce') && !class_exists('ReyAjaxFilters') ) {

	class ReyAjaxFilters
	{
		/**
		 * A reference to an instance of this class.
		 *
		 * @var ReyAjaxFilters
		 */
		private static $_instance = null;

		public $pg_settings;
		public $is_filter_page;
		public $filters_are_supported;
		public $chosen_filters = [];

		const TRANSIENT_PRICE_RANGE = 'reyajaxfilter_price_range';

		/**
		 * Initialize the plugin.
		 */
		public function __construct()
		{

			$this->define_constants();
			$this->includes();

			add_filter( 'reycore/woocommerce/check_shop_sidebar', [$this, 'check_shop_sidebar_for_filters'], 10);
			add_action( 'pre_get_posts', [ $this, 'pre_get_posts'], 9);
			add_action( 'woocommerce_product_query', [ $this, 'woocommerce_product_query'], 10);
			add_action( 'wp', [$this, 'run_hooks']);
			add_filter( 'reycore/ajaxfilters/widgets_support', [$this, 'check_widgets_support'], 10);
			add_action( 'elementor/element/reycore-menu/section_settings/before_section_end', [ $this, 'elementor_menu_cat_skin_option' ], 20 );
		}

		/**
		 * Returns an instance of this class.
		 *
		 * @return ReyAjaxFilters
		 */
		public static function instance()
		{
			if (!isset(self::$_instance)) {
				self::$_instance = new ReyAjaxFilters();
			}

			return self::$_instance;
		}

		/**
		 * Define constants if not already defined.
		 *
		 * @param  string $name
		 * @param  string|bool $value
		 */
		public function define($name, $value)
		{
			if (!defined($name)) {
				define($name, $value);
			}
		}

		/**
		 * Defind constants for this plugin.
		 */
		public function define_constants()
		{
			$this->define('REYAJAXFILTERS_DIR', REY_CORE_MODULE_DIR . basename(__DIR__));
			$this->define('REYAJAXFILTERS_PATH', REY_CORE_MODULE_URI . basename(__DIR__));
			$this->define('REYAJAXFILTERS_CACHE_TIME', 60 * 60 * 12 );
		}

		/**
		 * Include required core files.
		 */
		public function includes()
		{
			require_once REYAJAXFILTERS_DIR . '/includes/functions.php';
			require_once REYAJAXFILTERS_DIR . '/includes/options.php';
			require_once REYAJAXFILTERS_DIR . '/includes/migration.php';
			require_once REYAJAXFILTERS_DIR . '/includes/elementor-products-grid.php';

			$widgets = $this->widgets_list();

			foreach( $widgets as $widget ){
				require_once REYAJAXFILTERS_DIR . "/widgets/{$widget}.php";
			}
		}

		public function pre_get_posts( $query ){

			if( isset( $_REQUEST['wc-ajax'] ) && $_REQUEST['wc-ajax'] === 'get_refreshed_fragments' ){
				return;
			}

			if( isset( $_REQUEST['elementor-preview'] ) && $_REQUEST['elementor-preview'] !== '' ){
				return;
			}

			if( is_admin() ){
				return;
			}

			if( ! $query->is_main_query() ){
				return;
			}

			// there must be at least one filter widget in one sidebar
			if( ! (class_exists('ReyCore_WooCommerce_Base') && (reycore_wc__check_filter_panel() || reycore_wc__check_filter_sidebar_top() || reycore_wc__check_shop_sidebar())) ){
				return;
			}

			// product post types
			if( $query->is_post_type_archive('product') || $query->is_tax(get_object_taxonomies('product')) || $this->is_shop_frontpage__pre_get_posts( $query ) ){
				$this->filters_are_supported = true;
			}

			// pages
			elseif ( $query->is_page() ){

				// checks if this Elementor page has a Product grid element
				// and page filters option is enabled.
				$this->is_filter_page =
					( $queried_id = $query->get_queried_object_id() ) &&
					class_exists('\\Elementor\\Plugin') && \Elementor\Plugin::$instance->db->is_built_with_elementor( $queried_id ) &&
					($this->pg_settings = get_post_meta( $queried_id, ReyAjaxFilters_ProductGrid::META_KEY, true )) &&
					$this->pg_settings !== '' &&
					isset($this->pg_settings['page_uses_filters']) && 'yes' === $this->pg_settings['page_uses_filters'];

				if( $this->is_filter_page ){
					$this->filters_are_supported = true;
				}
			}
		}

		/**
		 * Tell widgets wether to show or not
		 *
		 * @since 1.5.4
		 */
		function check_widgets_support(){
			return $this->filters_are_supported;
		}

		function run_hooks(){
			add_action( 'woocommerce_before_shop_loop', [$this, 'beforeProductsHolder'], 0);
			add_action( 'woocommerce_after_shop_loop', [$this, 'afterProductsHolder'], 200);
			add_action( 'woocommerce_before_template_part', [$this, 'beforeNoProducts'], 0);
			add_action( 'woocommerce_after_template_part', [$this, 'afterNoProducts'], 200);
			add_filter( 'paginate_links', [$this, 'paginateLinks']);
			add_action( 'wp_enqueue_scripts', [$this, 'frontendScripts']);
			add_filter( 'reycore/woocommerce/get_active_filters', [$this, 'get_active_filters']);
			add_filter( 'reycore/woocommerce/brands/url', [$this, 'brand_url'], 10, 3);
			add_filter( 'reycore/elementor/menu/product_categories_skin/render_menu', [$this, 'elementor_menu_cat_skin_html'], 10, 3);
			add_action( 'reycore/elementor/product_grid/show_header', [ $this, 'elementor_product_grid_add_scripts' ] );
			add_action( 'reycore/filters_sidebar/before_panel', [ $this, 'apply_button_filter_panel_sidebar' ] );
			add_action( 'dynamic_sidebar_after', [ $this, 'apply_button_filter_general_sidebar' ], 200 );
			add_action( 'reycore/loop_products/before_header_end', [$this, 'active_filters_top'] );
			add_filter( 'rey/woocommerce/loop/header_classes', [$this, 'active_filters_top_classes']);
		}

		public function widgets_list(){
			return [
				'active-filters',
				'attribute-filter',
				'category-filter',
				'featured-filter',
				'price-filter',
				'sale-filter',
				'stock-filter',
				'tag-filter',
				'taxonomy-filter',
			];
		}

		/**
		 * Register and enqueue frontend scripts.
		 *
		 * @return mixed
		 */
		public function frontendScripts()
		{
			if( ! $this->filters_are_supported ){
				return;
			}

			wp_enqueue_style('reyajfilter-style', REYAJAXFILTERS_PATH . '/assets/css/styles.css', [], REY_CORE_VERSION);
			wp_register_script('reyajfilter-script', REYAJAXFILTERS_PATH . '/assets/js/scripts.js', ['jquery', 'rey-script', 'reycore-scripts'] , REY_CORE_VERSION, true);

			wp_localize_script('reyajfilter-script', 'reyajaxfilter_params', apply_filters('reycore/ajaxfilters/js_params', [
				'shop_loop_container'  => '.rey-siteMain .reyajfilter-before-products',
				'not_found_container'  => '.rey-siteMain .reyajfilter-before-products',
				'pagination_container' => '.woocommerce-pagination',
				'animation_type'       => get_theme_mod('ajaxfilter_animation_type', 'default'),
				'sorting_control'      => get_theme_mod('ajaxfilter_product_sorting', true),
				'scroll_to_top'        => get_theme_mod('ajaxfilter_scroll_to_top', true),
				'scroll_to_top_offset' => get_theme_mod('ajaxfilter_scroll_to_top_offset', 100),
				'apply_filter_fixed'   => true,
				'dd_search_threshold'  => 5,
			]));

			// wp_register_style('reyajfilter-nouislider-style', REYAJAXFILTERS_PATH . '/assets/css/nouislider.css');
			wp_register_script('nouislider', REYAJAXFILTERS_PATH . '/assets/js/nouislider.min.js', ['jquery', 'reyajfilter-script'], '13.0.0', true);

			wp_register_style('reyajfilter-select2', REYAJAXFILTERS_PATH . '/assets/css/select2.css');
			wp_register_script('reyajfilter-select2', REYAJAXFILTERS_PATH . '/assets/js/select2.min.js', ['jquery', 'reyajfilter-script'], '1.0', true);
			wp_register_script('reyajfilter-select2-multi-checkboxes', REYAJAXFILTERS_PATH . '/assets/js/select2-multi-checkboxes.js', ['reyajfilter-select2'], '1.0', true);
		}

		protected function is_shop_frontpage__pre_get_posts( $query ){

			$front_page_id        = get_option( 'page_on_front' );
			$current_page_id      = $query->get( 'page_id' );
			$shop_page_id         = apply_filters( 'woocommerce_get_shop_page_id' , get_option( 'woocommerce_shop_page_id' ) );
			$is_static_front_page = 'page' == get_option( 'show_on_front' );

			// Detect if it's a static front page and the current page is the front page, then use our work around
			if ( $is_static_front_page && $front_page_id == $current_page_id  ) {
				return ( $current_page_id == $shop_page_id ) ? true : false;
			}
			// Otherwise, just use is_shop since it works fine on other pages
			else {
				return is_shop();
			}
		}

		/**
		 * Set chosen filters.
		 *
		 * @since 1.5.4
		 */
		public function set_chosen_filters()
		{
			// parse url
			$url = $_SERVER['QUERY_STRING'];
			parse_str($url, $query);

			$query = apply_filters('reycore/ajaxfilters/query_url', $query);
			$is_product_grid = isset($query['pg']) && $query['pg'];

			$chosen = [];
			$active_filters = [];

			// keyword
			if (isset($_GET['keyword'])) {
				$keyword = (!empty($_GET['keyword'])) ? $_GET['keyword'] : '';
				$active_filters['keyword'] = $keyword;
			}

			// orderby
			if (isset($_GET['orderby'])) {
				$orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : '';
				$active_filters['orderby'] = $orderby;
			}

			// Parse From URL

			// category
			if ( ($category_filters = reycore__preg_grep_keys('/product-cat/', $query)) && !empty($category_filters)) {

				$category_filters_keys = [
					'product-cata' => 'and',
					'product-cato' => 'or',
				];

				$category_filters_key = array_keys( array_intersect_key($category_filters_keys, $category_filters ) )[0];
				$category_filters_query_type = $category_filters_keys[$category_filters_key];

				$category_terms = explode(',', $category_filters[ $category_filters_key ]);
				$category_taxonomy = 'product_cat';

				$chosen[$category_taxonomy] = array(
					'terms'      => $category_terms,
					'query_type' => $category_filters_query_type
				);

				foreach ($category_terms as $term_id) {
					$active_filters['term'][$category_filters_key][$term_id] = $category_taxonomy;
				}
			}

			// tag
			if ( ($tag_filters = reycore__preg_grep_keys('/product-tag/', $query)) && !empty($tag_filters)) {

				$tag_filters_keys = [
					'product-taga' => 'and',
					'product-tago' => 'or',
				];

				$tag_filters_key = array_keys( array_intersect_key($tag_filters_keys, $tag_filters ) )[0];
				$tag_filters_query_type = $tag_filters_keys[$tag_filters_key];

				$tag_terms = explode(',', $tag_filters[ $tag_filters_key ]);
				$tag_taxonomy = 'product_tag';

				$chosen[$tag_taxonomy] = array(
					'terms'      => $tag_terms,
					'query_type' => $tag_filters_query_type
				);

				foreach ($tag_terms as $term_id) {
					$active_filters['term'][$tag_filters_key][$term_id] = $tag_taxonomy;
				}
			}

			// attribute
			if ( ($attribute_filters = reycore__preg_grep_keys('/^attr/', $query)) && !empty($attribute_filters)) {

				$attribute_filters_keys = [
					'attra' => 'and',
					'attro' => 'or',
				];

				foreach ($attribute_filters as $akey => $avalue) {

					$attribute_taxonomy_slug = '';
					$attribute_filters_query_type = 'and';

					foreach ($attribute_filters_keys as $k => $v) {
						if( strpos($akey, $k ) !== false ){
							$attribute_filters_query_type = $v;
							$attribute_taxonomy_slug = str_replace( $k . '-', '', $akey );
						}
					}

					if( !empty($attribute_taxonomy_slug) ){

						$attribute_terms = explode(',', $avalue);
						$attribute_taxonomy = wc_attribute_taxonomy_name( wc_sanitize_taxonomy_name ( $attribute_taxonomy_slug ) );

						$chosen[$attribute_taxonomy] = array(
							'terms'      => $attribute_terms,
							'query_type' => $attribute_filters_query_type
						);

						foreach ($attribute_terms as $term_id) {
							$active_filters['term'][$akey][$term_id] = $attribute_taxonomy;
						}
					}
				}
			}

			// Custom taxonomies
			$custom_taxonomies = $this->get_registered_taxonomies();

			foreach ($custom_taxonomies as $taxonomy) {

				$tid = str_replace('-', '', sanitize_title( $taxonomy['name'] ));

				if ( ($ctax_filters = reycore__preg_grep_keys("/product-{$tid}/", $query)) && !empty($ctax_filters)) {

					$ctax_filters_keys = [
						"product-{$tid}a" => "and",
						"product-{$tid}o" => "or",
					];

					$ctax_filters_key = array_keys( array_intersect_key($ctax_filters_keys, $ctax_filters ) )[0];
					$ctax_filters_query_type = $ctax_filters_keys[$ctax_filters_key];

					$ctax_terms = explode(',', $ctax_filters[ $ctax_filters_key ]);
					$ctax_taxonomy = $taxonomy['id'];

					$chosen[$ctax_taxonomy] = array(
						'terms'      => $ctax_terms,
						'query_type' => $ctax_filters_query_type
					);

					foreach ($ctax_terms as $term_id) {
						$active_filters['term'][$ctax_filters_key][$term_id] = $ctax_taxonomy;
					}
				}
			}

			// min-price
			if (isset($_GET['min-price'])) {
				$active_filters['min_price'] = $_GET['min-price'];
			}

			// max-price
			if (isset($_GET['max-price'])) {
				$active_filters['max_price'] = $_GET['max-price'];
			}

			if (isset($_GET['in-stock']) && 1 === absint($_GET['in-stock']) ) {
				$active_filters['in-stock'] = 1;
			}

			if ( $this->queryIsOnSale() ) {
				$active_filters['on-sale'] = 1;
			}

			if ( $this->queryIsFeatured() ) {
				$active_filters['is-featured'] = 1;
			}

			if( !empty($chosen) ){
				add_filter('woocommerce_is_filtered', '__return_true');
			}

			$this->chosen_filters = wc_clean([
				'chosen'         => $chosen,
				'active_filters' => $active_filters
			]);

		}

		/**
		 * Filtered product ids for given terms.
		 *
		 * @return array
		 */
		public function queryForTax()
		{
			$tax_query = [];

			if( empty($this->chosen_filters) ){
				return $tax_query;
			}

			$chosen_filters = $this->chosen_filters['chosen'];

			// 99% copy of WC_Query
			if (is_array($chosen_filters) && sizeof($chosen_filters) > 0) {

				global $wp_query;
				$main_query = $wp_query->is_main_query();

				$tax_query = array(
					'relation' => 'AND',
				);

				foreach ( $chosen_filters as $taxonomy => $data ) {
					$tq = [
						'taxonomy'         => $taxonomy,
						'field'            => 'term_id',
						'terms'            => $data['terms'],
						'operator'         => 'and' === $data['query_type'] ? 'AND' : 'IN',
						'include_children' => false,
					];

					if( $taxonomy === 'product_cat' ){
						$tq['include_children'] = true;
					}

					$tax_query[] = $tq;
				}

				$product_visibility_terms  = wc_get_product_visibility_term_ids();
				$product_visibility_not_in = array( is_search() && $main_query ? $product_visibility_terms['exclude-from-search'] : $product_visibility_terms['exclude-from-catalog'] );

				// Hide out of stock products.
				if ( 'yes' === get_option( 'woocommerce_hide_out_of_stock_items' ) ) {
					$product_visibility_not_in[] = $product_visibility_terms['outofstock'];
				}

				if ( ! empty( $product_visibility_not_in ) ) {
					$tax_query[] = array(
						'taxonomy' => 'product_visibility',
						'field'    => 'term_taxonomy_id',
						'terms'    => $product_visibility_not_in,
						'operator' => 'NOT IN',
					);
				}

			}

			return array_filter( $tax_query );
		}

		public function queryForPostIn(){
			$post__in = [];

			if ( $this->queryIsOnSale() ) {
				$post__in = array_merge( $post__in, reyajaxfilters_get_sale_products() );
			}

			if ( $this->queryIsFeatured() ) {
				$post__in = array_merge( $post__in, wc_get_featured_product_ids() );
			}

			return $post__in;
		}

		public function queryIsOnSale(){
			return apply_filters('reycore/ajaxfilters/query/on_sale', isset($_GET['on-sale']) && 1 === absint($_GET['on-sale']) );
		}

		public function queryIsFeatured(){
			return apply_filters('reycore/ajaxfilters/query/featured', isset($_GET['is-featured']) && 1 === absint($_GET['is-featured']) );
		}

		/**
		 * OK
		 * Query for meta that should be set to the main query.
		 *
		 * @return array
		 */
		public function queryForMeta()
		{
			$meta_query = array();

			// rating filter
			if (isset($_GET['min_rating'])) {
				$meta_query[] = array(
					'key'           => '_wc_average_rating',
					'value'         => isset($_GET['min_rating']) ? floatval($_GET['min_rating']) : 0,
					'compare'       => '>=',
					'type'          => 'DECIMAL',
					'rating_filter' => true,
				);
			}

			if (isset($_GET['in-stock']) && 1 === absint($_GET['in-stock']) ) {
				$meta_query[] = array(
					'key'           => '_stock_status',
					'value'         => 'instock',
				);
			}

			if (isset($_GET['min-price']) || isset($_GET['max-price'])) {

				// $price_range = $this->get_price_range();
				$step = max( apply_filters( 'woocommerce_price_filter_widget_step', 10 ), 1 );

				$min_price = (!empty($_GET['min-price'])) ? (int)$_GET['min-price'] : 0;
				$max_price = (!empty($_GET['max-price'])) ? (int)$_GET['max-price'] : 0;

				if( $min_price !== $max_price ) {

					// Check to see if we should add taxes to the prices if store are excl tax but display incl.
					$tax_display_mode = get_option( 'woocommerce_tax_display_shop' );

					if ( wc_tax_enabled() && ! wc_prices_include_tax() && 'incl' === $tax_display_mode ) {
						$tax_class = apply_filters( 'woocommerce_price_filter_widget_tax_class', '' ); // Uses standard tax class.
						$tax_rates = WC_Tax::get_rates( $tax_class );

						if ( $tax_rates ) {
							$min_price += WC_Tax::get_tax_total( WC_Tax::calc_exclusive_tax( $min_price, $tax_rates ) );
							$max_price += WC_Tax::get_tax_total( WC_Tax::calc_exclusive_tax( $max_price, $tax_rates ) );
						}
					}

					$min_price = apply_filters( 'woocommerce_price_filter_widget_min_amount', floor( $min_price / $step ) * $step );
					$max_price = apply_filters( 'woocommerce_price_filter_widget_max_amount', ceil( $max_price / $step ) * $step );

					$meta_query[] = [
						'key'          => '_price',
						'value'        => [ $min_price, $max_price ],
						'type'         => 'numeric',
						'compare'      => 'BETWEEN',
						'price_filter' => true,
					];
				}

			}

			return $meta_query;
		}

		/**
		 * Retrive Product ids for given keyword.
		 *
		 * @return array
		 */
		public function queryForKeywordSearch()
		{
			if (isset($_GET['keyword']) && !empty($_GET['keyword'])) {
				return wc_clean( $_GET['keyword'] );
			}

			return '';
		}

		/**
		 * Set filter.
		 *
		 * @param wp_query $q
		 */
		public function woocommerce_product_query( $q )
		{
			if( ! $this->filters_are_supported ){
				return;
			}

			$this->set_chosen_filters();

			if( $meta_query = $this->queryForMeta() ){
				$q->set( 'meta_query', $meta_query );
			}
			if( $tax_query = $this->queryForTax() ){
				$q->set( 'tax_query', $tax_query );
			}
			if( $post__in = $this->queryForPostIn() ){
				$q->set('post__in', $post__in);
			}

			return;
		}

		/**
		 * HTML wrapper to insert before the shop loop.
		 *
		 * @return string
		 */
		public function beforeProductsHolder()
		{
			if( ! $this->filters_are_supported ){
				return;
			}

			$anim_type = get_theme_mod('ajaxfilter_animation_type', 'default');

			echo sprintf('<div class="reyajfilter-before-products --anim-%s">', $anim_type);

			if( $anim_type === 'default' ){
				echo '<div class="reyajfilter-updater"><div class="rey-lineLoader"></div></div>';
			}
		}

		/**
		 * HTML wrapper to insert after the shop loop.
		 *
		 * @return string
		 */
		public function afterProductsHolder()
		{
			if( ! $this->filters_are_supported ){
				return;
			}

			echo '</div>';
		}

		/**
		 * HTML wrapper to insert before the not found product loops.
		 *
		 * @param  string $template_name
		 * @param  string $template_path
		 * @param  string $located
		 * @return string
		 */
		public function beforeNoProducts($template_name = '', $template_path = '', $located = '') {
		    if ($template_name == 'loop/no-products-found.php') {
		        $this->beforeProductsHolder();
		    }
		}

		/**
		 * HTML wrapper to insert after the not found product loops.
		 *
		 * @param  string $template_name
		 * @param  string $template_path
		 * @param  string $located
		 * @return string
		 */
		public function afterNoProducts($template_name = '', $template_path = '', $located = '') {
		    if ($template_name == 'loop/no-products-found.php') {
		        echo '</div>';
		    }
		}

		/**
		 * Decode pagination links.
		 *
		 * @param string $link
		 *
		 * @return string
		 */
		public function paginateLinks($link)
		{
			if( ! $this->filters_are_supported ){
				return $link;
			}
			$link = urldecode($link);
			$link = str_replace('?reynotemplate=1', '', $link);
			$link = str_replace('&reynotemplate=1', '', $link);
			return $link;
		}

		/**
		 * Get active filters
		 *
		 * @since 1.0.0
		 */
		public function get_active_filters(){
			$total_filters = 0;

			if( empty($this->chosen_filters) ){
				return $total_filters;
			}

			if( isset($this->chosen_filters['chosen']) && $chosen_filters = $this->chosen_filters['chosen'] ) {
				$total_filters = sizeof($chosen_filters);
			}

			return $total_filters;
		}

		function brand_url( $brand_url, $brand_attribute_name, $url ){

			if( ! $this->filters_are_supported ){
				return $brand_url;
			}

			$brand_id = wc_get_product_terms( get_the_ID(), wc_attribute_taxonomy_name( $brand_attribute_name ), [ 'fields' => 'ids' ] );

			if( isset($brand_id[0]) ){
				$brand_url = $url . '?attro-'. $brand_attribute_name .'='. $brand_id[0];
			}

			return $brand_url;
		}

		function elementor_menu_cat_skin_option($element){

			$element->add_control(
				'reycore_ajaxify',
				[
					'label' => __( 'Use Ajax', 'rey-core' ),
					'description' => __( 'To enable this option, make sure there are filter widgets published. Please know it\'s only compatible with archive/category pages.', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SWITCHER,
					'default' => 'yes',
					'condition' => [
						'_skin' => 'product-categories',
					],
				]
			);

		}

		public function elementor_menu_cat_skin_html( $html, $cats, $settings )
		{
			if( ! $this->filters_are_supported ){
				return $html;
			}

			if( !(isset($settings['reycore_ajaxify']) && $settings['reycore_ajaxify'] === 'yes') ){
				return $html;
			}

			wp_enqueue_script('reyajfilter-script');

			$html = "<ul class='reyEl-menu-nav reyajfilter-ajax-term-filter'>";

			if( $settings['all_button'] !== '' && $settings['pcat_type'] === 'all' ){
				$html .= sprintf(
					'<li class="menu-item %3$s"><a href="%2$s"><span>%1$s</span></a></li>',
					$settings['all_button_text'],
					get_permalink( wc_get_page_id('shop') ),
					is_shop() ? 'current-menu-item' : ''
				);
			}

			foreach ($cats as $i => $cat) {

				$term = get_term_by('slug', $cat, 'product_cat' );
				$term_id = 0;
				if( is_object($term) && $term->term_id ){
					$term_id = $term->term_id;
				}

				$attributes = 'data-key="product-cato" data-taxonomy-type="product_cat" data-value="'. $term_id .'"';

				$html .= sprintf(
					'<li class="menu-item %3$s"><a href="%2$s" %4$s><span>%1$s</span></a></li>',
					$cat,
					get_term_link( $i, 'product_cat' ),
					is_tax( 'product_cat', $i ) ? 'current-menu-item' : '',
					$attributes
				);
			}

			$html .= '</ul>';

			return $html;
		}

		function elementor_product_grid_add_scripts($elementor_edit_mode){

			if( ! $this->filters_are_supported ){
				return;
			}

			if( ! $elementor_edit_mode ) {
				wp_enqueue_style('reyajfilter-style');
				wp_enqueue_script('reyajfilter-script');
			}
		}

		function apply_button_filter_panel_sidebar(){

			if( ! $this->filters_are_supported ){
				return;
			}

			if(
				get_theme_mod('ajaxfilter_apply_filter', false) &&
				reycore_wc__check_filter_panel()
			){
				$this->print_apply_filters_button('filter-panel');
			}
		}

		function apply_button_filter_general_sidebar( $index ){

			if( ! $this->filters_are_supported ){
				return;
			}

			if(
				get_theme_mod('ajaxfilter_apply_filter', false) &&
				( ($index === 'filters-top-sidebar' && reycore_wc__check_filter_sidebar_top()) || ($index === 'shop-sidebar' && reycore_wc__check_shop_sidebar()) )
			){
				$this->print_apply_filters_button($index);
			}
		}

		function print_apply_filters_button($sidebar_id){

			if(is_admin()){
				return;
			}

			$btn_style = 'btn-primary';
			if( $sidebar_id === 'filters-top-sidebar' ){
				$btn_style = 'btn-line-active';
			}

			printf(
				'<div class="rey-applyFilters-btn-wrapper" id="rey-applyFilters-btn-wrapper-%2$s"><button class="rey-applyFilters-btn js-rey-applyFilters-btn btn %3$s  --disabled"><span>%1$s</span><span class="rey-lineLoader"></span></button></div>',
				get_theme_mod('ajaxfilter_apply_filter_text', esc_html__('Apply Filters', 'rey-core')),
				$sidebar_id,
				$btn_style
			);

		}

		function check_shop_sidebar_for_filters($check) {

			if( ! is_active_sidebar('shop-sidebar') ) {
				return $check;
			}

			$widgets = $this->widgets_list();

			foreach( $widgets as $widget ){
				if( ($sidebar = is_active_widget( false, false, 'reyajfilter-' . $widget )) && $sidebar === 'shop-sidebar' ){
					return true;
				}
			}

			return $check;
		}

		public function get_registered_taxonomies(){
			$reg = get_theme_mod('ajaxfilters_taxonomies', []);
			return apply_filters('reycore/ajaxfilters/registered_taxonomies', $reg);
		}

		public function active_filters_top(){

			if( ! $this->filters_are_supported ){
				return ;
			}

			if( get_theme_mod('ajaxfilter_active_position', '') === '' ){
				return;
			}

			the_widget( 'REYAJAXFILTERS_Active_Filters_Widget', array(
				'title' => '',
				'button_text' => get_theme_mod('ajaxfilter_active_clear_text', esc_html__('Clear all', 'rey-core')),
			));
		}

		function active_filters_top_classes( $classes ){

			if( ! $this->filters_are_supported ){
				return $classes;
			}

			$pos = get_theme_mod('ajaxfilter_active_position', '');

			if( $pos === '' ){
				return $classes;
			}

			$classes['active_filter_pos'] = '--active-pos-' . $pos;

			return $classes;
		}



	}

	function reyAjaxFilters(){
		return ReyAjaxFilters::instance();
	}

	reyAjaxFilters();

}

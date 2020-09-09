<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( class_exists( 'WC_Brands' ) && !class_exists('ReyCore_Compatibility__WC_Brands') ):

	class ReyCore_Compatibility__WC_Brands
	{
		public $brandsInstance;

		private $settings = [];

		public function __construct()
		{
			if( isset($GLOBALS['WC_Brands']) ){
				$this->brandsInstance = $GLOBALS['WC_Brands'];
			}

			$this->add_settings();

			remove_action( 'woocommerce_product_meta_end', [ $this->brandsInstance, 'show_brand' ] );
			add_action( 'woocommerce_single_product_summary', [$this, 'show_brands'], 6 );
			add_action( 'woocommerce_shop_loop_item_title', [$this, 'show_brands'], 4 );
			add_filter( 'reycore/ajaxfilters/registered_taxonomies', [$this, 'register_tax_ajaxfilter']);
		}

		function add_settings(){
			$this->settings = apply_filters('reycore/compatibility/brands/settings', [
				'show_thumbs' => true,
			] );
		}

		public function show_brands(){
			echo $this->brands_html();
		}

		public function brands_html(){

			if ( !($product = wc_get_product()) ) {
				return;
			}

			$output = '';

			$brands = wp_get_post_terms( $product->get_id(), 'product_brand' );

			foreach( $brands as $brand ) {

				$inner = $brand->name;

				if( is_singular('product') && $this->settings['show_thumbs'] && !in_array( wc_get_loop_prop('name'), ['upsells', 'crosssells', 'related'] ) ){
					$inner = get_brand_thumbnail_image( $brand );
				}

				$output .= sprintf('<a href="%1$s" title="%2$s">%3$s</a>',
					esc_url( get_term_link( $brand ) ),
					esc_attr( $brand->name ),
					$inner
				);
			}

			if( empty($output) ){
				return;
			}

			return apply_filters('reycore/compatibility/brands/html', sprintf( '<div class="rey-brandLink --no-fade-links">%s</div>', $output ) );
		}

		function register_tax_ajaxfilter($tax){

  			$tax[] = [
				'id' => 'product_brand',
				'name' => 'Brand',
			];

			return $tax;
		}

	}

	new ReyCore_Compatibility__WC_Brands;
endif;

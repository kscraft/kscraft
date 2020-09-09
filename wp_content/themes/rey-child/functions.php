<?php
/**
 * Theme functions and definitions.
 * This child theme is purposed to Rey Theme
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 */
/*
	* If your child theme has more than one .css file (eg. ie.css, style.css, main.css) then
	* you will have to make sure to maintain all of the parent theme dependencies.
	*
	* Make sure you're using the correct handle for loading the parent theme's styles.
	* Failure to use the proper tag will result in a CSS file needlessly being loaded twice.
	* This will usually not affect the site appearance, but it's inefficient and extends your page's loading time.
	*
	* @link https://codex.wordpress.org/Child_Themes
	*/
/**
 * Load styles
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'rey-wp-style', get_template_directory_uri() . '/style.css', false, wp_get_theme()->parent()->get('Version') );
	wp_enqueue_style( 'rey-wp-style-child', get_stylesheet_uri() );
} );

/************Add By Pritam************/
/*add_filter( 'woocommerce_get_price_html', 'bbloomer_add_price_prefix', 99, 2 );
  
function bbloomer_add_price_prefix( $price, $product ){
    $price = 'Approximate Cost : &nbsp; ' . $price;
	if(is_product)
	{
		return $price;
	}
}*/

add_filter( 'woocommerce_get_price_html', function( $price ) {
	if ( is_product() ) return $price;

	return '';
} );


// Move WooCommerce price
/*remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 25 );

remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );*/

function change_product_price_html($price){
  	$newPrice 	.= $price;
  	$newPrice	.= "&nbsp; Per Sq Ft";
  
	return $newPrice;
}
add_filter('woocommerce_get_price_html', 'change_product_price_html');
<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly


if(!function_exists('reycore_wc__cart_hide_flatrate_if_freeshipping')):
	function reycore_wc__cart_hide_flatrate_if_freeshipping( $rates ) {

		if( ! get_theme_mod('cart_checkout_hide_flat_rate_if_free_shipping', false) ){
			return $rates;
		}

		$free = [];

		foreach ( $rates as $rate_id => $rate ) {
			if ( 'free_shipping' === $rate->method_id ) {
				$free[ $rate_id ] = $rate;
				break;
			}
		}

		return ! empty( $free ) ? $free : $rates;
	}
	add_filter( 'woocommerce_package_rates', 'reycore_wc__cart_hide_flatrate_if_freeshipping', 100 );
endif;

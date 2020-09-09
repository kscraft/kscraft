<?php
/**
 * Override WooCommerce Shipping Class
 *
 * Handles shipping and loads shipping methods via hooks.
 *
 * @class 		WC_Shipping
 * @version		1.2.0
 * @package		woocommerce-quotation/classes/
 * @category            Class
 * @author 		Aldaba Digital
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class ADQ_Shipping extends WC_Shipping {
    
	/**
	 * Calculate shipping rates for a package,
	 *
	 * Calculates each shipping methods cost. Rates are stored in the session based on the package hash to avoid re-calculation every page load.
	 *
	 * @param array $package cart items
	 * @param int   $package_key Index of the package being calculated. Used to cache multiple package rates.
	 * @return array
	 */    
	/*public function calculate_shipping_for_package( $package = array(), $package_key = 0  ) {
		if ( ! $this->enabled ) return false;
		if ( ! $package ) return false;

		// Check if we need to recalculate shipping for this package
		$package_hash   = 'adq_ship_' . md5( json_encode( $package ) . WC_Cache_Helper::get_transient_version( 'shipping' ) );
		$status_options = get_option( 'woocommerce_status_options', array() );
                
                $status_options['shipping_debug_mode'] = 1;
                
		if ( false === ( $stored_rates = get_transient( $package_hash ) ) || ( ! empty( $status_options['shipping_debug_mode'] ) && current_user_can( 'manage_options' ) ) ) {                

			// Calculate shipping method rates
			$package['rates'] = array();                        

			foreach ( $this->load_shipping_methods( $package ) as $shipping_method ) {

				if ( ( ( get_option("adq_inherit_shipping_conf") == "no" && get_option( 'adq_'.esc_attr( $shipping_method->id ), $shipping_method->enabled ) == "yes" )
                                        || ( get_option("adq_inherit_shipping_conf") == "yes" && $shipping_method->is_available( $package ) )
                                        ) && ( empty( $package['ship_via'] ) || in_array( $shipping_method->id, $package['ship_via'] ) ) ) {
                                        
					// Reset Rates
					$shipping_method->rates = array();

					// Calculate Shipping for package
					$shipping_method->calculate_shipping( $package );
                                        
					// Place rates in package array
					if ( ! empty( $shipping_method->rates ) && is_array( $shipping_method->rates ) )
						foreach ( $shipping_method->rates as $rate ) 
							$package['rates'][ $rate->id ] = $rate;
				}
			}

			// Filter the calculated rates
			$package['rates'] = apply_filters( 'adq_woocommerce_package_rates', $package['rates'], $package );
                        
                        // Store in session to avoid recalculation
			WC()->session->set( 'shipping_for_package', array(
				'package_hash' => $package_hash,
				'rates'        => $package['rates']
			) );

			// Store
			//set_transient( $package_hash, $package['rates'], 60 * 60 ); // Cached for an hour

		} else {

			$package['rates'] = $stored_rates;

		}
                
		return $package;
	}*/
        
        /**
	 * Calculate shipping rates for a package,
	 *
	 * Calculates each shipping methods cost. Rates are stored in the session based on the package hash to avoid re-calculation every page load.
	 *
	 * @param array $package cart items
	 * @param int   $package_key Index of the package being calculated. Used to cache multiple package rates.
	 * @return array
	 */
	public function calculate_shipping_for_package( $package = array(), $package_key = 0 ) {
		if ( ! $this->enabled || empty( $package ) ) {
			return false;
		}                

		// Check if we need to recalculate shipping for this package
		$package_hash   = 'adq_ship_' . md5( json_encode( $package ) . WC_Cache_Helper::get_transient_version( 'shipping' ) );
		$status_options = get_option( 'woocommerce_status_options', array() );
		$session_key    = 'shipping_for_package_' . $package_key;
		$stored_rates   = WC()->session->get( $session_key );

		if ( ! is_array( $stored_rates ) || $package_hash !== $stored_rates['package_hash'] || ! empty( $status_options['shipping_debug_mode'] ) ) {
			// Calculate shipping method rates
			$package['rates'] = array();
                        
			foreach ( $this->load_shipping_methods( $package ) as $shipping_method ) {
				// Shipping instances need an ID                                
				if ( ( get_option( 'adq_'.esc_attr( $shipping_method->id ), $shipping_method->enabled ) == "yes" || $shipping_method->is_available( $package ) ) &&
				     (! $shipping_method->supports( 'shipping-zones' ) || $shipping_method->get_instance_id() ) ) {
					$package['rates'] = $package['rates'] + $shipping_method->get_rates_for_package( $package ); // + instead of array_merge maintains numeric keys
				}
			}

			// Filter the calculated rates
			//$package['rates'] = apply_filters( 'woocommerce_package_rates', $package['rates'], $package );
                        $package['rates'] = apply_filters( 'adq_woocommerce_package_rates', $package['rates'], $package );

			// Store in session to avoid recalculation
			WC()->session->set( $session_key, array(
				'package_hash' => $package_hash,
				'rates'        => $package['rates']
			) );
		} else {
			$package['rates'] = $stored_rates['rates'];
		}

		return $package;
	}
        
        
        /**
	 * load_shipping_methods function.
	 *
	 * Loads all shipping methods which are hooked in. If a $package is passed some methods may add themselves conditionally.
	 *
	 * Methods are sorted into their user-defined order after being loaded.
	 *
	 * @access public
	 * @param array $package
	 * @return array
	 */
	public function load_shipping_methods( $package = array() ) {

		$this->unregister_shipping_methods();

		$this->shipping_methods = WC()->shipping->load_shipping_methods( $package );

		return $this->shipping_methods;
	}

}
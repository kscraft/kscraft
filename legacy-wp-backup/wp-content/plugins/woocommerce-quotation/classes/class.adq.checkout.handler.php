<?php 

if ( !class_exists('ADQ_CheckoutHandler') ) {
	
	class ADQ_CheckoutHandler
	{
		
		static public function get_checkout_fields( $checkout, $fieldset = '' )
		{
			if ( version_compare( WC_VERSION, '2.7', '<' ) ) {
				if ( $fieldset ) {
					return $checkout->checkout_fields[$fieldset];
				} else {
					return $checkout->checkout_fields;
				}
			} else {
			    return $checkout->get_checkout_fields($fieldset);
			}
		}

		static public function set_checkout_fields( $checkout, $fields )
		{
			if ( version_compare( WC_VERSION, '2.7', '<' ) ) {
			    $checkout->checkout_fields = $fields;
			} else {
			    $checkout->__set('checkout_fields', $fields);
			}
		}
	}
}
 ?>
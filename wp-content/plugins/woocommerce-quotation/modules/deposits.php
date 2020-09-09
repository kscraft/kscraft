<?php
/**
 * WooCommerce Deposits compatibility
 *
 * @author      Aldaba Digital
 * @category    Admin
 * @package     woocommerce-quotation/modules/
 * @version     1.0.0
 * @since       3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'WC_Deposits' ) ) {
        return;
}

if ( ! class_exists( 'ADQ_Deposits' ) ) :

class ADQ_Deposits {
       
    public function __construct() {
        add_action( 'adq_quote_list_before', array( $this, 'update_cart_contents' ) );

        add_filter( 'woocommerce_quote_item_subtotal', array( $this, 'display_item_subtotal' ), 10, 3 );
    }

    function update_cart_contents()
    {
        foreach ( WC_Adq()->quote->get_quote() as $cart_item_key => $cart_item ) {
            WC_Adq()->quote->quote_contents[$cart_item_key] = WC_Deposits_Cart_Manager::get_instance()->add_cart_item($cart_item);
        }
    }

    function display_item_subtotal( $output, $cart_item, $cart_item_key )
    {
        return WC_Deposits_Cart_Manager::get_instance()->display_item_subtotal( $output, $cart_item, $cart_item_key );
    }
}
endif;

return new ADQ_Deposits();
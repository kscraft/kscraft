<?php
/**
 * WooCommerce Product Addons compatibility
 *
 * @author      Aldaba Digital
 * @category    Admin
 * @package     woocommerce-quotation/modules/
 * @version     2.1.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'TM_Extra_Product_Options' ) ) {
        return;
}

if ( ! class_exists( 'ADQ_TM' ) ) :
/**
 * ADQ_PA
 */
class ADQ_TM  {

        var $cart_edit_key = null;
        /**
        * Constructor.
        */
        public function __construct() {
                         
                $this->cart_edit_key = isset($_REQUEST['tm_cart_item_key'])?$_REQUEST['tm_cart_item_key']: (( isset($_REQUEST['tc_cart_edit_key']) ) ?$_REQUEST['tc_cart_edit_key']:null);
                
                add_action( 'woocommerce_add_to_cart', array( $this,'adq_woocommerce_add_to_cart'), 10, 6 );
                
                add_filter( 'woocommerce_quote_item_price', array( $this, 'adq_quote_item_price' ), 10, 3 ); 
                add_filter( 'woocommerce_quote_item_subtotal', array( $this, 'adq_quote_item_subtotal' ), 10, 3 );
				add_filter( 'woocommerce_get_quote_item_from_session', array( $this, 'adq_get_cart_item_from_session' ), 999, 2 );
        }


        public function adq_woocommerce_add_to_cart( $cart_item_key="", $product_id="", $quantity="", $variation_id="", $variation="", $cart_item_data="" ){
                
                if(is_array($cart_item_data) && isset($cart_item_data['tmhasepo'])){

                        $cart_contents = WC_Adq()->quote->quote_contents;

                        if (is_array($cart_contents) && isset($cart_contents[$cart_item_key]) && !isset($cart_contents[$cart_item_key]['tm_cart_item_key'])){
                                WC_Adq()->quote->quote_contents[$cart_item_key]['tm_cart_item_key'] = $cart_item_key;
                        }

                }                
        }    
        
        public function adq_quote_item_price( $price, $cart_item, $cart_item_key ) {            
		global $woocommerce;

                if ( !function_exists('TM_EPO') ) {
                    return $price;
                }
                
                if (!isset($cart_item['tmcartepo'])) {
		    return $price;
		}

		if (!isset($cart_item['rp_wcdpd'])) {
		    return $price;
		}

		// Get price to display
		$price = TM_EPO()->get_price_for_cart(false,$cart_item,"");

		// Format price to display
		$price_to_display = $price;
		if (TM_EPO()->tm_epo_cart_field_display=="advanced"){
			$original_price_to_display = TM_EPO()->get_price_for_cart($cart_item['tm_epo_product_original_price'],$cart_item,"");
			if (TM_EPO()->tm_epo_dpd_enable=="yes"){
				$price=$this->get_RP_WCDPD($cart_item['tm_epo_product_original_price'], wc_get_product($cart_item['data']->id), $cart_item_key);
				$price_to_display = TM_EPO()->get_price_for_cart($price,$cart_item,"");
			} else {
				$price=$cart_item['data']->price;
				$price=$price-$cart_item['tm_epo_options_prices'];
				$price_to_display = TM_EPO()->get_price_for_cart($price,$cart_item,"");
			}
		} else {
		    	$price_to_display = TM_EPO()->get_price_for_cart($cart_item['tm_epo_product_price_with_options'],$cart_item,"");
		}


		return $price_to_display;
        }
        
        public function adq_quote_item_subtotal( $price, $cart_item, $cart_item_key ) {
            
                if ( !function_exists('TM_EPO') ) {
                    return $price;
                }

		if (!isset($cart_item['tmcartepo'])) {
		    return $price;
		}
            
                if (TM_EPO()->tm_epo_cart_field_display=="advanced") {
                        if (TM_EPO()->tm_epo_hide_options_in_cart=="normal"){
                                if (isset($cart_item['tm_epo_product_after_adjustment']) && TM_EPO()->tm_epo_dpd_enable=="no"){
                                        $price = $cart_item['tm_epo_product_after_adjustment'];
                                } else {
                                        $price=apply_filters('wc_epo_discounted_price', $cart_item['tm_epo_product_original_price'], wc_get_product($cart_item['data']->id), $cart_item_key);
                                }
                                $price=$price*$cart_item['quantity'];
                                return apply_filters( 'woocommerce_cart_item_subtotal', 
                                    TM_EPO()->get_price_for_cart( $price,$cart_item,""), 
                                    $cart_item, 
                                    $cart_item_key 
                                );
                        } else {                                
                            return apply_filters( 'woocommerce_cart_item_subtotal', 
                                    $price, 
                                    $cart_item, 
                                    $cart_item_key 
                            );
                        }
                }
                
                return $price;
        }

	public function adq_get_cart_item_from_session( $cart_item=array(), $values=array() ) {
		//TM_EPO()->is_get_from_session=true;
		if ( ! empty( $values['tmcartepo'] ) ) {
			$cart_item['tmcartepo'] = $values['tmcartepo'];
			$cart_item = TM_EPO()->add_cart_item( $cart_item );
			if (empty($cart_item['addons'])){
				$cart_item['addons']=array("epo"=>true,'price'=>0);
			}
		}
		if ( ! empty( $values['tmcartepo_bto'] ) ) {
			$cart_item['tmcartepo_bto'] = $values['tmcartepo_bto'];
		}
		if ( ! empty( $values['tmsubscriptionfee'] ) ) {
			$cart_item['tmsubscriptionfee'] = $values['tmsubscriptionfee'];
		}
		if ( ! empty( $values['tmcartfee'] ) ) {
			$cart_item['tmcartfee'] = $values['tmcartfee'];
		}

		if ( ! empty( $values['tm_epo_product_original_price'] ) ) {
			$cart_item['tm_epo_product_original_price'] = $values['tm_epo_product_original_price'];
		}
		if ( ! empty( $values['tm_epo_options_prices'] ) ) {
			$cart_item['tm_epo_options_prices'] = $values['tm_epo_options_prices'];
		}
		if ( ! empty( $values['tm_epo_product_price_with_options'] ) ) {
			$cart_item['tm_epo_product_price_with_options'] = $values['tm_epo_product_price_with_options'];
		}
		
		return apply_filters('tm_cart_contents', $cart_item, $values);
	}
}

endif;

return new ADQ_TM();

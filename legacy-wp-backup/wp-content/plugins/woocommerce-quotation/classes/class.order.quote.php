<?php
/**
 * Handle Order Override functions
 *
 * @class 	WC_Quotation_Order
 * @version     2.0.1
 * @package     woocommerce-quotation/classes/
 * @category    Class
 * @author      Aldaba Digital
 */

if( !class_exists( 'WC_Quotation_Order' ) ) :    

class WC_Quotation_Order {
    
        public $posted;
        
        public $_cart;
        
        public $order_id = false;
        
        protected static $_instance;

        public function __construct()
        {
            add_filter( 'wc_shipping_enabled', array( 'StaticAdqQuoteRequest', 'is_shipping_enabled' ), 10, 1 );
        }
        
        public static function instance() {
                if ( is_null( self::$_instance ) ) {
                        self::$_instance = new self();
                }
                return self::$_instance;
        }

        public function procces_quote_list () {
                //Load All Post Variables
                foreach($_POST as $key => $value) {
                        $this->posted[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING);
                }

                //Create New Customer
                if( isset($this->posted['account_username']) ) {
                        $username = ! empty( $this->posted['account_username'] ) ? $this->posted['account_username'] : '';
                        $password = ! empty( $this->posted['account_password'] ) ? $this->posted['account_password'] : '';
                        $new_customer = wc_create_new_customer( $this->posted['billing_email'], $username, $password );
                }
        }
    
    	/**
	 * Process the create order from Quote Request
	 *
	 * @access public
	 * @return void
	 */
        public function create_order() {
                
                // Prevent timeout
		@set_time_limit(0);          

                if ( sizeof( WC_Adq()->quote->get_quote() ) == 0 ) {
			adq_add_notice( sprintf( __( 'Sorry, you haven\'t any product. <a href="%s" class="wc-backward">Return to homepage</a>', 'woocommerce-quotation' ), home_url() ), 'error' );
                        return;
		}            
                
                //$adq_inherit_shipping_conf = get_option("adq_inherit_shipping_conf");
                $adq_enable_shipping = get_option("adq_enable_shipping");
                
                /*if ( $adq_inherit_shipping_conf == "no" && $adq_enable_shipping == "no" ) {
                       $this->posted['adq_shipping_method'] =  false;
                }
                else {
                       $this->posted['adq_shipping_method'] = isset( $_POST['adq_shipping_method'] ) ? true : false;
                }
                
                $_POST['ship_to_different_address'] = $this->posted['adq_shipping_method'];*/
                //$_POST['_wpnonce'] = wp_create_nonce('woocommerce-process_checkout');
                $_POST['include_shipping_cost'] = get_option( 'adq_enable_shipping' ) == 'user' ? isset( $_POST['include-shipping-cost'] )  ? 'true' : 'false' : null;
                if ( isset( $_POST['ship_to_different_address'] ) )
                    $_POST['ship_to_different_address'] = ( $_POST['include_shipping_cost'] == 'false' ) ? false : (bool)$_POST['ship_to_different_address'];
                else
                    $_POST['ship_to_different_address'] = false;
                
                //Backup Copy Current Cart
                $this->_cart = clone WC()->cart;
                
                //Reset Cart
                WC()->cart->empty_cart(); 
                
                //Add filter to avoid losing WC Cart on error in Quote checkout               
                add_filter('woocommerce_add_error', array ($this, 'notice_error_cart_restore') );
                //Add filter to check if is purchasable
                add_filter('woocommerce_is_purchasable', array ($this, 'is_purchasable'), 10, 2);
                
                //Fill with Quote Request
                foreach ( WC_Adq()->quote->get_quote() as $values ) {
                        $variation_id = ( $values['variation_id'] && $values['variation_id'] != "")?(int)$values['variation_id']:'';
                        $variations = ( $values['variation'] && is_array($values['variation']) )? $values['variation']:'';
                        $cart_item_data = ( isset( $values['cart_item_data'] ) && is_array($values['cart_item_data']) )? $values['cart_item_data']:array();
                        
                        if( isset($values['_product_note'] ) && $values['_product_note'] ) {            
                                $cart_item_data['_product_note'] = $values['_product_note'];                
                        }

                        if ( class_exists('TM_Extra_Product_Options') ) remove_filter( 'woocommerce_add_cart_item_data', array( TM_Extra_Product_Options::instance(), 'add_cart_item_data' ), 50 );
                        self::adq_add_to_cart( (int)$values['product_id'], (int)$values['quantity'], $variation_id, $variations, $cart_item_data );                        
                } 
                
                //Have discounts?                
                if ( WC_Adq()->quote->coupons_enabled() ) {                         
                    foreach ( WC_Adq()->quote->get_applied_coupons() as $code ) {                         
                        if ( !WC()->cart->has_discount( $code ) ) {
                            WC()->cart->add_discount( $code );
                        }
                    }                                
                }
                
                if( get_option('adq_disable_checkout_hooks') == "yes" ) {
                        remove_all_actions( 'woocommerce_before_checkout_process' );
                        remove_all_actions( 'woocommerce_checkout_process' );
                        remove_all_actions( 'woocommerce_after_checkout_validation' );
                }

                if( get_option('adq_show_terms') == "no" ) {
                        $_POST['terms'] = 1;
                }
                
                //Create Order                
                $checkout = StaticAdqQuoteRequest::get_checkout();
                
                if( !is_user_logged_in() ) {
                        if ( get_option("adq_enable_registration") == "yes" ) {
                                if( get_option("adq_enable_guest_request") == "no" ) {
                                        $_POST['createaccount'] = true;
                                }
                                else {
                                        $checkout->must_create_account = !empty( $_POST['createaccount'] );                                    
                                }
                        }
                        else {
                                $_POST['createaccount'] = false;
                                $checkout->must_create_account = false;
                        }
                }

                $checkout->process_checkout();                
        }
        
        
        /**
        *  Filter tor restore Cart if there is an error during Woocommerce Checkout
        */
        public function notice_error_cart_restore ( $message ) {
                //Restore Cart
                if( $this->_cart ) {
                        WC()->cart = $this->_cart;
                        WC()->cart->set_session();
                        $this->_cart = false;
                }

                return $message;        
        }
        
        /*
         * On quote checkout check if is quotable instead of purchasable
         */        
        public function is_purchasable ( $purchasable, $product ) {
            
                return is_quotable( $product );                
        }
    
        
        public function post_process_create_order () {
                
                //Restore Cart
                WC()->cart = $this->_cart;
                WC()->cart->set_session();
                
                if($this->order_id) {
                        WC_Adq()->quote->remove_all_quote_item();
                        
                        do_action( 'adq_after_quote_create', $this->order_id );

                        do_action( 'woocommerce_order_status_changed', $this->order_id, '', apply_filters( 'woocommerce_default_order_status', 'request' ) );                    
                        //do_action( 'adq_email_customer_quote', $this->order_id );
                
                        do_action( 'adq_email_admin_new_quote', $this->order_id );
                        
                        do_action( 'adq_after_quote_email_send', $this->order_id );

                        $message = sprintf('%s<br/><br/>%s<br>%s',
                                strtoupper( __('Your quote request has been received','woocommerce-quotation') ),
                                __('Thank you for your interest!', 'woocommerce-quotation'),
                                sprintf(__('Your quote request # is: Q.%06d.','woocommerce-quotation'), $this->order_id)                
                        );
                        adq_add_notice( $message );                        
                }
                else {                        
                        adq_add_notice( __('There is an error creating your quote request','woocommerce-quotation'), 'error' );
                }
        }
        
        
        public function getVariations ($variation_id, $product_id) {
            
                $adding_to_cart      = wc_get_product( $product_id );
                $attributes = $adding_to_cart->get_attributes();
                $variation  = wc_get_product( $variation_id );
                $variations         = array();

                // Verify all attributes
                foreach ( $attributes as $attribute ) {
                        if ( ! $attribute['is_variation'] ) {
                                continue;
                        }

                        $taxonomy = 'attribute_' . sanitize_title( $attribute['name'] );

                        if ( isset( $_REQUEST[ $taxonomy ] ) ) {

                                // Get value from post data
                                // Don't use wc_clean as it destroys sanitized characters
                                $value = sanitize_title( trim( stripslashes( $_REQUEST[ $taxonomy ] ) ) );

                                // Get valid value from variation
                                $valid_value = $variation->variation_data[ $taxonomy ];

                                // Allow if valid
                                if ( $valid_value == '' || $valid_value == $value ) {
                                        if ( $attribute['is_taxonomy'] ) {
                                                $variations[ $taxonomy ] = $value;
                                        }
                                        else {
                                                // For custom attributes, get the name from the slug
                                                $options = array_map( 'trim', explode( WC_DELIMITER, $attribute['value'] ) );
                                                foreach ( $options as $option ) {
                                                        if ( sanitize_title( $option ) == $value ) {
                                                                $value = $option;
                                                                break;
                                                        }
                                                }
                                                 $variations[ $taxonomy ] = $value;
                                        }
                                        continue;
                                }

                        }

                        $all_variations_set = false;
                }
                
                return $variations;
        }
        
        /**
         * This function force to add products to cart when they are out of stock
         *
         * @param integer $product_id
         * @param integer $quantity
         * @param integer $variation_id
         * @param array $variation
         * @param array $cart_item_data
         * @return string|bool cart item key
         */
        public function adq_add_to_cart( $product_id = 0, $quantity = 1, $variation_id = 0, $variation = array(), $cart_item_data = array() ) {
            try {
                $product_id   = absint( $product_id );
                $variation_id = absint( $variation_id );
    
                // Ensure we don't add a variation to the cart directly by variation ID.
                if ( 'product_variation' === get_post_type( $product_id ) ) {
                    $variation_id = $product_id;
                    $product_id   = wp_get_post_parent_id( $variation_id );
                }
    
                $product_data = wc_get_product( $variation_id ? $variation_id : $product_id );
                $quantity     = apply_filters( 'woocommerce_add_to_cart_quantity', $quantity, $product_id );
    
                if ( $quantity <= 0 || ! $product_data || 'trash' === $product_data->get_status() ) {
                    return false;
                }
    
                // Load cart item data - may be added by other plugins.
                $cart_item_data = (array) apply_filters( 'woocommerce_add_cart_item_data', $cart_item_data, $product_id, $variation_id );
    
                // Generate a ID based on product ID, variation ID, variation data, and other cart item data.
                $cart_id        = wc()->cart->generate_cart_id( $product_id, $variation_id, $variation, $cart_item_data );
    
                // Find the cart item key in the existing cart.
                $cart_item_key  = wc()->cart->find_product_in_cart( $cart_id );
    
                // Force quantity to 1 if sold individually and check for existing item in cart.
                if ( $product_data->is_sold_individually() ) {
                    $quantity      = apply_filters( 'woocommerce_add_to_cart_sold_individually_quantity', 1, $quantity, $product_id, $variation_id, $cart_item_data );
                    $found_in_cart = apply_filters( 'woocommerce_add_to_cart_sold_individually_found_in_cart', $cart_item_key && $this->cart_contents[ $cart_item_key ]['quantity'] > 0, $product_id, $variation_id, $cart_item_data, $cart_id );
    
                    if ( $found_in_cart ) {
                        /* translators: %s: product name */
                        throw new Exception( sprintf( '<a href="%s" class="button wc-forward">%s</a> %s', wc_get_cart_url(), __( 'View cart', 'woocommerce' ), sprintf( __( 'You cannot add another "%s" to your cart.', 'woocommerce' ), $product_data->get_name() ) ) );
                    }
                }
    
                if ( ! $product_data->is_purchasable() ) {
                    throw new Exception( __( 'Sorry, this product cannot be purchased.', 'woocommerce' ) );
                }
    
                // If cart_item_key is set, the item is already in the cart.
                if ( $cart_item_key ) {
                    $new_quantity = $quantity + $this->cart_contents[ $cart_item_key ]['quantity'];
                    $this->set_quantity( $cart_item_key, $new_quantity, false );
                } else {
                    $cart_item_key = $cart_id;
    
                    // Add item after merging with $cart_item_data - hook to allow plugins to modify cart item.
                    wc()->cart->cart_contents[ $cart_item_key ] = apply_filters( 'woocommerce_add_cart_item', array_merge( $cart_item_data, array(
                        'key'          => $cart_item_key,
                        'product_id'   => $product_id,
                        'variation_id' => $variation_id,
                        'variation'    => $variation,
                        'quantity'     => $quantity,
                        'data'         => $product_data,
                    ) ), $cart_item_key );
                }
                                
                remove_action( 'woocommerce_check_cart_items', array( wc()->cart, 'check_cart_items'), 1 );
    
                do_action( 'woocommerce_add_to_cart', $cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data );
    
                return $cart_item_key;
    
            } catch ( Exception $e ) {
                if ( $e->getMessage() ) {
                    wc_add_notice( $e->getMessage(), 'error' );
                }
                return false;
            }
        }
}

endif;
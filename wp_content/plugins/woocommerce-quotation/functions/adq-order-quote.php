<?php
/**
 * Handle Order functions
 *
 * @version     1.0.1
 * @package     woocommerce-quotation/functions/
 * @category    Functions
 * @author      Aldaba Digital
 */

/*
 *  Register new Order Status 
 */
if( !function_exists( 'adq_register_quote_request_order_status' ) ) {
    function adq_register_quote_request_order_status() {
        register_post_status( 'wc-request', array(
            'label' => _x('Request', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Request <span class="count">(%s)</span>', 'Request <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );

        register_post_status( 'wc-proposal', array(
            'label' => _x('Proposal', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal <span class="count">(%s)</span>', 'Proposal <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );
        
        register_post_status( 'wc-proposal-sent', array(
            'label' => _x('Proposal Sent', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal sent <span class="count">(%s)</span>', 'Proposal sent <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );

        register_post_status( 'wc-proposal-expired', array(
            'label' => _x('Proposal expired', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal expired <span class="count">(%s)</span>', 'Proposal expired <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );

        register_post_status( 'wc-proposal-rejected', array(
            'label' => _x('Proposal rejected', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal rejected <span class="count">(%s)</span>', 'Proposal rejected <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );

        register_post_status( 'wc-proposal-canceled', array(
            'label' => _x('Proposal canceled', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal canceled <span class="count">(%s)</span>', 'Proposal canceled <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );
        
        register_post_status( 'wc-proposal-accepted', array(
            'label' => _x('Proposal accepted', 'Order status', 'woocommerce-quotation'),
            'public' => true,
            'exclude_from_search' => false,
            'show_in_admin_all_list' => true,
            'show_in_admin_status_list' => true,
            'label_count' => _n_noop( 'Proposal accepted <span class="count">(%s)</span>', 'Proposal accepted <span class="count">(%s)</span>', 'woocommerce-quotation' )
        ) );
    }
    add_action( 'init', 'adq_register_quote_request_order_status' );
}

/*
 *  Add to list of WC Order statuses
 */
if( !function_exists( 'adq_add_quote_request_order_statuses' ) ) {
    function adq_add_quote_request_order_statuses( $order_statuses ) {
        global $wp_query;

        //Do not add if we are looking on my account
        if ( isset($wp_query) && is_page( wc_get_page_id( 'myaccount' ) ) ) {
                return $order_statuses;
        }

        //Do not list in the settings page of Invoice documents
        if ( ( isset($_GET['page']) && $_GET['page'] == 'wpo_wcpdf_options_page' ) && ( isset( $_GET['tab'] ) && $_GET['tab'] == 'documents' ) && ( isset( $_GET['section'] ) && $_GET['section'] == 'invoice' ) ) {
                return $order_statuses;
        }
        
        $new_order_statuses = array();
        // add new order status after processing
        foreach ( $order_statuses as $key => $status ) {
            $new_order_statuses[ $key ] = $status;
            if ( 'wc-pending' === $key ) {
                $new_order_statuses['wc-request'] = _x('Request', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal'] = _x('Proposal', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal-sent'] = _x('Proposal sent', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal-expired'] = _x('Proposal expired', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal-rejected'] = _x('Proposal rejected', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal-canceled'] = _x('Proposal canceled', 'Order status', 'woocommerce-quotation');
                $new_order_statuses['wc-proposal-accepted'] = _x('Proposal accepted', 'Order status', 'woocommerce-quotation');                
            }
        }
        return $new_order_statuses;
    }
    add_filter( 'wc_order_statuses', 'adq_add_quote_request_order_statuses' ); 
}


if( !function_exists( 'adq_get_order_statuses' ) ) {
    function adq_get_order_statuses () {
            $new_order_statuses = array();
            
            $new_order_statuses['wc-request'] = __('Request', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal'] = __('Proposal', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal-sent'] = __('Proposal sent', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal-expired'] = __('Proposal expired', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal-rejected'] = __('Proposal rejected', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal-canceled'] = __('Proposal canceled', 'woocommerce-quotation');
            $new_order_statuses['wc-proposal-accepted'] = __('Proposal accepted', 'woocommerce-quotation');
            
            return $new_order_statuses;
    }
}

/*
 *  Since 2.4.0
 */
if( !function_exists( 'adq_add_order_statuses_for_payment' ) ) {
    function adq_add_order_statuses_for_payment( $statuses ) {
            $statuses[] = 'proposal-accepted';
            return $statuses;
    }
    add_filter('woocommerce_valid_order_statuses_for_payment', 'adq_add_order_statuses_for_payment', 10);
}

/*
 *  Since 2.4.0
 */
if( !function_exists( 'adq_add_order_statuses_for_cancel' ) ) {
    function adq_add_order_statuses_for_cancel( $statuses ) {
            $statuses[] = 'proposal-accepted';
            return $statuses;
    }
    add_filter('woocommerce_valid_order_statuses_for_cancel', 'adq_add_order_statuses_for_cancel', 10);
}

/**
 * Function adq_my_account_my_orders_query()
 * 
 * @deprecated since 2.5.5 No longer necessary
 * 
 */
if( !function_exists( 'adq_my_account_my_orders_query' ) ) {
    function adq_my_account_my_orders_query( $params ) {
            $post_status = $params['post_status'];
            $adq_order_statuses = array_keys( adq_get_order_statuses() );
            
            $params['post_status'] = array();
            
            if ( $post_status && count($post_status) > 0 ) {
                    foreach ( $post_status as $status ) {
                            if( ! in_array( $status, $adq_order_statuses ) ) {
                                   $params['post_status'][] = $status;
                            }
                    }
            }
            
            return $params;
    }
    //add_filter( 'woocommerce_my_account_my_orders_query', 'adq_my_account_my_orders_query' ); 
}

/**
 *  @since 2.5.5
 */

if( !function_exists( 'adq_account_menu_items' ) ) {
    function adq_account_menu_items( $items ) {
            $new_items = array();
            foreach ( $items as $key => $item ) {
                    $new_items[$key] = $item;
                    if ( $key == 'orders' ) {
                        $new_items['quotes'] = __( 'Quotes', 'woocommerce-quotation' );
                    }
            }
            
            return $new_items;
    }
    add_filter( 'woocommerce_account_menu_items', 'adq_account_menu_items' );
}

/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_account_quotes' ) ) {
    function adq_account_quotes( $current_page ) {            
            $current_page    = empty( $current_page ) ? 1 : absint( $current_page );
            $customer_quotes = adq_get_quotes( apply_filters( 'adq_my_account_my_quotes_query', array( 'customer' => get_current_user_id(), 'page' => $current_page, 'paginate' => true ) ) );

            adq_get_template(
                    'myaccount/quotes.php',
                    array(
                            'current_page' => absint( $current_page ),
                            'customer_orders' => $customer_quotes,
                            'has_orders' => 0 < $customer_quotes->total,
                    )
            );
            //adq_get_template( 'quotes.php' );
    }
    add_action( 'woocommerce_account_quotes_endpoint', 'adq_account_quotes' );
}

/**
 *  @since 2.5.5
 */

if( !function_exists( 'adq_account_menu_items' ) ) {
    function adq_account_menu_items( $items ) {
            $new_items = array();
            foreach ( $items as $key => $item ) {
                    $new_items[$key] = $item;
                    if ( $key == 'orders' ) {
                        $new_items['quotes'] = __( 'Quotes', 'woocommerce-quotation' );
                    }
            }
            
            return $new_items;
    }
    add_filter( 'woocommerce_account_menu_items', 'adq_account_menu_items' );
}

/**
 *  @since 2.5.5
 */
/*if( !function_exists( 'adq_account_quotes' ) ) {
    function adq_account_quotes( $current_page ) {            
            $current_page    = empty( $current_page ) ? 1 : absint( $current_page );
            $customer_quotes = adq_get_quotes( apply_filters( 'adq_my_account_my_quotes_query', array( 'customer' => get_current_user_id(), 'page' => $current_page, 'paginate' => true ) ) );

            wc_get_template(
                    'myaccount/orders.php',
                    array(
                            'current_page' => absint( $current_page ),
                            'customer_orders' => $customer_quotes,
                            'has_orders' => 0 < $customer_quotes->total,
                    )
            );
            //adq_get_template( 'quotes.php' );
    }
    add_action( 'woocommerce_account_quotes_endpoint', 'adq_account_quotes' );
}*/


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_get_settings_account' ) ) {
    function adq_get_settings_account( $settings ) { 
	$last = array_pop($settings);
        $settings[] = array(
                'title'    => __( 'Quotes', 'woocommerce-quotation' ),
                'desc'     => __( 'Endpoint for the My Account &rarr; Quotes page', 'woocommerce-quotation' ),
                'id'       => 'woocommerce_myaccount_quotes_endpoint',
                'type'     => 'text',
                'default'  => 'quotes',
                'desc_tip' => true,
        );

	$settings[] = array( 'type' => 'sectionend', 'id' => 'account_endpoint_options'); 
        
	return $settings;
    } 
    add_filter( 'woocommerce_account_settings', 'adq_get_settings_account' );
}


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_add_query_vars' ) ) {
    function adq_add_query_vars( $vars ) { 
	$endpoint = get_option( 'woocommerce_myaccount_quotes_endpoint', 'quotes' );

        $vars[] = $endpoint;
        WC()->query->query_vars['quotes'] = $endpoint;

	return $vars;
    } 
    add_filter( 'query_vars', 'adq_add_query_vars', 0 );
}


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_rewrite_endpoint' ) ) {
    function adq_rewrite_endpoint() {
        add_rewrite_endpoint( get_option( 'woocommerce_myaccount_quotes_endpoint', 'quotes' ), EP_ROOT | EP_PAGES );
    }
    add_action( 'init', 'adq_rewrite_endpoint' );
}


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_flush_rewrite_rules' ) ) {
    function adq_flush_rewrite_rules() {
        flush_rewrite_rules();
    }
    add_action( 'after_switch_theme', 'adq_flush_rewrite_rules' );
}


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_endpoint_quotes_title' ) ) {
    function adq_endpoint_quotes_title() { 
        
	return __( 'Quotes', 'woocommerce-quotation' );
    } 
    add_filter( 'woocommerce_endpoint_quotes_title', 'adq_endpoint_quotes_title' );
}


/**
 *  @since 2.5.5
 */
if( !function_exists( 'adq_get_quotes' ) ) {
    function adq_get_quotes( $args ) {
            $args = wp_parse_args( $args, array(
                    'status'   => array_keys(adq_get_order_statuses() ),
                    'type'     => wc_get_order_types( 'view-orders' ),
                    'parent'   => null,
                    'customer' => null,
                    'email'    => '',
                    'limit'    => get_option( 'posts_per_page' ),
                    'offset'   => null,
                    'page'     => 1,
                    'exclude'  => array(),
                    'orderby'  => 'date',
                    'order'    => 'DESC',
                    'return'   => 'objects',
                    'paginate' => false,
            ) );

            // Handle some BW compatibility arg names where wp_query args differ in naming.
            $map_legacy = array(
                    'numberposts'    => 'limit',
                    'post_type'      => 'type',
                    'post_status'    => 'status',
                    'post_parent'    => 'parent',
                    'author'         => 'customer',
                    'posts_per_page' => 'limit',
                    'paged'          => 'page',
            );

            foreach ( $map_legacy as $from => $to ) {
                    if ( isset( $args[ $from ] ) ) {
                            $args[ $to ] = $args[ $from ];
                    }
            }

            /**
             * Generate WP_Query args. This logic will change if orders are moved to
             * custom tables in the future.
             */
            $wp_query_args = array(
                    'post_type'      => $args['type'] ? $args['type'] : 'shop_order',
                    'post_status'    => $args['status'],
                    'posts_per_page' => $args['limit'],
                    'meta_query'     => array(),
                    'fields'         => 'ids',
                    'orderby'        => $args['orderby'],
                    'order'          => $args['order'],
            );

            if ( ! is_null( $args['parent'] ) ) {
                    $wp_query_args['post_parent'] = absint( $args['parent'] );
            }

            if ( ! is_null( $args['offset'] ) ) {
                    $wp_query_args['offset'] = absint( $args['offset'] );
            } else {
                    $wp_query_args['paged'] = absint( $args['page'] );
            }

            if ( ! empty( $args['customer'] ) ) {
                    $values = is_array( $args['customer'] ) ? $args['customer'] : array( $args['customer'] );
                    $wp_query_args['meta_query'][] = adq_get_orders_generate_customer_meta_query( $values );
            }

            if ( ! empty( $args['exclude'] ) ) {
                    $wp_query_args['post__not_in'] = array_map( 'absint', $args['exclude'] );
            }

            if ( ! $args['paginate' ] ) {
                    $wp_query_args['no_found_rows'] = true;
            }

            // Get results.
            $orders = new WP_Query( $wp_query_args );

            if ( 'objects' === $args['return'] ) {
                    $return = array_map( 'wc_get_order', $orders->posts );
            } else {
                    $return = $orders->posts;
            }

            if ( $args['paginate' ] ) {
                    return (object) array(
                            'orders'        => $return,
                            'total'         => $orders->found_posts,
                            'max_num_pages' => $orders->max_num_pages,
                    );
            } else {
                    return $return;
            }
    }
}


if( !function_exists( 'adq_get_order_status_name' ) ) {
    function adq_get_order_status_name( $status ) {
            $statuses = wc_get_order_statuses();
            $statuses = array_merge( $statuses, adq_get_order_statuses() );
            $status   = 'wc-' === substr( $status, 0, 3 ) ? substr( $status, 3 ) : $status;
            $status   = isset( $statuses[ 'wc-' . $status ] ) ? $statuses[ 'wc-' . $status ] : $status;

            return $status;
    }
    add_filter( 'wc_order_statuses', 'adq_add_quote_request_order_statuses' ); 
}

/*
 * Override if our Quote Request Order needs shipping
 */
/*if( !function_exists( 'adq_check_shipping' ) ) {
    function adq_check_shipping($needs_shipping) {        
        
        if(isset($_POST["adq_quote_place_order"])) {
            $adq_inherit_shipping_conf = get_option("adq_inherit_shipping_conf");
            $adq_enable_shipping = get_option("adq_enable_shipping");
            
            if ( $adq_inherit_shipping_conf == "no" && $adq_enable_shipping == "no" ) {
                    return false;
            }
        
            $adq_shipping_method = isset( $_POST['adq_shipping_method'] ) ? TRUE : FALSE;
            
            if(!$adq_shipping_method) {
                   return false;
            }
        }
        
        return $needs_shipping;
    }
    add_filter('woocommerce_cart_needs_shipping', 'adq_check_shipping');
}*/

/*
 * Override if our Quote Request Order needs shipping
 */
if( !function_exists( 'adq_check_payment' ) ) {
    function adq_check_payment($needs_payment) {
        if(isset($_POST["adq_quote_place_order"])) {
                return false;
        }
        
        return $needs_payment;
    }
    add_filter('woocommerce_cart_needs_payment', 'adq_check_payment');
}

/*
 * Override default Order Status
 */
if( !function_exists( 'adq_default_order_status' ) ) {
    function adq_default_order_status($default_status) {
        if(isset($_POST["adq_quote_place_order"])) {
                return 'request';
        }
        
        return $default_status;
    }
    add_filter('woocommerce_default_order_status', 'adq_default_order_status');
}


/*
 * Override Redirect With No payment to end the POST Process
 */
if( !function_exists( 'adq_no_payment_needed_redirect' ) ) {
    function adq_no_payment_needed_redirect($default_redirect) {
        
        if(isset($_POST["adq_quote_place_order"])) {
                WC_Adq()->order->post_process_create_order();
            
                return StaticAdqQuoteRequest::redirect_after_quote_list();
        }
        
        return $default_redirect;
    }
    add_filter('woocommerce_checkout_no_payment_needed_redirect', 'adq_no_payment_needed_redirect');
}


/*
 * Add meta informations on products in order
 */
if( !function_exists( 'adq_add_order_item_meta' ) ) {
    function adq_add_order_item_meta( $item_id, $values ) {

        if ( isset( $values['_product_note'] ) || isset( $values->legacy_values['_product_note'] ) ) {

            $value = ( version_compare( WC_VERSION, '2.7', '<' ) ) ? $values['_product_note'] : $values->legacy_values['_product_note'];
            if( isset($value) && $value ){
                    wc_add_order_item_meta( $item_id, __('Product Note', 'woocommerce-quotation'), $value );
            }
            
        }
    }

    add_action( 'adq_init', function() {

        $hook = ( version_compare( WC_VERSION, '2.7', '<' ) ) ? 'add_order_item_meta' : 'new_order_item';
        add_action('woocommerce_'.$hook, 'adq_add_order_item_meta', 10, 2);

    });

}


/*
 * Add meta informations on products in order
 */
if( !function_exists( 'adq_automatic_creation' ) ) {
    function adq_automatic_creation( $order_id ) {        
        if ( get_option("adq_automatic_proposal") == "yes" ) {
            
            $validity_date = get_post_meta( $order_id, '_validity_date', true );
            if ( ! $validity_date ) {
                $validity_date = date( 'Y-m-d H:i:s', strtotime( "+" . get_option( 'adq_proposal_validity' ) . " day" ) );
                update_post_meta( $order_id, '_validity_date', $validity_date );
            }
                
            $order = wc_get_order( $order_id );
            $order->update_status( "proposal-sent" );
        }        
    }
    add_action('adq_after_quote_email_send', 'adq_automatic_creation');
}



/*
 * Catch Order Id
 */
if( !function_exists( 'adq_set_order_id' ) ) {
    function adq_set_order_id($order_id) {
        
        if(isset($_POST["adq_quote_place_order"])) {
                WC_Adq()->order->order_id = $order_id;
        }
    }
    add_action('woocommerce_checkout_order_processed', 'adq_set_order_id');
}

/*
 * Check our status if is editable
 */
if( !function_exists( 'adq_is_editable' ) ) {
    function adq_is_editable($editable, $order) {
        if( !$editable) {
                $editable = in_array( $order->get_status(), array( 'request', 'proposal', 'proposal-sent' ) );
        }
        
        return $editable;
    }
    add_filter('wc_order_is_editable', 'adq_is_editable', 10, 2);
}

/*
 * Execute actions on status change
*/
// if( !function_exists( 'adq_order_status_changed' ) ) {
//     function adq_order_status_changed ($post_id, $old_status, $new_status) {
        
//         if ( $new_status == 'request' ) {
//             do_action( 'adq_email_customer_quote', $post_id );
//         }

//             if( $new_status == 'proposal-sent' ) {
//                    do_action( 'adq_email_customer_proposal', $post_id );
//             }
            
//             /*** DEPRECATED since 2.4.0 ***/   
//             /*
//             if( $new_status == 'proposal-accepted' ) {                    

//                     $order_id = get_post_meta( $post_id, '_order_id', true );
//                     if ( !$order_id || $order_id == ""  ) {
                        
//                             $order = wc_get_order( $post_id );
//                             //unset ID
//                             $vars = get_object_vars($order->post);
//                             unset($vars['ID']);
//                             unset($vars['guid']);
//                             $new_order_id = wp_insert_post( $vars  , true ); 
//                             $new_order = wc_get_order( $new_order_id );
                            
//                             $billing_address = array(
//                                     'first_name'    => $order->billing_first_name,
//                                     'last_name'     => $order->billing_last_name,
//                                     'company'       => $order->billing_company,
//                                     'address_1'     => $order->billing_address_1,
//                                     'address_2'     => $order->billing_address_2,
//                                     'city'          => $order->billing_city,
//                                     'state'         => $order->billing_state,
//                                     'postcode'      => $order->billing_postcode,
//                                     'country'       => $order->billing_country,
//                             );
//                             $new_order->set_address( $billing_address, 'billing' );
                            
//                             $shipping_address =  array(
//                                     'first_name'    => $order->shipping_first_name,
//                                     'last_name'     => $order->shipping_last_name,
//                                     'company'       => $order->shipping_company,
//                                     'address_1'     => $order->shipping_address_1,
//                                     'address_2'     => $order->shipping_address_2,
//                                     'city'          => $order->shipping_city,
//                                     'state'         => $order->shipping_state,
//                                     'postcode'      => $order->shipping_postcode,
//                                     'country'       => $order->shipping_country
//                             );
//                             $new_order->set_address( $shipping_address, 'shipping' );
                            
//                             update_post_meta( $new_order_id, '_order_currency', $order->get_order_currency() );
//                             update_post_meta( $new_order_id, '_customer_user', $order->get_user_id() );
//                             update_post_meta( $new_order_id, '_billing_email', get_post_meta( $order->get_id(), '_billing_email', true ) );            
                            
//                             $order_items = $order->get_items( array( 'line_item', 'fee', 'shipping' ) );

//                             foreach ( $order_items as $new_order_item_id => $new_order_item ) {

//                                     // Prevents errors when the order has no taxes
//                                     if ( ! isset( $new_order_item['line_tax'] ) ) {
//                                             $new_order_item['line_tax'] = array();
//                                     }
                                    
//                                     if( ! is_array( $new_order_item['line_tax'] ) ) {
//                                             $new_order_item['line_tax'] = array($new_order_item['line_tax']);
//                                     }
                                    
//                                     switch ( $order_items[ $new_order_item_id ]['type'] ) {
//                                             case 'line_item' :
//                                                     $_product = wc_get_product( $new_order_item['variation_id'] ? $new_order_item['variation_id'] : $new_order_item['product_id'] );
//                                                     $line_item_args = array(
//                                                             'totals' => array(
//                                                                     'subtotal'     => $new_order_item['line_subtotal'],
//                                                                     'total'        => $new_order_item['line_total'],
//                                                                     'subtotal_tax' => $new_order_item['line_subtotal_tax'],
//                                                                     'tax'          => $new_order_item['line_tax'],
//                                                                     'tax_data'     => maybe_unserialize($new_order_item['line_tax_data']),
//                                                                     //'subtotal_tax' => wc_format_refund_total( array_sum( $new_order_item['line_subtotal_tax'] ) ),
//                                                                     //'tax'          => wc_format_refund_total( array_sum( $new_order_item['line_tax'] ) ),
//                                                                     //'tax_data'     => array( 'total' => array_map( 'wc_format_refund_total', $new_order_item['line_tax'] ), 'subtotal' => array_map( 'wc_format_refund_total', $new_order_item['line_tax'] ) )
//                                                             )
//                                                     );
                                                   
//                                                     if ( $_product->product_type == "variation"  ) {
//                                                             $line_item_args['variation'] = $_product->get_variation_attributes();
//                                                     }
                                                    
//                                                     $new_item_id = $new_order->add_product( $_product, isset( $new_order_item['qty'] ) ? $new_order_item['qty'] : 0, $line_item_args );
                                                    
//                                                     //Add Meta Values
//                                                     $cart_item_data = apply_filters( 'woocommerce_order_again_cart_item_data', array(), $new_order_item, $order );
//                                                     if( is_array( $cart_item_data ) && count( $cart_item_data ) > 0 ) {
//                                                             $new_order_item['data'] = $_product;
//                                                             do_action( 'woocommerce_add_order_item_meta', $new_item_id, array_merge($new_order_item, $cart_item_data), $new_order_item_id );
//                                                     }                                                   
                                                    
//                                             break;
//                                             case 'shipping' :
//                                                     $shipping        = new stdClass();
//                                                     $shipping->label = $new_order_item['name'];
//                                                     $shipping->id    = $new_order_item['method_id'];
//                                                     $shipping->cost  = $new_order_item['cost'];
//                                                     //$shipping->taxes = $new_order_item['taxes'];                                                     
//                                                     $shipping->taxes = array_map( 'wc_format_refund_total', $new_order_item['line_tax'] );

//                                                     $new_item_id = $new_order->add_shipping( $shipping );                                                    
//                                             break;
//                                             case 'fee' :
//                                                     $fee            = new stdClass();
//                                                     $fee->name      = $new_order_item['name'];
//                                                     $fee->tax_class = $new_order_item['tax_class'];
//                                                     $fee->taxable   = $fee->tax_class !== '0';
//                                                     $fee->amount    = $new_order_item['line_total'];
//                                                     $fee->tax       = maybe_unserialize( $new_order_item['line_tax'] );
//                                                     //$fee->tax_data  = maybe_unserialize( $new_order_item['line_tax_data'] );
//                                                     $fee->tax_data  = array_map( 'wc_format_refund_total', $new_order_item['line_tax'] );

//                                                     $new_item_id = $new_order->add_fee( $fee );                                                    
//                                             break;
//                                     }
                                            
//                             }
                            
//                             $new_order->update_taxes();
                            
//                             $new_order->set_total( $order->get_total_shipping(), 'shipping' );
//                             $new_order->set_total( $order->get_total_discount(), 'cart_discount' );
//                             $new_order->set_total( $order->get_total_discount(false), 'cart_discount_tax' );
//                             $new_order->set_total( $order->get_total_tax(), 'tax' );
//                             $new_order->set_total( $order->get_shipping_tax(), 'shipping_tax' );
//                             $new_order->set_total( $order->get_total() );
                            
//                             $new_order->update_status( 'wc-pending' );                    

//                             update_post_meta( $post_id, '_order_id', $new_order->id );
//                             update_post_meta( $new_order->id, '_quotation_id', $post_id );

//                             do_action( 'adq_email_customer_proposal_ok', $post_id );
//                             do_action( 'adq_email_admin_proposal_ok', $post_id );
//                     }                           
//             } */
            
//             /* SINCE 2.4.0 */
//             if( $new_status == 'proposal-accepted' ) {   
//                     do_action( 'adq_email_customer_proposal_ok', $post_id );
//                     do_action( 'adq_email_admin_proposal_ok', $post_id );
//             }
            
//             if( $new_status == 'proposal-rejected' ) {
//                    do_action( 'adq_email_customer_proposal_ko', $post_id );
//                    do_action( 'adq_email_admin_proposal_ko', $post_id );
//             }                        
//     }

//     add_action( 'woocommerce_order_status_changed','adq_order_status_changed', 10, 3);
// }


/*
 * Rewrite line subtotals if is necessary
 */
if( !function_exists( 'adq_line_subtotal' ) ) {
    function adq_line_subtotal( $price, $order, $item, $inc_tax, $round ) {
        $order_id = ADQ_OrderHandler::get_id( $order );

        $adq_display_discount = get_option('adq_display_discount');
        
        $adq_statuses = adq_get_order_statuses();
        $_quotation_id = get_post_meta( $order_id, '_quotation_id', true );
        
        if( $adq_display_discount == "no" && 
                ( array_key_exists( "wc-".$order->get_status(), $adq_statuses ) || ( $_quotation_id && $_quotation_id != "" ) ) ) {
                //$price = $item['line_total'];
                
                //$price = round( $price, 2 );
                if ( $inc_tax ) {
			$price = $item['line_subtotal'] + $item['line_subtotal_tax'];
		} else {
			$price = $item['line_subtotal'];
		}

		$price = $round ? round( $price, wc_get_price_decimals() ) : $price;
        }
        
        return $price;
    }
    add_filter('woocommerce_order_amount_line_subtotal', 'adq_line_subtotal', 10, 5);
}


/*
 * Don't show discount if is necesssary
 */
if( !function_exists( 'adq_total_rows' ) ) {
    function adq_total_rows( $total_rows, $order ) {
        $order_id = ADQ_OrderHandler::get_id( $order );
        
        $adq_display_discount = get_option('adq_display_discount');
        
        $adq_statuses = adq_get_order_statuses();
        $_quotation_id = get_post_meta( $order_id, '_quotation_id', true );        
        
        if( array_key_exists( "wc-".$order->get_status(), $adq_statuses )  || ( $_quotation_id && $_quotation_id != "" ) ) {
                unset($total_rows['cart_subtotal']); 
                if( $adq_display_discount == "no" ) {                
                        unset($total_rows['discount']);                        
                }
        }
        
        if ( ( $order->get_status() == 'proposal' || $order->get_status() == 'request' ) ) {
            foreach ( $order->get_tax_totals() as $code => $tax ) {
                if ( isset($total_rows[ sanitize_title( $code ) ]) ) {
                    $total_rows[ sanitize_title( $code ) ]['value'] = __( 'Not yet proposed', 'woocommerce-quotation' );
                }
            }
            
            if ( isset($total_rows['tax']) ) {
                $total_rows['tax']['value'] = __( 'Not yet proposed', 'woocommerce-quotation' );
            }
            
            if ( $fees = $order->get_fees() ) {
                foreach ( $fees as $id => $fee ) {
                    if ( isset($total_rows[ 'fee_' . $id ])) {
                        $total_rows[ 'fee_' . $id ]['value'] = __( 'Not yet proposed', 'woocommerce-quotation' );                                    
                    }
                }
            }
        }
        
        return $total_rows;
    }
    add_filter('woocommerce_get_order_item_totals', 'adq_total_rows', 10, 5);
}

/*
 * Don't show discount if is necesssary
 */
if( !function_exists( 'adq_checkout_show_terms' ) ) {
    function adq_checkout_show_terms( $return ) {
        $adq_show_terms = get_option('adq_show_terms');
        
        if( $adq_show_terms == "no" ) {                            
                return false;                        
        }
        
        return $return;
    }
    add_filter('adq_checkout_show_terms', 'adq_checkout_show_terms', 10, 1);
}

if( !function_exists( 'adq_needs_shipping_address' ) ) {
    function adq_needs_shipping_address ( $needs_shipping_address ) {            
            
            if ( get_option( 'adq_inherit_shipping_conf' ) === 'yes'
                    || ! isset( $_POST["adq_quote_place_order"] ) ) {
                    return $needs_shipping_address;
            }
            
            if ( get_option( 'adq_enable_shipping' ) === 'no' ) {
                    return false;
            }
            
            $needs_shipping_address = false;
            
            if ( adq_quote_needs_shipping() === true && ! adq_ship_to_billing_address_only() ) {
                    $needs_shipping_address = true;
            }                        

            return $needs_shipping_address;
    }
    add_filter('woocommerce_cart_needs_shipping_address', 'adq_needs_shipping_address', 10, 1);
}

if( !function_exists( 'adq_ship_to_billing_address_only' ) ) {
        function adq_ship_to_billing_address_only() {
            
                return 'billing_only' === get_option( 'adq_ship_to_destination' );
        }
}

if( !function_exists( 'adq_quote_needs_shipping_address' ) ) {
    function adq_quote_needs_shipping_address( $order, $hide = false ) {
        
            if ( get_option( 'adq_inherit_shipping_conf' ) === 'yes' ) {
                if ( 'no' === get_option( 'woocommerce_calc_shipping' ) ) {
                        return false;
                }
            }
            else {
                if ( 'no' === get_option( 'adq_enable_shipping' ) ) {
                        return false;
                }
            }

            if( !$hide ) {
                $hide  = apply_filters( 'woocommerce_order_hide_shipping_address', array( 'local_pickup' ), $order );
            }
            $needs_address = false;
           
            foreach ( $order->get_shipping_methods() as $shipping_method ) {
                    if ( ! in_array( $shipping_method['method_id'], $hide ) ) {
                            $needs_address = true;
                            break;
                    }
            }

            return $needs_address;
    }
}

if( !function_exists( 'adq_filter_quote_needs_shipping_address' ) ) {
    function adq_filter_quote_needs_shipping_address( $needs_address, $hide, $order ) {
        
            if ( !StaticAdqQuoteRequest::is_order_quote_status( $order->get_status() ) ) {
                    return $needs_address;
            }
            
            return adq_quote_needs_shipping_address( $order, $hide );    
    }
    
    add_filter('woocommerce_order_needs_shipping_address', 'adq_filter_quote_needs_shipping_address', 10, 3);
}

if( !function_exists( 'adq_quote_needs_shipping' ) ) {
    function adq_quote_needs_shipping() {
            if ( get_option( 'adq_enable_shipping' ) === 'no' ) {
                    return false;
            }

            $needs_shipping = false;
            $cart_contents = WC_Adq()->quote->quote_contents;
            
            if ( $cart_contents ) {
                    foreach ( $cart_contents as $cart_item_key => $values ) {
                            $_product = $values['data'];
                            if ( $_product->needs_shipping() ) {
                                    $needs_shipping = true;
                            }
                    }
            }

            return apply_filters( 'woocommerce_cart_needs_shipping', $needs_shipping );
    }
}


if ( !function_exists( 'adq_option_woocommerce_calc_shipping' ) ) {
        function adq_option_woocommerce_calc_shipping ( $value, $option ) {
                                
                if ( get_option( 'adq_inherit_shipping_conf' ) === 'yes'
                    || ( !isset( $_POST["adq_quote_place_order"] )
                    && !did_action('adq_email_header') ) ) {
                            return $value;
                }
                
                return get_option( 'adq_enable_shipping' ) !== 'no'?'yes':'no';
        }
    
        add_filter('option_woocommerce_calc_shipping', 'adq_option_woocommerce_calc_shipping', 10, 2);
}

/*Hack for not use cart session, use our own*/
if ( !function_exists( 'adq_cart_shipping_packages' ) ) {
        function adq_cart_shipping_packages ( $packages ) {
			
                    if( isset( $_POST["adq_quote_place_order"] ) || StaticAdqQuoteRequest::is_quote_list_page() ) {
                            $packages[0]['is_quote'] = 1;
                    }

                    return $packages;
        }
        add_filter('woocommerce_cart_shipping_packages', 'adq_cart_shipping_packages');
}

if ( !function_exists( 'override_calculate_shipping_for_package' ) ) {
	function override_calculate_shipping_for_package ( $rates, $package ) {

		if( isset( $_POST["adq_quote_place_order"] ) || StaticAdqQuoteRequest::is_quote_list_page() ) {	
			include_once (ADQ_QUOTE_DIR.'classes/class.adq.shipping.php'); 
	
			$shipping = new ADQ_Shipping(); 
			$package = $shipping->calculate_shipping_for_package($package);

			return $package['rates'];
		}
		
		return $rates;
	}

	add_filter( 'woocommerce_package_rates', 'override_calculate_shipping_for_package', 10, 2 ); 
}

if( !function_exists( 'adq_coupons_enabled' ) ) {
    function adq_coupons_enabled ( $option ) {            
            
            if ( ! isset( $_POST["adq_quote_place_order"] ) ) {
                    return $option;
            }            
           
            return apply_filters( 'adq_coupons_enabled', get_option( 'adq_coupons_enabled' ) );
    }
    add_filter('woocommerce_coupons_enabled', 'adq_coupons_enabled', 10, 1);
}

if ( !function_exists( 'adq_get_orders_generate_customer_meta_query' ) ) {
    function adq_get_orders_generate_customer_meta_query( $values, $relation = 'or' ) {
        $meta_query = array(
            'relation' => strtoupper( $relation ),
            'customer_emails' => array(
                'key'     => '_billing_email',
                'value'   => array(),
                'compare' => 'IN',
            ),
            'customer_ids' => array(
                'key'     => '_customer_user',
                'value'   => array(),
                'compare' => 'IN',
            )
        );
        foreach ( $values as $value ) {
            if ( is_array( $value ) ) {
                $meta_query[] = adq_get_orders_generate_customer_meta_query( $value, 'and' );
            } elseif ( is_email( $value ) ) {
                $meta_query['customer_emails']['value'][] = sanitize_email( $value );
            } else {
                $meta_query['customer_ids']['value'][] = strval( absint( $value ) );
            }
        }

        if ( empty( $meta_query['customer_emails']['value'] ) ) {
            unset( $meta_query['customer_emails'] );
            unset( $meta_query['relation'] );
        }

        if ( empty( $meta_query['customer_ids']['value'] ) ) {
            unset( $meta_query['customer_ids'] );
            unset( $meta_query['relation'] );
        }

        return $meta_query;
    }
}
    
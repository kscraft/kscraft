<?php
/**
 * Handle Core global functions
 *
 * @version     2.0.0
 * @package     woocommerce-quotation/functions/
 * @category    Functions
 * @author      Aldaba Digital
 */

/* GLOBAL FUNCTIONS */
if( !function_exists( 'adq_quote_request_link' ) ) {
    // Add settings link on plugin page
    function adq_quote_request_link( $links ) {
            $settings_link = '<a href="options-general.php?page='.ADQ_ADMIN_PAGE.'">'._x('Configuration', 'Configuration Quote', 'woocommerce-quotation').'</a>';
            array_unshift( $links, $settings_link );
            return $links;
    }
    $plugin = plugin_basename( __FILE__ );
    add_filter( "plugin_action_links_$plugin", 'adq_quote_request_link' );
}

if ( !function_exists('adq_ajax_update_shipping_methods') ) {
    
    function adq_ajax_update_shipping_methods()
    {
        WC()->customer->set_props( array(
            'billing_country'   => isset( $_GET['country'] ) ? $_GET['country']     : null,
            'billing_state'     => isset( $_GET['state'] ) ? $_GET['state']         : null,
            'billing_postcode'  => isset( $_GET['postcode'] ) ? $_GET['postcode']   : null,
            'billing_city'      => isset( $_GET['city'] ) ? $_GET['city']           : null,
            'billing_address_1' => isset( $_GET['address'] ) ? $_GET['address']     : null,
            'billing_address_2' => isset( $_GET['address_2'] ) ? $_GET['address_2'] : null,
        ) );

        if ( wc_ship_to_billing_address_only() ) {
            WC()->customer->set_props( array(
                'shipping_country'   => isset( $_GET['country'] ) ? $_GET['country']     : null,
                'shipping_state'     => isset( $_GET['state'] ) ? $_GET['state']         : null,
                'shipping_postcode'  => isset( $_GET['postcode'] ) ? $_GET['postcode']   : null,
                'shipping_city'      => isset( $_GET['city'] ) ? $_GET['city']           : null,
                'shipping_address_1' => isset( $_GET['address'] ) ? $_GET['address']     : null,
                'shipping_address_2' => isset( $_GET['address_2'] ) ? $_GET['address_2'] : null,
            ) );
            if ( ! empty( $_GET['country'] ) ) {
                WC()->customer->set_calculated_shipping( true );
            }
        } else {
            WC()->customer->set_props( array(
                'shipping_country'   => isset( $_GET['s_country'] ) ? $_GET['s_country']     : null,
                'shipping_state'     => isset( $_GET['s_state'] ) ? $_GET['s_state']         : null,
                'shipping_postcode'  => isset( $_GET['s_postcode'] ) ? $_GET['s_postcode']   : null,
                'shipping_city'      => isset( $_GET['s_city'] ) ? $_GET['s_city']           : null,
                'shipping_address_1' => isset( $_GET['s_address'] ) ? $_GET['s_address']     : null,
                'shipping_address_2' => isset( $_GET['s_address_2'] ) ? $_GET['s_address_2'] : null,
            ) );
            if ( ! empty( $_GET['s_country'] ) ) {
                WC()->customer->set_calculated_shipping( true );
            }
        }

        include_once(ADQ_QUOTE_DIR.'classes/class.adq.shipping.php');        
        $shipping = new ADQ_Shipping();
        $shipping->enabled = StaticAdqQuoteRequest::is_shipping_enabled();
        $shipping->calculate_shipping( WC_Adq()->quote->get_shipping_packages() );
        $packages = $shipping->get_packages();

        ob_start();
        foreach( $packages as $i => $package ) {
            $chosen_method = isset( WC()->session->chosen_shipping_methods[ $i ] ) ? WC()->session->chosen_shipping_methods[ $i ] : '';

            adq_get_template( 'adq-cart-shipping.php', array( 'package' => $package, 'available_methods' => $package['rates'], 'show_package_details' => ( sizeof( $packages ) > 1 ), 'index' => $i, 'chosen_method' => $chosen_method ) );
        };
        $response = ob_get_clean();
        echo $response;
        die();
    }

    add_action( 'wp_ajax_update_shipping_methods', 'adq_ajax_update_shipping_methods' );
    add_action( 'wp_ajax_nopriv_update_shipping_methods', 'adq_ajax_update_shipping_methods' );
}


if( !function_exists( 'adq_quote_request_install' ) ) {
    //Install table
    function adq_quote_request_install() {
        
            include_once( WC()->plugin_path() . '/includes/admin/wc-admin-functions.php' );
                        
            //Create Page
            $pages = array(
                    'quotelist' => array(
                            'name'    => _x( 'quote-list', 'Page slug', 'woocommerce-quotation' ),
                            'title'   => _x( 'Quote List', 'Page title', 'woocommerce-quotation' ),
                            'content' => '[quote_request_list]'
                    )
            );
            foreach ( $pages as $key => $page ) {                    
                    $page_id = wc_create_page( esc_sql( $page['name'] ), 'adq_' . $key . '_page_id', $page['title'], $page['content'], '' );
            }   

            //First, it is verified if there is any email related to plugin in order to preserve the modifications that were done.
            $email_ids = get_option( 'adq_emails', null );
            if ( !$email_ids ) {
                include_once( WC()->plugin_path() . '/includes/emails/class-wc-email.php' );
                include_once( ADQ_QUOTE_DIR . '/classes/class-adq-email.php' );
                include_once( ADQ_QUOTE_DIR . '/classes/class-adq-email-manager.php' );
                
                ADQ_Email_Manager::instance()->create_default_emails();
            }
    }

    register_activation_hook( ADQ_PLUGIN_FILE, 'adq_quote_request_install' );
}

/*
 * UNINSTALL option
 */
if( !function_exists( 'adq_quote_request_uninstall' ) ) {
    function adq_quote_request_uninstall() {
            delete_option('adq_version');
    }
    register_deactivation_hook( ADQ_PLUGIN_FILE, 'adq_quote_request_uninstall' );
}

/*
 *  UPDATE issues
 */
if( !function_exists( 'adq_update_version' ) ) {
    function adq_update_version() {
        global $wpdb;
        
        $current_version = get_option( 'adq_version', '0.0.0' );   
        
        //Vanilla instalation
        if ( version_compare( $current_version, '0.0.1', '<' ) ) {
            //Create Options for Customization
            $sections = ADQ_Settings_Page::get_sections_pages();

            foreach ( $sections as $section ) {
                    if ( ! method_exists( $section, 'get_settings' ) ) {
                            continue;
                    }
                   
                    foreach ( $section->get_settings() as $value ) {
                            if ( isset( $value['default'] ) && isset( $value['id'] ) ) {
                                    $autoload = isset( $value['autoload'] ) ? (bool) $value['autoload'] : true;
                                    add_option( $value['id'], $value['default'], '', ( $autoload ? 'yes' : 'no' ) );
                            }
                    }                    
            }
        }
            
        if ( version_compare( $current_version, '2.0.0', '<' ) ) {        
                $result = $wpdb->query( 'DROP TABLE IF EXISTS `wp_adq_quote_request`, `wp_adq_quote_request_itemmeta`' );

                if ( $result ) {
                        update_option( 'adq_version', '2.0.0' );                    
                }
        } 
        
        if ( version_compare( $current_version, '2.1.1', '<' ) ) {        
                
                $sections = ADQ_Settings_Page::get_sections_pages();

                foreach ( $sections as $section ) {
                        if ( ! method_exists( $section, 'get_settings' ) ) {
                                continue;
                        }

                        foreach ( $section->get_settings() as $value ) {
                                if ( $value['type'] == "checkbox" ) {
                                        $option = get_option( $value['id'] );
                                        
                                        $option_value = false;
                                        if($option == '1')
                                            $option_value = 'yes';
                                        elseif($option == '0')
                                            $option_value = 'no';
                                        
                                        if ( $option_value ) {
                                            update_option( $value['id'], $option_value );
                                        }
                                }
                                elseif( $value['type'] == "text" ) {
                                        $option = get_option( $value['id'] );
                                        update_option( $value['id'], $option );
                                }
                        }                    
                } 
                
                update_option( 'adq_version', '2.1.1' );                
        }

        update_option( 'adq_version', ADQ_VERSION );
    }
    add_action( 'adq_init', 'adq_update_version' );
}


if( !function_exists( 'adq_get_template' ) ) {
    /**
     * Filter before call wc_get_template.
     *
     * @param string $template_name
     * @param array $args (default: array())
     * @param string $template_path (default: '')
     * @param string $default_path (default: '')
     * @return void
     */
    function adq_get_template( $template_name, $args = array(), $template_path = '', $default_path = '' ) {
            if(!$default_path || $default_path == '') {
                //Check if template is in our module
                $located = wc_locate_template( $template_name, $template_path, ADQ_QUOTE_DIR."templates/" );

                if ( file_exists( $located ) ) {
                    $default_path = ADQ_QUOTE_DIR."templates/";
                }
            }

            wc_get_template($template_name, $args, $template_path, $default_path);
    }
}


if( !function_exists( 'adq_add_notice' ) ) {
    /**
    * Filter before call wc_add_notice.
    *
    * @param string $message
    * @param string $notice_type (default: 'success')
    * @return void
    */
    function adq_add_notice( $message, $notice_type = 'success' ) { 
            
        wc_add_notice( $message, $notice_type );

    }
}


if( !function_exists( 'is_quotable' ) ) {
	/**
	 * Rewrite function is_purchasable
	 *
	 * @return bool
	 */
	function is_quotable( $product ) {                
                
		$purchasable = true;

		// Products must exist of course
		if ( ! $product->exists() ) {
			$purchasable = false;

		// Check the product is published
		} elseif ( get_post( $product->get_id() )->post_status !== 'publish' && ! current_user_can( 'edit_post', $product->get_id() ) ) {
			$purchasable = false;
		}

		return apply_filters( 'adq_is_quotable', $purchasable, $product );
	}
}

if ( !function_exists('adq_get_price_excluding_tax') ) {

    function adq_get_price_excluding_tax( $product, $qty = 1, $price = '') {
        return version_compare( WC_VERSION, '2.7', '<' ) ? $product->get_price_excluding_tax( $qty, $price ) : wc_get_price_excluding_tax( $product, array('qty' => $qty, 'price' => $price) );
    }
}

if ( !function_exists('adq_get_price_including_tax') ) {

    function adq_get_price_including_tax( $product, $qty = 1, $price = '') {
        return version_compare( WC_VERSION, '2.7', '<' ) ? $product->get_price_including_tax( $qty, $price ) : wc_get_price_including_tax( $product, array('qty' => $qty, 'price' => $price) );
    }
}

if ( !function_exists('adq_get_email_order_items') ) {

    function adq_get_email_order_items( $order, $args = array () ) {
        return version_compare( WC_VERSION, '2.7', '<') ? $order->email_order_items_table( $args ) : wc_get_email_order_items( $order, $args );
    }
}

if ( !function_exists('adq_countries_shipping_countries') ) {

    function adq_countries_shipping_countries( $countries ) {
        if ( 'disabled' === get_option( 'woocommerce_ship_to_countries' ) ) {
            $wc_countries = new WC_Countries();
            return $wc_countries->get_countries();
        } else {
            return $countries;
        }
    }

    add_filter( 'woocommerce_countries_shipping_countries', 'adq_countries_shipping_countries' );
}

if ( !function_exists('adq_pay_order_product_in_stock' ) ) {
    function adq_pay_order_product_in_stock( $is_in_stock, $product, $order ) {
        $payment_option = get_post_meta( (int)$product->get_id(), 'adq_enable_payment', true );
        $is_payment_enabled = (!$payment_option || $payment_option == 'global') ? (get_option( 'adq_enable_payment_outofstock' ) == 'yes') : ($payment_option == 'yes');

        return $is_in_stock ? $is_in_stock : ( $order->get_status() == 'proposal-accepted' && $is_payment_enabled );
    }

    add_filter( 'woocommerce_pay_order_product_in_stock', 'adq_pay_order_product_in_stock', 10, 3);
}

if ( !function_exists( 'adq_force_loading_wc_styles' ) ) {
    function adq_force_loading_wc_styles( $enqueue_styles )
    {
        global $post; 

        if ( ( get_option( 'adq_force_styles_all' ) === 'yes' || ( get_option( 'adq_force_styles_pages' ) && in_array( $post->ID, get_option( 'adq_force_styles_pages' ) ) ) ) && empty( $enqueue_styles ) ) {
            $enqueue_styles = array(
				'woocommerce-layout'      => array(
					'src'     => apply_filters( 'woocommerce_get_asset_url', plugins_url( 'assets/css/woocommerce-layout.css', WC_PLUGIN_FILE ), 'assets/css/woocommerce-layout.css' ),
					'deps'    => '',
					'version' => WC_VERSION,
					'media'   => 'all',
					'has_rtl' => true,
				),
				'woocommerce-smallscreen' => array(
					'src'     => apply_filters( 'woocommerce_get_asset_url', plugins_url( 'assets/css/woocommerce-smallscreen.css', WC_PLUGIN_FILE ), 'assets/css/woocommerce-smallscreen.css' ),
					'deps'    => 'woocommerce-layout',
					'version' => WC_VERSION,
					'media'   => 'only screen and (max-width: ' . apply_filters( 'woocommerce_style_smallscreen_breakpoint', '768px' ) . ')',
					'has_rtl' => true,
				),
				'woocommerce-general'     => array(
					'src'     => apply_filters( 'woocommerce_get_asset_url', plugins_url( 'assets/css/woocommerce.css', WC_PLUGIN_FILE ), 'assets/css/woocommerce.css' ),
					'deps'    => '',
					'version' => WC_VERSION,
					'media'   => 'all',
					'has_rtl' => true,
				),
            );
        }

        return $enqueue_styles;
    }

    add_filter( 'woocommerce_enqueue_styles', 'adq_force_loading_wc_styles', 9999 );
}
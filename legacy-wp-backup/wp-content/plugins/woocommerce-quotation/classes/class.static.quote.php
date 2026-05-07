<?php
/**
 * Handle Static functions
 *
 * @class    StaticAdqQuoteRequest
 * @version     1.0.1
 * @package     woocommerce-quotation/classes/
 * @category    Class
 * @author      Aldaba Digital
 */

if ( !class_exists( 'StaticQuoteRequest' ) ) {

    class StaticAdqQuoteRequest
    {

        public static function generate_quote_button( $product, $class = '' )
        {
            if ( !self::can_show_quote_button( $product ) ) {
                return '';
            }

            ob_start();

            ?>

            <div class="clear"></div>

            <div class="<?php echo $product->get_type() . "_add_to_quote button_add_to_quote" ?>">
                <button class="single_adq_button <?php echo $class ?> button alt" id="add_to_quote"
                        <?php echo $product->get_type() === 'variable' ? 'data-enable-button="' . get_option( 'adq_enable_button_outofstock', 'no' ) . '"' : '' ?>
                        data-product-id="<?php echo $product->get_id() ?>"
                        data-product-type="<?php echo $product->get_type() ?>"
                        data-button="<?php echo $product->get_type() ?>_add_to_quote"
                        data-is_quote="1" type="button"> <?php echo self::get_add_to_quote_text(); ?></button>
            </div>

            <div class="clear"></div>

            <?php
            return ob_get_clean();
        }

        public static function generate_group_quote_button( $product )
        {
            if ( !self::can_show_quote_button( $product ) ) {
                return '';
            }

            ob_start();
            ?>

            <div class="clear"></div>

            <div class="<?php echo $product->get_type() . "_add_to_quote" ?>">
                <button class="grouped_adq_button button alt" id="add_to_quote"
                        data-product-id="<?php echo $product->get_id() ?>"
                        data-product-type="<?php echo $product->get_type() ?>" data-is_quote="1"
                        type="button"> <?php echo self::get_add_to_quote_text(); ?></button>
            </div>

            <div class="clear"></div>

            <?php
            return ob_get_clean();
        }

        public static function generate_quote_button_loop( $product )
        {
            if ( !self::can_show_quote_button( $product ) ) {
                return '';
            }

            $show = get_option( 'adq_general_quote_loop' );
            if ( $show == "no" ) {
                return '';
            }

            ob_start(); ?>

            <div class="clear"></div>

            <p class="single_add_to_quote_loop">
                <a class="button single_adq_button_loop product_type_simple" id="add_to_quote_loop" data-quantity="1"
                   data-product-id="<?php echo $product->get_id() ?>" rel="nofollow"
                   href="#"><?php echo self::get_add_to_quote_text(); ?></a>
            </p>
            <div class="clear"></div>

            <?php
            return ob_get_clean();
        }

        public static function can_show_product_price( $order )
        {

            foreach ( $order->get_items() as $item ) {
                $_product = $order->get_product_from_item( $item );

                if ( !self::can_show_price( $_product ) ) {
                    return false;
                }
            }

            return true;
        }

        public static function can_show_quote_button( $product = false )
        {

            return self::can_show('force_button', $product ) ? true : self::can_show( 'quote', $product );
        }

        public static function can_show_price( $product = false )
        {

            return self::can_show( 'price', $product );
        }

        public static function can_show_cart_button( $product = false )
        {

            /*if ( $product && !$product->is_purchasable() ) {
                    return false;
            }*/

            return self::can_show( 'cart', $product );
        }

        private static function can_show( $element, $product = false )
        {
            if ( $element === 'quote' && is_object( $product ) && !$product->is_in_stock() ) {

                $adq_enable_button = get_post_meta( (int)$product->get_id(), 'adq_enable_button', true );
                (!$adq_enable_button || $adq_enable_button == 'global') && $adq_enable_button = get_option( 'adq_enable_button_outofstock', 'no' );

                if ( $adq_enable_button === 'no' ) return false;
            };

            $inherit = '_adq_inherit_visibility_' . $element;
            $option = $element === 'force_button' ? 'adq_' . $element : 'adq_visibility_' . $element;

            $user = wp_get_current_user();

            if ( $user ) {
                $roles = $user->roles;
            }

            if ( !$roles || count( $roles ) == 0 ) {
                $roles = array( 'unregistered' );
            }

            if ( is_user_logged_in() ) {
                $roles[] = 'loggedin';
            }


            $filter_role = false;

            if ( $product ) {
                ($product instanceof WC_Product_Variation) ?
                    (version_compare( WC_VERSION, '2.7', '<' )) ?
                        $id_product = $product->parent->id :
                        $id_product = $product->get_parent_id() :
                    $id_product = $product->get_id();

                $adq_inherit_visibility_cart = get_post_meta( (int)$id_product, $inherit, true );

                if ( $adq_inherit_visibility_cart === "no" ) {
                    $roles_option = get_post_meta( (int)$id_product, $option, true );
                } else {
                    //Check if visibility is determined by taxonomy
                    $taxonomy = get_option( 'adq_taxonomy_filter' );

                    if ( $taxonomy != "" ) {
                        $terms = get_option( 'adq_' . $taxonomy . '_' . $element );
                        $terms_exclude = get_option( 'adq_' . $taxonomy . '_' . $element . '_exclude' );

                        if ( is_object_in_term( (int)$id_product, $taxonomy, $terms ) ) {
                            $filter_taxonomy = $terms_exclude == 'yes' ? false : true;
                        } else {
                            $filter_taxonomy = $terms_exclude == 'yes' ? true : false;
                        }
                    }

                    //Else use global options by roles
                    if ( $element == 'force_button' ) {
                        $product_option = get_post_meta( (int)$id_product, 'adq_product_force_button', true);
                        $roles_option = ( isset($product_option['active']) && !$product_option['active'] ) ? $product_option['roles'] : get_option( $option );
                    } else {
                        $roles_option = get_option( $option );
                    }

                }
            } else {
                if ( $element == 'force_button' ) {
                    $product_option = get_post_meta( (int)$id_product, 'adq_product_force_button', true);
                    $roles_option = ( isset($product_option['active']) && !$product_option['active'] ) ? $product_option['roles'] : get_option( $option );
                } else {
                    $roles_option = get_option( $option );
                }
            };

            if ( !is_array( $roles_option) || count( $roles_option ) <= 0 ) {
                return false;
            }

            //User has correct role?
            foreach ( $roles as $role ) {
                if ( isset( $roles_option['loggedin'] ) && is_user_logged_in() ) {
                    $filter_role = true;

                    if ( !isset( $filter_taxonomy ) ) {
                        return $filter_role;
                    }
                } elseif ( in_array( $role, $roles_option ) ) {
                    $filter_role = true;

                    if ( !isset( $filter_taxonomy ) ) {
                        return $filter_role;
                    }
                }
            }

            if ( $filter_role && $filter_taxonomy ) {
                return true;
            }

            return false;
        }

        public static function must_redirect()
        {
            $url = false;

            $redirect = get_option( 'adq_redirect_quote_page' );
            if ( $redirect == "yes" ) {
                $url = self::get_quote_list_link();
            }

            return $url;
        }

        public static function is_quote_list_page()
        {
            global $post;

            if ( !$post ) {
                if ( isset( $_REQUEST['page_id'] ) )
                    $post_id = $_REQUEST['page_id'];
                else
                    return false;
            } else {
                $post_id = $post->ID;
            }

            if ( (int)$post_id == (int)StaticAdqQuoteRequest::get_adq_quotelist_page_id() ) {
                return true;
            }

            return false;
        }

        public static function is_order_quote_status( $status )
        {
            $adq_statuses = adq_get_order_statuses();

            if ( array_key_exists( "wc-" . $status, $adq_statuses ) )
                return true;

            return false;
        }

        public static function get_proposal_base_url( $order )
        {
            if ( !$order )
                return;
            $order_id = ADQ_OrderHandler::get_id( $order );

            $order_key = base64_encode( get_post_meta( $order_id, '_order_key', true ) );
            $email = urlencode( get_post_meta( $order_id, '_billing_email', true ) );

            $link = get_option( 'permalink_structure' );
            if ( $link != "" )
                $nedlee = '?';
            else
                $nedlee = '&';

            return get_permalink( wc_get_page_id( 'myaccount' ) ) . $nedlee . 'order_key=' . $order_key . '&email=' . $email;
        }

        public static function redirect_after_quote_list()
        {
            $adq_redirect_after_quote = get_option( 'adq_redirect_after_quote' );
            if ( $adq_redirect_after_quote != "0" && $adq_redirect_after_quote != "" ) {
                return $adq_redirect_after_quote;
            }

            return self::get_quote_list_link();
        }

        public static function get_quote_list_link()
        {
            return get_page_link( StaticAdqQuoteRequest::get_adq_quotelist_page_id() );
        }

        public static function get_add_to_quote_text()
        {

            return apply_filters( 'wpml_translate_single_string', get_option( 'adq_quote_text' ), 'Woocommerce Quotation', 'Add to Quote Button' );
        }

        public static function get_adq_quotelist_page_id()
        {

            return apply_filters( 'wpml_translate_single_string', get_option( 'adq_quotelist_page_id' ), 'Woocommerce Quotation', 'Quote List Page' );
        }

        public static function get_adq_url_redirect_payment()
        {

            return apply_filters( 'wpml_translate_single_string', get_option( 'adq_url_redirect_payment' ), 'Woocommerce Quotation', 'Quote URL Redirect Payment' );
        }

        public static function get_ok_notice( $product_id, $show_button = false )
        {
            if ( $show_button )
                if ( self::must_redirect() )
                    $message = sprintf( __( '&quot;%s&quot; was successfully added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );
                else
                    $message = sprintf(
                        '<a href="%s" class="button wc-forward">%s</a> %s',
                        self::get_quote_list_link(),
                        __( 'View Quote', 'woocommerce-quotation' ),
                        sprintf( __( '&quot;%s&quot; was successfully added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) )
                    );
            else
                $message = sprintf( __( '&quot;%s&quot; was successfully added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );

            return $message;
        }

        public static function get_error_notice( $product_id, $show_button = false )
        {
            if ( $show_button )
                if ( self::must_redirect() )
                    $message = sprintf( __( '&quot;%s&quot; cannot be added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );
                else
                    $message = sprintf(
                        '<a href="%s" class="button wc-forward">%s</a> %s',
                        self::get_quote_list_link(),
                        __( 'View Quote', 'woocommerce-quotation' ),
                        sprintf( __( '&quot;%s&quot; cannot be added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) )
                    );
            else
                $message = sprintf( __( '&quot;%s&quot; cannot be added to quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );

            return $message;
        }

        public static function get_duplicate_notice( $product_id, $show_button = false )
        {
            if ( $show_button )
                if ( self::must_redirect() )
                    $message = sprintf( __( 'You cannot add another &quot;%s&quot; to your quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );
                else
                    $message = sprintf(
                        '<a href="%s" class="button wc-forward">%s</a> %s',
                        self::get_quote_list_link(),
                        __( 'View Quote', 'woocommerce-quotation' ),
                        sprintf( __( 'You cannot add another &quot;%s&quot; to your quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) )
                    );
            else
                $message = sprintf( __( 'You cannot add another &quot;%s&quot; to your quote.', 'woocommerce-quotation' ), get_the_title( $product_id ) );

            return $message;
        }

        /*
         * Is product comments on quote list allowed
         */
        public static function is_comments_allowed( $id_product )
        {

            if ( get_post_meta( (int)$id_product, "_adq_inherit_allow_product_comments", true ) === "no" ) {
                $option = get_post_meta( (int)$id_product, "_adq_inherit_allow_product_comments", true );
                if ( $option == "yes" ) {
                    return true;
                }
            } else {
                $option = get_option( "adq_allow_product_comments" );
                if ( $option == "yes" ) {
                    return true;
                }
            }

            return false;
        }

        /*
         *  Is Shipping enabled
         */
        public static function is_shipping_enabled( $shipping_enabled = null )
        {
            if ( empty( $_POST['adq_quote_place_order'] ) && isset($shipping_enabled) ) {
                return $shipping_enabled;
            } else {
                $adq_enable_shipping = get_option( "adq_enable_shipping" );

                if ( $adq_enable_shipping == "enable" || $adq_enable_shipping == "user" ) {
                    if ( isset( $_POST['include_shipping_cost'] ) && $_POST['include_shipping_cost'] == "false" )
                        return false;
                    else
                        return true;
                }

                return false;
            }
        }

        /**
         * Get fields required if shipping is needed
         */
        public static function shipping_required_fields( $key, $access )
        {

            if ( $key == $access . '_email' ) {
                return true;
            }

            if ( !self::is_shipping_enabled() ) {
                return false;
            }

            $shipping_required = array(
                $access . '_country',
                $access . '_address_1',
                //$access.'_address_2' ,
                $access . '_city',
                $access . '_state',
                $access . '_postcode',
            );

            if ( in_array( $key, $shipping_required ) ) {
                return true;
            }

            return false;
        }

        public static function is_required( $key, $field )
        {

            $mandatory = self::shipping_required_fields( $key, 'billing' );
            $required = get_option( 'adq_' . $key . '_required' );

            if ( $mandatory && $required === 'no' ) {
                update_option( 'adq_' . $key . '_required', 'yes' );
                $required = get_option( 'adq_' . $key . '_required' );
            }

            if ( $key === 'billing_email' ) {
                $field['required'] = true;
            } else {
                $field['required'] = $required == "yes" ? true : false;
            }

            return $field;
        }

        public static function is_visible( $key, $field )
        {
            $mandatory = self::shipping_required_fields( $key, 'billing' );
            $visible = get_option( 'adq_' . $key . '_visible' );

            if ( $mandatory && $visible === 'no' ) {
                update_option( 'adq_' . $key . '_visible', 'yes' );
                $visible = get_option( 'adq_' . $key . '_visible' );
            }

            if ( $key === 'billing_state' ) {
                $field['visible'] = get_option( 'adq_billing_country_visible' ) == "yes" ? $visible == 'yes' ? true : false : false;
            } elseif ( $key === 'billing_email' ) {
                $field['visible'] = true;
            } else {
                $field['visible'] = $visible == "yes" ? true : false;
            }

            return $field;
        }

        /**
         * Get checkout fields and filter it.
         * @param integer $product_id
         */
        public static function get_checkout()
        {

            $checkout = WC()->checkout();
            $checkout_fields = ADQ_CheckoutHandler::get_checkout_fields( $checkout );

            foreach ( $checkout_fields['billing'] as $key => $field ) {
                $checkout_fields['billing'][$key] = self::is_required( $key, $field );
                $checkout_fields['billing'][$key] = self::is_visible( $key, $checkout_fields['billing'][$key] );
            }

            if ( !empty( $_POST['billing_country'] ) ) {

                $country = wc_clean( $_POST['billing_country'] );
                $locale = WC()->countries->get_country_locale();
                $country_fields = isset( $locale[$country] ) ? $locale[$country] : null;

                if ( is_array( $country_fields ) && count( $country_fields ) > 0 ) {
                    foreach ( $country_fields as $key => $field ) {
                        if ( isset ( $field['required'] ) && $key != 'phone' ) {
                            $checkout_fields['billing']['billing_' . $key]['required'] = $field['required'];
                        }

                        if ( isset ( $field['hidden'] ) ) {
                            $checkout_fields['billing']['billing_' . $key]['visible'] = $field['hidden'];
                        }
                    }
                }

            }
            ADQ_CheckoutHandler::set_checkout_fields( $checkout, $checkout_fields );

            return $checkout;
        }

        /**
         * Download a file - hook into init function.
         * @param integer $product_id
         */
        public static function download( $file_path, $product_id )
        {
            global $is_IE;

            $file_download_method = get_option( 'woocommerce_file_download_method' );

            if ( !$file_path ) {
                wp_die( __( 'No file defined', 'woocommerce' ) . ' <a href="' . esc_url( home_url() ) . '" class="wc-forward">' . __( 'Go to homepage', 'woocommerce-quotation' ) . '</a>', '', array( 'response' => 404 ) );
            }

            // Redirect to the file...
            if ( $file_download_method == "redirect" ) {
                header( 'Location: ' . $file_path );
                exit;
            }

            // ...or serve it
            $remote_file = true;
            $parsed_file_path = parse_url( $file_path );

            $wp_uploads = wp_upload_dir();
            $wp_uploads_dir = $wp_uploads['basedir'];
            $wp_uploads_url = $wp_uploads['baseurl'];

            if ( (!isset( $parsed_file_path['scheme'] ) || !in_array( $parsed_file_path['scheme'], array( 'http', 'https', 'ftp' ) )) && isset( $parsed_file_path['path'] ) && file_exists( $parsed_file_path['path'] ) ) {

                /** This is an absolute path */
                $remote_file = false;

            } elseif ( strpos( $file_path, $wp_uploads_url ) !== false ) {

                /** This is a local file given by URL so we need to figure out the path */
                $remote_file = false;
                $file_path = str_replace( $wp_uploads_url, $wp_uploads_dir, $file_path );

            } elseif ( is_multisite() && (strpos( $file_path, network_site_url( '/', 'http' ) ) !== false || strpos( $file_path, network_site_url( '/', 'https' ) ) !== false) ) {

                /** This is a local file outside of wp-content so figure out the path */
                $remote_file = false;
                // Try to replace network url
                $file_path = str_replace( network_site_url( '/', 'https' ), ABSPATH, $file_path );
                $file_path = str_replace( network_site_url( '/', 'http' ), ABSPATH, $file_path );
                // Try to replace upload URL
                $file_path = str_replace( $wp_uploads_url, $wp_uploads_dir, $file_path );

            } elseif ( strpos( $file_path, site_url( '/', 'http' ) ) !== false || strpos( $file_path, site_url( '/', 'https' ) ) !== false ) {

                /** This is a local file outside of wp-content so figure out the path */
                $remote_file = false;
                $file_path = str_replace( site_url( '/', 'https' ), ABSPATH, $file_path );
                $file_path = str_replace( site_url( '/', 'http' ), ABSPATH, $file_path );

            } elseif ( file_exists( ABSPATH . $file_path ) ) {

                /** Path needs an abspath to work */
                $remote_file = false;
                $file_path = ABSPATH . $file_path;
            }

            if ( !$remote_file ) {
                // Remove Query String
                if ( strstr( $file_path, '?' ) ) {
                    $file_path = current( explode( '?', $file_path ) );
                }

                // Run realpath
                $file_path = realpath( $file_path );
            }

            // Get extension and type
            $file_extension = strtolower( substr( strrchr( $file_path, "." ), 1 ) );
            $ctype = "application/force-download";

            foreach ( get_allowed_mime_types() as $mime => $type ) {
                $mimes = explode( '|', $mime );
                if ( in_array( $file_extension, $mimes ) ) {
                    $ctype = $type;
                    break;
                }
            }

            // Start setting headers
            if ( !ini_get( 'safe_mode' ) ) {
                @set_time_limit( 0 );
            }

            if ( function_exists( 'get_magic_quotes_runtime' ) && get_magic_quotes_runtime() ) {
                @set_magic_quotes_runtime( 0 );
            }

            if ( function_exists( 'apache_setenv' ) ) {
                @apache_setenv( 'no-gzip', 1 );
            }

            @session_write_close();
            @ini_set( 'zlib.output_compression', 'Off' );

            /**
             * Prevents errors, for example: transfer closed with 3 bytes remaining to read
             */
            if ( ob_get_length() ) {

                if ( ob_get_level() ) {

                    $levels = ob_get_level();

                    for ( $i = 0; $i < $levels; $i++ ) {
                        ob_end_clean(); // Zip corruption fix
                    }

                } else {
                    ob_end_clean(); // Clear the output buffer
                }
            }

            if ( $is_IE && is_ssl() ) {
                // IE bug prevents download via SSL when Cache Control and Pragma no-cache headers set.
                header( 'Expires: Wed, 11 Jan 1984 05:00:00 GMT' );
                header( 'Cache-Control: private' );
            } else {
                nocache_headers();
            }

            $filename = basename( $file_path );

            if ( strstr( $filename, '?' ) ) {
                $filename = current( explode( '?', $filename ) );
            }

            $filename = apply_filters( 'woocommerce_file_download_filename', $filename, $product_id );

            header( "X-Robots-Tag: noindex, nofollow", true );
            header( "Content-Type: " . $ctype );
            header( "Content-Description: File Transfer" );
            header( "Content-Disposition: attachment; filename=\"" . $filename . "\";" );
            header( "Content-Transfer-Encoding: binary" );

            if ( $size = @filesize( $file_path ) ) {
                header( "Content-Length: " . $size );
            }

            if ( $file_download_method == 'xsendfile' ) {

                // Path fix - kudos to Jason Judge
                if ( getcwd() ) {
                    $file_path = trim( preg_replace( '`^' . str_replace( '\\', '/', getcwd() ) . '`', '', $file_path ), '/' );
                }

                header( "Content-Disposition: attachment; filename=\"" . $filename . "\";" );

                if ( function_exists( 'apache_get_modules' ) && in_array( 'mod_xsendfile', apache_get_modules() ) ) {

                    header( "X-Sendfile: $file_path" );
                    exit;

                } elseif ( stristr( getenv( 'SERVER_SOFTWARE' ), 'lighttpd' ) ) {

                    header( "X-Lighttpd-Sendfile: $file_path" );
                    exit;

                } elseif ( stristr( getenv( 'SERVER_SOFTWARE' ), 'nginx' ) || stristr( getenv( 'SERVER_SOFTWARE' ), 'cherokee' ) ) {

                    header( "X-Accel-Redirect: /$file_path" );
                    exit;

                }
            }

            if ( $remote_file ) {
                self::readfile_chunked( $file_path ) || header( 'Location: ' . $file_path );
            } else {
                self::readfile_chunked( $file_path ) || wp_die( __( 'File not found', 'woocommerce' ) . ' <a href="' . esc_url( home_url() ) . '" class="wc-forward">' . __( 'Go to homepage', 'woocommerce' ) . '</a>', '', array( 'response' => 404 ) );
            }

            exit;
        }


        /**
         * readfile_chunked
         * Reads file in chunks so big downloads are possible without changing PHP.INI - http://codeigniter.com/wiki/Download_helper_for_large_files/
         * @param    string $file
         * @param    bool $retbytes return bytes of file
         * @return bool|int
         * @todo Meaning of the return value? Last return is status of fclose?
         */
        public static function readfile_chunked( $file, $retbytes = true )
        {
            $chunksize = 1 * (1024 * 1024);
            $buffer = '';
            $cnt = 0;

            if ( file_exists( $file ) ) {
                $handle = fopen( $file, 'r' );
                if ( $handle === FALSE ) {
                    return FALSE;
                }
            } elseif ( version_compare( PHP_VERSION, '5.4.0', '<' ) && ini_get( 'safe_mode' ) ) {
                $handle = @fopen( $file, 'r' );
                if ( $handle === FALSE ) {
                    return FALSE;
                }
            } else {
                return FALSE;
            }

            while ( !feof( $handle ) ) {
                $buffer = fread( $handle, $chunksize );
                echo $buffer;
                if ( ob_get_length() ) {
                    ob_flush();
                    flush();
                }

                if ( $retbytes ) {
                    $cnt += strlen( $buffer );
                }
            }

            $status = fclose( $handle );

            if ( $retbytes && $status ) {
                return $cnt;
            }

            return $status;
        }

    }

}
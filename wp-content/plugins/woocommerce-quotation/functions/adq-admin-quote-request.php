<?php
/**
 * Handle Admin functions
 *
 * @version     2.1.0
 * @package     woocommerce-quotation/functions/
 * @category    Functions
 * @author      Aldaba Digital
 */

/* ADMIN Styles */
if ( !function_exists( 'adq_admin_css' ) ) {
    function adq_admin_css()
    {

        $option = get_option( 'adq_contact_form' );
        if ( $option ) {
            do_action( 'wpml_register_single_string', 'Woocommerce Quotation', 'Contact Form 7 Shortcode', $option );
        }

        $option = get_option( 'adq_quote_text' );
        if ( $option ) {
            do_action( 'wpml_register_single_string', 'Woocommerce Quotation', 'Add to Quote Button', $option );
        }

        $option = get_option( 'adq_quotelist_page_id' );
        if ( $option ) {
            do_action( 'wpml_register_single_string', 'Woocommerce Quotation', 'Quote List Page', $option );
        }

        $option = get_option( 'adq_url_redirect_payment' );
        if ( $option ) {
            do_action( 'wpml_register_single_string', 'Woocommerce Quotation', 'Quote URL Redirect Payment', $option );
        }

        echo '<link id="adq-admin-css" rel="stylesheet" type="text/css" href="' . ADQ_QUOTE_URL . 'assets/css/admin.css">';
    }

    add_action( 'admin_head', 'adq_admin_css' );
}

if ( !function_exists( 'adq_admin_scripts' ) ) {
    function adq_admin_scripts()
    {
        $screen = get_current_screen();
        $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

        wp_register_script( 'adq-admin', ADQ_QUOTE_URL . '/assets/js/admin.js', array( 'jquery' ), ADQ_VERSION );
        wp_enqueue_script( 'adq-admin' );

        if ( in_array( $screen->id, array( 'shop_order' ) ) ) {
            wp_enqueue_media();
            wp_enqueue_script( 'wc-admin-product-meta-boxes', WC()->plugin_url() . '/assets/js/admin/meta-boxes-product' . $suffix . '.js', array( 'wc-admin-meta-boxes' ), WC_VERSION );
        }

    }

    add_action( 'admin_enqueue_scripts', 'adq_admin_scripts' );
}


if ( !function_exists( 'adq_add_order_detail' ) ) {
    function adq_add_order_detail( $order )
    {
        global $post, $theorder;

        if ( !empty( $theorder ) ) {
            $order = $theorder;
            $status = $order->get_status();
        } else if ( $order = wc_get_order( $post ) ) {
            $status = $order->get_status();
        }

        $order_id = ADQ_OrderHandler::get_id( $order );
        //$data  = get_post_meta( $post->ID );

        ?>
        <div id="woocommerce-quotation-addons" class="order_data_column">
            <?php

            do_action( 'adq_add_order_detail_before', $order_id );

            //Add Send Proposal button
            if ( !empty( $status ) ) :
                if ( $status == "proposal" ) {
                    ?>
                    <p class="form-field">
                        <input type="submit" value="<?php _e( 'Send Proposal', 'woocommerce-quotation' ) ?>"
                               name="send_proposal" class="button send_proposal button-primary">
                    </p>
                    <?php
                } elseif ( $status == "request" ) {
                    ?>
                    <p class="form-field">
                        <input type="submit" value="<?php _e( 'Create proposal', 'woocommerce-quotation' ) ?>"
                               name="create_proposal" class="button create_proposal button-primary">
                    </p>
                    <?php
                } elseif ( $status == "proposal-sent" ) {
                    ?>
                    <p class="form-field">
                        <input type="submit" value="<?php _e( 'Accept proposal', 'woocommerce-quotation' ) ?>"
                               name="accept_proposal" class="button accept_proposal button-primary">
                    </p>
                    <p class="form-field">
                        <input type="submit" value="<?php _e( 'Reject proposal', 'woocommerce-quotation' ) ?>"
                               name="reject_proposal" class="button reject_proposal button-primary">
                    </p>
                    <?php
                }
            endif;

            //Related order/quotes                        
            $_order_id = get_post_meta( $order_id, '_order_id', true );
            $_quotation_id = get_post_meta( $order_id, '_quotation_id', true );

            if ( $_quotation_id && $_quotation_id != "" ) { ?>
                <p class="form-field">
                    <a href="<?php echo admin_url( 'post.php?post=' . $_quotation_id . '&action=edit' ); ?>"><?php _e( 'Related quote proposal', 'woocommerce-quotation' ) ?></a>
                </p>
            <?php }

            /*** DEPRECATED since 2.4.0 ***/
            /* if( $_order_id && $_order_id != "" ) {  ?>
                <p class="form-field">
                    <a href="<?php echo admin_url( 'post.php?post=' . $_order_id . '&action=edit' ); ?>"><?php _e('Related order','woocommerce-quotation') ?></a>
                </p>
            <?php } */

            $readonly = '';
            if ( $status != "proposal" && $status != "proposal-sent" ) {
                $readonly = 'readonly';
            }

            //Add custom fields
            $validity_date = get_post_meta( $order_id, '_validity_date', true );
            if ( $validity_date == "" ) {
                $validity_date = date( 'Y-m-d H:i:s', strtotime( "+" . get_option( 'adq_proposal_validity' ) . " day" ) ) . "\n";
            }
            $reminder_date = get_post_meta( $order_id, '_reminder_date', true );
            if ( $reminder_date == "" ) {
                $reminder_date = date( 'Y-m-d H:i:s', strtotime( "+" . get_option( 'adq_proposal_reminder' ) . " day" ) ) . "\n";
            }

            $additional_info = get_post_meta( $order_id, '_adq_additional_info', true );
            $additional_info = preg_replace( '/\<br(\s*)?\/?\>/i', '', $additional_info );

            if ($status == "request") { ?>
            <div style="display:none">
                <?php } ?>

                <p class="form-field form-field-wide">
                    <label for="validity_date"><?php _e( 'Validity date:', 'woocommerce-quotation' ) ?></label>
                    <input <?php echo $readonly ?> type="text" class="date-picker-field<?php echo $readonly ?> "
                                                   name="_validity_date" id="validity_date" maxlength="10"
                                                   value="<?php echo date_i18n( 'Y-m-d', strtotime( $validity_date ) ); ?>"
                                                   pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"/>
                    @<input <?php echo $readonly ?> type="text" class="hour"
                                                    placeholder="<?php _e( 'h', 'woocommerce-quotation' ) ?>"
                                                    name="_validity_date_hour" id="validity_date_hour" maxlength="2"
                                                    size="2"
                                                    value="<?php echo date_i18n( 'H', strtotime( $validity_date ) ); ?>"
                                                    pattern="\-?\d+(\.\d{0,})?"/>
                    :<input <?php echo $readonly ?> type="text" class="minute"
                                                    placeholder="<?php _e( 'm', 'woocommerce-quotation' ) ?>"
                                                    name="_validity_date_minute" id="validity_date_minute" maxlength="2"
                                                    size="2"
                                                    value="<?php echo date_i18n( 'i', strtotime( $validity_date ) ); ?>"
                                                    pattern="\-?\d+(\.\d{0,})?"/>
                </p>
                <p class="form-field form-field-wide">
                    <label for="reminder_date"><?php _e( 'Reminder date:', 'woocommerce-quotation' ) ?></label>
                    <input <?php echo $readonly ?> type="text" class="date-picker-field<?php echo $readonly ?> "
                                                   name="_reminder_date" id="reminder_date" maxlength="10"
                                                   value="<?php echo date_i18n( 'Y-m-d', strtotime( $reminder_date ) ); ?>"
                                                   pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"/>
                    @<input <?php echo $readonly ?> type="text" class="hour"
                                                    placeholder="<?php _e( 'h', 'woocommerce-quotation' ) ?>"
                                                    name="_reminder_date_hour" id="reminder_date_hour" maxlength="2"
                                                    size="2"
                                                    value="<?php echo date_i18n( 'H', strtotime( $reminder_date ) ); ?>"
                                                    pattern="\-?\d+(\.\d{0,})?"/>
                    :<input <?php echo $readonly ?> type="text" class="minute"
                                                    placeholder="<?php _e( 'm', 'woocommerce-quotation' ) ?>"
                                                    name="_reminder_date_minute" id="reminder_date_minute" maxlength="2"
                                                    size="2"
                                                    value="<?php echo date_i18n( 'i', strtotime( $reminder_date ) ); ?>"
                                                    pattern="\-?\d+(\.\d{0,})?"/>
                </p>
                <p class="form-field form-field-wide">
                    <label for="reminder_date"><?php _e( 'Additional information:', 'woocommerce-quotation' ) ?></label>
                    <textarea cols="25" rows="4" name="_adq_additional_info"
                              id="adq_additional_info" <?php echo $readonly ?> ><?php echo $additional_info; ?></textarea>
                </p>
                <div class="form-field form-field-wide downloadable_files">
                    <?php
                    $downloadable_files = get_post_meta( $order_id, '_attached_files', true );
                    ?>
                    <table class="widefat">
                        <thead>
                        <tr>
                            <th class="sort">&nbsp;</th>
                            <th><?php _e( 'Name', 'woocommerce-quotation' ); ?> <span class="tips"
                                                                                      data-tip="<?php _e( 'This is the name of the attachment shown to the customer.', 'woocommerce-quotation' ); ?>">[?]</span>
                            </th>
                            <th colspan="2"><?php _e( 'File URL', 'woocommerce-quotation' ); ?> <span class="tips"
                                                                                                      data-tip="<?php _e( 'This is the URL or absolute path to the file which customer will get access to.', 'woocommerce-quotation' ); ?>">[?]</span>
                            </th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        if ( $downloadable_files ) {
                            foreach ( $downloadable_files as $key => $file ) {
                                include(ADQ_QUOTE_DIR . 'templates/views/html-attachment.php');
                            }
                        }
                        ?>
                        </tbody>
                        <tfoot>
                        <tr>
                            <th colspan="5">
                                <a href="#" class="button insert" data-row="<?php
                                $file = array(
                                    'file' => '',
                                    'name' => ''
                                );
                                ob_start();
                                include(ADQ_QUOTE_DIR . 'templates/views/html-attachment.php');
                                echo esc_attr( ob_get_clean() );
                                ?>"><?php _e( 'Add File', 'woocommerce-quotation' ); ?></a>
                            </th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <?php
                if ($status == "request") { ?>
            </div>
        <?php } ?>

            <?php do_action( 'adq_add_order_detail_after', $order_id ) ?>

        </div>
        <?php
    }
}


if ( !function_exists( 'adq_product_options' ) ) {
    function adq_product_options( )
    {
        global $wp_roles, $post;

        $product = $post;

        if ( !isset( $wp_roles ) ) {
            $wp_roles = new WP_Roles();
        }

        $roles = $wp_roles->get_names();
        $roles = array_merge( array( 'unregistered' => 'Unregistered', 'loggedin' => 'Logged in' ), $roles );
        $product_data = wc_get_product( (int)$product->ID );

        if ( isset( $_REQUEST['post'] ) ) {

            $adq_inherit_visibility_quote = get_post_meta( (int)$product->ID, '_adq_inherit_visibility_quote', true );
            $adq_inherit_visibility_price = get_post_meta( (int)$product->ID, '_adq_inherit_visibility_price', true );
            $adq_inherit_visibility_cart = get_post_meta( (int)$product->ID, '_adq_inherit_visibility_cart', true );
            $adq_inherit_allow_product_comments = get_post_meta( (int)$product->ID, '_adq_inherit_allow_product_comments', true );

            $adq_visibility_quote = get_post_meta( (int)$product->ID, 'adq_visibility_quote', true );
            $adq_visibility_price = get_post_meta( (int)$product->ID, 'adq_visibility_price', true );
            $adq_visibility_cart = get_post_meta( (int)$product->ID, 'adq_visibility_cart', true );
            $adq_allow_product_comments = get_post_meta( (int)$product->ID, 'adq_allow_product_comments', true );
        } else {

            $adq_inherit_visibility_quote = "yes";

            $adq_inherit_visibility_price = "yes";

            $adq_inherit_visibility_cart = "yes";

            $adq_inherit_allow_product_comments = "yes";

            $adq_visibility_quote = get_option( 'adq_visibility_quote' );

            $adq_visibility_price = get_option( 'adq_visibility_price' );

            $adq_visibility_cart = get_option( 'adq_visibility_cart' );

            $adq_allow_product_comments = get_option( 'adq_allow_product_comments' );
        }

        if ( $adq_inherit_visibility_quote == "" ) {
            $adq_inherit_visibility_quote = "yes";
        }

        if ( $adq_inherit_visibility_price == "" ) {
            $adq_inherit_visibility_price = "yes";
        }

        if ( $adq_inherit_visibility_cart == "" ) {
            $adq_inherit_visibility_cart = "yes";
        }

        if ( $adq_inherit_allow_product_comments == "" ) {
            $adq_inherit_allow_product_comments = "yes";
        }

        if ( $adq_visibility_quote == "" ) {
            $adq_visibility_quote = get_option( 'adq_visibility_quote' );
        }

        if ( $adq_visibility_price == "" ) {
            $adq_visibility_price = get_option( 'adq_visibility_price' );
        }

        if ( $adq_visibility_cart == "" ) {
            $adq_visibility_cart = get_option( 'adq_visibility_cart' );
        }

        if ( $adq_allow_product_comments == "" ) {
            $adq_allow_product_comments = get_option( 'adq_allow_product_comments' );
        }

        $adq_enable_button = get_post_meta( (int)$product->ID, 'adq_enable_button', true );
        $adq_enable_button = $adq_enable_button ? $adq_enable_button : 'global';

        $adq_enable_payment = get_post_meta( (int)$product->ID, 'adq_enable_payment', true );
        $adq_enable_payment = $adq_enable_payment ? $adq_enable_payment : 'global';

        ?>
        <style>
            #adq_quotation_options_data.woocommerce_options_panel .form-field {
                padding: 5px 20px 5px 162px;
                margin: 10px 0;
            }

            #adq_quotation_options_data.woocommerce_options_panel label {
                width: 140px;
            }

            #adq_quotation_options_data .forminp label {
                margin: 0 10px 10px 0;
                float: none;
            }

            #adq_quotation_options_data .forminp label:after {
                content: '';
                display: block;
            }

            #adq_quotation_options_data.woocommerce_options_panel .select2-container {
                float: none;
            }

            #adq_quotation_options_data.woocommerce_options_panel .description {
                margin-left: 0;
            }
        </style>
        <div id="adq_quotation_options_data" class="adq_option_products panel woocommerce_options_panel hidden">
            <div class="form-field form-required">
                <label for="validity_date"><?php _e( 'Visibility add to quote button:', 'woocommerce-quotation' ) ?></label>
                <input type="checkbox" value="yes" <?php checked( $adq_inherit_visibility_quote, "yes" ) ?> id="_adq_inherit_visibility_quote" name="_adq_inherit_visibility_quote">
                <?php _e( 'Use global settings', 'woocommerce-quotation' ) ?>
                <div>
                    <br>
                    <select multiple="multiple" class="multiselect chosen_select" name="adq_visibility_quote[]" id="attribute_type">
                        <?php foreach ( $roles as $key => $role ) { ?>
                            <option value="<?php echo $key ?>" <?php select_array( $key, $adq_visibility_quote ); ?>><?php echo $role ?></option>
                        <?php } ?>
                    </select>
                    <br>
                    <span class="description">
                        <?php _e( 'Choose the the roles can view...', 'woocommerce-quotation' ); ?>
                    </span>
                </div>                
            </div>
            <div class="form-field form-required">
                <label for="validity_date"><?php _e( 'Visibility price on shop:', 'woocommerce-quotation' ) ?></label>
                <input type="checkbox" value="yes" <?php checked( $adq_inherit_visibility_price, "yes" ) ?> id="_adq_inherit_visibility_price" name="_adq_inherit_visibility_price">
                <?php _e( 'Use global settings', 'woocommerce-quotation' ) ?>
                <div>
                    <br>
                    <select multiple="multiple" class="multiselect chosen_select" name="adq_visibility_price[]" id="attribute_type">
                        <?php foreach ( $roles as $key => $role ) { ?>
                            <option value="<?php echo $key ?>" <?php select_array( $key, $adq_visibility_price ); ?>><?php echo $role ?></option>
                        <?php } ?>
                    </select>
                    <br>
                    <span class="description">
                        <?php _e( 'Choose the the roles can view...', 'woocommerce-quotation' ); ?>
                    </span>
                </div>
            </div>
            <div class="form-field form-required">
                <label for="validity_date"><?php _e( 'Visibility add to cart button:', 'woocommerce-quotation' ) ?></label>
                <input type="checkbox" value="yes" <?php checked( $adq_inherit_visibility_cart, "yes" ) ?> id="_adq_inherit_visibility_cart" name="_adq_inherit_visibility_cart">
                <?php _e( 'Use global settings', 'woocommerce-quotation' ) ?>
                <div>
                    <br>
                    <select multiple="multiple" class="multiselect chosen_select" name="adq_visibility_cart[]" id="attribute_type">
                        <?php foreach ( $roles as $key => $role ) { ?>
                            <option value="<?php echo $key ?>" <?php select_array( $key, $adq_visibility_cart ); ?>><?php echo $role ?></option>
                        <?php } ?>
                    </select>
                    <br>
                    <span class="description">
                        <?php _e( 'Choose the the roles can view...', 'woocommerce-quotation' ); ?>
                    </span>
                </div>
            </div>
            <div class="form-field form-required">
                <label for="validity_date"><?php _e( 'Allow comments:', 'woocommerce-quotation' ) ?></label>
                <input type="checkbox" value="yes" <?php checked( $adq_inherit_allow_product_comments, "yes" ) ?> id="_adq_inherit_allow_product_comments" name="_adq_inherit_allow_product_comments">
                <?php _e( 'Use global settings', 'woocommerce-quotation' ) ?>
                <div>
                    <br>
                    <input type="checkbox" value="yes" <?php checked( $adq_allow_product_comments, "yes" ) ?> id="adq_allow_product_comments" name="adq_allow_product_comments">
                    <br>
                    <span class="description">
                        <?php _e( 'Allow comments on products in quote list', 'woocommerce-quotation' ) ?>
                    </span>
                </div>
            </div>
            <div class="form-field form-required">
                <label for="adq_product_force_button"><?php _e( 'Force show \'Add to quote\' button when this product is out of stock', 'woocommerce-quotation' ) ?></label>
                <div class="forminp forminp-multiselect">
                    <?php $option_value = get_post_meta( (int)$product->ID, 'adq_product_force_button', true );
                    if ( $option_value == '' || !is_array($option_value) ) {
                        $option_value = array(
                            'active' => true,
                            'roles' => array()
                        );
                    }
                    ?>
                    <label>
                        <input type="checkbox"
                               value="yes"
                               id = "adq_product_force_button_check"
                               name="adq_product_force_button_check"
                               <?php echo $option_value['active'] ? 'checked' : '' ?>
                        >
                    </label>
                    <br>
                    <select
                        class="wc-enhanced-select"
                        name="adq_product_force_button[]"
                        id="adq_product_force_button"
                        multiple="multiple"
                    >
                        <?php

                        foreach ( $roles as $key => $val ) {
                            ?>
                            <option value="<?php echo esc_attr( $key ); ?>"
                                <?php

                                if ( is_array( $option_value['roles'] ) ) {
                                    selected( in_array( (string) $key, $option_value['roles'], true ), true );
                                } else {
                                    selected( $option_value['roles'], (string) $key );
                                }

                                ?>
                            >
                                <?php echo esc_html( $val ); ?></option>
                            <?php
                        }
                        ?>
                    </select>
                    <br>
                    <span class="description"><?php _e( 'Choose the roles can view...', 'woocommerce-quotation' ) // WPCS: XSS ok. ?></span>
                </div>
            </div>
            <div class="form-field form-required">
                <label for="adq_enable_payment"><?php _e( 'Enable payment', 'woocommerce-quotation' ) ?></label>
                <br>
                <select class="chosen_select" name="adq_enable_payment" id="adq_enable_payment">
                    <option value="global" <?php echo $adq_enable_payment == 'global' ? 'selected=\'selected\'' : '' ?>><?php _e( 'Use global settings', 'woocommerce-quotation' ) ?></option>
                    <option value="yes" <?php echo $adq_enable_payment == 'yes' ? 'selected=\'selected\'' : '' ?>><?php _e( 'Yes', 'woocommerce-quotation' ) ?></option>
                    <option value="no" <?php echo $adq_enable_payment == 'no' ? 'selected=\'selected\'' : '' ?>><?php _e( 'No', 'woocommerce-quotation' ) ?></option>
                </select>
                <br>
                <span class="description">
                    <?php _e( 'You can enable the payment when this product is out of stock', 'woocommerce-quotation' ) ?>
                </span>
            </div>
            <div class="form-field form-required">
                <label for="adq_enable_button"><?php _e( 'Enable button \'Add to quote\' even if the product is out of stock.', 'woocommerce-quotation' ) ?></label>
                <br>
                <select class="chosen_select" name="adq_enable_button" id="adq_enable_button">
                    <option value="global" <?php echo $adq_enable_button == 'global' ? 'selected=\'selected\'' : '' ?>><?php _e( 'Use global settings', 'woocommerce-quotation' ) ?></option>
                    <option value="yes" <?php echo $adq_enable_button == 'yes' ? 'selected=\'selected\'' : '' ?>><?php _e( 'Yes', 'woocommerce-quotation' ) ?></option>
                    <option value="no" <?php echo $adq_enable_button == 'no' ? 'selected=\'selected\'' : '' ?>><?php _e( 'No', 'woocommerce-quotation' ) ?></option>
                </select>
            </div>
        </div>
        <?php
    }

    add_action( 'woocommerce_product_data_panels', 'adq_product_options' );
}


/**
 * Rewrite order Metaboxes on Order
 */
if ( !function_exists( 'adq_add_meta_boxes' ) ) {
    function adq_add_meta_boxes()
    {
        // Orders
        foreach ( wc_get_order_types( 'order-meta-boxes' ) as $type ) {
            add_meta_box( 'woocommerce-order-data', __( 'Order Data', 'woocommerce' ), 'WC_Meta_Box_Order_Data::output', $type, 'normal', 'high' );
            add_meta_box( 'woocommerce-adq-quote', __( 'Quotation', 'woocommerce-quotation' ), 'adq_add_order_detail', $type, 'normal', 'high' );
            add_meta_box( 'woocommerce-order-items', __( 'Order Items', 'woocommerce' ), 'WC_Meta_Box_Order_Items::output', $type, 'normal', 'high' );
        }
        //Products
        //add_meta_box( 'woocommerce-product-adq-options', __( 'Quotation options', 'woocommerce-quotation' ), 'adq_product_options', 'product', 'side' );
    }

    add_action( 'add_meta_boxes', 'adq_add_meta_boxes', 25 );
}

/*
 * Override Redirect With No payment to end the POST Process
 */
if ( !function_exists( 'adq_resend_order_emails' ) ) {
    function adq_resend_order_emails( $available_emails )
    {
        global $theorder, $post;

        if ( !empty( $theorder ) ) {
            $status = $theorder->get_status();
        } else if ( $order = wc_get_order( $post ) ) {
            $status = $order->get_status();
        }

        if ( !empty( $status ) && $status == "proposal-sent" ) {
            $available_emails[] = 'customer_proposal';
        }

        return $available_emails;
    }

    add_filter( 'woocommerce_resend_order_emails_available', 'adq_resend_order_emails' );
}


if ( !function_exists( 'adq_admin_post_proccess' ) ) {
    function adq_admin_post_proccess( $post_id, $post )
    {
        if ( isset( $_REQUEST["send_proposal"] ) ) {

            //Since there is a bug with infinite loop wiht update_status, we force the post variable
            $_POST['order_status'] = 'wc-proposal-sent';
        }

        if ( isset( $_REQUEST["create_proposal"] ) ) {

            $_POST['order_status'] = 'wc-proposal';
        }

        if ( isset( $_REQUEST["accept_proposal"] ) ) {

            $_POST['order_status'] = 'wc-proposal-accepted';
        }

        if ( isset( $_REQUEST["reject_proposal"] ) ) {

            $_POST['order_status'] = 'wc-proposal-rejected';
        }

        if ( isset( $_POST['_validity_date'] ) ) {
            $validity_date = strtotime( $_POST['_validity_date'] . ' ' . (int)$_POST['_validity_date_hour'] . ':' . (int)$_POST['_validity_date_minute'] . ':00' );

            update_post_meta( $post_id, '_validity_date', date_i18n( 'Y-m-d H:i:s', $validity_date ) );
        }

        if ( isset( $_POST['_reminder_date'] ) ) {
            $reminder_date = strtotime( $_POST['_reminder_date'] . ' ' . (int)$_POST['_reminder_date_hour'] . ':' . (int)$_POST['_reminder_date_minute'] . ':00' );

            update_post_meta( $post_id, '_reminder_date', date_i18n( 'Y-m-d H:i:s', $reminder_date ) );
        }

        if ( isset( $_POST['_adq_additional_info'] ) ) {
            update_post_meta( $post_id, '_adq_additional_info', nl2br( $_POST['_adq_additional_info'] ) );
        }

        if ( isset( $_POST['_wc_file_urls'] ) && count( $_POST['_wc_file_urls'] ) > 0 ) {
            $i = 0;
            $files = array();
            foreach ( $_POST['_wc_file_urls'] as $url ) {
                $file_name = wc_clean( $_POST["_wc_file_names"][$i] );
                $file_url = wc_clean( $_POST["_wc_file_urls"][$i] );

                if ( $file_url != "" ) {
                    $files[md5( $file_url )] = array(
                        'name' => $file_name,
                        'file' => $file_url
                    );
                }
                $i++;
            }
            if ( count( $files ) > 0 )
                update_post_meta( $post_id, '_attached_files', $files );
        }

    }

    add_action( 'woocommerce_process_shop_order_meta', 'adq_admin_post_proccess', 10, 2 );
}


if ( !function_exists( 'add_save_post' ) ) {
    function adq_save_post( $product_id, $product )
    {

        if ( $product->post_type == 'product' ) {
            //Force int
            $product_id = (int)$product_id;

            $adq_visibility_quote = array();
            if ( isset( $_POST['adq_visibility_quote'] ) && $_POST['adq_visibility_quote'] != '' ) {
                $adq_visibility_quote = $_POST['adq_visibility_quote'];
            }
            update_post_meta( $product_id, 'adq_visibility_quote', $adq_visibility_quote );

            $adq_visibility_price = array();
            if ( isset( $_POST['adq_visibility_price'] ) && $_POST['adq_visibility_price'] != '' ) {
                $adq_visibility_price = $_POST['adq_visibility_price'];
            }
            update_post_meta( $product_id, 'adq_visibility_price', $adq_visibility_price );

            $adq_visibility_cart = array();
            if ( isset( $_POST['adq_visibility_cart'] ) && $_POST['adq_visibility_cart'] != '' ) {
                $adq_visibility_cart = $_POST['adq_visibility_cart'];
            }
            update_post_meta( $product_id, 'adq_visibility_cart', $adq_visibility_cart );

            $adq_product_force_button['active'] = ( isset( $_POST['adq_product_force_button_check'] ) && $_POST['adq_product_force_button_check'] === "yes" );
            $adq_product_force_button['roles'] =  ( isset( $_POST['adq_product_force_button'] ) && $_POST['adq_product_force_button'] != '' ) ? $_POST['adq_product_force_button'] : array();
            update_post_meta( $product_id, 'adq_product_force_button', $adq_product_force_button );

            if ( isset( $_POST['_adq_inherit_visibility_quote'] ) ) {
                update_post_meta( $product_id, '_adq_inherit_visibility_quote', $_POST['_adq_inherit_visibility_quote'] );
            } else {
                update_post_meta( $product_id, '_adq_inherit_visibility_quote', "no" );
            }

            if ( isset( $_POST['_adq_inherit_visibility_price'] ) ) {
                update_post_meta( $product_id, '_adq_inherit_visibility_price', $_POST['_adq_inherit_visibility_price'] );
            } else {
                update_post_meta( $product_id, '_adq_inherit_visibility_price', "no" );
            }

            if ( isset( $_POST['_adq_inherit_visibility_cart'] ) ) {
                update_post_meta( $product_id, '_adq_inherit_visibility_cart', $_POST['_adq_inherit_visibility_cart'] );
            } else {
                update_post_meta( $product_id, '_adq_inherit_visibility_cart', "no" );
            }

            if ( isset( $_POST['adq_allow_product_comments'] ) ) {
                update_post_meta( $product_id, 'adq_allow_product_comments', $_POST['adq_allow_product_comments'] );
            } else {
                update_post_meta( $product_id, 'adq_allow_product_comments', "no" );
            }

            if ( isset( $_POST['_adq_inherit_allow_product_comments'] ) ) {
                update_post_meta( $product_id, '_adq_inherit_allow_product_comments', $_POST['_adq_inherit_allow_product_comments'] );
            } else {
                update_post_meta( $product_id, '_adq_inherit_allow_product_comments', "no" );
            }

            if ( isset( $_POST['adq_enable_button'] ) ) {
                update_post_meta( $product_id, 'adq_enable_button', $_POST['adq_enable_button'] );
            }

            if ( isset( $_POST['adq_enable_payment'] ) ) {
                update_post_meta( $product_id, 'adq_enable_payment', $_POST['adq_enable_payment'] );
            }
        }
    }

    //add_action( 'save_post', 'adq_save_post', 10, 2 );
    add_action( 'woocommerce_process_product_meta', 'adq_save_post', 10, 2 );
}


if ( !function_exists( 'select_array' ) ) {
    function select_array( $search, $haystack, $type = 'selected' )
    {
        if ( in_array( $search, $haystack ) ) {
            echo "$type='$type'";
        }
    }
}

if ( !function_exists( 'add_admin_field_button' ) ) {
    function add_admin_field_button( $value )
    {
        // Custom attribute handling.
        $custom_attributes = array();

        if ( !empty( $value['custom_attributes'] ) && is_array( $value['custom_attributes'] ) ) {
            foreach ( $value['custom_attributes'] as $attribute => $attribute_value ) {
                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $attribute_value ) . '"';
            }
        }

        // Description handling.
        $field_description = WC_Admin_Settings::get_field_description( $value );
        $description = $field_description['description'];
        $tooltip_html = $field_description['tooltip_html'];
        ?>
        <tr valign="top">
            <th scope="row" class="titledesc">
                <label for="<?php echo esc_attr( $value['id'] ); ?>"><?php echo esc_html( $value['title'] ); ?></label>
                <?php echo $tooltip_html; ?>
            </th>
            <td class="forminp forminp-<?php echo esc_attr( sanitize_title( $value['type'] ) ); ?>">
                <button
                        name="<?php echo esc_attr( $value['id'] ); ?>"
                        id="<?php echo esc_attr( $value['id'] ); ?>"
                        type="submit"
                        value="<?php echo esc_attr( $value['text'] ); ?>"
                        style="<?php echo esc_attr( $value['css'] ); ?>"
                        class="<?php echo esc_attr( $value['class'] ); ?>"
                    <?php echo implode( ' ', $custom_attributes ); ?>
                ><?php echo esc_html( $value['text'] ); ?></button>
                <?php echo esc_html( $value['suffix'] ); ?> <?php echo $description; ?>
            </td>
        </tr>
        <?php
    }

    add_action( 'woocommerce_admin_field_button', 'add_admin_field_button' );
}

if ( !function_exists('adq_quotation_options_data_tab') ) {
    function adq_quotation_options_data_tab( $product_data_tabs )
    {
        $product_data_tabs['adq_quotation_options'] = array(
            'label' => __( 'Quotation', 'woocommerce-quotation' ),
            'target' => 'adq_quotation_options_data'
        );

        return $product_data_tabs;
    }

    add_filter( 'woocommerce_product_data_tabs', 'adq_quotation_options_data_tab' );
}
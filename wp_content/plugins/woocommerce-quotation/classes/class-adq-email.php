<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'ADQ_Email' ) ) {

    /**
     * Class for email templates management.
     * 
     * This class allow you to create and modify emails that are related to WooCommerce Quotation plugin.
     * 
     * @class       ADQ_Email
     * @extends     WC_Email
     * @package     woocommerce-quotation/classes/email
     * @author      Aldaba Digital <aldabadigital@gmail.com>
     * @author      Roberto Adnier Nuñez Farfán <adnier87@gmail.com>
     * @version     2.0.0
     * @since       3.0.0
     * 
     */
    
    class ADQ_Email extends WC_Email
    {
        /**
         * Constructor
         */
        function __construct( $id = null )
        {
            add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
            add_action( 'woocommerce_settings_saved', array( $this, 'do_after_save'), 11 );
            add_action( 'woocommerce_update_options_email_adq_new_email', array( $this, 'process_admin_options') );
            
            $this->id = $id;
            parent::__construct();
            
            $this->title            = $this->get_option( 'title' );
            $this->description      = $this->get_option( 'description' );
            $this->customer_email   = ('customer' == $this->get_option( 'send_to' ));
            $this->is_request_email = ($this->get_option('is_request') == 'yes');
            $this->template_html 	= 'adq-email-template.php';
            $this->template_plain 	= 'plain/adq-email-template.php';
            $this->template_base    = ADQ_QUOTE_DIR . 'templates/';

            if ( !$this->customer_email ) {
                $this->recipient = ( $this->get_option( 'send_to' ) == 'admin' ? get_option( 'admin_email' ) . ',' : '' ) . $this->get_option( 'recipient' );
            }
        }

        /**
         * Redirect if email id have modified
         * 
         * @return void
         */

        function do_after_save()
        {
            if ( isset($_POST['redirect_to']) && $_POST['redirect_to'] != '' ) {
                wp_redirect( admin_url( 'admin.php?page=wc-settings&tab=email&section=' . $_POST['redirect_to'] ) );
                exit;
            }
        }

        /**
         * Load scripts
         * 
         * @return void
         */

        function admin_scripts()
        {
            global $current_tab, $current_section;

            if ( $current_tab === 'email' ) {
                wp_enqueue_style( 'font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' );

                wp_enqueue_script( 'email-settings', ADQ_QUOTE_URL . 'assets/js/email-settings.js', array('jquery'), '1.0.0', true );
                wp_localize_script( 'email-settings', 'data', array(
                    'pluginId'  => $this->plugin_id,
                    'section'   => ($current_section === 'adq_new_email') ? '' : $current_section
                ) );
                wp_localize_script( 'email-settings', 'adminAjax', admin_url( 'admin-ajax.php' ) );
                wp_localize_script( 'email-settings', 'textIdInUse', __( 'This id is in use', 'woocommerce-quotation' ) );
            }            
        }

        /**
         * Initialize fields
         * 
         * @return void
         */
        
        function init_form_fields()
        {
            $fields = array(
                'enabled'       => array(
                    'title'     => __( 'Enable/Disable', 'woocommerce-quotation' ),
                    'type'      => 'checkbox',
                    'label'     => __( 'Enable this email notification', 'woocommerce-quotation' ),
                    'default'   => 'yes'
                ),
                'id'            => array(
                    'title'             => 'ID',
                    'type'              => 'text',
                    'description'       => __( 'Email ID', 'woocommerce-quotation' ),
                    'custom_attributes' => array(
                        'required' => 'required'
                    )
                ), 
                'title'         => array(
                    'title'             => __( 'Title', 'woocommerce-quotation' ),
                    'type'              => 'text',
                    'description'       => __( 'Email title to display at Woocommerce Email Setting', 'woocommerce-quotation' ),
                    'custom_attributes' => array(
                        'required' => 'required'
                    )
                ), 
                'description'         => array(
                    'title'             => __( 'Description', 'woocommerce-quotation' ),
                    'type'              => 'text',
                    'description'       => __( 'Email description to display at Woocommerce Email Setting', 'woocommerce-quotation' ),
                    'custom_attributes' => array(
                        'required' => 'required'
                    )
                ),                
                'subject'       => array(
                    'title'         => __( 'Subject', 'woocommerce-quotation' ),
                    'type'          => 'text',
                    'description'   => sprintf( __( 'You can use the following tags: %s, %s and %s <br> (e.g. You have accepted our proposal #{order_number})', 'woocommerce-quotation' ), '{site_title}', '{order_number}', '{order_date}' )
                ),
                'heading'       => array(
                    'title'         => __( 'Email heading', 'woocommerce-quotation' ),
                    'type'          => 'text',
                    'description'   => sprintf( __( 'You can use the following tags: %s, %s and %s', 'woocommerce-quotation' ), '{site_title}', '{order_number}', '{order_date}' )
                ),
                'content'       => array(
                    'title'         => __( 'Content', 'woocommerce-quotation' ),
                    'type'          => 'editor',
                    'description'   => sprintf( __( 'You can use the following tags to use them into email content: %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s and %s', 'woocommerce-quotation' ), '{site_title}', '{order_number}', '{order_date}', '{adq_customer}', '{adq_valid_until}', '{adq_myaccount_link}', '{adq_order_comments}', '{adq_pay}', '{adq_cf7}', '{adq_request_list}', '{adq_address}', '{adq_accept}', '{adq_reject}', '{adq_order_note}' )
                ),
                'email_type'    => array(
                    'title'         => __( 'Email type', 'woocommerce' ),
                    'type'          => 'select',
                    'description'   => __( 'Choose which format of email to send.', 'woocommerce' ),
                    'default'       => 'html',
                    'class'         => 'email_type wc-enhanced-select',
                    'options'       => $this->get_email_type_options()
                ),
                'send_to'       => array(
                    'title'         => __( 'Send this email to', 'woocommerce' ),
                    'type'          => 'select',
                    'description'   => __( 'Choose whom to send this email to.', 'woocommerce' ),
                    'default'       => 'customer',
                    'options'       => array(
                        'admin'             => __( 'Admin', 'woocommerce-quotation' ),
                        'only_recipients'   => __( 'Only Others recipients', 'woocommerce-quotation' ),
                        'customer'          => __( 'Customer', 'woocommerce-quotation' )
                    )
                ),
                'recipient' => array(
                    'title' 		=> __( 'Others recipients', 'woocommerce-quotation' ),
                    'type' 			=> 'text',
                    'description' 	=> __( 'Enter recipients (comma separated) for this email', 'woocommerce-quotation' ),
                    'placeholder' 	=> '',
                    'default' 		=> ''
                ),                
                'order_status'  => array(
                    'title'         => __( 'Choose order status', 'woocommerce-quotation' ),
                    'type'          => 'select',
                    'description'   => __( 'Choose what order status should fire this email', 'woocommerce-quotation' ),
                    'options'       => $this->get_statuses_options()
                ),
                'is_reminder'  => array(
                    'title'         => __( 'Reminder', 'woocommerce-quotation' ),
                    'label'         => __( 'Is it a reminder email?', 'woocommerce-quotation' ),
                    'type'          => 'checkbox',
                    'description'   => __( 'This email will only send from Order Edit screen at backend.', 'woocommerce-quotation' ),
                ),
                'is_request'  => array(
                    'title'         => __( 'Request email', 'woocommerce-quotation' ),
                    'label'         => __( 'Is it a request email?', 'woocommerce-quotation' ),
                    'type'          => 'checkbox',
                    'description'   => __( 'If it is a request email, the totals will not be displayed', 'woocommerce-quotation' ),
                )
            );

            $this->form_fields = apply_filters( 'adq_form_fields', $fields );
        }

        /**
         * Generate an editor for modifying email content
         * 
         * @param string $key
         * @param array $data
         * 
         * @return string
         */

        function generate_editor_html( $key, $data )
        {
            $field_key = $this->get_field_key( $key );
            $defaults  = array(
                'title'             => '',
                'disabled'          => false,
                'class'             => '',
                'css'               => '',
                'placeholder'       => '',
                'type'              => 'text',
                'desc_tip'          => false,
                'description'       => '',
                'custom_attributes' => array(),
            );

            $data = wp_parse_args( $data, $defaults );

            ob_start();
            ?>
            <tr valign="top">
                <th scope="row" class="titledesc">
                    <?php echo $this->get_tooltip_html( $data ); ?>
                    <label for="<?php echo esc_attr( $field_key ); ?>"><?php echo wp_kses_post( $data['title'] ); ?></label>
                </th>
                <td class="forminp">
                    <fieldset>
                        <legend class="screen-reader-text"><span><?php echo wp_kses_post( $data['title'] ); ?></span></legend>
                        <?php 
                        $settings = array('wpautop' => false );
                        wp_editor( $this->get_option( $key ), $field_key, $settings ); ?>
                        <?php echo $this->get_description_html( $data ); ?>
                    </fieldset>
                </td>
            </tr>            
            <?php
            return ob_get_clean();
        }

        public function process_admin_options() {
            global $current_section;

            $id         = filter_input(INPUT_POST, 'email_id', FILTER_SANITIZE_STRING);
            $email_ids  = get_option( 'adq_emails' );

            if ( $current_section === 'adq_new_email' ) {
                $this->id = filter_input(INPUT_POST, $this->plugin_id . $id . '_id', FILTER_SANITIZE_STRING);
                $this->customer_email = ('customer' == filter_input(INPUT_POST, $this->plugin_id . $id . '_send_to', FILTER_SANITIZE_STRING));

                $email_ids[] = $id;
                update_option( 'adq_emails', $email_ids );
            } else {
                if ( $current_section != $id ) {
                    $email_ids[array_search( $current_section, $email_ids )] = $id;
                    delete_option( $this->get_option_key() );
                    $this->id = $id;
                }

                update_option( 'adq_emails', $email_ids );                 
            }

            parent::process_admin_options();
        }

        /**
         * Get order statuses for collapsible list of the option
         * 
         * @return array
         */

        function get_statuses_options()
        {
            $statuses = wc_get_order_statuses();

			if ( ! empty( $statuses ) ) {
                foreach ( $statuses as $key => $value ) {
					$k = ( 'wc-' === substr( $key, 0, 3 ) ) ? substr( $key, 3 ) : $key;
					$statuses[ $k ] = $value;
					unset( $statuses[ $key ] );
				}
            }
            
            return apply_filters( 'adq_order_statuses_options', $statuses );
        }

        function trigger( $order_id )
        {
            $plain_text = ('plain' === $this->get_email_type());  

            if ( $order_id ) {
                $this->object 				= wc_get_order( $order_id );
                if ( !$this->recipient )
                    $this->recipient = ADQ_OrderHandler::get_billing_email($this->object);

                /**
				 * WooCommerce =< 3.2.X
				 */
                $this->find['order-date']               = '{order_date}';
                $this->find['order-number']             = '{order_number}';
                $this->find['adq-customer']             = '{adq_customer}';
                $this->find['adq-myaccount-link']       = '{adq_myaccount_link}';
                $this->find['adq-order-comments']       = '{adq_order_comments}';
                $this->find['adq-order-note']           = '{adq_order_note}';
                $this->find['adq-pay']                  = '{adq_pay}';
                $this->find['adq-valid-until']          = '{adq_valid_until}';
                $this->find['adq-accept']               = '{adq_accept}';
                $this->find['adq-reject']               = '{adq_reject}';
                $this->find['adq-cf7']                  = '{adq_cf7}';
                $this->find['adq-request-list']         = '{adq_request_list}';
                $this->find['adq-address']              = '{adq_address}';

                $this->replace['order-date']            = date_i18n( wc_date_format(), strtotime( ADQ_OrderHandler::get_order_date($this->object) ) );
                $this->replace['order-number']          = $this->object->get_order_number();
                $this->replace['adq-customer']          = sprintf('%s %s', $this->object->get_billing_first_name(), $this->object->get_billing_last_name());
                $this->replace['adq-myaccount-link']    = $plain_text ? get_permalink( wc_get_page_id( 'myaccount' ) ) : '<a href="'.get_permalink( wc_get_page_id( 'myaccount' ) ).'">'.__( 'My Account', 'woocommerce-quotation' ).'</a>';
                $this->replace['adq-order-comments']    = $this->object->get_data()['customer_note'];
                $this->replace['adq-order-note']        = isset( $this->customer_note ) ? $this->customer_note : '';
                $this->replace['adq-pay']               = $plain_text ? __( 'Pay', 'woocommerce-quotation' ) . '(' . $this->object->get_checkout_payment_url() . ')' : '<a href="'.$this->object->get_checkout_payment_url().'">'.__( 'Pay', 'woocommerce-quotation' ).'</a>';
                $this->replace['adq-valid-until']       = get_post_meta( $this->object->get_order_number(), '_validity_date', true );

                $base_url = StaticAdqQuoteRequest::get_proposal_base_url( $this->object );
                $this->replace['adq-accept'] = $plain_text ? __( 'Accept', 'woocommerce-quotation' ) . '(' . $base_url . '&adq_action=accept)' : '<a href="'.$base_url.'&adq_action=accept">'.__( 'Accept', 'woocommerce-quotation' ).'</a>';
                $this->replace['adq-reject'] = $plain_text ? __( 'Reject', 'woocommerce-quotation' ) . '(' . $base_url . '&adq_action=accept)' : '<a href="'.$base_url.'&adq_action=reject">'.__( 'Reject', 'woocommerce-quotation' ).'</a>';

                ob_start();
                WC_Adq()->modules['contact-form']->adq_wpcf7_email_order_meta( $this->object, false, $plain_text);
                $adq_cf7 = ob_get_clean();
                $this->replace['adq-cf7'] = $adq_cf7 ? $adq_cf7 : '';

                add_filter('woocommerce_order_shipping_to_display', array($this, 'adq_shipping_to_display'), 10, 2);
                ob_start();
                $template_dir = $plain_text ? 'plain/adq-request-list.php' : 'adq-request-list.php';
                adq_get_template( $template_dir, array(
                    'order' 		=> $this->object,
                    'sent_to_admin' => false,
                    'plain_text'    => $plain_text,
                    'is_request_email'  => $this->is_request_email
                ));
                $this->replace['adq-request-list'] = ob_get_clean();
                remove_filter('woocommerce_order_shipping_to_display', array($this, 'adq_shipping_to_display'));

                ob_start();
                do_action( 'woocommerce_email_customer_details', $this->object, false, $plain_text );
                $this->replace['adq-address'] = ob_get_clean();

                /**
				 * WooCommerce > 3.2.X
				 */
                $this->placeholders['{order_date}']            = date_i18n( wc_date_format(), strtotime( ADQ_OrderHandler::get_order_date($this->object) ) );
                $this->placeholders['{order_number}']          = $this->object->get_order_number();
                $this->placeholders['{adq_customer}']          = sprintf('%s %s', $this->object->get_billing_first_name(), $this->object->get_billing_last_name());
                $this->placeholders['{adq_myaccount_link}']    = $plain_text ? get_permalink( wc_get_page_id( 'myaccount' ) ) : '<a href="'.get_permalink( wc_get_page_id( 'myaccount' ) ).'">'.__( 'My Account', 'woocommerce-quotation' ).'</a>';
                $this->placeholders['{adq_order_comments}']    = $this->object->get_data()['customer_note'];
                $this->placeholders['{adq_order_note}']        = isset( $this->customer_note ) ? $this->customer_note : '';;
                $this->placeholders['{adq_pay}']               = $plain_text ? __( 'Pay', 'woocommerce-quotation' ) . '(' . $this->object->get_checkout_payment_url() . ')' : '<a href="'.$this->object->get_checkout_payment_url().'">'.__( 'Pay', 'woocommerce-quotation' ).'</a>';
                $this->placeholders['{adq_valid_until}']       = get_post_meta( $this->object->get_order_number(), '_validity_date', true );

                $base_url = StaticAdqQuoteRequest::get_proposal_base_url( $this->object );
                $this->placeholders['{adq_accept}'] = $plain_text ? __( 'Accept', 'woocommerce-quotation' ) . '(' . $base_url . '&adq_action=accept)' : '<a href="'.$base_url.'&adq_action=accept">'.__( 'Accept', 'woocommerce-quotation' ).'</a>';
                $this->placeholders['{adq_reject}'] = $plain_text ? __( 'Reject', 'woocommerce-quotation' ) . '(' . $base_url . '&adq_action=accept)' : '<a href="'.$base_url.'&adq_action=reject">'.__( 'Reject', 'woocommerce-quotation' ).'</a>';

                ob_start();
                WC_Adq()->modules['contact-form']->adq_wpcf7_email_order_meta( $this->object, false, $plain_text);
                $adq_cf7 = ob_get_clean();
                $this->placeholders['{adq_cf7}'] = $adq_cf7 ? $adq_cf7 : '';

                add_filter('woocommerce_order_shipping_to_display', array($this, 'adq_shipping_to_display'), 10, 2);
                ob_start();
                $template_dir = $plain_text ? 'plain/adq-request-list.php' : 'adq-request-list.php';
                adq_get_template( $template_dir, array(
                    'order' 		    => $this->object,
                    'sent_to_admin'     => false,
                    'plain_text'        => $plain_text,
                    'is_request_email'  => $this->is_request_email
                ));
                $this->placeholders['{adq_request_list}'] = ob_get_clean();
                remove_filter('woocommerce_order_shipping_to_display', array($this, 'adq_shipping_to_display'));

                ob_start();
                do_action( 'woocommerce_email_customer_details', $this->object, false, $plain_text );
                $this->placeholders['{adq_address}'] = ob_get_clean();
            }

            if ( ! $this->is_enabled() || ! $this->get_recipient() ) {
                return;
            }

            $this->send( $this->get_recipient(), $this->get_subject(), $this->get_content(), $this->get_headers(), $this->get_attachments() );
        }

        function get_content_html() 
        {
            $content = apply_filters( 'adq_email_body_' . $this->id, $this->format_string( $this->get_option( 'content' ) ), $this->object );

            ob_start();
            adq_get_template( $this->template_html, array(
                'order' 		=> $this->object,
                'email_heading' => $this->get_heading(),
                'email_content' => $content,
                'sent_to_admin' => false,
                'plain_text'    => false
            ) );
            return ob_get_clean();
        }

        function get_content_plain() 
        {
            $content = apply_filters( 'adq_email_body_' . $this->id, $this->format_string( $this->get_option( 'content' ) ), $this->object );

            ob_start();
            adq_get_template( $this->template_plain, array(
                'order' 		=> $this->object,
                'email_heading' => $this->get_heading(),
                'email_content' => $content,
                'sent_to_admin' => false,
                'plain_text'    => true
            ) );
            return ob_get_clean();
        }

        function adq_shipping_to_display($shipping, $order)
        {
            if ( $this->is_request_email && get_option('adq_hide_shipping_costs') == 'yes' ) {
                if ( 0 < (float) $order->get_shipping_total() ) {

                    $shipping = apply_filters( 'woocommerce_order_shipping_to_display_shipped_via', '&nbsp;<span class="shipped_via">' . sprintf( __( 'via %s', 'woocommerce' ), $order->get_shipping_method() ) . '</span>', $order );

                } elseif ( $order->get_shipping_method() ) {

                    $shipping = $order->get_shipping_method();

                } else {

                    $shipping = __( 'Free!', 'woocommerce' );

                }
            }
            return $shipping;
        }
    }
    
}
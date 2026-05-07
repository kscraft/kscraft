<?php
/**
 * WooCommerce General Settings
 *
 * @author      Aldaba Digital
 * @category    Admin
 * @package     woocommerce-quotation/classes/
 * @version     2.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'ADQ_Sections_Options' ) ) :

/**
 * ADQ_Sections_Options
 */
class ADQ_Sections_Options extends WC_Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {

		$this->id    = 'options';
		$this->label = __( 'Options', 'woocommerce-quotation' );
		
		add_action( 'woocommerce_quotation_' . $this->id, array( $this, 'output' ) );
        add_action( 'woocommerce_quotation_save_' . $this->id, array( $this, 'save' ) );
        add_action( 'woocommerce_admin_field_force_styles', array( $this, 'output_force_styles' ) );
        add_action( 'woocommerce_update_option', array( $this, 'update_option' ), 10, 1 );

        add_filter('woocommerce_admin_settings_sanitize_option_adq_force_styles', '__return_true');
	}

	/**
	 * Get settings array
	 *
	 * @return array
	 */
	public function get_settings() {
        $pages = get_pages();
        $all_pages = array();
        $default_pages = array();

        foreach ($pages as $page) {
            $all_pages[$page->ID] = $page->post_title;
            $page->post_name == 'quote-list' && $default_pages[] = (string) $page->ID;
        }

		$settings = array(

			array( 'title' => __( 'Options', 'woocommerce-quotation' ), 'type' => 'title', 'desc' => '', 'id' => 'adq_options' ),		

			array(
				'title'   => __( 'Enable guest request', 'woocommerce-quotation' ),
				'desc'    => __( 'Allow customers to request for a quote without creating an account', 'woocommerce-quotation' ),
				'id'      => 'adq_enable_guest_request',
				'default' => 'yes',
				'type'    => 'checkbox'
			),
                        array(
				'title'   => __( 'Display returning customer login reminder', 'woocommerce-quotation' ),
				'desc'    => __( 'Enabled', 'woocommerce-quotation' ),
				'id'      => 'adq_enable_login_reminder',
				'default' => 'yes',
				'type'    => 'checkbox'
			),  
                        array(
				'title'   => __( 'Enable registration on QuoteList page', 'woocommerce-quotation' ),
				'desc'    => __( 'Enabled', 'woocommerce-quotation' ),
				'id'      => 'adq_enable_registration',
				'default' => 'yes',
				'type'    => 'checkbox'
			),
                        array(
				'title'   => __( 'Default validity date:', 'woocommerce-quotation' ),
				'desc'    => __( 'Days before proposal expires', 'woocommerce-quotation' ),
				'id'      => 'adq_proposal_validity',
				'default' => '15',
				'type'    => 'text',
                                'autoload' => false
			),
                        array(
				'title'   => __( 'Default reminder date:', 'woocommerce-quotation' ),
				'desc'    => __( 'Days before reminder mail is send', 'woocommerce-quotation' ),
				'id'      => 'adq_proposal_reminder',
				'default' => '1',
				'type'    => 'text',
                                'autoload' => false
			),
                        array(
				'title'   => __( 'Enable pay option', 'woocommerce-quotation' ),
				'desc'    => __( 'Enable pay link in my account page and email', 'woocommerce-quotation' ),
				'id'      => 'adq_enable_pay_button',
				'default' => 'yes',
				'type'    => 'checkbox'
			),

            array(
                'title'     => __( 'Enable payment for out-of-stock products', 'woocommerce-quotation' ),
                'desc'      =>  __( 'Enabled', 'woocommerce-quotation' ),
                'id'        => 'adq_enable_payment_outofstock',
                'type'      => 'checkbox',
                'desc_tip'  => version_compare( WC_VERSION, '3.5', '<' ) ? '' : __( 'Applicable for products that do not manage the stock and are out of stock. For all other cases, configure the \'backorders\' option in the product inventory configuration', 'woocommerce-quotation' )
            ),
                        array(
				'title'   => __( 'Enable discounts', 'woocommerce-quotation' ),
				'desc'    => __( 'Show original product prices with applied discounts in proposals', 'woocommerce-quotation' ),
				'id'      => 'adq_display_discount',
				'default' => 'no',
				'type'    => 'checkbox'
			),
                        array(
				'title'   => __( 'After add to quote', 'woocommerce-quotation' ),
				'desc'    => __( 'After Add to Quote', 'woocommerce-quotation' ),
				'id'      => 'adq_redirect_quote_page',
				'default' => 'yes',
				'type'    => 'radio',
				'options' => array(
					'yes'   => __( 'Redirect to quote list page', 'woocommerce-quotation' ),					
					'no'    => __( 'Show notice', 'woocommerce-quotation' ),
                                        'show'  => __( 'Show notice under quote button', 'woocommerce-quotation' ),
				),
				'autoload'        => false,
				'desc_tip'        =>  true,
				'show_if_checked' => 'option',
			),
                        /*** DEPRECATED since 2.4.0 ***/  
                        /*
                        array(
				'title'   => __( 'Redirect to payment when proposal is accepted', 'woocommerce-quotation' ),
				'desc'    => __( 'Redirect', 'woocommerce-quotation' ),
				'id'      => 'adq_redirect_payment',
				'default' => 'yes',
				'type'    => 'checkbox'
			),*/
                        /* SINCE 2.4.0 */
                        array(
				'title'   => __( 'After accepting a proposal', 'woocommerce-quotation' ),
				'desc'    => __( 'Action to take when a customer accepts the proposal', 'woocommerce-quotation' ),
				'id'      => 'adq_redirect_payment',
				'default' => 'yes',
				'type'    => 'radio',
				'options' => array(
					'yes'   => __( 'Redirect to payment', 'woocommerce-quotation' ),					
					'no'    => __( 'Redirect to my account', 'woocommerce-quotation' ),
                                        'custom'  => __( 'Custom redirect', 'woocommerce-quotation' ),
				),
				'autoload'        => false,
				'desc_tip'        =>  true,
				'show_if_checked' => 'option',
			),
                        array(
				'title'   => __( 'Custom redirect', 'woocommerce-quotation' ),
				'desc'    => __( 'Custom URL to redirect after accepting a proposal', 'woocommerce-quotation' ),
				'id'      => 'adq_url_redirect_payment',
				'default' => '',
				'type'    => 'text',
                                'autoload' => false
			),
                    
                        array(
				'title'   => __( 'Custom URL to redirect after submitting a quote', 'woocommerce-quotation' ),
				'desc'    => __( 'Leave blank to keep the default redirection', 'woocommerce-quotation' ),
				'id'      => 'adq_redirect_after_quote',
				'default' => '',
				'type'    => 'text',
                                'autoload' => false
			),
                        array(
				'title'   => __( 'Automatic proposal', 'woocommerce-quotation' ),
				'desc'    => __( 'Create automatic proposal using Woocommerce product prices', 'woocommerce-quotation' ),
				'id'      => 'adq_automatic_proposal',
				'default' => 'no',
				'type'    => 'checkbox'
			),
                        array(
				'title'   => __( 'Enable coupons', 'woocommerce-quotation' ),
				'desc'    => __( 'Show coupons on quote list page', 'woocommerce-quotation' ),
				'id'      => 'adq_coupons_enabled',
				'default' => 'yes',
				'type'    => 'checkbox'
			),
                        array(
				'title'   => __( 'Ajax error tolerance', 'woocommerce-quotation' ),
				'desc'    => __( 'Enabled', 'woocommerce-quotation' ),
				'id'      => 'adq_ajax_error_tolerance',
				'default' => 'yes',
				'type'    => 'checkbox'
			),
                );
                
                if( wc_get_page_id( 'terms' ) > 0 ) {
                        $settings[] =
                                array(
                                        'title'   => __( 'Show Terms', 'woocommerce-quotation' ),
                                        'desc'    => __( 'Show Terms & Conditions on Quote List Page', 'woocommerce-quotation' ),
                                        'id'      => 'adq_show_terms',
                                        'default' => 'no',
                                        'type'    => 'checkbox'
                                );
                }
                
                $settings = array_merge($settings, array (
                        array(
				'title'   => __( 'Disable Checkout Hooks:', 'woocommerce-quotation' ),
				'desc'    => __( 'Disable some checkout hooks to avoid some plugins actions on Quote List page. <span class="description"> Uncheck it if you are using required fields in your Contact Form 7</span>', 'woocommerce-quotation' ),
				'id'      => 'adq_disable_checkout_hooks',
				'default' => 'no',
				'type'    => 'checkbox'
			),
            array(
                'title'             => __( 'Force loading of WooCommerce styles', 'woocommerce-quotation' ),
                'desc'              => __( 'Enabled', 'woocommerce-quotation' ),
                'id'                => 'adq_force_styles',
                'default'           => 'no',
                'default_pages'     => $default_pages,
                'options'           => $all_pages,
                'type'              => 'force_styles',
                'desc_tip'          => __('Enable this option to force the loading of WooCommerce styles in all pages', 'woocommerce-quotation')
            ),
            array(
            	'title' 			=> __( 'Location of custom fields into PDF invoice', 'woocommerce-quotation' ),
            	'desc' 				=> is_plugin_active( 'woocommerce-pdf-invoices-packing-slips/woocommerce-pdf-invoices-packingslips.php' ) ? '' : __( 'WooCommerce PDF Invoices & Packing Slips plugin is required', 'woocommerce-quotation' ),
            	'desc_tip'			=> true,
            	'id' 				=> 'location_custom_fields',
            	'default' 			=> 'after_order_details',
            	'type' 				=> 'radio',
            	'options' 			=> array(
            		'after_order_details' 	=> __( 'Display Quotation info after the order details table', 'woocommerce-quotation' ), 
            		'before_order_details' 	=> __( 'Display Quotation info before the order details table', 'woocommerce-quotation' ),
            		'after_order_data' 		=> __( 'Display Quotation info after the order data', 'woocommerce-quotation' )
            	),
            	'custom_attributes' => is_plugin_active( 'woocommerce-pdf-invoices-packing-slips/woocommerce-pdf-invoices-packingslips.php' ) ? array() : array('disabled' => ''),
            ),
            array(
                'title'             => __( 'Reset general settings', 'woocommerce-quotation' ),
                'desc'              => '',
                'id'                => 'adq_reset_general_settings',
                'type'              => 'button',
                'text'              => __( 'Reset', 'woocommerce-quotation' ),
                'custom_attributes' => array(
                    'data-confirm'          => '',
                    'data-confirm-message'  => __( 'Are you sure to reset the settings of general options?', 'woocommerce-quotation' )
                )
            )
        ) );
        
        $settings = apply_filters( 'woocommerce_adq_'.$this->id.'_settings', $settings);

        $settings[] = array( 'type' => 'sectionend', 'id' => 'pricing_options' );                
                        
        return apply_filters( 'woocommerce_get_settings_' . $this->id, $settings );
    }
    
    public function output_force_styles($value)
    { 
        $option_all     = get_option( $value['id'] . '_all', $value['default'] );
        $option_pages   = get_option( $value['id'] . '_pages', $value['default_pages'] );

        $field_description = WC_Admin_Settings::get_field_description( $value );
        $description       = $field_description['description'];
        $tooltip_html      = $field_description['tooltip_html'];

        $custom_attributes = array();

        if ( ! empty( $value['custom_attributes'] ) && is_array( $value['custom_attributes'] ) ) {
            foreach ( $value['custom_attributes'] as $attribute => $attribute_value ) {
                $custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $attribute_value ) . '"';
            }
        }
        ?>
        <tr valign="top">
            <th scope="row" class="titledesc">
                <label for="<?php echo esc_attr( $value['id'] ); ?>"><?php echo esc_html( $value['title'] ); ?> <?php echo $tooltip_html; // WPCS: XSS ok. ?></label>
            </th>
            <td class="forminp forminp-multiselect">
                <label for="<?php echo esc_attr( $value['id'] ) . '_all'; ?>">
                    <input
                        name="<?php echo esc_attr( $value['id'] ) . '_all'; ?>"
                        id="<?php echo esc_attr( $value['id'] ) . '_all'; ?>"
                        type="checkbox"
                        class="<?php echo esc_attr( isset( $value['class'] ) ? $value['class'] : '' ); ?>"
                        value="yes"
                        data-force-styles-checkbox
                        <?php checked( $option_all, 'yes' ); ?>
                        <?php echo implode( ' ', $custom_attributes ); // WPCS: XSS ok. ?>
                    /><?php echo $description; // WPCS: XSS ok. ?>                    
                </label><br>
                <div>
                    <select
                        name="<?php echo esc_attr( $value['id'] ) . '_pages[]'; ?>"
                        id="<?php echo esc_attr( $value['id'] ) . '_pages'; ?>"
                        style="<?php echo esc_attr( $value['css'] ); ?>"
                        class="<?php echo esc_attr( $value['class'] ) . ' wc-enhanced-select'; ?>"
                        data-force-styles-select
                        <?php echo implode( ' ', $custom_attributes ); // WPCS: XSS ok. ?>
                        <?php echo 'multiple="multiple"' ?>
                        >
                        <?php
                        foreach ( $value['options'] as $key => $val ) {
                            ?>
                            <option value="<?php echo esc_attr( $key ); ?>"
                                <?php

                                if ( is_array( $option_pages ) ) {
                                    selected( in_array( (string) $key, $option_pages, true ), true );
                                }

                            ?>
                            >
                            <?php echo esc_html( $val ); ?></option>
                            <?php
                        }
                        ?>
                    </select> <?php echo __( 'Choose in what pages that you want to load WC styles', 'woocommerce-quotation' ); // WPCS: XSS ok. ?>
                </div>
            </td>
        </tr>
        <?php
    }

    public function update_option($option)
    {
        if ( $option['id'] == 'adq_force_styles' ) {
            $autoload = isset( $option['autoload'] ) ? (bool) $option['autoload'] : true;

            update_option('adq_force_styles_all', isset( $_REQUEST['adq_force_styles_all'] ) ? $_REQUEST['adq_force_styles_all'] : 'no', $autoload);
            update_option('adq_force_styles_pages', isset( $_REQUEST['adq_force_styles_pages'] ) ? $_REQUEST['adq_force_styles_pages'] : array(), $autoload);
        }
    }

	/**
	 * Save settings
	 */
	public function save() {
		$settings = $this->get_settings();

		if ( isset($_POST['adq_reset_general_settings'] ) ) {
            $data = array();

            foreach ($settings as $key => $value) {
                if ( !isset($value['id']) || !isset($value['default']) ) continue;
                $data[$value['id']] = $value['default'];
            }

            WC_Admin_Settings::save_fields( $settings, $data );
        } else {
            WC_Admin_Settings::save_fields( $settings );
        }
    }

}

endif;

return new ADQ_Sections_Options();

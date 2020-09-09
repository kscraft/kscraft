<?php
/**
 * WooCommerce PDF Invoices & Packing Slips plugin compatibility
 *
 * @author      Aldaba Digital
 * @category    Admin
 * @package     woocommerce-quotation/modules/
 * @version     2.4.0
 */

use WPO\WC\PDF_Invoices\Documents\Order_Document_Methods;
use WPO\WC\PDF_Invoices\Documents\Sequential_Number_Store;
use WPO\WC\PDF_Invoices\Compatibility\WC_Core as WCX;
use WPO\WC\PDF_Invoices\Compatibility\Order as WCX_Order;
use WPO\WC\PDF_Invoices\Compatibility\Product as WCX_Product;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'ADQ_PDF_Invoices' ) ) :

	class ADQ_PDF_Invoices extends Order_Document_Methods {
        protected static $_instance = null;

		public function __construct( $order = 0 ) {

			add_filter( 'wpo_wcpdf_adq_proforma_title', array( $this, 'adq_wcpdf_adq_proforma_title' ), 999, 2 );
			add_filter( 'wpo_wcpdf_template_file', array( $this, 'adq_wpo_wcpdf_template_file' ), 10, 3 );
			add_filter( 'wpo_wcpdf_woocommerce_totals', array( $this, 'adq_wcpdf_woocommerce_totals' ), 10, 2 );

			$this->type  = 'adq_proforma';
			$this->title = __( 'Proforma by Quotation', 'woocommerce-quotation' );

			parent::__construct( $order );
        }
        
        public static function instance()
        {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

		public function get_filename( $context = 'download', $args = array() ) {

			$filename = isset( $this->settings['filename'] ) ? $this->get_settings_text( 'filename', false, false ) : '';
			if ( $filename ) {

				$filename = $this->replace_placeholder( $filename ) . '.pdf';

			} else {

				$filename = $this->get_title() . '-' . $this->get_number()->get_formatted() . '.pdf';

			}

			// Filter filename
			$order_ids = isset( $args['order_ids'] ) ? $args['order_ids'] : array( $this->order_id );
			$filename  = apply_filters( 'wpo_wcpdf_filename', $filename, $this->get_type(), $order_ids, $context );

			// sanitize filename (after filters to prevent human errors)!
			return sanitize_file_name( $filename );
		}

		private function replace_placeholder( $text, $document = null ) {
			! is_object( $document ) && $document = $this;

			// make an index of placeholders used in the text
			preg_match_all( '/\{\{.*?\}\}/', $text, $placeholders_used );
			$placeholders_used = array_shift( $placeholders_used ); // we only need the first match set

			// loop through placeholders and make replacements
			foreach ( $placeholders_used as $placeholder ) {
				$placeholder_clean = trim( $placeholder, '{{}}' );

				$replacement = '';
				switch ( $placeholder_clean ) {
					case 'order_status':						
						$order_statuses = wc_get_order_statuses();
						if ( ! isset( $order_statuses['wc-request'] ) ) {
							$order_statuses = array_merge( $order_statuses, adq_get_order_statuses() );
						}
						$replacement    = is_object( $document->order ) ? $order_statuses[ "wc-{$document->order->get_status()}" ] : '';
						break;
					case 'document_title':
						$replacement = $document->get_title();
						break;
					default:
						break;
				}
				if ( ! class_exists( 'WooCommerce_PDF_IPS_Pro' ) ) {
					switch ( $placeholder_clean ) {
						case 'document_number':
							if ( $number = $document->get_number() ) {
								$replacement = $number->get_formatted();
							}
							break;
						default:
							break;
					}
				}
				if ( ! empty( $replacement ) ) {
					$text = str_replace( $placeholder, $replacement, $text );
					continue;
				}
			}

			return $text;
		}


		function adq_wcpdf_adq_proforma_title( $title, $document = null ) {

			if ( isset($_GET['page']) && $_GET['page'] == 'wpo_wcpdf_options_page' ) {
				$title = __( 'Proforma by Quotation', 'woocommerce-quotation' );
			} else {
				$title = isset( $this->settings['title'] ) ? $this->get_settings_text( 'title', false, false ) : '';
				$title = $this->replace_placeholder( $title, $document );
			}

			return $title;
		}

		function adq_wcpdf_woocommerce_totals( $totals, $order ) {

			if ( ( $order->get_status() == 'proposal' || $order->get_status() == 'request' ) ) {
					$totals['order_total']['value'] = __( 'Not yet proposed', 'woocommerce-quotation' );
			}

				return $totals;
		}

		function adq_wpo_wcpdf_template_file( $file_path, $template_type, $order ) {
			$file_path_array = explode( '/', $file_path );
			$file            = end( $file_path_array );

			if ( $file == 'adq_proforma.php' ) {
				$file_path = dirname( __FILE__ ) . '/templates/' . $file;
			}

			return $file_path;
		}

		/**
		 * get all emails registered in WooCommerce that belong to Quotation
		 *
		 * @return array   $emails       list of all email ids/slugs and names
		 */
		public function get_adq_emails() {
			// get emails from WooCommerce
			global $woocommerce;
			$mailer    = $woocommerce->mailer();
			$wc_emails = $mailer->get_emails();

			$emails = array();
			foreach ( $wc_emails as $class => $email ) {
				if ( $email instanceof ADQ_Email ) {
					$emails[ $email->id ] = $email->title;
				}
			}

			return apply_filters( 'wpo_wcpdf_adq_emails', $emails );
		}

		public function get_title() {
			// override/not using $this->title to allow for language switching!
			return apply_filters( "wpo_wcpdf_{$this->slug}_title", __( 'Proforma Invoice by Quotation', 'woocommerce-quotation' ), $this );
		}

		public function init() {
			$this->set_date( current_time( 'timestamp', true ) );
			$this->init_number();
		}

		public function init_number() {
			// Determine numbering system (main invoice number or separate document sequence)
			$next_number_store = isset( $this->settings['number_sequence'] ) ? $this->settings['number_sequence'] : "{$this->slug}_number";
			$number_store      = new Sequential_Number_Store( $next_number_store );
			// reset invoice number yearly
			if ( isset( $this->settings['reset_number_yearly'] ) ) {
				$current_year     = date( 'Y' );
				$last_number_year = $number_store->get_last_date( 'Y' );
				// check if we need to reset
				if ( $current_year != $last_number_year ) {
					$number_store->set_next( 1 );
				}
			}

			$document_date   = $this->get_date();
			$document_number = $number_store->increment( $this->order_id, $document_date->date_i18n( 'Y-m-d H:i:s' ) );

			$this->set_number( $document_number );

			return $document_number;
		}

		public function get_settings( $latest = false ) {
			$common_settings   = WPO_WCPDF()->settings->get_common_document_settings();
			$document_settings = get_option( 'wpo_wcpdf_documents_settings_' . $this->get_type() );
			return (array) $document_settings + (array) $common_settings;
		}

		public function get_formatted_number( $document_type ) {
			if ( $number = $this->get_number( $document_type ) ) {
				return $formatted_number = $number->get_formatted();
			} else {
				return '';
			}
		}

		public function number( $document_type ) {
			echo $this->get_formatted_number( $document_type );
		}

		public function get_formatted_date( $document_type ) {
			if ( $date = $this->get_date( $document_type ) ) {
				return $date->date_i18n( apply_filters( 'wpo_wcpdf_date_format', wc_date_format(), $this ) );
			} else {
				return '';
			}
		}

		public function date( $document_type ) {
			echo $this->get_formatted_date( $document_type );
		}

		/**
		 * Initialise settings
		 */
		public function init_settings() {
			// Register settings.
			$page = $option_group = $option_name = 'wpo_wcpdf_documents_settings_adq_proforma';

			$settings_fields = array(
				array(
					'type'     => 'section',
					'id'       => 'adq_proforma',
					'title'    => '',
					'callback' => 'section',
				),
				array(
					'type'     => 'setting',
					'id'       => 'enabled',
					'title'    => __( 'Enable', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'enabled',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'title',
					'title'    => __( 'Document title', 'woocommerce_quotation' ),
					'callback' => 'i18n_wrap',
					'section'  => 'adq_proforma',
					'args'     => array(
						'callback'    => 'text_input',
						'size'        => '72',
						'option_name' => $option_name,
						'id'          => 'title',
						'placeholder' => $this->get_title(),
						'description' => __( 'Use the placeholder {{order_status}} to include the order status.', 'woocommerce_quotation' ),
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'filename',
					'title'    => __( 'PDF filename', 'woocommerce_quotation' ),
					'callback' => 'i18n_wrap',
					'section'  => 'adq_proforma',
					'args'     => array(
						'callback'    => 'text_input',
						'size'        => '72',
						'option_name' => $option_name,
						'id'          => 'filename',
						'placeholder' => '{{document_title}}-{{document_number}}',
						'description' => __( 'Leave empty to use default. Placeholders like {{document_title}}, {{order_status}}, {{document_number}} and {{order_number}} can be used to include document numbers in the filename.', 'woocommerce_quotation' ),
					),
				),
				array(
					'type'     => 'section',
					'id'       => 'adq_proforma',
					'title'    => '',
					'callback' => 'section',
				),
				array(
					'type'     => 'setting',
					'id'       => 'enabled',
					'title'    => __( 'Enable', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'enabled',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'attach_to_email_ids',
					'title'    => __( 'Attach to:', 'woocommerce-quotation' ),
					'callback' => 'multiple_checkboxes',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'attach_to_email_ids',
						'fields'      => $this->get_adq_emails(),
						'description' => ! is_writable( WPO_WCPDF()->main->get_tmp_path( 'attachments' ) ) ? '<span class="wpo-warning">' . sprintf( __( 'It looks like the temp folder (<code>%s</code>) is not writable, check the permissions for this folder! Without having write access to this folder, the plugin will not be able to email invoices.', 'woocommerce-quotation' ), WPO_WCPDF()->main->get_tmp_path( 'attachments' ) ) . '</span>' : '',
						'default'     => array_fill_keys( array_keys( $this->get_adq_emails() ), 1 ),
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'display_shipping_address',
					'title'    => __( 'Display shipping address', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'display_shipping_address',
						'description' => __( 'Display shipping address (in addition to the default billing address) if different from billing address', 'woocommerce-quotation' ),
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'display_email',
					'title'    => __( 'Display email address', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'display_email',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'display_phone',
					'title'    => __( 'Display phone number', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'display_phone',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'display_date',
					'title'    => __( 'Display proforma invoice date', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'display_date',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'display_number',
					'title'    => __( 'Display proforma invoice number', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'display_number',
						'default'     => 1,
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'number_sequence',
					'title'    => __( 'Number sequence', 'woocommerce-quotation' ),
					'callback' => 'radio_button',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'number_sequence',
						'options'     => array(
							'invoice_number'  => __( 'Main invoice numbering', 'woocommerce-quotation' ),
							'proforma_number' => __( 'Separate proforma numbering', 'woocommerce-quotation' ),
						),
						'default'     => 'proforma_number',
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'next_proforma_number',
					'title'    => __( 'Nxt proforma invoice number (without prefix/suffix etc.)', 'woocommerce-quotation' ),
					'callback' => 'next_number_edit',
					'section'  => 'adq_proforma',
					'args'     => array(
						'store'       => 'proforma_number',
						'size'        => '10',
						'description' => __( 'This is the number that will be used for the next document. By default, numbering starts from 1 and increases for every new document. Note that if you override this and set it lower than the current/highest number, this could create duplicate numbers!', 'woocommerce-quotation' ),
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'number_format',
					'title'    => __( 'Number format', 'woocommerce-quotation' ),
					'callback' => 'multiple_text_input',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'number_format',
						'fields'      => array(
							'prefix'  => array(
								'placeholder' => __( 'Prefix', 'woocommerce-quotation' ),
								'size'        => 20,
								'description' => __( 'to use the proforma invoice year and/or month, use [adq_proforma_year] or [adq_proforma_month] respectively', 'woocommerce-quotation' ),
							),
							'suffix'  => array(
								'placeholder' => __( 'Suffix', 'woocommerce-quotation' ),
								'size'        => 20,
								'description' => '',
							),
							'padding' => array(
								'placeholder' => __( 'Padding', 'woocommerce-quotation' ),
								'size'        => 20,
								'type'        => 'number',
								'description' => __( 'enter the number of digits here - enter "6" to display 42 as 000042', 'woocommerce-quotation' ),
							),
						),
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'reset_number_yearly',
					'title'    => __( 'Reset proforma invoice number yearly', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'reset_number_yearly',
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'my_account_buttons',
					'title'    => __( 'Allow My Account download', 'woocommerce-quotation' ),
					'callback' => 'select',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'my_account_buttons',
						'options'     => array(
							'no_invoice' => __( 'Only when the final invoice is not available', 'woocommerce-quotation' ),
							'available'  => __( 'Only when a proforma invoice is already created/emailed', 'woocommerce-quotation' ),
							'custom'     => __( 'Only for specific order statuses (define below)', 'woocommerce-quotation' ),
							'always'     => __( 'Always', 'woocommerce-quotation' ),
							'never'      => __( 'Never', 'woocommerce-quotation' ),
						),
						'default'     => 'no_invoice',
						'custom'      => array(
							'type' => 'multiple_checkboxes',
							'args' => array(
								'option_name' => $option_name,
								'id'          => 'my_account_restrict',
								'fields'      => $this->get_wc_order_status_list(),
							),
						),
					),
				),
				array(
					'type'     => 'setting',
					'id'       => 'disable_free',
					'title'    => __( 'Disable for free products', 'woocommerce-quotation' ),
					'callback' => 'checkbox',
					'section'  => 'adq_proforma',
					'args'     => array(
						'option_name' => $option_name,
						'id'          => 'disable_free',
						'description' => __( 'Disable automatic creation/attachment when only free products are ordered', 'woocommerce-quotation' ),
					),
				),
			);

			// allow plugins to alter settings fields
			$settings_fields = apply_filters( 'wpo_wcpdf_settings_fields_documents_adq_proforma', $settings_fields, $page, $option_group, $option_name );
			WPO_WCPDF()->settings->add_settings_fields( $settings_fields, $page, $option_group, $option_name );
			return;

		}

	}
endif;

return ADQ_PDF_Invoices::instance();

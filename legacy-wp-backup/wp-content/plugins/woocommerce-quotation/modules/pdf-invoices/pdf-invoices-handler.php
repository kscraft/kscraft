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
use WPO\WC\PDF_Invoices\Compatibility\WC_Core as WCX;
use WPO\WC\PDF_Invoices\Compatibility\Order as WCX_Order;
use WPO\WC\PDF_Invoices\Compatibility\Product as WCX_Product;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'ADQ_PDF_Invoices' ) ) :
    
    class ADQ_PDF_Invoices_Handler {
        
            public function __construct() {
                    
                    add_filter( 'wpo_wcpdf_document_classes', array( $this, 'adq_wcpdf_document_classes' ) );
                    add_filter( 'wpo_wcpdf_myaccount_actions', array( $this, 'my_account_button_visibility' ), 10, 2 );
                    add_filter( 'wpo_wcpdf_wc_emails', array( $this, 'adq_wpo_wcpdf_wc_emails' ) );
                    add_action( 'wpo_wcpdf_' . get_option( 'location_custom_fields' ), array( $this, 'adq_wcpdf_after_order_data' ), 10, 2 ); 
			}
			
			public function adq_wcpdf_document_classes( $documents )
			{
				$documents['ADQ_PDF_Invoices'] = include( 'pdf-invoices.php' );

				return $documents;
            }

            function adq_wcpdf_after_order_data ($template_type, $order) {
                
                    do_action( 'adq_email_proposal_after_header', $order, false, false );
            }

            public function adq_wpo_wcpdf_wc_emails( $emails )
            {
                if ( ( isset($_GET['page']) && $_GET['page'] == 'wpo_wcpdf_options_page' ) && ( isset( $_GET['tab'] ) && $_GET['tab'] == 'documents' ) && ( isset( $_GET['section'] ) && $_GET['section'] == 'invoice' ) ) {
                    $adq_emails = get_option( 'adq_emails' );

                    foreach ( $emails as $key => $value ) {
                        if ( in_array( $key, $adq_emails ) ) {
                            unset( $emails[$key] );
                        }
                    }
                    return $emails;
                }

                return $emails;
            }

            /**
             * Display download buttons (ADQ Proforma) on My Account page
             */
            public function my_account_button_visibility( $actions, $order ) 
            {
                $proforma = wcpdf_get_document( 'adq_proforma', $order );
                $order_id = WCX_Order::get_id( $order );
        
                if ( $proforma->is_enabled() ) {
                    // check my account button settings
                    $button_setting = $proforma->get_setting('my_account_buttons', 'no_invoice');
                    switch ($button_setting) {
                        case 'no_invoice':
                            $proforma_allowed = isset($actions['invoice']) ? false: true;
                            break;
                        case 'available':
                            $proforma_allowed = $proforma->exists();
                            break;
                        case 'always':
                            $proforma_allowed = true;
                            break;
                        case 'never':
                            $proforma_allowed = false;
                            break;
                        case 'custom':
                            $allowed_statuses = $button_setting = $proforma->get_setting('my_account_restrict', array());
                            if ( !empty( $allowed_statuses ) && in_array( WCX_Order::get_status( $order ), array_keys( $allowed_statuses ) ) ) {
                                $proforma_allowed = true;
                            } else {
                                $proforma_allowed = false;
                            }
                            break;
                    }
        
                    $document_title = array_filter( $proforma->get_setting( 'title', array() ) );
                    if ( !empty($document_title) ) {
                        $button_text = sprintf ( __( 'Download %s (PDF)', 'woocommerce-quotation' ), $proforma->get_title() );
                    } else {
                        $button_text =  __( 'Download Proforma Invoice (PDF)', 'woocommerce-quotation' );
                    }
        
                    if ($proforma_allowed) {
                        $actions['proforma'] = array(
                            'url'  => wp_nonce_url( admin_url( 'admin-ajax.php?action=generate_wpo_wcpdf&template_type=adq_proforma&order_ids=' . $order_id . '&my-account' ), 'generate_wpo_wcpdf' ),
                            'name' => apply_filters( 'wpo_wcpdf_myaccount_adq_proforma_button', $button_text, $proforma ),
                        );
                    }
                }
        
                return $actions;
            }
            
}
endif;

return new ADQ_PDF_Invoices_Handler();
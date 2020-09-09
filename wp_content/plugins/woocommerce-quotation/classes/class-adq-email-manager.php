<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'ADQ_Email_Manager' ) ) {

	/**
	 * Class for handling the email class
	 *
	 * @class       ADQ_Email_Manager
	 * @package     woocommerce-quotation/classes/email
	 * @author      Aldaba Digital <aldabadigital@gmail.com>
	 * @author      Roberto Adnier Nuñez Farfán <adnier87@gmail.com>
	 * @version     1.0.0
	 * @since       3.0.0
	 */

	class ADQ_Email_Manager {


		protected static $_instance = null;

		function __construct() {
			add_filter( 'woocommerce_get_sections_email', array( $this, 'add_new_email_section' ) );
			add_filter( 'woocommerce_email_classes', array( $this, 'enqueue_emails' ) );
			add_filter( 'woocommerce_order_actions', array( $this, 'adq_order_actions' ) );
			add_filter( 'adq_order_statuses_options', array( $this, 'add_order_note' ) );
			add_filter( 'woocommerce_email_settings', array( $this, 'adq_email_settings' ) );
			add_filter( 'woocommerce_save_settings_email', array( $this, 'adq_save_settings_email' ) );

			add_action( 'woocommerce_order_status_changed', array( $this, 'adq_order_status_changed' ), 10, 3 );
			add_action( 'woocommerce_settings_email', array( $this, 'get_settings_new_email' ) );
			// Add additional information on proposal emails
			add_action( 'adq_email_proposal_after_header', array( $this, 'adq_add_meta_proposal' ), 10, 3 );

			add_action( 'adq_init', array( $this, 'get_settings_new_email' ) );
			add_action( 'woocommerce_order_action_resend_proposal_email', array( $this, 'do_order_action' ) );
			add_action( 'woocommerce_order_action_resend_proposal_reminder', array( $this, 'do_order_action' ) );
			add_action( 'wp_ajax_verify_id', array( $this, 'verify_id' ) );
			add_action( 'wp_ajax_nopriv_verify_id', array( $this, 'verify_id' ) );
			// Override Header and footer
			add_action( 'adq_email_header', array( $this, 'adq_email_header' ) );
			add_action( 'adq_email_footer', array( $this, 'adq_email_footer' ) );
		}

		/**
		 * Main ADQ_Email_Manager Instance.
		 *
		 * Ensures only one instance of ADQ_Email_Manager is loaded or can be loaded.
		 *
		 * @return ADQ_Email_Manager
		 */

		public static function instance() {
			if ( is_null( self::$_instance ) ) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		/**
		 * Add Added note option for order statuses
		 *
		 * @param array $statuses
		 * @return array
		 */

		function add_order_note( $statuses ) {
			$statuses['added-note'] = __( 'Added note', 'woocommerce-quotation' );

			return $statuses;
		}

		function adq_add_meta_proposal( $order, $sent_to_admin = false, $plain_text = false ) {
			$meta = array();

			$order_id = ADQ_OrderHandler::get_id( $order );

			$validity_date = get_post_meta( $order_id, '_validity_date', true );
			if ( $validity_date ) {
					$i                   = count( $meta );
					$meta[ $i ]['label'] = __( 'This proposal is valid until', 'woocommerce-quotation' );
					$meta[ $i ]['meta']  = date_i18n( get_option( 'date_format' ), strtotime( $validity_date ) );
			}

			$downloadable_files = get_post_meta( $order_id, '_attached_files', true );
			if ( is_array( $downloadable_files ) && count( $downloadable_files ) > 0 ) {
				foreach ( $downloadable_files as $key => $file ) {
						$i                   = count( $meta );
						$meta[ $i ]['label'] = __( 'Attached file', 'woocommerce-quotation' );
						$meta[ $i ]['meta']  = '<a href="' . get_home_url() . '?order_id=' . $order_id . '&adq_download_file=' . $key . '" title="' . $file['name'] . '">' . $file['name'] . '</a>';
				}
			}

			$additional_info = get_post_meta( $order_id, '_adq_additional_info', true );
			if ( $additional_info && $additional_info != '' ) {
					$i                   = count( $meta );
					$meta[ $i ]['label'] = __( 'Additional information', 'woocommerce-quotation' );
					$meta[ $i ]['meta']  = $additional_info;
			}

			if ( $plain_text ) {
				foreach ( $meta as $value ) {
					if ( $value ) {
							echo $value['label'] . ': ' . $value['meta'] . "\n";
					}
				}
			} else {

				foreach ( $meta as $value ) {
					if ( $value ) {
							echo '<p><strong>' . $value['label'] . ':</strong> ' . $value['meta'] . '</p>';
					}
				}
			}
		}

		function do_order_action( $order ) {
			$status = $order->get_status();

			switch ( $status ) {
				case 'proposal-sent':
				case 'proposal-accepted':
				case 'proposal-rejected':
					$this->adq_order_status_changed( $order->get_id(), '', $status );
					break;
			}
		}

		function adq_save_settings_email() {
			if ( isset( $_POST['adq_reset_email'] ) ) {
				WC_Adq()->AdqEmail->create_default_emails( true );
				return false;
			} else {
				return ! empty( $_POST );
			}
		}

		/**
		 * Add new order actions for order edit screen at backend
		 *
		 * @param array $order_actions
		 * @return array
		 */

		function adq_order_actions( $order_actions ) {
			global $theorder, $post;

			if ( ! empty( $theorder ) ) {
				$order  = $theorder;
				$status = $order->get_status();
			} elseif ( $order = wc_get_order( $post ) ) {
				$status = $order->get_status();
			}

			switch ( $order->get_status() ) {
				case 'proposal-sent':
					$new_order_actions = array(
						'resend_proposal_email'    => __( 'Resend proposal email', 'woocommerce-quotation' ),
						'resend_proposal_reminder' => __( 'Resend proposal reminder', 'woocommerce-quotation' ),
					);
					break;
				case 'proposal-accepted':
				case 'proposal-rejected':
					$new_order_actions = array(
						'resend_proposal_email' => __( 'Resend proposal email', 'woocommerce-quotation' ),
					);
					break;
				default:
					$new_order_actions = array();
			};
			$order_actions = array_merge( $new_order_actions, $order_actions );

			return $order_actions;
		}

		/**
		 * Add a section in WooCommerce email tab for creating new email templates
		 *
		 * @param array $sections
		 * @return array
		 */

		function add_new_email_section( $sections ) {
			$sections['adq_new_email'] = __( 'New email', 'woocommerce-quotation' );

			return $sections;
		}

		function enqueue_emails( $emails ) {
			require_once dirname( __FILE__ ) . '/class-adq-email.php';

			$email_ids = get_option( 'adq_emails' );
			foreach ( $email_ids as $key => $value ) {
				$emails[ $value ] = new ADQ_Email( $value );
			}

			return $emails;
		}

		function adq_order_status_changed( $post_id, $old_status, $new_status ) {
			$email_templates = WC()->mailer()->get_emails();
			$email_ids       = get_option( 'adq_emails' );
			foreach ( $email_templates as $key => $value ) {
				if ( in_array( $key, $email_ids ) && $email_templates[ $key ]->get_option( 'order_status' ) == $new_status && $email_templates[ $key ]->get_option( 'is_reminder' ) != 'yes' ) :
					$email_templates[ $key ]->trigger( $post_id );
				endif;
			}
		}

		function get_settings_new_email() {
            global $current_section;
            
            //if this class doesn't exist is due to WC->mailer() was called before for another plugin
            if ( ! class_exists( 'ADQ_Email' ) ) {
                $emails = WC()->mailer()->get_emails();
                WC()->mailer()->emails = self::enqueue_emails( $emails );
            } 

			$email = new ADQ_Email();
			if ( $current_section == 'adq_new_email' ) {
				$email->admin_options();
			}
		}

		/**
		 * Verify if the id is being used
		 *
		 * @return void
		 */

		function verify_id() {
			$email_id  = isset( $_GET['email_id'] ) ? $_GET['email_id'] : '';
			$email_ids = get_option( 'adq_emails' );
			$result    = array();

			if ( $email_id ) :
				$result['has_email'] = ( in_array( $email_id, $email_ids ) && $email_id != $_GET['current_section'] );
			else :
				$result['error'] = 'id: ' . $email_id . ' is invalid';
			endif;

			echo json_encode( $result );
			die();
		}

		function adq_email_header( $email_heading ) {
			adq_get_template( 'emails/email-header.php', array( 'email_heading' => $email_heading ) );
		}

		function adq_email_footer() {
			adq_get_template( 'emails/email-footer.php' );
		}

		function adq_email_settings( $settings ) {
			return array_merge(
				$settings,
				array(
					array(
						'title' => __( 'Quotation email options', 'woocommerce-quotation' ),
						'type'  => 'title',
						'desc'  => '',
						'id'    => 'adq_email_options',
					),

					array(
						'title'             => __( 'Reset Quotation emails', 'woocommerce-quotation' ),
						'desc'              => __( 'Reset all emails related to the plugin WooCommerce Quotation and remove the customized ones.', 'woocommerce-quotation' ),
						'desc_tip'          => true,
						'id'                => 'adq_reset_email',
						'type'              => 'button',
						'text'              => __( 'Reset emails', 'woocommerce-quotation' ),
						'custom_attributes' => array(
							'data-confirm'         => '',
							'data-confirm-message' => __( 'Are you sure to reset the emails?', 'woocommerce-quotation' ),
						),
					),

					array(
						'type' => 'sectionend',
						'id'   => 'adq_email_options',
					),
				)
			);
		}

		private function remove_all_emails() {
			$email_templates = WC()->mailer()->get_emails();
			$email_ids       = get_option( 'adq_emails' );

			foreach ( $email_ids as $key => $value ) {
				delete_option( $email_templates[ $value ]->get_option_key() );
			};

			delete_option( 'adq_emails' );
		}

		/**
		 * Create default emails
		 *
		 * @param bool $remove_emails Flag for removing previuos emails
		 * @return void
		 */

		function create_default_emails( $remove_emails = false ) {
			if ( $remove_emails ) {
				self::remove_all_emails();
			}

			$deafult_emails = array(
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_admin_new_quote',
					'title'        => __( 'New requests (admin)', 'woocommerce-quotation' ),
					'description'  => __( 'This type of email is sent to the admin when a new quote request is received.', 'woocommerce-quotation' ),
					'heading'      => __( 'You have a new quote request', 'woocommerce-quotation' ),
					'subject'      => __( '{site_title} received a quote request on {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>You have received a quote request from %1$s. The request is as follows:</p><p></p><p>Request: %2$s (%3$s)</p><p> %4$s </p><p> %5$s </p><p></p> <p>%6$s</p><p>Customer comments:</p><p> %7$s </p>', 'woocommerce-quotation' ), '{adq_customer}', '{order_number}', '{order_date}', '{adq_cf7}', '{adq_request_list}', '{adq_address}', '{adq_order_comments}' ),
					'email_type'   => 'html',
					'send_to'      => 'admin',
					'order_status' => 'request',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_admin_note',
					'title'        => __( 'Customer note (admin)', 'woocommerce-quotation' ),
					'description'  => __( 'This type of email is sent when a customer add a note to an order.', 'woocommerce-quotation' ),
					'heading'      => __( 'A customer has added a note', 'woocommerce-quotation' ),
					'subject'      => __( 'A customer has added a note to the order from {site_title} on {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello, a customer has added a new note:</p><p>%1$s</p><p></p><p>Request: %2$s (%3$s)</p><p> %4$s</p><p> %5$s</p>', 'woocommerce-quotation' ), '{adq_order_note}', '{order_number}', '{order_date}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'admin',
					'order_status' => 'added-note',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_admin_proposal_ko',
					'title'        => __( 'Admin proposal declined', 'woocommerce-quotation' ),
					'description'  => __( 'Send email confirming the declination of the proposal.', 'woocommerce-quotation' ),
					'heading'      => __( 'Proposal Declined', 'woocommerce-quotation' ),
					'subject'      => __( 'A customer has rejected our proposal', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>The proposal from %1$s has been rejected. The request was as follows:</p><p></p><p>Request: %2$s (%3$s)</p><p> %4$s</p><p></p><p> %5$s</p>', 'woocommerce-quotation' ), '{adq_customer}', '{order_number}', '{order_date}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'admin',
					'order_status' => 'proposal-rejected',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_admin_proposal_ok',
					'title'        => __( 'Admin proposal accepted', 'woocommerce-quotation' ),
					'description'  => __( 'Send an email confirming that the proposal has been accepted.', 'woocommerce-quotation' ),
					'heading'      => __( 'Proposal accepted', 'woocommerce-quotation' ),
					'subject'      => __( 'A customer has accepted your proposal', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>The proposal from %1$s has been accepted. The request was as follows:</p><p></p><p>Request: %2$s (%3$s)</p><p> %4$s </p><p></p><p> %5$s</p>', 'woocommerce-quotation' ), '{adq_customer}', '{order_number}', '{order_date}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'admin',
					'order_status' => 'proposal-accepted',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_customer_note',
					'title'        => __( 'Customer note', 'woocommerce-quotation' ),
					'description'  => __( 'Customer note emails are sent when you add a note to an order.', 'woocommerce-quotation' ),
					'heading'      => __( 'A customer has added a note', 'woocommerce-quotation' ),
					'subject'      => __( 'Note added to your {site_title} order on {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s, a note has just been added to your order:</p><p> %2$s </p><p></p><p> You can access your account area to view your orders here: %3$s. </p><p></p><p> For your reference, your order details are shown below. </p><p></p><p> Order #%4$s </p><p> %5$s </p><p></p><p> %6$s </p><p></p><p> Thanks,</p><p>Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_order_note}', '{adq_myaccount_link}', '{order_number}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'added-note',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'customer_proposal_ko',
					'title'        => __( 'Customer proposal rejected', 'woocommerce-quotation' ),
					'description'  => __( 'Send email confirming the declination of the proposal.', 'woocommerce-quotation' ),
					'heading'      => __( 'Proposal Declined', 'woocommerce-quotation' ),
					'subject'      => __( 'You have declined our {site_title} proposal on {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s!</p><p> Our proposal has been rejected. The proposal is shown below for your reference:</p><p></p><p> You can access your account area to view your orders here: %2$s.</p><p></p><p> The proposal: %3$s </p><p> %4$s </p><p></p><p> %5$s </p><p></p><p> Thanks,</p><p> Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_myaccount_link}', '{order_number}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'proposal-rejected',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_customer_proposal_ok',
					'title'        => __( 'Customer proposal accepted', 'woocommerce-quotation' ),
					'description'  => __( 'Send an email confirming that the proposal has been accepted.', 'woocommerce-quotation' ),
					'heading'      => __( 'Proposal accepted', 'woocommerce-quotation' ),
					'subject'      => __( 'You have accepted our {site_title} proposal from {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s!</p><p> Our proposal has been accepted. The proposal is shown below for your reference:</p><p></p><p.> You can proceed with the payment: %2$s.</p><p></p><p.> You can access your account area to view and pay your orders here: %3$s.</p><p></p><p.> The proposal: %4$s</p><p> %5$s</p><p></p><p.> %6$s</p><p></p><p.> Thanks,</p><p> Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_pay}', '{adq_myaccount_link}', '{order_number}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'proposal-accepted',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_customer_proposal',
					'title'        => __( 'Send proposal', 'woocommerce-quotation' ),
					'description'  => __( 'Send proposal emails are sent to the customer when a proposal is ready for the customer to accept or reject it.', 'woocommerce-quotation' ),
					'heading'      => __( 'Our proposal', 'woocommerce-quotation' ),
					'subject'      => __( '{site_title} sent a proposal on {order_date}', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s!</p><p> Your Quote Request has been processed. Find below our proposal for your reference.</p><p></p><p> You can access your account area to view your proposal here: %2$s. </p><p></p><p> You can %3$s or %4$s our proposal.</p><p></p><p> %5$s </p><p></p><p> Your request details are shown below for your reference: </p><p></p><p> %6$s</p><p></p><p> %7$s </p><p></p><p> Thanks,</p><p> Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_myaccount_link}', '{adq_accept}', '{adq_reject}', '{adq_cf7}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'proposal-sent',
					'is_reminder'  => 'no',
					'is_request'   => 'no',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_customer_quote',
					'title'        => __( 'Customer request', 'woocommerce-quotation' ),
					'description'  => __( 'Customer request emails are sent to the customer after a request has been submitted.', 'woocommerce-quotation' ),
					'heading'      => __( 'Your request has been received', 'woocommerce-quotation' ),
					'subject'      => __( 'Your {site_title} Quote Request from {order_date} is received', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s!</p><p> Your Quote Request has been received and is now being processed.</p><p></p><p> You can access your account area to view your orders here: %2$s. </p><p></p><p> %3$s</p><p></p><p> Your request details are shown below for your reference:</p><p></p><p> %4$s </p><p></p><p> %5$s </p><p></p><p> Your comments:</p><p> %6$s </p><p></p><p> Thanks,</p><p> Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_myaccount_link}', '{adq_cf7}', '{adq_request_list}', '{adq_address}', '{adq_order_comments}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'request',
					'is_reminder'  => 'no',
					'is_request'   => 'yes',
				),
				array(
					'enabled'      => 'yes',
					'id'           => 'adq_proposal_reminder',
					'title'        => __( 'Remind proposal', 'woocommerce-quotation' ),
					'description'  => __( 'Remind proposal emails are sent to the customer when the proposal goes to expire and it has not been accepted or rejected.', 'woocommerce-quotation' ),
					'heading'      => __( 'Our proposal has not been answered', 'woocommerce-quotation' ),
					'subject'      => __( 'Our {site_title} quotation from {order_date} is proposed', 'woocommerce-quotation' ),
					'content'      => sprintf( __( '<p>Hello %1$s! </p><p> This is a reminder of our proposal which is shown below for your reference:</p><p></p><p> You can access your account area to view your orders here: %2$s.</p><p></p><p> Our proposal: %3$s</p><p></p><p> %4$s </p><p></p><p> %5$s </p><p></p><p> Thanks,</p><p> Best regards!</p>', 'woocommerce-quotation' ), '{adq_customer}', '{adq_myaccount_link}', '{order_number}', '{adq_request_list}', '{adq_address}' ),
					'email_type'   => 'html',
					'send_to'      => 'customer',
					'order_status' => 'proposal-sent',
					'is_reminder'  => 'yes',
					'is_request'   => 'no',
				),
			);
			$deafult_emails = apply_filters( 'adq_default_emails', $deafult_emails );

			$email_ids = array();
			foreach ( $deafult_emails as $deafult_email ) {
				$email_ids[]     = $deafult_email['id'];
				$email           = new ADQ_Email( $deafult_email['id'] );
				$email->settings = $deafult_email;

				add_option( $email->get_option_key(), apply_filters( 'woocommerce_settings_api_sanitized_fields_' . $email->id, $email->settings ) );
			}
			add_option( 'adq_emails', $email_ids );
		}
	}

}

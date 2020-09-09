<?php
/**
 * Template for email
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.0.0
 * @since       3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>

<?php do_action('adq_email_header', $email_heading); ?>

<?php echo $email_content; ?>

<?php do_action( 'woocommerce_email_footer' ); ?>
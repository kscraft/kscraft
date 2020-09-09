<?php
/**
 * Template for email
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates/Plain
 * @version     1.0.0
 * @since       3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

echo "= " . $email_heading . " =\n\n";

echo $email_content . "\n\n";

echo apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) );

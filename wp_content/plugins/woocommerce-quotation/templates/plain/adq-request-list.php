<?php
do_action( 'woocommerce_email_before_order_table', $order, $sent_to_admin, $plain_text );

echo "\n" . adq_get_email_order_items( $order, array( 	'show_sku'    => false, 	'show_image'  => false, 	'$image_size' => array( 32, 32 ), 	'plain_text'  => true ) );

echo "----------\n\n";

if ( $totals = $order->get_order_item_totals() ) {
	
	//echo "<pre>";
	//print_r($totals);
	
        foreach ( $totals as $total ) {
                echo $total['label'] . "\t ";

                if ( !$is_request_email || $key == 'shipping' ) {
                    echo $total['value'];
                }
                else if( ( StaticAdqQuoteRequest::can_show_price() && StaticAdqQuoteRequest::can_show_product_price( $order ) ) 
                    || ( $total['value'] == "" ) ) { 
                        echo $total['value'];
                }
                else {
					//echo $total['value'];
                        echo __( 'Not yet proposed', 'woocommerce-quotation' );
                }

                echo "\n";
        }
}

echo "\n****************************************************\n\n";

do_action( 'woocommerce_email_after_order_table', $order, $sent_to_admin, $plain_text ); ?>
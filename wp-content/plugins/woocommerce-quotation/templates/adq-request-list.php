<?php do_action( 'woocommerce_email_before_order_table', $order, $sent_to_admin, $plain_text ); ?>

<table cellspacing="0" cellpadding="6" style="width: 100%; border: 1px solid #eee;" border="1" bordercolor="#eee">
	<thead>
		<tr>
			<th scope="col" style="text-align:left; border: 1px solid #eee;"><?php _e( 'Product', 'woocommerce-quotation' ); ?></th>
			<th scope="col" style="text-align:left; border: 1px solid #eee;"><?php _e( 'Quantity', 'woocommerce-quotation' ); ?></th>
            <th scope="col" style="text-align:left; border: 1px solid #eee;"><?php _e( 'Price', 'woocommerce-quotation' ); ?></th>
		</tr>
	</thead>
	<tbody>
		<?php echo adq_get_email_order_items( $order, array( 	'show_sku'    => false, 	'show_image'  => false, 	'$image_size' => array( 32, 32 ), 	'plain_text'  => false ) ); ?>
	</tbody>
	<tfoot>
		<?php                    
                    
            if ( $totals = $order->get_order_item_totals() ) :
                    $i = 0;
                    foreach ( $totals as $key => $total ) {
                            $i++;
                            ?><tr>
                                    <th scope="row" colspan="2" style="text-align:left; border: 1px solid #eee; <?php if ( $i == 1 ) echo 'border-top-width: 4px;'; ?>"><?php echo $total['label']; ?></th>
                                    <td style="text-align:left; border: 1px solid #eee; <?php if ( $i == 1 ) echo 'border-top-width: 4px;'; ?>">
                                        <?php 
                                        if ( !$is_request_email || $key == 'shipping' ) {
                                            echo $total['value'];
                                        }
                                        else if ( ( StaticAdqQuoteRequest::can_show_price() && StaticAdqQuoteRequest::can_show_product_price( $order ) ) 
                                                || ( $total['value'] == "" ) ) { 
                                                echo $total['value'];
                                        }
                                        else {
                                                echo __( 'Not yet proposed', 'woocommerce-quotation' );
                                        }
                                        ?>
                                    </td>
                            </tr><?php
                    }
            endif;                    
                    
		?>
	</tfoot>
</table>

<?php do_action( 'woocommerce_email_after_order_table', $order, $sent_to_admin, $plain_text ); ?>
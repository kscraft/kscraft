<?php
/**
 * Template for the widget Quotation - Number of items in quote
 *
 * @author 	Aldaba Digital
 * @package templates/widget
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

	<?php if ( ! WC_Adq()->quote->get_quote() ) : ?>
            <span class="widget_added_items_content">
                <span class="adq-added-items"><?php _e( '0 in quote', 'woocommerce-quotation' ); ?></span>
            </span>
                
    	<?php else : ?>		

		<?php
                        $total = 0;
			foreach ( WC_Adq()->quote->get_quote() as $cart_item_key => $cart_item ) {
				$total+= $cart_item['quantity'];
			} ?>
                	<span class="widget_added_items_content">
                    <?php
                    printf(
                        '<a href="%s" class="wc-forward adq-added-items-link"><span class="adq-added-items">%s</span></a>',
                            StaticAdqQuoteRequest::get_quote_list_link(),
                            sprintf(
                                        '%s %s',
                                        $total,
                                        __( 'in quote', 'woocommerce-quotation' )       
                                )
                        ); 
                    ?>
                    </span>	                 
                        
	<?php endif; ?>

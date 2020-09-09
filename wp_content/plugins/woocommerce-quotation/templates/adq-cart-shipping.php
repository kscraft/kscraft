<?php
/**
 * Shipping Methods Display
 *
 * @class 	StaticAdqQuoteRequest
 * @version     1.0.0
 * @package     woocommerce-quotation/classes/
 * @category    Class
 * @author      Aldaba Digital
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
            
/*$adq_inherit_shipping_conf = get_option("adq_inherit_shipping_conf");
$adq_enable_shipping_calculation = get_option("adq_enable_shipping_calculation");*/
$adq_enable_shipping        = get_option("adq_enable_shipping");
$adq_hide_shipping_costs    = get_option("adq_hide_shipping_costs");

if ( !function_exists('adq_cart_shipping_method_full_label') ) {

    function adq_cart_shipping_method_full_label( $label, $method )
    {
        $adq_hide_shipping_costs    = get_option("adq_hide_shipping_costs");
        $label                      = $method->get_label();

        if ( $method->cost > 0 ) {
            if ( WC()->cart->tax_display_cart == 'excl' ) {
                $label .= ($adq_hide_shipping_costs === "no" ? ': ' . wc_price( $method->cost ) : '');
                if ( $method->get_shipping_tax() > 0 && WC()->cart->prices_include_tax ) {
                    $label .= ' <small class="tax_label">' . WC()->countries->ex_tax_or_vat() . '</small>';
                }
            } else {
                $label .= ($adq_hide_shipping_costs === "no" ? ': ' . wc_price( $method->cost + $method->get_shipping_tax() ) : '');
                if ( $method->get_shipping_tax() > 0 && ! WC()->cart->prices_include_tax ) {
                    $label .= ' <small class="tax_label">' . WC()->countries->inc_tax_or_vat() . '</small>';
                }
            }
        }
        return $label;
    }

    add_filter( 'woocommerce_cart_shipping_method_full_label', 'adq_cart_shipping_method_full_label', 1, 2 );

}

if ( StaticAdqQuoteRequest::is_shipping_enabled() ) {
?><p>
        <!-- <input type="checkbox" name="adq_shipping_method" id="adq_shipping_method" value="1" /> 
        <?php echo get_option('adq_custom_text_shipping', __('I want Quote Request for Shipping', 'woocommerce-quotation')); ?> -->
</p>
<?php } ?>


<?php

    //adq_get_template( 'adq-form-shipping.php', array( 'checkout' => WC()->checkout() ) );
    
    /*if ( $adq_inherit_shipping_conf == "yes" || ( $adq_inherit_shipping_conf == "no" && $adq_enable_shipping_calculation == "yes" ) ) {*/
?>
<table>
    <tr class="shipping">
        <th><?php
                if ( $show_package_details ) {
                        printf( __( 'Shipping #%d', 'woocommerce-quotation' ), $index + 1 );
                } else {
                        _e( 'Shipping and Handling', 'woocommerce-quotation' );
                }
        ?></th>
        <td>
                <?php if ( ! empty( $available_methods ) ) : ?>

                        <?php if ( 1 === count( $available_methods ) ) :
                                $method = current( $available_methods );

                                echo wp_kses_post( wc_cart_totals_shipping_method_label( $method ) ); ?>
                                <input type="hidden" name="shipping_method[<?php echo $index; ?>]" data-index="<?php echo $index; ?>" id="shipping_method_<?php echo $index; ?>" value="<?php echo esc_attr( $method->id ); ?>" class="shipping_method" />

                        <?php elseif ( get_option( 'adq_shipping_method_format' ) === 'select' ) : ?>

                                <select name="shipping_method[<?php echo $index; ?>]" data-index="<?php echo $index; ?>" id="shipping_method_<?php echo $index; ?>" class="shipping_method">
                                        <?php foreach ( $available_methods as $method ) : ?>
                                                <option value="<?php echo esc_attr( $method->id ); ?>" <?php selected( $method->id, $chosen_method ); ?>><?php echo wp_kses_post( wc_cart_totals_shipping_method_label( $method ) ); ?></option>
                                        <?php endforeach; ?>
                                </select>

                        <?php else : ?>

                                <ul id="shipping_method">
                                        <?php /*foreach ( $available_methods as $method ) : ?>
                                                <li>
                                                        <input type="radio" name="shipping_method[<?php echo $index; ?>]" data-index="<?php echo $index; ?>" id="shipping_method_<?php echo $index; ?>_<?php echo sanitize_title( $method->id ); ?>" value="<?php echo esc_attr( $method->id ); ?>" <?php checked( $method->id, $chosen_method ); ?> class="shipping_method" />
                                                        <label for="shipping_method_<?php echo $index; ?>_<?php echo sanitize_title( $method->id ); ?>"><?php echo wp_kses_post( wc_cart_totals_shipping_method_label( $method ) ); ?></label>
                                                </li>
                                        <?php endforeach;*/ ?>
                                    <?php foreach ( $available_methods as $method ) : ?>
                                            <li>
                                                    <?php
                                                            printf( '<input type="radio" name="shipping_method[%1$d]" data-index="%1$d" id="shipping_method_%1$d_%2$s" value="%3$s" class="shipping_method" %4$s />
                                                                    <label for="shipping_method_%1$d_%2$s">%5$s</label>',
                                                                    $index, sanitize_title( $method->id ), esc_attr( $method->id ), checked( $method->id, $chosen_method, false ), wc_cart_totals_shipping_method_label( $method ) );

                                                            do_action( 'woocommerce_after_shipping_rate', $method, $index );
                                                    ?>
                                            </li>
                                    <?php endforeach; ?>
                                </ul>

                        <?php endif; ?>

                <?php elseif ( ! WC()->customer->get_shipping_state() || ! WC()->customer->get_shipping_postcode() ) : ?>

                        <?php if ( is_cart() && get_option( 'adq_enable_shipping_calculation' ) === 'yes' ) : ?>

                                <p><?php _e( 'Please use the shipping calculator to see available shipping methods.', 'woocommerce-quotation' ); ?></p>

                        <?php elseif ( is_cart() ) : ?>

                                <p><?php _e( 'Please continue to the checkout and enter your full address to see if there are any available shipping methods.', 'woocommerce-quotation' ); ?></p>

                        <?php else : ?>

                                <p><?php _e( 'Please fill in your details to see available shipping methods.', 'woocommerce-quotation' ); ?></p>

                        <?php endif; ?>

                <?php else : ?>

                        <?php if ( is_cart() ) : ?>

                                <?php echo apply_filters( 'woocommerce_cart_no_shipping_available_html',
                                        '<div class="woocommerce-info"><p>' . __( 'There doesn&lsquo;t seem to be any available shipping methods. Please double check your address, or contact us if you need any help.', 'woocommerce-quotation' ) . '</p></div>'
                                ); ?>

                        <?php else : ?>

                                <?php echo apply_filters( 'woocommerce_no_shipping_available_html',
                                        '<p>' . __( 'There doesn&lsquo;t seem to be any available shipping methods. Please double check your address, or contact us if you need any help.', 'woocommerce-quotation' ) . '</p>'
                                ); ?>

                        <?php endif; ?>

                <?php endif; ?>

                <?php if ( $show_package_details ) : ?>
                        <?php
                                foreach ( $package['contents'] as $item_id => $values ) {
                                        if ( $values['data']->needs_shipping() ) {
                                                $product_names[] = $values['data']->get_title() . ' &times;' . $values['quantity'];
                                        }
                                }

                                echo '<p class="woocommerce-shipping-contents"><small>' . __( 'Shipping', 'woocommerce-quotation' ) . ': ' . implode( ', ', $product_names ) . '</small></p>';
                        ?>
                <?php endif; ?>
        </td>
    </tr>
</table>
<?php //} ?>
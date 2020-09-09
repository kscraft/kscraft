<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Quote List Widget
 *
 * Displays shopping quote list widget
 *
 * @author   Aldaba Digital
 * @category Widgets
 * @package  Classes/Widgets
 * @version  2.1.10
 * @extends  WC_Widget
 */
class WC_Widget_Quote extends WC_Widget {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->widget_cssclass    = 'woocommerce adq_shopping_cart';
		$this->widget_description = __( "Display the user's Quote List in the sidebar.", 'woocommerce-quotation' );
		$this->widget_id          = 'woocommerce_widget_quote';
		$this->widget_name        = __( 'Quotation - Quote list', 'woocommerce-quotation' );
		$this->settings           = array(
			'title'  => array(
				'type'  => 'text',
				'std'   => __( 'Quote List', 'woocommerce-quotation' ),
				'label' => __( 'Title', 'woocommerce-quotation' )
			),
			'hide_if_empty' => array(
				'type'  => 'checkbox',
				'std'   => 0,
				'label' => __( 'Show simple widget version', 'woocommerce-quotation' )
			)
		);

		parent::__construct();
	}

	/**
	 * widget function.
	 *
	 * @see WP_Widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {             
                
		$this->widget_start( $args, $instance );
              
                ob_start();                
		
		echo '<div class="widget_shopping_quote_list_content hide_cart_widget_if_empty">';
                
                $params = array(
                    'value' => empty( $instance['hide_if_empty'] ) ? 0 : 1 ,
                );
                wp_localize_script( 'jquote-request-js', 'widget_shopping_hide_if_empty', $params );
                
                echo draw_widget_quote( $instance );
                
                echo '</div>';
                
                $content = ob_get_clean();

		echo $content;

		$this->widget_end( $args );
	}
}

if ( ! function_exists( 'draw_widget_quote' ) ) {       

        function draw_widget_quote ( $instance ) { 
                $simple_quote_list = empty( $instance['hide_if_empty'] ) ? false : true;

                // Get mini cart
                ob_start();

                $simple_quote_list?adq_simple_mini_cart():adq_mini_cart();		

                $mini_quote = ob_get_clean();                
                
                // Insert cart widget placeholder - code in woocommerce.js will update this on page load
                return $mini_quote;
        }
}

if ( ! function_exists( 'ajax_draw_widget_quote' ) ) {    

        function ajax_draw_widget_quote () {               

                $instance = array();
                $instance['hide_if_empty'] = $_POST['hide_if_empty'];

                echo draw_widget_quote( $instance );
                
                die;
        }
        add_action( 'wp_ajax_draw_widget_quote', 'ajax_draw_widget_quote' );
        add_action( 'wp_ajax_nopriv_draw_widget_quote', 'ajax_draw_widget_quote' );
}

/** Mini-Cart *************************************************************/

if ( ! function_exists( 'adq_mini_cart' ) ) {

	/**
	 * Output the Mini-cart - used by cart widget
	 *
	 */
	function adq_mini_cart( $args = array() ) {

		$defaults = array(
			'list_class' => ''
		);

		$args = wp_parse_args( $args, $defaults );

		adq_get_template( 'widget/mini-quote.php', $args );
	}
}

if ( ! function_exists( 'adq_simple_mini_cart' ) ) {

	/**
	 * Output the Simple Mini-cart - used by cart widget
	 *
	 */
	function adq_simple_mini_cart( $args = array() ) {

		$defaults = array(
			'list_class' => ''
		);

		$args = wp_parse_args( $args, $defaults );

		adq_get_template( 'widget/simple-mini-quote.php', $args );
	}
}
<?php

/**
 * Added Items Widget
 *
 * Display how much items are added in quotation.
 *
 * @author   Aldaba Digital
 * @category Widgets
 * @package  Classes/Widgets
 * @version  1.0.0
 * @extends  WC_Widget
 */
class WC_Widget_Added_Items extends WC_Widget {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->widget_cssclass    = 'woocommerce adq_shopping_cart';
		$this->widget_description = __( "Display how much items are added in quotation.", 'woocommerce-quotation' );
		$this->widget_id          = 'woocommerce_widget_added_items';
		$this->widget_name        = __( 'Quotation - Number of items in quote', 'woocommerce-quotation' );
		$this->settings           = array(
			'title'  => array(
				'type'  => 'text',
				'std'   => __( 'Added items', 'woocommerce-quotation' ),
				'label' => __( 'Title', 'woocommerce-quotation' )
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

		get_added_items_content();

		$this->widget_end( $args );
	}
}

function get_added_items_content() {

	return adq_get_template( 'widget/items-in-quote.php', array('css_classes' => 'widget_added_items_content') );

}

function ajax_get_added_items_content () {

    get_added_items_content();
        
    die;
}
add_action( 'wp_ajax_get_added_items_content', 'ajax_get_added_items_content' );
add_action( 'wp_ajax_nopriv_get_added_items_content', 'ajax_get_added_items_content' );

add_shortcode( 'adq-added-items', 'adq_added_items' );
function adq_added_items() {

	get_added_items_content();

}

if ( ! function_exists( 'adq_added_items' ) ) {       

    function adq_added_items () { 
                
        get_added_items_content();

    }
}

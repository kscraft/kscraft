<?php 

if ( !class_exists('ADQ_OrderHandler') ) {
	
	class ADQ_OrderHandler {

		static public function get_billing_email( $order ) {
		    return ( version_compare( WC_VERSION, '2.7', '<' ) ) ? $order->billing_email : $order->get_billing_email();
		} 

		static public function get_billing_first_name( $order ) {
		    return ( version_compare( WC_VERSION, '2.7', '<' ) ) ? $order->billing_first_name : $order->get_billing_first_name();
		}

		static public function get_billing_last_name( $order ) {
		    return ( version_compare( WC_VERSION, '2.7', '<' ) ) ? $order->billing_last_name : $order->get_billing_last_name();
		}    

		static public function get_order_date( $order ) {
		    return ( version_compare( WC_VERSION, '2.7', '<' ) ) ? $order->order_date : ($order->get_date_created() ? gmdate( 'Y-m-d H:i:s', $order->get_date_created()->getOffsetTimestamp() ) : '');
		}

		static public function get_id( $order ) {
			return version_compare( WC_VERSION, '2.7', '<' ) ? $order->id : $order->get_id();
		}

		static public function set_id( $order, $id ) {
			version_compare( WC_VERSION, '2.7', '<' ) ? $order->id = $id : $order->set_id( $id );
		}

		static public function populate( $order, $customer_order )
		{
			if ( version_compare(WC_VERSION, '2.7', '<') ) :
				$order->populate( $customer_order );
			else :
				$order->set_id( $customer_order->ID );
				$order->set_object_read( false );
				$order->get_data_store()->read( $order );
			endif;
		}
	}
}

 ?>
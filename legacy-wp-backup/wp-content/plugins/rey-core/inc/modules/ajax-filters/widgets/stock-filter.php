<?php
/**
 * Rey Ajax Product Filter in stock
 */
if (!class_exists('REYAJAXFILTERS_Stock_Filter_Widget')) {
	class REYAJAXFILTERS_Stock_Filter_Widget extends WP_Widget {
		/**
		 * Register widget with WordPress.
		 */
		function __construct() {
			parent::__construct(
				'reyajfilter-stock-filter', // Base ID
				__('Rey Filter - In Stock', 'rey-core'), // Name
				array('description' => __('Filter woocommerce products in stock.', 'rey-core')) // Args
			);
		}

		/**
		 * Front-end display of widget.
		 *
		 * @see WP_Widget::widget()
		 *
		 * @param array $args     Widget arguments.
		 * @param array $instance Saved values from database.
		 */
		public function widget($args, $instance) {

			if ( apply_filters('reycore/ajaxfilters/widgets_support', false) === false ) {
				return;
			}

			$html = '';

			// required scripts
			// enqueue necessary scripts
			wp_enqueue_style('reyajfilter-style');
			wp_enqueue_script('reyajfilter-script');

			// get values from url
			$in_stock = null;
			if (isset($_GET['in-stock']) && !empty($_GET['in-stock'])) {
				$in_stock = absint( $_GET['in-stock'] );
			}

			extract($args);

			$id = $widget_id . '-stock-check';

			$html .= '<div class="reyajfilter-stock-filter js-reyajfilter-check-filter woocommerce-form__label-for-checkbox">';
				$html .= sprintf('<input type="checkbox" id="%1$s" name="%1$s" data-key="in-stock" value="1" %2$s />', $id, checked(1, $in_stock, false) );
				$html .= sprintf('<label for="%s">%s</label>', $id, $instance['label_title']);
			$html .= '</div>';

			$widget_class = 'woocommerce reyajfilter-stock-filter-widget reyajfilter-ajax-term-filter';

			// no class found, so add it
			if (strpos($before_widget, 'class') === false) {
				$before_widget = str_replace('>', 'class="' . $widget_class . '"', $before_widget);
			}
			// class found but not the one that we need, so add it
			else {
				$before_widget = str_replace('class="', 'class="' . $widget_class . ' ', $before_widget);
			}

			echo $before_widget;
			if (!empty($instance['title'])) {
				echo $args['before_title'] . apply_filters('widget_title', $instance['title']). $args['after_title'];
			}
			echo $html;
			echo $args['after_widget'];
		}

		/**
		 * Back-end widget form.
		 *
		 * @see WP_Widget::form()
		 *
		 * @param array $instance Previously saved values from database.
		 */
		public function form($instance) {
			?>
			<p>
				<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', 'rey-core'); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo (!empty($instance['title']) ? esc_attr($instance['title']) : ''); ?>">
			</p>
			<p>
				<label for="<?php echo $this->get_field_id('label_title'); ?>"><?php _e('Label Title:', 'rey-core'); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id('label_title'); ?>" name="<?php echo $this->get_field_name( 'label_title' ); ?>" type="text" value="<?php echo (!empty($instance['label_title']) ? esc_attr($instance['label_title']) : esc_html__('In Stock Only', 'rey-core')); ?>" placeholder="ex: <?php esc_html_e('In Stock Only', 'rey-core') ?>">
			</p>
			<?php
		}

		/**
		 * Sanitize widget form values as they are saved.
		 *
		 * @see WP_Widget::update()
		 *
		 * @param array $new_instance Values just sent to be saved.
		 * @param array $old_instance Previously saved values from database.
		 *
		 * @return array Updated safe values to be saved.
		 */
		public function update($new_instance, $old_instance) {
			$instance = array();
			$instance['title'] = (isset($new_instance['title']) && !empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
			$instance['label_title'] = (isset($new_instance['label_title']) && !empty($new_instance['label_title'])) ? strip_tags($new_instance['label_title']) : '';
			return $instance;
		}
	}
}

// register widget
if (!function_exists('reyajaxfilter_register_stock_filter_widget')) {
	function reyajaxfilter_register_stock_filter_widget() {
		register_widget('REYAJAXFILTERS_Stock_Filter_Widget');
	}
	add_action('widgets_init', 'reyajaxfilter_register_stock_filter_widget');
}

<?php
/**
 * Rey Ajax Product Filter by Price
 */
if (!class_exists('REYAJAXFILTERS_Price_Filter_Widget')) {
	class REYAJAXFILTERS_Price_Filter_Widget extends WP_Widget {
		/**
		 * Register widget with WordPress.
		 */
		function __construct() {
			parent::__construct(
				'reyajfilter-price-filter', // Base ID
				__('Rey Filter - by Price', 'rey-core'), // Name
				array('description' => __('Filter woocommerce products by price.', 'rey-core')) // Args
			);

			$this->defaults = [
				'title'            => '',
				'display_type'     => 'slider',
				'custom_height'    => '',
				'show_currency'    => false,
				'show_as_dropdown' => false,
				'price_list'       => [],
				'show_checkboxes'  => false,
				'placeholder'      => '',
				'dd_width'         => '',
			];
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

			$instance = wp_parse_args( (array) $instance, $this->defaults );

			// display type, slider or list
			$display_type = $instance['display_type'];
			$is_slider = $display_type === 'slider';
			$html = '';

			$prices = $this->get_filtered_price();
			$step = max( apply_filters( 'woocommerce_price_filter_widget_step', 10 ), 1 );

			// to be sure that these values are number
			$min_price = $max_price = 0;

			if (sizeof($prices) === 2) {
				$min_price = $prices['min_price'];
				$max_price = $prices['max_price'];
			}

			// Check to see if we should add taxes to the prices if store are excl tax but display incl.
			$tax_display_mode = get_option( 'woocommerce_tax_display_shop' );

			if ( wc_tax_enabled() && ! wc_prices_include_tax() && 'incl' === $tax_display_mode ) {
				$tax_class = apply_filters( 'woocommerce_price_filter_widget_tax_class', '' ); // Uses standard tax class.
				$tax_rates = WC_Tax::get_rates( $tax_class );

				if ( $tax_rates ) {
					$min_price += WC_Tax::get_tax_total( WC_Tax::calc_exclusive_tax( $min_price, $tax_rates ) );
					$max_price += WC_Tax::get_tax_total( WC_Tax::calc_exclusive_tax( $max_price, $tax_rates ) );
				}
			}

			$min_price = apply_filters( 'woocommerce_price_filter_widget_min_amount', floor( $min_price / $step ) * $step );
			$max_price = apply_filters( 'woocommerce_price_filter_widget_max_amount', ceil( $max_price / $step ) * $step );

			// If both min and max are equal, we don't need a slider.
			if ( $min_price === $max_price ) {
				$is_slider = false;
			}

			// required scripts
			// enqueue necessary scripts
			wp_enqueue_style('reyajfilter-style');
			wp_enqueue_script('reyajfilter-script');

			// HTML markup for price slider
			// Slider markup
			if ($is_slider) {

				wp_enqueue_script('nouislider');
				wp_enqueue_style('reyajfilter-nouislider-style');

				$current_min_price = isset( $_GET['min-price'] ) ? floor( floatval( wp_unslash( $_GET['min-price'] ) ) / $step ) * $step : $min_price; // WPCS: input var ok, CSRF ok.
				$current_max_price = isset( $_GET['max-price'] ) ? ceil( floatval( wp_unslash( $_GET['max-price'] ) ) / $step ) * $step : $max_price; // WPCS: input var ok, CSRF ok.

				$html .= '<div class="reyajfilter-price-filter-wrapper">';
					$html .= '<div id="reyajfilter-noui-slider" class="noUi-extended" data-min="' . $min_price . '" data-max="' . $max_price . '" data-set-min="' . $current_min_price . '" data-set-max="' . $current_max_price . '"></div>';
					$html .= '<br />';
					$html .= '<div class="slider-values">';
						$html .= '<p>' . __('Min Price', 'rey-core') . ': <span class="reyajfilter-slider-value" id="reyajfilter-noui-slider-value-min"></span></p>';
						$html .= '<p>' . __('Max Price', 'rey-core') . ': <span class="reyajfilter-slider-value" id="reyajfilter-noui-slider-value-max"></span></p>';
					$html .= '</div>';
				$html .= '</div>';
			}

			// List markup
			else {

				$list_html = $dd_html = '';

				foreach ($instance['price_list'] as $price_list) {
					$is_selected = false;

					if (isset($_GET['min-price']) && $_GET['min-price'] == $price_list['min']) {
						$is_selected = true;
						$list_html .= '<li class="chosen">';
					} elseif (isset($_GET['max-price']) && $_GET['max-price'] == $price_list['max']) {
						$is_selected = true;
						$list_html .= '<li class="chosen">';
					} else {
						$list_html .= '<li>';
					}

					$list_html .= '<a href="javascript:void(0)" data-key-min="min-price" data-value-min="' . $price_list['min'] . '" data-key-max="max-price" data-value-max="' . $price_list['max'] . '">';

					$dd_html .= sprintf('<option value="%1$s" data-key-min="min-price" data-value-min="%2$s" data-key-max="max-price" data-value-max="%3$s" %4$s>',
						$price_list['min'] . $price_list['max'],
						$price_list['min'],
						$price_list['max'],
						selected(true, $is_selected, false)
					);

					$before = $after = '';

					if ($instance['show_currency'])  {
						if ($currency_position === 'left') {
							$before = $currency_symbol;
						} elseif ($currency_position === 'left_space') {
							$before = $currency_symbol . ' ';
						} elseif ($currency_position === 'right') {
							$after = $currency_symbol;
						} elseif ($currency_position === 'right_space') {
							$after = ' ' . $currency_symbol;
						}
					}

					if ($price_list['min']) {
						$list_html .= '<span class="min">' . $before . $price_list['min'] . $after . '</span>';
						$dd_html .= $before . $price_list['min'] . $after;
					}

					$list_html .= '<span class="to"> ' . $price_list['to'] . ' </span>';
					$dd_html .= ' ' . $price_list['to'] . ' ';

					if ($price_list['max']) {
						$list_html .= '<span class="max">' . $before . $price_list['max'] . $after . '</span>';
						$dd_html .= $before . $price_list['max'] . $after;
					}

					$list_html .= '</a></li>';
					$dd_html .= '</option>';
				}

				if( $instance['show_as_dropdown'] ){

					// required scripts
					wp_enqueue_style('reyajfilter-select2');
					wp_enqueue_script('reyajfilter-select2');

					$placeholder = $instance['placeholder'] ? $instance['placeholder'] : esc_html__('Select Price', 'rey-core');

					$attributes = sprintf('data-placeholder="%s"', $placeholder);

					if( $instance['show_checkboxes'] ):
						wp_enqueue_script('reyajfilter-select2-multi-checkboxes');
						$attributes .= ' data-checkboxes="true"';
					endif;

					if( isset($instance['dd_width']) && $dropdown_width = $instance['dd_width'] ){
						$attributes .= sprintf(' data-ddcss=\'%s\'', wp_json_encode([
							'min-width' => $dropdown_width . 'px'
						]));
					}

					$html .= '<div class="reyajfilter-dropdown-nav">';
					$html .= '<select class="reyajfilter-select2 reyajfilter-select2-single reyajfilter-select2--prices" style="width: 100%;" '. $attributes .'>';
						$html .= '<option></option>';
						$html .= $dd_html;
					$html .= '</select>';
					$html .= '</div>';
				}
				else {

					$html .= '<div class="reyajfilter-layered-nav">';
						$html .= '<ul>';
							$html .= $list_html;
						$html .= '</ul>';
					$html .= '</div>';
				}

			}

			extract($args);

			// Add class to before_widget from within a custom widget
			// http://wordpress.stackexchange.com/questions/18942/add-class-to-before-widget-from-within-a-custom-widget

			if ($display_type === 'slider') {
				$widget_class = 'woocommerce reyajfilter-price-filter-widget';
			} else {
				$widget_class = 'woocommerce reyajfilter-price-filter-widget reyajfilter-ajax-term-filter';
			}

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
		 * Get filtered min price for current products.
		 *
		 * @return int
		 */
		protected function get_filtered_price() {

			global $wpdb, $wp_query;

			$tax_query  = apply_filters('reycore/ajaxfilters/tax_query', []);
			$meta_query  = apply_filters('reycore/ajaxfilters/meta_query', []);

			$is_product_type = is_main_query() && ( is_post_type_archive('product') || is_tax(get_object_taxonomies('product')) );

			if( $is_product_type ){
				$tax_query  = WC_Query::get_main_tax_query();
				$meta_query  = WC_Query::get_main_meta_query();
			}

			foreach ( $meta_query + $tax_query as $key => $query ) {
				if ( ! empty( $query['price_filter'] ) || ! empty( $query['rating_filter'] ) ) {
					unset( $meta_query[ $key ] );
				}
			}

			$meta_query = new WP_Meta_Query( $meta_query );
			$tax_query  = new WP_Tax_Query( $tax_query );
			$search  = $is_product_type ? WC_Query::get_main_search_query_sql() : apply_filters('reycore/ajaxfilters/search_query', []);

			$meta_query_sql   = $meta_query->get_sql( 'post', $wpdb->posts, 'ID' );
			$tax_query_sql    = $tax_query->get_sql( $wpdb->posts, 'ID' );
			$search_query_sql = $search ? ' AND ' . $search : '';

			$sql = "
				SELECT min( min_price ) as min_price, MAX( max_price ) as max_price
				FROM {$wpdb->wc_product_meta_lookup}
				WHERE product_id IN (
					SELECT ID FROM {$wpdb->posts}
					" . $tax_query_sql['join'] . $meta_query_sql['join'] . "
					WHERE {$wpdb->posts}.post_type IN ('" . implode( "','", array_map( 'esc_sql', apply_filters( 'woocommerce_price_filter_post_type', array( 'product' ) ) ) ) . "')
					AND {$wpdb->posts}.post_status = 'publish'
					" . $tax_query_sql['where'] . $meta_query_sql['where'] . $search_query_sql . '
				)';

			$sql = apply_filters( 'woocommerce_price_filter_sql', $sql, $meta_query_sql, $tax_query_sql );

			return (array) $wpdb->get_row( $sql ); // WPCS: unprepared SQL ok.
		}

		/**
		 * Back-end widget form.
		 *
		 * @see WP_Widget::form()
		 *
		 * @param array $instance Previously saved values from database.
		 */
		public function form($instance) {

			$instance = wp_parse_args( (array) $instance, $this->defaults );
			$display_name = $this->get_field_name('display_type');
			?>
			<p>
				<label for="<?php echo $this->get_field_id('title'); ?>"><?php printf(__('Title:', 'rey-core')); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo (!empty($instance['title']) ? esc_attr($instance['title']) : ''); ?>">
			</p>
			<p>
				<label for="<?php echo $this->get_field_id('display_type'); ?>"><?php printf(__('Display Type:', 'rey-core')); ?></label>
				<select class="widefat price-filter-display-type" id="<?php echo $this->get_field_id('display_type'); ?>" name="<?php echo $display_name; ?>">
					<option value="slider" <?php echo ((!empty($instance['display_type']) && $instance['display_type'] === 'slider') ? 'selected="selected"' : ''); ?>><?php printf(__('Slider', 'rey-core')); ?></option>
					<option value="list" <?php echo ((!empty($instance['display_type']) && $instance['display_type'] === 'list') ? 'selected="selected"' : ''); ?>><?php printf(__('List', 'rey-core')); ?></option>
				</select>
			</p>

			<?php
				$list_condition = wp_json_encode([
					[
						'name' => $display_name,
						'value' => 'list',
						'compare' => '==='
					]
				]);
			?>

			<p id="<?php echo $this->get_field_id('show_currency'); ?>-wrapper" data-condition='<?php echo $list_condition; ?>'>
				<input id="<?php echo $this->get_field_id('show_currency'); ?>" name="<?php echo $this->get_field_name('show_currency'); ?>" type="checkbox" value="1" <?php echo (!empty($instance['show_currency']) && $instance['show_currency'] == true) ? 'checked="checked"' : ''; ?>>
				<label for="<?php echo $this->get_field_id('show_currency'); ?>"><?php printf(__('Show currency', 'rey-core')); ?></label>
			</p>

			<p id="<?php echo $this->get_field_id('show_as_dropdown'); ?>-wrapper" data-condition='<?php echo $list_condition; ?>'>
				<input id="<?php echo $this->get_field_id('show_as_dropdown'); ?>" name="<?php echo $this->get_field_name('show_as_dropdown'); ?>" type="checkbox" value="1" <?php echo (!empty($instance['show_as_dropdown']) && $instance['show_as_dropdown'] == true) ? 'checked="checked"' : ''; ?>>
				<label for="<?php echo $this->get_field_id('show_as_dropdown'); ?>"><?php printf(__('Show as dropdown list', 'rey-core')); ?></label>
			</p>

			<div id="<?php echo $this->get_field_id('price_list'); ?>-wrapper" class="price-list-wrapper" data-condition='<?php echo $list_condition; ?>'>
				<?php if (isset($instance['price_list']) && !empty($instance['price_list'])): ?>
					<?php foreach ($instance['price_list'] as $price_list): ?>
						<p class="price-list">
							<input type="text" class="widefat min" name="<?php echo $this->get_field_name('price_list'); ?>[min][]" value="<?php echo $price_list['min']; ?>" placeholder="<?php printf(__('Min price', 'rey-core')); ?>" />
							<input type="text" class="widefat to" name="<?php echo $this->get_field_name('price_list'); ?>[to][]" value="<?php echo $price_list['to']; ?>" placeholder="<?php printf(__('to', 'rey-core')); ?>" />
							<input type="text" class="widefat max" name="<?php echo $this->get_field_name('price_list'); ?>[max][]" value="<?php echo $price_list['max']; ?>" placeholder="<?php printf(__('Max price', 'rey-core')); ?>" />
							<a href="javascript:void(0)" class="remove-price-list">&times;</a>
						</p>
					<?php endforeach ?>
				<?php else: ?>
					<p class="price-list">
						<input type="text" class="widefat min" name="<?php echo $this->get_field_name('price_list'); ?>[min][]" value="" placeholder="<?php printf(__('Min price', 'rey-core')); ?>" />
						<input type="text" class="widefat to" name="<?php echo $this->get_field_name('price_list'); ?>[to][]" value="" placeholder="<?php printf(__('to', 'rey-core')); ?>" />
						<input type="text" class="widefat max" name="<?php echo $this->get_field_name('price_list'); ?>[max][]" value="" placeholder="<?php printf(__('Max price', 'rey-core')); ?>" />
						<a href="javascript:void(0)" class="remove-price-list">&times;</a>
					</p>
				<?php endif ?>
			</div>

			<p class="add-price-list-button-wrapper"  data-condition='<?php echo $list_condition; ?>'>
				<a href="javascript:void(0)" class="button add-price-list"><?php printf(__('Add', 'rey-core')); ?></a>
			</p>

			<div class="price-list-empty hidden">
				<p class="price-list">
					<input type="text" class="widefat min" name="<?php echo $this->get_field_name('price_list'); ?>[min][]" value="" placeholder="<?php printf(__('Min price', 'rey-core')); ?>" />
					<input type="text" class="widefat to" name="<?php echo $this->get_field_name('price_list'); ?>[to][]" value="" placeholder="<?php printf(__('to', 'rey-core')); ?>" />
					<input type="text" class="widefat max" name="<?php echo $this->get_field_name('price_list'); ?>[max][]" value="" placeholder="<?php printf(__('Max price', 'rey-core')); ?>" />
					<a href="javascript:void(0)" class="remove-price-list">&times;</a>
				</p>
			</div>

			<style type="text/css">
				.price-list .min,
				.price-list .max {
					width: 15%;
				}
				.price-list .to {
					width: 15%;
				}
				.price-list .min,
				.price-list .to,
				.price-list .max {
					margin-right: 3%;
				}
				.remove-price-list {
					font-size: 16px;
					border: none;
					background-color: transparent;
					color: #ff0000;
					text-decoration: none;
				}
			</style>
			<script type="text/javascript">
				jQuery(document).ready(function($) {

					// Add price list
					$('.add-price-list').unbind().on('click', function(event) {
						var widget = $(this).parent().parent(),
							wrapper = widget.find('.price-list-wrapper'),
							markup = widget.find('.price-list-empty').clone().children();

						$(markup).appendTo(wrapper);
						return false;
					});

					// Remove price list
					$(document).unbind().on('click', '.remove-price-list', function(event) {
						$(this).parent().hide().remove();
						return false;
					});
				});
			</script>

			<?php
			$dd_condition = wp_json_encode([
				[
					'name' => $display_name,
					'value' => 'list',
					'compare' => '==='
				],
				[
					'name' => $this->get_field_name( 'show_as_dropdown' ),
					'value' => true,
					'compare' => '=='
				]
			]); ?>

			<p data-condition='<?php echo $dd_condition; ?>'><strong><?php esc_html_e('DROPDOWN OPTIONS', 'rey-core') ?></strong></p>

			<p data-condition='<?php echo $dd_condition; ?>'>
				<label for="<?php echo $this->get_field_id('placeholder'); ?>"><?php esc_html_e('Placeholder:', 'rey-core'); ?></label>
				<input class="widefat" id="<?php echo $this->get_field_id('placeholder'); ?>" name="<?php echo $this->get_field_name( 'placeholder' ); ?>" type="text" value="<?php echo esc_attr($instance['placeholder']); ?>" placeholder="<?php esc_html_e('eg: Choose', 'rey-core') ?>">
			</p>

			<p data-condition='<?php echo $dd_condition; ?>'>
				<label for="<?php echo $this->get_field_id('dd_width'); ?>">
					<?php _e( 'Custom dropdown width', 'rey-core' ); ?>
				</label>
				<input class="tiny-text" type="number" step="1" min="50" max="1000" value="<?php esc_attr_e($instance['dd_width']) ?>" id="<?php echo $this->get_field_id('dd_width'); ?>" name="<?php echo $this->get_field_name('dd_width'); ?>" style="width: 100px" />
				<span><small><?php _e( 'px', 'rey-core' ); ?></small></span>
			</p>

			<p data-condition='<?php echo $dd_condition; ?>'>
				<input id="<?php echo $this->get_field_id('show_checkboxes'); ?>" name="<?php echo $this->get_field_name('show_checkboxes'); ?>" type="checkbox" value="1" <?php checked( $instance['show_checkboxes'] ); ?>>
				<label for="<?php echo $this->get_field_id('show_checkboxes'); ?>"><?php esc_html_e('Show checkboxes', 'rey-core'); ?></label>
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

			$instance                     = [];
			$instance['title']            = sanitize_text_field($new_instance['title']);
			$instance['display_type']     = sanitize_text_field($new_instance['display_type']);
			$instance['show_as_dropdown'] = !empty($new_instance['show_as_dropdown']);
			$instance['show_currency']    = !empty($new_instance['show_currency']);
			$instance['show_checkboxes']  = !empty($new_instance['show_checkboxes']);
			$instance['placeholder']      = sanitize_text_field($new_instance['placeholder']);
			$instance['dd_width']         = sanitize_text_field($new_instance['dd_width']);

			// price list
			if (isset($new_instance['price_list'])) {

				$min = isset($new_instance['price_list']['min']) ? $new_instance['price_list']['min'] : [];
				$to = isset($new_instance['price_list']['to']) ? $new_instance['price_list']['to'] : [];
				$max = isset($new_instance['price_list']['max']) ? $new_instance['price_list']['max'] : [];
				$price_list = array();

				foreach ($min as $key => $mmin) {
					$mmin = $mmin;
					$mmax = $max[$key];
					$mto = !empty($to[$key]) ? $to[$key] : '-';

					if (!empty($mmin) || !empty($mmax)) {
						$price_list[] = array(
							'min' => $mmin,
							'to'  => $mto,
							'max' => $mmax,
						);
					}
				}

				$instance['price_list'] = $price_list;

			}

			return $instance;
		}
	}
}

// register widget
if (!function_exists('reyajaxfilter_register_price_filter_widget')) {
	function reyajaxfilter_register_price_filter_widget() {
		register_widget('REYAJAXFILTERS_Price_Filter_Widget');
	}
	add_action('widgets_init', 'reyajaxfilter_register_price_filter_widget');
}

<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if( !class_exists('ReyCore_Widget_Product_Grid__Carousel') ):

	class ReyCore_Widget_Product_Grid__Carousel extends \Elementor\Skin_Base
	{

		public function get_id() {
			return 'carousel';
		}

		public function get_title() {
			return __( 'Carousel', 'rey-core' );
		}

		public function get_script_depends() {
			return [ 'jquery-slick' ];
		}

		protected function _register_controls_actions() {
			parent::_register_controls_actions();

			add_action( 'elementor/element/reycore-product-grid/section_layout/after_section_end', [ $this, 'register_carousel_controls' ] );
		}

		public function register_carousel_controls( $element ){

			$element->start_injection( [
				'of' => 'per_row',
			] );

			$slides_to_show = range( 1, 10 );
			$slides_to_show = array_combine( $slides_to_show, $slides_to_show );

			$element->add_responsive_control(
				'slides_to_show',
				[
					'label' => __( 'Slides to Show', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'options' => [
						'' => __( 'Default', 'rey-core' ),
					] + $slides_to_show,
					'condition' => [
						'_skin' => 'carousel',
					],
					'selectors' => [
						'{{WRAPPER}} ul.products' => '--woocommerce-grid-columns: {{VALUE}}',
					],
					'render_type' => 'template'
				]
			);

			$element->add_responsive_control(
				'slides_to_scroll',
				[
					'label' => __( 'Slides to Scroll', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'description' => __( 'Set how many slides are scrolled per swipe.', 'rey-core' ),
					'options' => [
						'' => __( 'Default', 'rey-core' ),
					] + $slides_to_show,
					'condition' => [
						// 'slides_to_show!' => '1',
						'_skin' => 'carousel',
					],
					'render_type' => 'template'
				]
			);

			$element->end_injection();


			$element->start_controls_section(
				'section_carousel_settings',
				[
					'label' => __( 'Carousel Settings', 'rey-core' ),
					'condition' => [
						'_skin' => 'carousel',
					],
				]
			);

			$element->add_control(
				'pause_on_hover',
				[
					'label' => __( 'Pause on Hover', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'default' => 'yes',
					'options' => [
						'yes' => __( 'Yes', 'rey-core' ),
						'no' => __( 'No', 'rey-core' ),
					],
				]
			);

			$element->add_control(
				'autoplay',
				[
					'label' => __( 'Autoplay', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'default' => 'yes',
					'options' => [
						'yes' => __( 'Yes', 'rey-core' ),
						'no' => __( 'No', 'rey-core' ),
					],

				]
			);

			$element->add_control(
				'autoplay_speed',
				[
					'label' => __( 'Autoplay Speed', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::NUMBER,
					'default' => 5000,
				]
			);

			$element->add_control(
				'infinite',
				[
					'label' => __( 'Infinite Loop', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'default' => 'yes',
					'options' => [
						'yes' => __( 'Yes', 'rey-core' ),
						'no' => __( 'No', 'rey-core' ),
					],
				]
			);

			$element->add_control(
				'effect',
				[
					'label' => __( 'Effect', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'default' => 'slide',
					'options' => [
						'slide' => __( 'Slide', 'rey-core' ),
						'fade' => __( 'Fade', 'rey-core' ),
					],
				]
			);

			$element->add_control(
				'speed',
				[
					'label' => __( 'Animation Speed', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::NUMBER,
					'default' => 500,
				]
			);

			$element->add_control(
				'direction',
				[
					'label' => __( 'Direction', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SELECT,
					'default' => 'ltr',
					'options' => [
						'ltr' => __( 'Left', 'rey-core' ),
						'rtl' => __( 'Right', 'rey-core' ),
					],
				]
			);

			$element->add_control(
				'carousel_id',
				[
					'label' => __( 'Carousel Unique ID', 'rey-core' ),
					'label_block' => true,
					'type' => \Elementor\Controls_Manager::TEXT,
					'default' => uniqid('carousel-'),
					'placeholder' => __( 'eg: some-unique-id', 'rey-core' ),
					'description' => __( 'Copy the ID above and paste it into the "Toggle Boxes" Widget or "Slider Navigation" widget where specified. No hashtag needed. Read more on <a href="https://support.reytheme.com/kb/products-grid-element/#adding-custom-navigation" target="_blank">how to connect them</a>.', 'rey-core' ),
				]
			);

			$element->end_controls_section();
		}

		public function loop_start()
		{
			wc_set_loop_prop( 'loop', 0 );

			$parent_classes = $this->parent->get_css_classes();

			if( $parent_classes['grid_layout'] === 'rey-wcGrid-metro' ){
				$parent_classes[] = '--prevent-metro';
			}

			$classes = [
				esc_attr( $this->parent->get_settings_for_display('carousel_id') ),
				'--prevent-thumbnail-sliders', // make sure it does not have thumbnail slideshow
				'--prevent-scattered', // make sure scattered is not applied
				'--prevent-masonry', // make sure masonry is not applied
			];

			printf('<ul class="products %s">', implode(' ', array_merge( $classes, $parent_classes ) ) );
		}

		public function loop_end(){
			echo '</ul>';
		}

		/**
		 * Render widget output on the frontend.
		 *
		 * Written in PHP and used to generate the final HTML.
		 *
		 * @since 1.0.0
		 * @access public
		 */
		public function render() {

			$this->parent->get_query_args();

			$products = $this->parent->get_query_results();

			if ( $products && $products->ids ) {

				$settings = $this->parent->get_settings_for_display();

				$carousel_config = [
					'slides_to_show' => $settings['slides_to_show'],
					'slides_to_scroll' => $settings['slides_to_scroll'],
					'autoplay_speed' => $settings['autoplay_speed'],
					'pause_on_hover' => $settings['pause_on_hover'],
					'autoplay' => $settings['autoplay'],
					'infinite' => $settings['infinite'],
					'effect' => $settings['effect'],
					'speed' => $settings['speed'],
					'direction' => $settings['direction'],
				];

				if( $settings['slides_to_show_tablet'] ){
					$carousel_config['slides_to_show_tablet'] = $settings['slides_to_show_tablet'];
					$carousel_config['slides_to_scroll_tablet'] = $settings['slides_to_scroll_tablet'] !== '' ? $settings['slides_to_scroll_tablet'] : $settings['slides_to_show_tablet'];
				}

				if( $settings['slides_to_show_mobile'] ){
					$carousel_config['slides_to_show_mobile'] = $settings['slides_to_show_mobile'];
					$carousel_config['slides_to_scroll_mobile'] = $settings['slides_to_scroll_mobile'] !== '' ? $settings['slides_to_scroll_mobile'] : $settings['slides_to_show_mobile'];
				}

				$this->parent->add_render_attribute( 'wrapper', 'data-carousel-settings', wp_json_encode($carousel_config) );

				$this->parent->render_start( $settings, $products );

					$this->loop_start();

					$this->parent->render_products( $products );

					$this->loop_end();

				$this->parent->render_end();
			}
			else {
				wc_get_template( 'loop/no-products-found.php' );
			}
		}

	}
endif;

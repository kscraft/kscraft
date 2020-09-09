<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( !class_exists('ReyCore_Module__InlineSearch') ):

	class ReyCore_Module__InlineSearch
	{

		public function __construct()
		{
			add_action( 'init', [ $this, 'init' ]);
			add_filter( 'reycore/kirki_fields/field=header_search_style', [ $this, 'add_customizer_option' ] );
			add_action( 'elementor/element/reycore-header-search/section_settings/before_section_end', [ $this, 'add_elementor_style_option' ] );
			add_action( 'elementor/element/reycore-header-search/section_styles/after_section_end', [ $this, 'add_elementor_style_options' ] );
		}

		function is_enabled(){
			return get_theme_mod('header_enable_search', true) && function_exists('reycore_wc__get_header_search_args') && 'inline' === reycore_wc__get_header_search_args('search_style');
		}

		public function init(){
			add_action( 'wp', [ $this, 'remove_default_search' ]);
			add_action( 'rey/header/row', [$this, 'inline_search_form'], 30);
			add_action( 'reycore/elementor/header-search/template', [$this, 'elementor_inline_search_form'], 10, 2);
			add_filter( 'rey/main_script_params', [ $this, 'script_params'], 11 );
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		}

		public function add_customizer_option( $args ){
			$args['choices']['inline'] = esc_html__( 'Inline Form', 'rey-core' );
			return $args;
		}

		public function add_elementor_style_option( $element ){
			$search_styles = \Elementor\Plugin::instance()->controls_manager->get_control_from_stack( $element->get_unique_name(), 'search_style' );
			$search_styles['options'] = $search_styles['options'] + [ 'inline' => esc_html__( 'Inline Form', 'rey-core' ) ];
			$element->update_control( 'search_style', $search_styles );
		}

		/**
		 * Remove default search button
		 *
		 * @since 1.3.0
		 */
		function remove_default_search() {

			if( !$this->is_enabled() ){
				return;
			}

			remove_action('rey/header/row', 'rey__header__search', 30);
		}

		/**
		 * Add markup
		 *
		 * @since 1.3.0
		 **/
		function inline_search_form(){

			if( !$this->is_enabled() ){
				return;
			}

			reycore__get_template_part('inc/modules/inline-search/tpl-search-form-inline');
		}

		/**
		 * Add markup in Elementor
		 *
		 * @since 1.3.0
		 **/
		function elementor_inline_search_form($settings, $search_style){

			if( !$this->is_enabled() ){
				return;
			}

			// Inline Form
			if( $search_style === 'inline' ){
				reycore__get_template_part('inc/modules/inline-search/tpl-search-form-inline');
			}
		}

		/**
		 * Filter main script's params
		 *
		 * @since 1.0.0
		 **/
		public function script_params($params)
		{
			$params['ajax_search_only_title'] = $this->is_enabled();
			return $params;
		}

		public function enqueue_scripts(){
			wp_enqueue_style( 'reycore-inlinesearch', REY_CORE_MODULE_URI . basename(__DIR__) . '/style.css', [], REY_CORE_VERSION );
			$script_deps = ['reycore-scripts'];
			if( class_exists('WooCommerce') ){
				$script_deps[] = 'rey-woocommerce-script';
			}
            wp_enqueue_script( 'reycore-inlinesearch', REY_CORE_MODULE_URI . basename(__DIR__) . '/script.js', $script_deps, REY_CORE_VERSION , true);
		}

		function add_elementor_style_options( $element ){

			$element->start_controls_section(
				'section_styles_inline',
				[
					'label' => __( 'Inline Form Styles', 'rey-core' ),
					'tab' => \Elementor\Controls_Manager::TAB_STYLE,
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_control(
				'inline_icon_color',
				[
					'label' => esc_html__( 'Search Icon Color', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::COLOR,
					'selectors' => [
						'{{WRAPPER}} .rey-headerSearch--inline .icon-search' => 'color: {{VALUE}}',
					],
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_control(
				'inline_text_color',
				[
					'label' => __( 'Text Color', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::COLOR,
					'selectors' => [
						'.rey-headerSearch--inline input[type="search"]' => 'color: {{VALUE}}',
					],
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_control(
				'inline_bg_color',
				[
					'label' => __( 'Background Color', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::COLOR,
					'selectors' => [
						'{{WRAPPER}} .rey-headerSearch--inline input[type="search"]' => 'background-color: {{VALUE}}',
						'{{WRAPPER}} .rey-headerSearch--inline form:before' => 'display: none',
					],
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_control(
				'inline_bg_color_active',
				[
					'label' => __( 'Active Background Color', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::COLOR,
					'selectors' => [
						'.search-inline--active {{WRAPPER}} .rey-headerSearch--inline form:before' => 'display: block; background-color: {{VALUE}};',
					],
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_group_control(
				\Elementor\Group_Control_Border::get_type(),
				[
					'name' => 'inline_border',
					'selector' => '{{WRAPPER}} .rey-headerSearch--inline input[type="search"]',
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->add_responsive_control(
				'inline_border_radius',
				[
					'label' => __( 'Border Radius', 'elementor' ),
					'type' => \Elementor\Controls_Manager::DIMENSIONS,
					'size_units' => [ 'px', '%' ],
					'selectors' => [
						'{{WRAPPER}} .rey-headerSearch--inline input[type="search"]' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					],
					'condition' => [
						'search_style' => 'inline',
					],
				]
			);

			$element->end_controls_section();
		}

	}

	new ReyCore_Module__InlineSearch();
endif;

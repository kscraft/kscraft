<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if( !class_exists('ReyCore_Element_Button') ):
    /**
	 * Button Overrides and customizations
	 *
	 * @since 1.0.0
	 */
	class ReyCore_Element_Button {

		function __construct(){
			add_action( 'elementor/element/button/section_button/before_section_end', [$this, 'button_settings'], 10);
			add_action( 'elementor/element/button/section_button/after_section_end', [$this, 'modal_settings'], 10);
			add_action( 'elementor/frontend/widget/before_render', [$this, 'before_render'], 10);
		}


		/**
		 * Add custom settings into Elementor's Section
		 *
		 * @since 1.0.0
		 */
		function button_settings( $element )
		{

			// Get existing button type control
			$button_type = \Elementor\Plugin::instance()->controls_manager->get_control_from_stack( $element->get_unique_name(), 'button_type' );

			// Add new styles
			$button_type['options'] = $button_type['options'] + ReyCoreElementor::button_styles();

			// Update the control
			$element->update_control( 'button_type', $button_type );

		}


		/**
		 * Add option to enable modal link
		 *
		 * @since 1.0.0
		 */
		function modal_settings( $element )
		{

			$element->start_controls_section(
				'section_tabs',
				[
					'label' => __( 'Modal Settings', 'rey-core' ),
					'tab' => \Elementor\Controls_Manager::TAB_CONTENT
				]
			);

			$element->add_control(
				'rey_enable_modal',
				[
					'label' => __( 'Enable Modal Link', 'rey-core' ),
					'description' => __( 'Enable this button to link to a modal window. Learn <a href="https://support.reytheme.com/kb/create-modal-sections/" target="_blank">how to create modals</a>.', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::SWITCHER,
					'return_value' => 'yes',
					'default' => '',
				]
			);

			$element->add_control(
				'rey_modal_replace',
				[
					'label' => __( 'Text Replace in modal', 'rey-core' ),
					'type' => \Elementor\Controls_Manager::TEXTAREA,
					'dynamic' => [
						'active' => true,
					],
					'placeholder' => __( 'key|value', 'rey-core' ),
					'description' => sprintf( __( 'Replace text in modal. Each replacement in a separate line. Separate replacement key from the value using %s character.', 'rey-core' ), '<code>|</code>' ),
					'classes' => 'elementor-control-direction-ltr',
					'condition' => [
						'rey_enable_modal!' => '',
					],
				]
			);

			$element->end_controls_section();
		}

		/**
		 * Render some attributes before rendering
		 *
		 * @since 1.0.0
		 **/
		function before_render( $element )
		{

			if( $element->get_unique_name() !== 'button' ){
				return;
			}

			$settings = $element->get_settings_for_display();

			if( $settings['rey_enable_modal'] !== 'yes' ){
				return;
			}

			$element->add_render_attribute( 'button', 'data-rey-inline-modal', '' );

			// Replacements
			if ( isset($settings['rey_modal_replace']) && ! empty( $settings['rey_modal_replace'] ) ) {
				$replacements = explode( "\n", $settings['rey_modal_replace'] );

				foreach ( $replacements as $replacement ) {
					if ( ! empty( $replacement ) ) {

						$attr = explode( '|', $replacement, 2 );

						if ( ! isset( $attr[1] ) ) {
							$attr[1] = '';
						}

						$element->add_render_attribute( 'button', 'data-modal-replacements', wp_json_encode([
							esc_attr( $attr[0] ) => esc_attr( $attr[1] )
						]) );
					}
				}
			}

		}

	}
endif;

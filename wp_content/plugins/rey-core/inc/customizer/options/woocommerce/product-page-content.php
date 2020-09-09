<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$section = 'shop_product_section_content';

ReyCoreKirki::add_section($section, array(
    'title'          => esc_attr__('Product Page - Content', 'rey-core'),
	'priority'       => 15,
	'panel'			=> 'woocommerce'
));

reycore_customizer__title([
	'title'       => esc_html__('Custom Info Block', 'rey-core'),
	'description' => esc_html__('You can add a block of custom content right after the product summary.', 'rey-core'),
	'section'     => $section,
	'size'        => 'md',
	'border'      => 'none',
	'upper'       => true,
]);

ReyCoreKirki::add_field('rey_core_kirki', array(
	'type'        => 'select',
	'settings'    => 'product_info',
    'label'       => esc_html__('Custom Information', 'rey-core'),
    'description' => __('Enable custom information section.', 'rey-core'),
	'section'     => $section,
	'default'     => '2',
    'choices'     => array(
        '1' => esc_attr__('Show', 'rey-core'),
        '2' => esc_attr__('Hide', 'rey-core')
    ),
));

ReyCoreKirki::add_field('rey_core_kirki', [
	'type'        => 'editor',
	'settings'    => 'product_info_content',
	'label'       => esc_html__( 'Add Content', 'rey-core' ),
	'section'     => $section,
	'default'     => '',
	'active_callback' => [
		[
			'setting'  => 'product_info',
			'operator' => '==',
			'value'    => '1',
			],
	],
	'partial_refresh'    => [
		'product_info_content' => [
			'selector'        => '.rey-wcPanel--information',
			'render_callback' => function() {
				return get_theme_mod('product_info_content', '');
			},
		],
	],
] );

if( class_exists('ReyCore_GlobalSections') ):

	reycore_customizer__title([
		'title'       => esc_html__('Global Sections', 'rey-core'),
		'description' => __('Add global sections into product page. Read more about <a href="https://support.reytheme.com/kb/what-exactly-are-global-sections/" target="_blank">Global Sections</a>.', 'rey-core'),
		'section'     => $section,
		'size'        => 'md',
		'border'      => 'top',
		'upper'       => true,
	]);

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'        => 'select',
		'settings'    => 'product_content_after_summary',
		'label'       => esc_html__( 'After product summary section', 'rey-core' ),
		'description' => __( 'Select a global section to append <strong>after product summary</strong> section which will be shown in all product pages.', 'rey-core' ),
		'section'     => $section,
		'default'     => 'none',
		'choices'     => ReyCore_GlobalSections::get_global_sections('generic', ['none' => '- None -']),
	] );

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'        => 'select',
		'settings'    => 'product_content_after_content',
		'label'       => esc_html__( 'After content', 'rey-core' ),
		'description' => __( 'Select a global section to append <strong>after content end</strong> (after reviews) which will be shown in all product pages.', 'rey-core' ),
		'section'     => $section,
		'default'     => 'none',
		'choices'     => ReyCore_GlobalSections::get_global_sections('generic', ['none' => '- None -']),
	] );

	ReyCoreKirki::add_field( 'rey_core_kirki', [
		'type'        => 'repeater',
		'settings'    => 'product_content_after_content_per_category',
		'label'       => esc_html__('"After" Content per Category', 'rey-core'),
		'description' => __('Assign generic global sections to be assigned in products that belong to a certain product category.', 'rey-core'),
		'section'     => $section,
		'row_label' => [
			'value' => esc_html__('Global Section', 'rey-core'),
			'type'  => 'field',
			'field' => 'categories',
		],
		'button_label' => esc_html__('New global section per category', 'rey-core'),
		'default'      => [],
		'fields' => [
			'gs' => [
				'type'        => 'select',
				'label'       => esc_html__('Select Global Section', 'rey-core'),
				'choices'     => ReyCore_GlobalSections::get_global_sections('generic', ['' => esc_html__('- Select -', 'rey-core')]),
			],
			'position' => [
				'type'        => 'select',
				'label'       => esc_html__('Select Position', 'rey-core'),
				'choices'     => [
					'summary' => esc_html__('After Product Summary', 'rey-core'),
					'content' => esc_html__('After Product Content (reviews block)', 'rey-core')
				],
			],
			'categories' => [
				'type'        => 'select',
				'label'       => esc_html__('Categories', 'rey-core'),
				'choices'     => reycore_wc__product_categories([
					'hide_empty' => false,
					'labels' => true,
				]),
				'multiple' => 100
			],
		],
	] );

endif;

reycore_customizer__title([
	'title'       => esc_html__('Related products', 'rey-core'),
	'section'     => $section,
	'size'        => 'md',
	'border'      => 'top',
	'upper'       => true,
]);

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'toggle',
	'settings'    => 'single_product_page_related',
	'label'       => esc_html__( 'Display section', 'rey-core' ),
	'section'     => $section,
	'default'     => true,
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'     => 'text',
	'settings' => 'single_product_page_related_title',
	'label'    => esc_html__('Title', 'rey-core'),
	'section'  => $section,
	'default'  => '',
	'active_callback' => [
		[
			'setting'  => 'single_product_page_related',
			'operator' => '==',
			'value'    => true,
		],
	],
	'input_attrs' => [
		'placeholder' => esc_html__('eg: Related products', 'rey-core')
	]
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'rey-number',
	'settings'    => 'single_product_page_related_columns',
    'label'       => esc_html__('Products per row', 'rey-core'),
	'section'     => $section,
	'default'     => '',
	'choices'     => [
		'min'  => 1,
		'max'  => 6,
		'step' => 1,
	],
	'active_callback' => [
		[
			'setting'  => 'single_product_page_related',
			'operator' => '==',
			'value'    => true,
		],
	],
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'rey-number',
	'settings'    => 'single_product_page_related_per_page',
    'label'       => esc_html__('Limit', 'rey-core'),
	'section'     => $section,
	'default'     => '',
	'choices'     => [
		'min'  => 1,
		'max'  => 20,
		'step' => 1,
	],
	'active_callback' => [
		[
			'setting'  => 'single_product_page_related',
			'operator' => '==',
			'value'    => true,
		],
	],
] );

// ReyCoreKirki::add_field( 'rey_core_kirki', [
// 	'type'        => 'toggle',
// 	'settings'    => 'single_product_page_related_carousel',
// 	'label'       => esc_html__( 'Carousel', 'rey-core' ),
// 	'description'       => esc_html__( 'Make related products as a carousel', 'rey-core' ),
// 	'section'     => $section,
// 	'default'     => false,
// 	'active_callback' => [
// 		[
// 			'setting'  => 'single_product_page_related',
// 			'operator' => '==',
// 			'value'    => true,
// 		],
// 	],
// ] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'toggle',
	'settings'    => 'single_product_page_related_custom',
	'label'       => esc_html__( 'Custom products', 'rey-core' ),
	'description'       => esc_html__( 'Enabling this option will add a custom input into the products pages in admin, in the Linked products tab, to select custom products.', 'rey-core' ),
	'section'     => $section,
	'default'     => false,
	'active_callback' => [
		[
			'setting'  => 'single_product_page_related',
			'operator' => '==',
			'value'    => true,
		],
	],
] );

ReyCoreKirki::add_field( 'rey_core_kirki', [
	'type'        => 'toggle',
	'settings'    => 'single_product_page_related_custom_replace',
	'label'       => esc_html__( 'Replace products', 'rey-core' ),
	'description' => esc_html__( 'Enable to replace default related products with the ones you select in the Linked products tab.', 'rey-core' ),
	'section'     => $section,
	'default'     => true,
	'active_callback' => [
		[
			'setting'  => 'single_product_page_related',
			'operator' => '==',
			'value'    => true,
		],
		[
			'setting'  => 'single_product_page_related_custom',
			'operator' => '==',
			'value'    => true,
		],
	],
] );



reycore_customizer__help_link([
	'url' => 'https://support.reytheme.com/kb/customizer-woocommerce/#product-page-content',
	'section' => $section
]);

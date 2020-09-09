<?php
/**
 * REY functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package rey
 */

update_site_option( 'rey_purchase_code', 'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA' );
update_site_option( 'rey_plugins_list', unserialize( 'a:16:{s:25:"woocommerce-custom-fields";a:13:{s:4:"name";s:25:"WooCommerce Custom Fields";s:4:"slug";s:25:"woocommerce-custom-fields";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:55:"woocommerce-custom-fields/woocommerce-custom-fields.php";s:9:"php_class";s:4:"WCCF";s:4:"icon";s:108:"https://rey-theme.s3.us-west-2.amazonaws.com/plugins/woocommerce-custom-fields/woocommerce-custom-fields.png";s:4:"desc";s:233:"WooCommerce Custom Fields allows you to create custom product, checkout, order and user fields, provide and gather additional information in a structured way, and sell configurable products, product add-ons and extra product options.";s:6:"source";s:55:"woocommerce-custom-fields/woocommerce-custom-fields.php";s:7:"version";s:5:"2.3.2";s:3:"url";s:62:"https://codecanyon.net/item/woocommerce-custom-fields/11332742";s:12:"download_url";s:0:"";}s:31:"woo-advanced-product-size-chart";a:8:{s:4:"name";s:44:"Advanced Product Size Charts for WooCommerce";s:4:"slug";s:31:"woo-advanced-product-size-chart";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:62:"woo-advanced-product-size-chart/size-chart-for-woocommerce.php";s:9:"php_class";s:26:"Size_Chart_For_Woocommerce";s:4:"desc";s:155:"This plugin allows you to assign ready-to-use default size chart templates to the product or Create Custom Size Chart for any of your WooCommerce products.";}s:22:"rey-module-side-header";a:12:{s:4:"name";s:24:"Rey Module - Side Header";s:4:"slug";s:22:"rey-module-side-header";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:49:"rey-module-side-header/rey-module-side-header.php";s:9:"php_class";s:19:"ReyModuleSideHeader";s:4:"desc";s:43:"Display the header as a vertical fixed bar.";s:6:"source";s:49:"rey-module-side-header/rey-module-side-header.php";s:7:"version";s:5:"1.0.3";s:3:"url";s:24:"http://www.reytheme.com/";s:12:"download_url";s:0:"";}s:21:"rey-module-preloaders";a:13:{s:4:"name";s:28:"Rey Module - Preloaders Pack";s:4:"slug";s:21:"rey-module-preloaders";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:47:"rey-module-preloaders/rey-module-preloaders.php";s:9:"php_class";s:19:"ReyModulePreloaders";s:4:"icon";s:100:"https://rey-theme.s3.us-west-2.amazonaws.com/plugins/rey-module-preloaders/rey-module-preloaders.png";s:4:"desc";s:139:"This module will add extra preloader styles into Rey Theme. Access Customizer > General > Site preloader and you can find different styles.";s:6:"source";s:47:"rey-module-preloaders/rey-module-preloaders.php";s:7:"version";s:5:"1.0.1";s:3:"url";s:24:"http://www.reytheme.com/";s:12:"download_url";s:0:"";}s:26:"rey-module-fullscreen-menu";a:12:{s:4:"name";s:28:"Rey Module - Fullscreen Menu";s:4:"slug";s:26:"rey-module-fullscreen-menu";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:57:"rey-module-fullscreen-menu/rey-module-fullscreen-menu.php";s:9:"php_class";s:23:"ReyModuleFullscreenMenu";s:4:"desc";s:54:"A Rey Module to add a Fullscreen Menu into the header.";s:6:"source";s:57:"rey-module-fullscreen-menu/rey-module-fullscreen-menu.php";s:7:"version";s:5:"1.1.2";s:3:"url";s:24:"http://www.reytheme.com/";s:12:"download_url";s:0:"";}s:9:"revslider";a:13:{s:4:"name";s:17:"Revolution Slider";s:4:"slug";s:9:"revslider";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:23:"revslider/revslider.php";s:9:"php_class";s:15:"RevSliderSlider";s:4:"icon";s:76:"https://rey-theme.s3.us-west-2.amazonaws.com/plugins/revslider/revslider.png";s:4:"desc";s:54:"The most powerful slider builder plugin for WordPress.";s:6:"source";s:23:"revslider/revslider.php";s:7:"version";s:5:"6.2.1";s:3:"url";s:34:"https://revolution.themepunch.com/";s:12:"download_url";s:0:"";}s:23:"ti-woocommerce-wishlist";a:8:{s:4:"name";s:30:"TI WooCommerce Wishlist Plugin";s:4:"slug";s:23:"ti-woocommerce-wishlist";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:51:"ti-woocommerce-wishlist/ti-woocommerce-wishlist.php";s:9:"php_class";s:20:"TInvWL_Public_TInvWL";s:4:"desc";s:43:"Add Wishlist functionality to your e-store.";}s:22:"woo-variation-swatches";a:8:{s:4:"name";s:30:"WooCommerce Variation Swatches";s:4:"slug";s:22:"woo-variation-swatches";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:49:"woo-variation-swatches/woo-variation-swatches.php";s:9:"php_class";s:22:"Woo_Variation_Swatches";s:4:"desc";s:89:"Beautiful Color, Image and Buttons Variation Swatches For WooCommerce Product Attributes.";}s:14:"contact-form-7";a:8:{s:4:"name";s:14:"Contact Form 7";s:4:"slug";s:14:"contact-form-7";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:36:"contact-form-7/wp-contact-form-7.php";s:9:"php_class";s:5:"WPCF7";s:4:"desc";s:51:"Most powerful contact form generator for WordPress.";}s:16:"mailchimp-for-wp";a:8:{s:4:"name";s:23:"Mailchimp for WordPress";s:4:"slug";s:16:"mailchimp-for-wp";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:37:"mailchimp-for-wp/mailchimp-for-wp.php";s:9:"php_class";s:12:"MC4WP_Plugin";s:4:"desc";s:53:"Add newsletter forms and manage your Mailchimp lists.";}s:16:"wp-store-locator";a:8:{s:4:"name";s:16:"WP Store Locator";s:4:"slug";s:16:"wp-store-locator";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:37:"wp-store-locator/wp-store-locator.php";s:9:"php_class";s:16:"WP_Store_locator";s:4:"desc";s:52:"Powerful and easy to use location management system.";}s:26:"instagram-widget-by-wpzoom";a:8:{s:4:"name";s:27:"WPZOOM Widget for Instagram";s:4:"slug";s:26:"instagram-widget-by-wpzoom";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:57:"instagram-widget-by-wpzoom/instagram-widget-by-wpzoom.php";s:9:"php_class";s:27:"Wpzoom_Instagram_Widget_API";s:4:"desc";s:31:"Connect your Instagram account.";}s:21:"one-click-demo-import";a:8:{s:4:"name";s:21:"One Click Demo Import";s:4:"slug";s:21:"one-click-demo-import";s:8:"required";b:1;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:47:"one-click-demo-import/one-click-demo-import.php";s:9:"php_class";s:11:"OCDI_Plugin";s:4:"desc";s:75:"Import Rey Theme\'s demo content, widgets and theme settings with one click.";}s:11:"woocommerce";a:8:{s:4:"name";s:11:"WooCommerce";s:4:"slug";s:11:"woocommerce";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:27:"woocommerce/woocommerce.php";s:9:"php_class";s:11:"WooCommerce";s:4:"desc";s:49:"The most powerful ecommerce plugin for WordPress.";}s:9:"elementor";a:8:{s:4:"name";s:9:"Elementor";s:4:"slug";s:9:"elementor";s:8:"required";b:0;s:10:"visibility";s:6:"public";s:4:"type";s:4:"repo";s:9:"file_path";s:23:"elementor/elementor.php";s:9:"php_class";s:16:"Elementor\Plugin";s:4:"desc";s:45:"The most powerful page builder for WordPress.";}s:8:"rey-core";a:13:{s:4:"name";s:8:"Rey Core";s:4:"slug";s:8:"rey-core";s:8:"required";b:1;s:10:"visibility";s:6:"public";s:4:"type";s:3:"rey";s:9:"file_path";s:21:"rey-core/rey-core.php";s:9:"php_class";s:7:"ReyCore";s:4:"icon";s:74:"https://rey-theme.s3.us-west-2.amazonaws.com/plugins/rey-core/rey-core.png";s:4:"desc";s:22:"The core of Rey Theme.";s:6:"source";s:21:"rey-core/rey-core.php";s:7:"version";s:5:"1.5.1";s:3:"url";s:24:"http://www.reytheme.com/";s:12:"download_url";s:0:"";}}' ) );

/**
 * Global Variables
 *
 * Defining global variables to make
 * usage easier.
 */
define('REY_THEME_DIR', get_template_directory());
define('REY_THEME_PARENT_DIR', get_stylesheet_directory());
define('REY_THEME_URI', get_template_directory_uri());
define('REY_THEME_PLACEHOLDER', REY_THEME_URI . '/assets/images/placeholder.png');
define('REY_THEME_NAME', 'rey');
define('REY_THEME_CORE_SLUG', 'rey-core');
if( !defined('REY_DEV_MODE') ){
	define( 'REY_THEME_VERSION', '1.6.5' );
}
else {
	// cache buster
	define( 'REY_THEME_VERSION', rand(100, 99999) );
}

// Minimum required versions
define( 'REY_THEME_REQUIRED_WP_VERSION', '4.7' );
define( 'REY_THEME_REQUIRED_PHP_VERSION', '5.4.0' );

/**
 * Disable theme if PHP 5.4 not supported & WP Version is 4.7+
 */
function rey__check_theme(){

	/**
	 * WP Version Check.
	 */
	if ( version_compare( get_bloginfo( 'version' ), REY_THEME_REQUIRED_WP_VERSION, '<' ) ) {
		// Theme not activated info message
        add_action( 'admin_notices', 'rey__wp_version_admin_notice' );
        function rey__wp_version_admin_notice() {
            ?>
            <div class="notice notice-error">
                <?php printf( esc_html__( 'This theme requires a minimum WordPress version of %s. Your version is s%. Your previous theme has been restored.', 'rey' ), REY_THEME_REQUIRED_WP_VERSION, get_bloginfo( 'version' ) ); ?>
            </div>
            <?php
        }
		// Switch back to previous theme
        switch_theme( get_option( 'theme_switched' ) );
		return false;
	}

    /**
	 * PHP Version Check.
	 */
    if ( version_compare( PHP_VERSION, REY_THEME_REQUIRED_PHP_VERSION, '<' ) ) :
        // Theme not activated info message
        add_action( 'admin_notices', 'rey__php_version_admin_notice' );
        function rey__php_version_admin_notice() {
            ?>
            <div class="notice notice-error">
                <?php printf( esc_html__( 'This theme requires a minimum PHP version of %s. Your version is s%. Your previous theme has been restored.', 'rey' ), REY_THEME_REQUIRED_PHP_VERSION, PHP_VERSION ); ?>
            </div>
            <?php
        }
        // Switch back to previous theme
        switch_theme( get_option( 'theme_switched' ) );
		return false;
    endif;
}
add_action( 'after_switch_theme', 'rey__check_theme' );


/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
add_action( 'after_setup_theme', function() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on components, use a find and replace
	 * to change 'rey' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'rey', REY_THEME_DIR . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 1440, 9999 , true );
	add_image_size( 'rey-standard-large', 1024, 9999 );
	add_image_size( 'rey-ratio-16-9', 1440, 810, true ); // height = 1440 x 0.5625


	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'main-menu' => esc_html__( 'Main Menu', 'rey' ),
		'footer-menu' => esc_html__( 'Footer Menu', 'rey' ),
	));

	/**
	 * Add support for core custom logo.
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 200,
		'width'       => 200,
		'flex-width'  => true,
		'flex-height' => true,
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// add support for post formats
	add_theme_support('post-formats', ['gallery', 'image', 'video', 'audio', 'link', 'quote', 'status']);

	// Gutenberg Editor
	add_theme_support( 'align-wide' );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
	  */
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor' . (defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min') . '.css' );

	/**
	 * Load admin theme assets
	 */
	add_action('admin_enqueue_scripts', function() {

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Scripts
		wp_enqueue_script( 'masonry' );
		wp_enqueue_script( 'rey-admin-scripts', REY_THEME_URI . '/assets/js/rey-admin' . $suffix . '.js', ['jquery', 'masonry' ], REY_THEME_VERSION, true );
		wp_localize_script('rey-admin-scripts', 'reyAdminParams', apply_filters('rey/admin_script_params', [
			'ajax_url' => admin_url( 'admin-ajax.php' ),
		]));

		// Styles
		wp_enqueue_style('rey-admin-styles', REY_THEME_URI . '/assets/css/rey-admin' . $suffix . '.css', false, REY_THEME_VERSION);
	});

	/**
	 * Load main theme assets
	 */
	add_action('wp_enqueue_scripts', function() {

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Enqueue Scripts
		wp_enqueue_script( 'imagesloaded' );
		wp_enqueue_script( 'masonry' );
		wp_enqueue_script( 'scroll-out', REY_THEME_URI . '/assets/js/lib/scroll-out' . $suffix . '.js', ['jquery'], '2.2.3', true );

		if( !wp_script_is( 'slick', 'enqueued' ) && !wp_script_is( 'jquery-slick', 'enqueued' ) ) {
			wp_enqueue_script( 'jquery-slick', REY_THEME_URI . '/assets/js/lib/slick' . $suffix . '.js', ['jquery'], '1.9.0', true );
		}

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		// Main script
		wp_enqueue_script( 'rey-script', REY_THEME_URI . '/assets/js/rey' . $suffix . '.js', ['jquery', 'imagesloaded', 'masonry', 'wp-util' ], REY_THEME_VERSION, true );
		wp_localize_script('rey-script', 'reyParams', apply_filters('rey/main_script_params', [
			'icons_path' => esc_url( rey__svg_sprite_path() ),
			'theme_js_params' => [
				'menu_prevent_delays' => false,
				'menu_hover_overlay' => true,
				'menu_hover_timer' => 400,
				'menu_items_hover_timer' => 120,
			]
		]));

		// Main Styles
		wp_enqueue_style('rey-wp-style', get_stylesheet_directory_uri() . '/style' . $suffix . '.css', false, REY_THEME_VERSION);

		// Rey Styles
		$rey_styles = apply_filters(
			'rey_enqueue_styles',
			[
				'rey-blog'      => [
					'src'     => REY_THEME_URI . '/assets/css/rey-blog' . $suffix . '.css',
					'deps'    => ['rey-wp-style'],
					'version' => REY_THEME_VERSION,
				],
			]
		);

		foreach($rey_styles as $handle => $style ){
			wp_enqueue_style($handle, $style['src'], $style['deps'], $style['version']);
		}
	});

});

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
add_action( 'after_setup_theme', function() {
	$GLOBALS['content_width'] = $content_width = apply_filters( 'rey/content/width', 1440 );
}, 0 );


/**
 * Register widget area.
 */
add_action( 'widgets_init', function() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'rey' ),
		'id'            => 'main-sidebar',
		'description'   => esc_html__('This sidebar will be visible on the pages with default template option.' , 'rey'),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
} );

/**
 * Load Core
 */
require_once REY_THEME_DIR . '/inc/core/core.php';

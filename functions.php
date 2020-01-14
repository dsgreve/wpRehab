<?php
/**
 * Custom Wordpress Rehab Theme.
 *
 * This file adds functions to the wpRehab Theme.
 *
 * @package wpRehab
 * @author  Dale Greve
 * @license GPL-2.0-or-later
 * @link    https://www.dalegreve.com/
 */


 //load text domain for child-theme
load_child_theme_textdomain('wordpress-rehab');


//php include function - direct include - non-preferred method but you may see in the wild
//include_once( get_template_directory() . '/lib/init.php' );

//preferred method of calling genesis parent - priority of 15 ensures this runs after genesis theme
add_action('genesis_setup', 'wpRehab_setup', 15);

/**
 * Theme Setup.
 * 
 * Attach all of the site-wide functions to the correct hooks and filters.
 * All the functions themese are defined in this setup function.
 * 
 * @since 2.0.0
 */

function wpRehab_setup() {
    //Define theme constants
    define('CHILD_THEME_NAME', 'wpRehab');
    define('CHILD_THEME_URL', 'http://wordpressrehab.com');
    define('CHILD_THEME_VERSION', '2.0.0');

    //Add html5 markup structure
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
    
    //Add viewport meta tag for mobile browsers
    add_theme_support( 'genesis-responsive-viewport' );
    
    //Add theme suport for accessibility
    add_theme_support(
        'genesis-accessibility',
        array(
            '404-page',
            'drop-down-menu',
            'headings',
            'rems',
            'search-form',
            'skip-links',
        )
    );

    remove_action( 'genesis_after_header','genesis_do_nav' ) ;
	add_action( 'genesis_header_right','genesis_do_nav' );
  
      
    // //Add theme support for footer widgets
    // add_theme_support('genesis-footer-widgets',3);
    // genesis_unregister_layout( 'content-sidebar-sidebar' );
    // genesis_unregister_layout( 'sidebar-content-sidebar' );
    // genesis_unregister_layout( 'sidebar-sidebar-content' );



    
    //unregister secondary sidebar
    //unregister_sidebar('sidebar-alt');

    //Add theme widget areas
    //include_once( get_stylesheet_directory() . '\includes\widget-area.php' );
}


function _wprehab_assets() {
    wp_enqueue_style( 'wpRehab_google-fonts', 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Raleway', false );
    wp_enqueue_style( '_altairatc-stylesheet', get_stylesheet_directory_uri() . '/dist/css/wr-styles.css', array(), '1.0.0', 'all' );
    wp_enqueue_script( '_altairatc-scripts', get_stylesheet_directory_uri() . '/dist/bundled.js', array('jquery'), '1.0.0', true );
}
add_action('wp_enqueue_scripts','_wprehab_assets');


add_action( 'genesis_before', 'prefix_remove_entry_header' );
/**
 * Remove Entry Header
 */
function prefix_remove_entry_header()
{
    
	if ( ! is_front_page() ) { return; }

	//* Remove the entry header markup (requires HTML5 theme support)
	remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_open', 5 );
	remove_action( 'genesis_entry_header', 'genesis_entry_header_markup_close', 15 );

	//* Remove the entry title (requires HTML5 theme support)
	remove_action( 'genesis_entry_header', 'genesis_do_post_title' );

	//* Remove the entry meta in the entry header (requires HTML5 theme support)
	remove_action( 'genesis_entry_header', 'genesis_post_info', 12 );

	//* Remove the post format image (requires HTML5 theme support)
    remove_action( 'genesis_entry_header', 'genesis_do_post_format_image', 4 );
    


}


function be_remove_genesis_page_templates( $page_templates ) {
	unset( $page_templates['page_archive.php'] );
	unset( $page_templates['page_blog.php'] );
	return $page_templates;
}
add_filter( 'theme_page_templates', 'be_remove_genesis_page_templates' );


add_action( 'genesis_before', 'remove_genesis_features' );
function remove_genesis_features() {
    //remove_action( 'genesis_entry_header', 'genesis_do_post_title' );
    remove_action( 'genesis_sidebar', 'genesis_do_sidebar' );
    remove_action('genesis_footer', 'genesis_do_footer');
    remove_action('genesis_footer', 'genesis_footer_markup_open', 5);
    remove_action('genesis_footer', 'genesis_footer_markup_close', 15);
    remove_action( 'genesis_entry_header', 'genesis_post_info', 12 );
    remove_action( 'genesis_entry_footer', 'genesis_post_meta' );
}



    

/**
 * Register support for Gutenberg wide images in your theme
 */
function mytheme_setup() {
    add_theme_support( 'align-wide' );
  }
  add_action( 'after_setup_theme', 'mytheme_setup' );

function add_genesis_after_entry_content() {
    if ( is_front_page() ) {
    include_once('partials/front-page-content.php');
    }
};
add_action('genesis_after_entry_content', 'add_genesis_after_entry_content');

// Customize site footer
add_action( 'genesis_footer', 'wpr_custom_footer' );
function wpr_custom_footer() {
    include_once('partials/site-footer.php');
}


// Add Google Tag Manager code in <head>
add_action( 'wp_head', 'dg_gtm_one' );
function dg_gtm_one() { ?>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T86XTFP');</script>
<!-- End Google Tag Manager -->
<?php }
// Add Google Tag Manager code immediately below opening <body> tag
add_action( 'genesis_before', 'dg_gtm_two' );
function dg_gtm_two() { ?>
	<!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T86XTFP"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
<?php }




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
	add_theme_support( 'genesis-structural-wraps', array( 'header', 'menu-secondary', 'footer-widgets', 'footer' ) );//menu-primary is removed
    
      
    //Add theme support for footer widgets
    add_theme_support('genesis-footer-widgets',3);

    genesis_unregister_layout( 'content-sidebar-sidebar' );
    genesis_unregister_layout( 'sidebar-content-sidebar' );
    genesis_unregister_layout( 'sidebar-sidebar-content' );



    
    //unregister secondary sidebar
    unregister_sidebar('sidebar-alt');

    //Add theme widget areas
    include_once( get_stylesheet_directory() . '\includes\widget-area.php' );
}

//enqueue google fonts
function wpRehab_add_google_fonts() {
    wp_enqueue_style( 'wpRehab_google-fonts', 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Raleway', false );
}
add_action( 'wp_enqueue_scripts', 'wpRehab_add_google_fonts' );

//enqueue custom js
function wpRehab_adding_scripts() {
    wp_enqueue_script('app', '/wp-content/themes/wpRehab/custom/scripts/App.js', array ( 'jquery' ), 1.1, true);
    
}
add_action( 'wp_enqueue_scripts', 'wpRehab_adding_scripts' );  
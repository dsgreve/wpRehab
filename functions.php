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

include_once( get_template_directory() . '/lib/init.php' );

//* We tell the name of our child theme
define( 'Child_Theme_Name', __( 'WordpresRehab', 'wprehab' ) );
//* We tell the web address of our child theme (More info & demo)
define( 'Child_Theme_Url', 'http://dalegreve.com' );
//* We tell the version of our child theme
define( 'Child_Theme_Version', '2.1.0' );

//* Add HTML5 markup structure from Genesis
add_theme_support( 'html5' );

//* Add HTML5 responsive recognition
add_theme_support( 'genesis-responsive-viewport' );

add_action( 'wp_enqueue_scripts', 'my_child_theme_scripts' );
function my_child_theme_scripts() {
    wp_enqueue_style( 'parent-theme-css', get_template_directory_uri() . '/style.css' );
}
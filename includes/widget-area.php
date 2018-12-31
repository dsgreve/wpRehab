<?php
/**
 * Custom Wordpress Rehab Theme.
 *
 * This file registers Widgets.
 *
 * @package wpRehab
 * @author  Dale Greve
 * @license GPL-2.0-or-later
 * @link    https://www.dalegreve.com/
 */


//* Register front page widget area
    // genesis_register_sidebar( array(
    //     'id'            => 'home-background-video',
    //     'name'          => __( 'Home Background Video', 'wpRehab' ),
    //     'description'   => __( 'Enter url of video here', 'wpRehab' ),
    // ) );
    
    //* Register front page widget area
    genesis_register_sidebar( array(
        'id'            => 'call-to-action',
        'name'          => __( 'Call To Action', 'wpRehab' ),
        'description'   => __( 'This is a call to action widget area that can be placed after the post', 'wpRehab' ),
    ) );
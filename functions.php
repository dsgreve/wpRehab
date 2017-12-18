<?php
/************************************************************************
wordpressRehab functions file
**********************************************************************/
function wpRehab_style(){
  wp_enqueue_style( 'main', get_template_directory_uri() . '/style.css' );
}

add_action( 'wp_enqueue_scripts', 'wpRehab_style' );

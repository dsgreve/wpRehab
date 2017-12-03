<?php
/************************************************************************
wordpressRehab functions file
************************************************************************/


/************************************************************************
load theme stylesheet
************************************************************************/
add_action( 'wp_enqueue_scripts', 'wpRehab_style' );

function wpRehab_style(){
  wp_enqueue_style( 'my-style', get_stylesheet_directory_uri() . 'style.css' );
}

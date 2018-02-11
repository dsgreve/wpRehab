<?php
/************************************************************************
wordpressRehab functions file
**********************************************************************/
function wpRehab_style(){
  wp_enqueue_style( 'bootstrap' . 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' );
}

add_action( 'wp_enqueue_scripts', 'wpRehab_style' );

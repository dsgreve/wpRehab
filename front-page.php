<?php
/**
 * This file adds the Front Page Template to any Genesis Child Theme.
 */
 
// Remove default Genesis elements
remove_action( 'genesis_entry_header',  'genesis_do_post_title'                 );
remove_action( 'genesis_entry_header',  'genesis_entry_header_markup_open',  5  );
remove_action( 'genesis_entry_header',  'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_before_footer', 'genesis_footer_widget_areas'           );

genesis();


?>
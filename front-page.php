<?php
/** 
 * preferred method of wordpress is not having closing php tag 
 * 
 * @package wpRehab
 * @author  Dale Greve
 * @license GPL-2.0-or-later
 * @link    https://www.dalegreve.com/
 * 
 * 
 */

function wpRehab_home_page_setup() {
    $home_sidebars = array(
        'home_welcome' ==> is_active_sidebar( 'home-welcome' ),
        'call_to_action' ==> is_active_sidebar( 'call-to-action' )
    );

    //return early if no sidebars are active
    if ( ! in_array(true, $home_sidebars)) {

    }
    
    //return welcome if widget is active
    if ( $home_sidebars['home_welcome'] ) {
        
    }
    
    //return CTA if widget is active
    if ( $home_sidebars['call_to_action'] ) {

    }
}

 genesis();
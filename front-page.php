<?php
/**
 * This file adds the Front Page Template to any Genesis Child Theme.
 */
 
// Remove default Genesis elements
remove_action( 'genesis_entry_header',  'genesis_do_post_title'                 );
remove_action( 'genesis_entry_header',  'genesis_entry_header_markup_open',  5  );
remove_action( 'genesis_entry_header',  'genesis_entry_header_markup_close', 15 );
remove_action( 'genesis_before_footer', 'genesis_footer_widget_areas'           );
remove_action( 'genesis_footer',        'genesis_footer_markup_open',         5 );
remove_action( 'genesis_footer',        'genesis_do_footer'                     );
remove_action( 'genesis_footer',        'genesis_footer_markup_close',       15 );


 genesis();
?>

<section>
<div class="container">
    <div class="row row--gutters row--py-60">
        <div class="row__medium-7">
            <h2 class="large-headline">Spend more time managing your business and enjoy the peace of mind knowing your WordPress website is always updated, efficient and relevant to your customers. </h2>
        </div>
        <div class="row__medium-5">
            <img src="<?php echo get_stylesheet_directory_uri();?>/images/float-image-2.jpg">
        </div>
    </div>
    <div class="row row--gutters">
        <div class="row__medium-5">
            <img src="<?php echo get_stylesheet_directory_uri();?>/images/float-image-1.jpg">
        </div>
        <div class="row__medium-7">
            <h2 class="large-headline">From minor updates to complete redesigns WordPress Rehab has 12 years of website support experience that will keep your online presence up to date and stress-free.</h2>
        </div>
    </div>
</div>
</section>
<h2 class="section-title">Services</h2>
<div class="container container--medium">
    <div class="row row--gutters">
        <div class="row__medium-6">
            <h2>Theme & Plugin Support</h2>
            <p>Have a new theme or plugin that you need to customize? Wordpress Rehab can help with wrangling unruly themes and making sure your plugins are secure.</p>
        </div>
        <div class="row__medium-6">
            <h2>Site Backup Plans</h2>
            <p> Rest easy knowing your site is always backed up and protected. A daily offsite backup plan will keep your site safe and easy to restore in the event of data loss. </p>
        </div>
        <div class="row__medium-6">
            <h2>Analytics Reporting </h2>
            <p>Knowing who your customers are, where they are coming from and how they are using your site will give you you the information needed to improve your website, and make it the best it can be. </p>
        </div>
        <div class="row__medium-6">
            <h2>Performance Optimization </h2>
            <p>A slow site will have have a negative effect on your bottom line. From mobile to desktop your users expect a page to load quickly. We make sure your site is running quickly and efficiently. </p>
        </div>
    </div><!-- row -->
</div><!--/container -->
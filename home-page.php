<?php
/**
* Template Name: landing page
* Description: current homepage
 */

get_header(); ?>

<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<div class="homeWrapper">
				<section>
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<section class="entry-content">
					<?php the_content(); ?>
					<div class="entry-links"><?php wp_link_pages(); ?></div>
					<?php endwhile; endif; ?>
				</section>
					<section class="hpOptions">
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/keyboard.svg" alt="keyboard"/>

							<h3>Content Updates</h3>
							<p>Keeping your website current not only helps provide your customers with timely information it also helps with your search engine ranking.</p>
						</div>
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/rocket.svg" alt="rocket"/>
							<h3>Performance Optimization</h3>
							<p>A slow site will have have a negative affect on your bottom line.  From mobile to desktop your users expect a page to load quickly.  We make sure your site is running quickly and efficiently.</p>
						</div>
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/analytics.svg" alt="site analytics"/>
							<h3>Analytics and activity monitoring</h3>
							<p>Knowing who your customers are, where they are coming from and how they are using your site will give you you the information needed to improve your website, and make it the best it can be.</p>
						</div>
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/search-engine.svg" alt="SEO Audit"/>
							<h3>SEO Audit</h3>
							A review of your current SEO will help find out if your site is easy to find.  Let's work together to improve your search engine ranking.</p>
						</div>
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/backup.svg" alt="site backup"/>
							<h3>Site Backup Plans</h3>
							<p>Rest easy knowing your site is always backed up and protected. A daily offsite backup plan will keep your site safe and easy to restore in the event of data loss.</p>
						</div>
						<div>
							<img class="icon" src="<?php echo get_template_directory_uri(); ?>/assets/images/graphic-design.svg" alt="Theme Support"/>
							<h3>Theme and Plugin Support</h3>
							<p>Have a new theme or plugin that you need to customize?  Wordpress Rehab can help with wrangling unruly themes and making sure your plugins are secure.</p>
						</div>
					</article>
					</section>
		</div>
		<section class="formHolder">
			<div class="homeWrapper">
		  	<section class="box hpForm">
					<?php echo do_shortcode( '[contact-form-7 id="5" title="Contact form 1"]' ); ?>
				</section>
				<section class="box c">

				</section>
		</div><!-- End homeWrapper -->
	</section>


		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();

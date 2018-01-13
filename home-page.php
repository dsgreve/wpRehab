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
							<i class="fa fa-keyboard-o" aria-hidden="true"></i>
							<h3>Content Updates</h3>
						</div>
						<div>
							<i class="fa fa-mobile" aria-hidden="true"></i>
							<h3>Perormance Optimization</h3>
							<p>A slow site will have have a negative affect on your bottome line.  From mobile to desktop your users expect a page to load quickly.  We make sure your site is running quickly and efficiently. Let's make sure you a faster website.</p>

						</div>
						<div>
							<i class="fa fa-stethoscope" aria-hidden="true"></i>
							<h3>SEO Review</h3>

						</div>
						<div>
							<i class="fa fa-plug" aria-hidden="true"></i>
							<h3>Site Backup Plans</h3>
							<p>Rest easy knowing your site is always backed up and your webhost isn't webhost isn’t liable if they lose your data.
						</div>
						<div>
							<i class="fa fa-line-chart" aria-hidden="true"></i>
							<h3>Analytics and activity monitoring</h3>
							<p>Knowing who your customers are, where they are coming from and how they are using your site will give you you the information needed to improve your website, and make it the best it can be. </p>
						</div>
						<div>
							<i class="fa fa-home" aria-hidden="true"></i>
							<h3>Theme Customizations</h3>
						</div>
						<div>
							<i class="fa fa-group" aria-hidden="true"></i>
							<h3>Lead Generation</h3>
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

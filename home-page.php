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
					<section id="content"class="box hpContent" role="main">
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<!--
					<header class="header">
					<h1 class="entry-title"><?php the_title(); ?></h1>
					</header>
				-->
					<section class="entry-content">
					<?php the_content(); ?>
					<div class="entry-links"><?php wp_link_pages(); ?></div>
					</section>
					<section class="hpOptions">
						<div>
							<i class="fa fa-paint-brush" aria-hidden="true"></i>
							<h3>Site Design</h3>
						</div>
						<div>
							<i class="fa fa-keyboard-o" aria-hidden="true"></i>
							<h3>Content Updates</h3>
						</div>
						<div>
							<i class="fa fa-mobile" aria-hidden="true"></i>
							<h3>Responsive Optimization</h3>
						</div>
						<div>
							<i class="fa fa-stethoscope" aria-hidden="true"></i>
							<h3>Performance Review</h3>
						</div>
						<div>
							<i class="fa fa-plug" aria-hidden="true"></i>
							<h3>Plugin Updates</h3>
						</div>
						<div>
							<i class="fa fa-line-chart" aria-hidden="true"></i>
							<h3>Analytics and activity monitoring</h3>
						</div>
						<div>
							<i class="fa fa-home" aria-hidden="true"></i>
							<h3>Site Hosting</h3>
						</div>
						<div>
							<i class="fa fa-group" aria-hidden="true"></i>
							<h3>Lead Generation</h3>
						</div>
					</article>
					<?php endwhile; endif; ?>
					</section>
			<section class="box c">
				<img src="<?php echo get_template_directory_uri(); ?>/assets/images/wp-expert_blue.svg" alt="your wordpress expert" />
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

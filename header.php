<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title>Wordpress Rehab | Take the stress out of your website</title>
<meta name="description" content="<?php bloginfo( 'description' ); ?>">
<meta name="viewport" content="width=device-width" />
<link href="http://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans:900,900italic,800,800italic,700,700italic,600,600italic,500,500italic,400,400italic,300,300italic,200,200italic,100,100italic" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="wrapper" class="hfeed">
<header id="header" role="banner">
<section id="branding">
<div id="site-title">
  <?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '<h1>'; } ?>
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a>
    <?php if ( is_front_page() || is_home() || is_front_page() && is_home() ) { echo '</h1>'; } ?>
</div>
  <section class="intro">
    <div class="box a">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/wp-expert_blue.svg" alt="your wordpress expert" />
    </div>
    <div id="site-description" class="box b">
      <h2><?php bloginfo( 'description' ); ?></h2>
    </div>
    <div class="box c">
      <p>
        <a href="#wpcf7-f5-o1" title="Get Your free site review">Get Your Free Site Review</a>
    </p>
    </div>
  </section><!-- /intro -->
</section><!-- /branding -->
</header>
<div id="container">

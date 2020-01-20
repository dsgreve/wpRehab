<?php
/**
**Template Name: Plans
** Description: Care Plans template
*/
?>
<?php get_header(); ?>

<?php genesis_before_content_sidebar_wrap(); ?>
<div id="content-sidebar-wrap">

<?php genesis_before_content(); ?>
<div id="content" class="hfeed">

<?php genesis_before_loop(); ?>
<?php genesis_loop(); ?>
<?php genesis_after_loop(); ?>

</div><!-- end #content -->
<?php include_once('partials/care-plans.php'); ?>
<?php genesis_after_content(); ?>

</div><!-- end #content-sidebar-wrap -->
<?php genesis_after_content_sidebar_wrap(); ?>

<?php get_footer(); ?>

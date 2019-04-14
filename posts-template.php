

<?php
/**
 * Template Name: Blog Posts
 */
add_action( 'genesis_loop', 'custom_category_loop' );
/**
 * Custom loop that display a list of categories with corresponding posts.
 */
function custom_category_loop() {
 // Grab all the categories from the database that have posts.
 $categories = get_terms( 'category', 'orderby=name&order=ASC');
 // Loop through categories
 foreach ( $categories as $category ) {
 // Display category name
 //echo '<h2 class="post-title">' . $category->name . '</h2>';
 echo '<div class="container"><div class="row row--py-40 row--equal-height-at-medium row--gutters-medium ">';
 // WP_Query arguments
 $args = array(
 'cat' => $category->term_id,
 'orderby' => 'term_order',
 );
 // The Query
 $query = new WP_Query( $args );
 // The Loop
 if ( $query->have_posts() ) {
 while ( $query->have_posts() ) {
 $query->the_post();
 $thumb_id = get_post_thumbnail_id();
$thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
$thumb_url = $thumb_url_array[0];
 ?>
 <div class="row__medium-4">
    <article class="post-list__entry" style="background-image: url('<?php echo $thumb_url ?>')">
    <a class="post-list__entry--link-overlay" href="<?php the_permalink();?>"></a>
    <h2 class="entry-title"><?php the_title(); ?></h2>
    </article>
 </div>
 <?php
 } // End while
 } // End if
 echo '</div></div>';
 // Restore original Post Data
 wp_reset_postdata();
 } // End foreach
}
// Start the engine.
genesis();
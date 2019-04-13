<?php
/**
 * Template Name: Category Archives
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
 echo '<div class="container row--py-60"><div class="row row--equal-height-at-medium row--gutters-medium ">';
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
 ?>
 <div class="row__medium-4">
    <article class="post-list__entry">
        <h2 class="entry-title"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h2>
        <p class="entry-cat"><a href="<?php the_permalink();?>"><?php echo $category->name ?></a></p>
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
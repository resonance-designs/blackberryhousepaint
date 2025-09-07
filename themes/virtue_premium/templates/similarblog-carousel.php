<?php
/**
 * Similar Blog Carousel.
 *
 * @package Virtue Theme
 */

global $post, $kt_blog_carousel_loop;
$text    = get_post_meta( $post->ID, '_kad_blog_carousel_title', true );
$columns = virtue_premium_get_option( 'post_carousel_columns' );
$bc      = virtue_carousel_column_array( $columns, virtue_display_sidebar() );
wp_enqueue_script( 'virtue-slick-init' );
if ( 1 == virtue_premium_get_option( 'blog_similar_random_order' ) ) {
	$oderby = 'rand';
} else {
	$oderby = 'date';
}
$categories = get_the_category( $post->ID );
if ( $categories ) {
	$category_ids = array();
	foreach ( $categories as $individual_category ) {
		$category_ids[] = $individual_category->term_id;
	}
}
$kt_blog_carousel_loop = array(
	'columns'   => $columns,
	'imgheight' => '',
);
?>
<div id="blog_carousel_container" class="carousel_outerrim">
	<?php
	if ( ! empty( $text ) ) {
		echo '<h3 class="title">' . esc_html( $text ) . '</h3>';
	} else {
		echo '<h3 class="title">';
		echo esc_html( apply_filters( 'similarposts_title', __( 'Similar Posts', 'virtue' ) ) );
		echo ' </h3>';
	}
	?>
	<div class="blog-carouselcase fredcarousel">
		<div id="carouselcontainer-blog" class="rowtight">
			<div id="blog_carousel" class="slick-slider blog_carousel kt-slickslider kt-content-carousel loading clearfix" data-slider-fade="false" data-slider-type="content-carousel" data-slider-anim-speed="400" data-slider-scroll="1" data-slider-auto="true" data-slider-speed="9000" data-slider-xxl="<?php echo esc_attr( $bc['xxl'] ); ?>" data-slider-xl="<?php echo esc_attr( $bc['xl'] ); ?>" data-slider-md="<?php echo esc_attr( $bc['md'] ); ?>" data-slider-sm="<?php echo esc_attr( $bc['sm'] ); ?>" data-slider-xs="<?php echo esc_attr( $bc['xs'] ); ?>" data-slider-ss="<?php echo esc_attr( $bc['ss'] ); ?>">
			<?php
			$loop = new WP_Query();
			$loop->query(
				array(
					'orderby'        => $oderby,
					'category__in'   => $category_ids,
					'post__not_in'   => array( $post->ID ),
					'posts_per_page' => 8,
				)
			);
			if ( $loop ) {
				while ( $loop->have_posts() ) :
					$loop->the_post();
					get_template_part( 'templates/content', 'loop-post-carousel' );
				endwhile;
			} else {
				?>
				<li class="error-not-found"><?php esc_html_e( ' Sorry, no blog entries found.', 'virtue' ); ?></li>	
				<?php
			}
			wp_reset_query();
			?>
			</div>
		</div>
	</div>
</div><!-- Similar Blog Container-->

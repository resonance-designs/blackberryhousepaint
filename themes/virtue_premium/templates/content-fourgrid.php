<?php
/**
 * Post Grip Loop
 *
 * @package Virtue Theme
 */

$postsummery  = get_post_meta( get_the_ID(), '_kad_post_summery', true );
$image_size   = apply_filters( 'virtue_blog_grid_image_width', 364 );
$image_height = apply_filters( 'kadence_blog_grid_image_height', null );
if ( null === $image_height ) {
	$image_slider_height = $image_size;
} else {
	$image_slider_height = $image_height;
}
if ( empty( $postsummery ) || 'default' === $postsummery ) {
	$postsummery = virtue_premium_get_option( 'post_summery_default' );
}
?>
<div id="post-<?php the_ID(); ?>" class="blog_item kt_item_fade_in kad_blog_fade_in grid_item<?php echo ( 'text' === $postsummery ? ' kt-no-post-summary' : '' ); ?>">
	<?php
	if ( 'img_landscape' === $postsummery || 'img_portrait' === $postsummery ) {
		$img_args = array(
			'width'         => $image_size,
			'height'        => $image_height,
			'crop'          => true,
			'class'         => 'attachment-thumb wp-post-image kt-image-intrinsic',
			'alt'           => null,
			'id'            => get_post_thumbnail_id( get_the_ID() ),
			'placeholder'   => true,
			'schema'        => true,
			'intrinsic'     => true,
			'intrinsic_max' => true,
		);
		?>
		<div class="imghoverclass img-margin-center">
			<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
			<?php virtue_print_full_image_output( $img_args ); ?>
			</a> 
		</div>
		<?php
	} elseif ( 'slider_landscape' === $postsummery || 'slider_portrait' === $postsummery ) {
		$image_gallery = get_post_meta( get_the_ID(), '_kad_image_gallery', true );
		virtue_build_slider( get_the_ID(), $image_gallery, $image_size, $image_slider_height, 'post', 'kt-slider-same-image-ratio' );
	} elseif ( 'video' === $postsummery ) {
		?>
		<div class="videofit">
			<?php echo do_shortcode( get_post_meta( get_the_ID(), '_kad_post_video', true ) ); ?>
		</div>
		<?php
	}
	?>
	<div class="postcontent">
		<?php
		/**
		 * Virtue Post Grid Excerpt Before Header
		 */
		do_action( 'virtue_post_grid_excerpt_before_header' );
		?>
		<header>
			<?php
			/**
			 * Virtue Post Grid Excerpt Header
			 *
			 * @hooked virtue_post_mini_excerpt_header_title - 10
			 * @hooked virtue_post_grid_header_meta - 20
			 */
			do_action( 'virtue_post_grid_small_excerpt_header' );
			?>
		</header>
		<div class="entry-content" itemprop="articleBody">
			<?php
			do_action( 'virtue_post_grid_excerpt_content_before' );

			the_excerpt();

			do_action( 'virtue_post_grid_excerpt_content_after' );
			?>
		</div>
		<footer>
			<?php
			/**
			 * Virtue Post Grid Excerpt Footer
			 *
			 * @hooked virtue_post_footer_tags - 10
			 */
			do_action( 'virtue_post_grid_excerpt_footer' );
			?>
		</footer>
	</div><!-- Text size -->
	<?php
	/**
	 * Virtue Post Grid Excerpt After Footer
	 */
	do_action( 'virtue_post_grid_excerpt_after_footer' );
	?>
</div> <!-- Blog Item -->

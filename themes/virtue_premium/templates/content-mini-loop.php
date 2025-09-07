<?php
/**
 * Post Mini Loop
 *
 * @package Virtue Theme
 */

global $virtue_mini_post_column, $virtue_mini_word_count;

if ( virtue_display_sidebar() ) {
	$img_width = 410;
	$textsize  = 'tcol-md-12 tcol-sm-12 tcol-ss-12 kt-post-text-div';
	$imagesize = 'tcol-md-12 tcol-sm-12 tcol-ss-12 kt-post-image-div';
} else {
	$img_width = 270;
	$textsize  = 'tcol-md-7 tcol-sm-12 tcol-ss-12 kt-post-text-div';
	$imagesize = 'tcol-md-5 tcol-sm-12 tcol-ss-12 kt-post-image-div';
}
if ( true === $virtue_mini_post_column ) {
	$img_width = 360;
	$textsize  = 'tcol-md-8 tcol-sm-8 tcol-ss-12 kt-post-text-div';
	$imagesize = 'tcol-md-4 tcol-sm-4 tcol-ss-12 kt-post-image-div';
}
if ( has_post_thumbnail( $post->ID ) || 'text' !== virtue_premium_get_option( 'post_summery_default' ) ) {
	$display_image = true;
} else {
	$display_image = false;
	$textsize      = 'tcol-md-12 tcol-ss-12 kt-post-text-div post-excerpt-no-image';
}
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="rowtight">
		<?php
		if ( true === $display_image ) {
			$args = array(
				'width'         => $img_width,
				'height'        => 270,
				'crop'          => true,
				'class'         => 'iconhover post-excerpt-image',
				'alt'           => null,
				'id'            => get_post_thumbnail_id( $post->ID ),
				'placeholder'   => true,
				'lazy'          => true,
				'schema'        => false,
				'intrinsic'     => true,
				'intrinsic_max' => true,
			);
			?>
			<div class="<?php echo esc_attr( $imagesize ); ?>">
				<div class="imghoverclass">
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
						<?php virtue_print_full_image_output( $args ); ?>
					</a> 
				</div>
			</div>
		<?php } ?>

		<div class="<?php echo esc_attr( $textsize ); ?> postcontent">
			<?php
			/**
			 * Virtue Post Mini Excerpt Before Header
			 *
			 * @hooked virtue_post_meta_date -10
			 */
			do_action( 'virtue_post_mini_excerpt_before_header' );
			?>
			<header class="home_blog_title">
				<?php
				/**
				 * Virtue Post Mini Excerpt Header
				 *
				 * @hooked  virtue_post_mini_excerpt_header_title - 10
				 * @hooked  virtue_post_meta_tooltip_subhead - 20
				 */
				do_action( 'virtue_post_mini_excerpt_header' );
				?>
			</header>
			<div class="entry-content">
				<?php do_action( 'virtue_post_mini_excerpt_before_content' ); ?>
				<p>
					<?php echo wp_kses_post( virtue_excerpt( $virtue_mini_word_count ) ); ?> 
					<a href="<?php the_permalink(); ?>"><?php echo esc_html( virtue_premium_get_option( 'post_readmore_text', __( 'Read More', 'virtue' ) ) ); ?></a>
				</p>
				<?php do_action( 'virtue_post_mini_excerpt_after_content' ); ?>
			</div>
			<footer>
				<?php do_action( 'virtue_post_mini_excerpt_footer' ); ?>
			</footer>
		</div>
	</div>
</article>

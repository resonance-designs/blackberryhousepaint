<?php
/**
 * Template Carousel Post Loop.
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $post, $kt_blog_carousel_loop;
if ( '2' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-6 tcol-md-6 tcol-sm-6 tcol-xs-12 tcol-ss-12';
	$slidewidth  = 560;
	$slideheight = 560;
} elseif ( '1' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-12 tcol-md-12 tcol-sm-12 tcol-xs-12 tcol-ss-12';
	$slidewidth  = 560;
	$slideheight = 560;
} elseif ( '3' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-4 tcol-md-4 tcol-sm-4 tcol-xs-6 tcol-ss-12';
	$slidewidth  = 400;
	$slideheight = 400;
} elseif ( '8' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-2 tcol-md-2 tcol-sm-3 tcol-xs-4 tcol-ss-6';
	$slidewidth  = 200;
	$slideheight = 200;
} elseif ( '6' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-2 tcol-md-2 tcol-sm-3 tcol-xs-4 tcol-ss-6';
	$slidewidth  = 240;
	$slideheight = 240;
} elseif ( '5' == $kt_blog_carousel_loop['columns'] ) {
	$itemsize    = 'tcol-lg-25 tcol-md-25 tcol-sm-3 tcol-xs-4 tcol-ss-6';
	$slidewidth  = 240;
	$slideheight = 240;
} else {
	$itemsize    = 'tcol-lg-3 tcol-md-3 tcol-sm-4 tcol-xs-6 tcol-ss-12';
	$slidewidth  = 300;
	$slideheight = 300;
}
if ( ! empty( $kt_blog_carousel_loop['imgheight'] ) ) {
	$slideheight = $kt_blog_carousel_loop['imgheight'];
}
$slidewidth  = apply_filters( 'kt_blog_carousel_image_width', $slidewidth );
$slideheight = apply_filters( 'kt_blog_carousel_image_height', $slideheight );
?>
<div class="<?php echo esc_attr( $itemsize ); ?> kad_product">
	<div <?php post_class( 'blog_item grid_item' ); ?>>
		<?php
		if ( has_post_thumbnail( $post->ID ) ) {
			$image_id = get_post_thumbnail_id( $post->ID );
		} else {
			$image_id = null;
		}
		$img_args = array(
			'width'       => $slidewidth,
			'height'      => $slideheight,
			'crop'        => true,
			'class'       => 'iconhover',
			'alt'         => null,
			'id'          => $image_id,
			'placeholder' => true,
			'schema'      => false,
		);
		?>
		<div class="imghoverclass">
			<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
				<?php virtue_print_full_image_output( $img_args ); ?>
			</a> 
		</div>
		<?php
		/**
		 * Before Post Header
		 */
		do_action( 'virtue_post_carousel_before_header' );
		?>
		<a href="<?php the_permalink(); ?>" class="bcarousellink">
			<header>
				<?php
				/**
				 * Add title and date
				 *
				 * @hooked virtue_post_carousel_title - 10
				 * @hooked virtue_post_carousel_date - 20
				 */
				do_action( 'virtue_post_carousel_small_excerpt_header' );
				?>
			</header>
			<div class="entry-content color_body">
				<p><?php echo wp_kses_post( strip_tags( virtue_excerpt( 16 ) ) ); ?></p>
			</div>
		</a>
		<?php do_action( 'virtue_post_carousel_small_excerpt_footer' ); ?>
	</div>
</div>

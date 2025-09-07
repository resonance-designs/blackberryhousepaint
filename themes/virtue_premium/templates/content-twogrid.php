<?php
/**
 * Post Grip Loop
 *
 * @package Virtue Theme
 */

$postsummery     = get_post_meta( get_the_ID(), '_kad_post_summery', true );
$image_wide_size = apply_filters( 'virtue_blog_grid_image_wide_width', 562 );
$image_size      = apply_filters( 'virtue_blog_grid_image_width', 364 );
$image_height    = apply_filters( 'kadence_blog_grid_image_height', null );
if ( null === $image_height ) {
	$image_slider_height = $image_size;
} else {
	$image_slider_height = $image_height;
}
if ( empty( $postsummery ) || 'default' === $postsummery ) {
	$postsummery = virtue_premium_get_option( 'post_summery_default' );
}
?>
<div id="post-<?php the_ID(); ?>" class="blog_item kt_item_fade_in kad_blog_fade_in grid_item<?php echo ( 'text' === $postsummery ? ' kt-no-post-summary' : '' ); ?><?php echo ( 'img_portrait' === $postsummery || 'slider_portrait' === $postsummery ? ' portrait-grid' : '' ); ?>">
	<?php
	if ( 'img_landscape' === $postsummery ) {
		$img_args = array(
			'width'         => $image_wide_size,
			'height'        => $image_height,
			'crop'          => true,
			'class'         => 'iconhover',
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
	} elseif ( 'img_portrait' === $postsummery ) {
		?>
		<div class="rowtight">
			<?php
			$img_args = array(
				'width'         => $image_size,
				'height'        => $image_slider_height,
				'crop'          => true,
				'class'         => 'iconhover',
				'alt'           => null,
				'id'            => get_post_thumbnail_id( get_the_ID() ),
				'placeholder'   => true,
				'schema'        => true,
				'intrinsic'     => true,
				'intrinsic_max' => true,
			);
			?>
			<div class="tcol-md-6 tcol-sm-12">
				<div class="imghoverclass">
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
						<?php virtue_print_full_image_output( $img_args ); ?>
					</a> 
				</div>
			</div>
			<?php
	} elseif ( 'slider_landscape' === $postsummery ) {
		$image_gallery = get_post_meta( get_the_ID(), '_kad_image_gallery', true );
		virtue_build_slider( get_the_ID(), $image_gallery, 562, 300, 'image', 'kt-slider-same-image-ratio' );
	} elseif ( 'slider_portrait' === $postsummery ) {
		?>
		<div class="rowtight">
			<div class="tcol-lg-6 tcol-md-12">
				<?php
				$image_gallery = get_post_meta( get_the_ID(), '_kad_image_gallery', true );
				virtue_build_slider( get_the_ID(), $image_gallery, $image_size, $image_slider_height, 'image', 'kt-slider-same-image-ratio' );
				?>
			</div>
		<?php
	} elseif ( 'video' === $postsummery ) {
		?>
		<div class="videofit">
		<?php
			$video = get_post_meta( get_the_ID(), '_kad_post_video', true );
			echo do_shortcode( $video );
		?>
		</div>
		<?php
	}

	if ( 'img_portrait' === $postsummery || 'slider_portrait' === $postsummery ) {
		?>
		<div class="tcol-lg-6 tcol-md-12">
	<?php } ?>
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
				do_action( 'virtue_post_grid_excerpt_header' );
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
		<?php if ( 'img_portrait' === $postsummery || 'slider_portrait' === $postsummery ) { ?>
			</div> 
			</div>
			<?php
		}
		do_action( 'virtue_post_grid_excerpt_after_footer' );
		?>
</div> <!-- Blog Item -->

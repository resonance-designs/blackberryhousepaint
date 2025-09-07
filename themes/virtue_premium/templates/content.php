<?php
/**
 * Post loop content
 *
 * @package Virtue Theme
 */

if ( virtue_display_sidebar() ) {
	$kt_feat_width       = apply_filters( 'kt_blog_image_width_sidebar', 846 );
	$kt_portraittext     = 'col-md-7';
	$kt_portraitimg_size = 'col-md-5';
} else {
	$kt_feat_width       = apply_filters( 'kt_blog_image_width', 1140 );
	$kt_portraittext     = 'col-md-8';
	$kt_portraitimg_size = 'col-md-4';
}

$postsummery = get_post_meta( get_the_ID(), '_kad_post_summery', true );
$height      = get_post_meta( get_the_ID(), '_kad_posthead_height', true );
$swidth      = get_post_meta( get_the_ID(), '_kad_posthead_width', true );
// get_width.
if ( ! empty( $height ) ) {
	$slideheight = $height;
} else {
	$slideheight = apply_filters( 'kt_post_excerpt_image_height', 400 );
}
// get height.
if ( ! empty( $swidth ) ) {
	$slidewidth = $swidth;
} else {
	$slidewidth = apply_filters( 'kt_post_excerpt_image_width', $kt_feat_width );
}
// get post summary.
if ( empty( $postsummery ) || 'default' === $postsummery ) {
	$postsummery = virtue_premium_get_option( 'post_summery_default' );
}

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'kad_blog_item kad-animation' ); ?> data-animation="fade-in" data-delay="0">
	<div class="row">
		<?php
		if ( 'img_landscape' === $postsummery ) {
			$textsize = 'col-md-12';
			if ( has_post_thumbnail( get_the_ID() ) ) {
				$image_id = get_post_thumbnail_id( get_the_ID() );
			} else {
				$image_id = null;
			}
			$img_args = array(
				'width'         => $slidewidth,
				'height'        => $slideheight,
				'crop'          => true,
				'class'         => 'iconhover',
				'alt'           => null,
				'id'            => $image_id,
				'placeholder'   => true,
				'schema'        => false,
				'intrinsic'     => true,
				'intrinsic_max' => true,
			);
			?>
			<div class="col-md-12 post-land-image-container">
				<div class="imghoverclass img-margin-center">
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
						<?php virtue_print_full_image_output( $img_args ); ?>
					</a> 
				</div>
			</div>
			<?php
		} elseif ( 'img_portrait' === $postsummery ) {
			$textsize       = $kt_portraittext;
			$portraitwidth  = apply_filters( 'kt_post_excerpt_image_width_portrait', 365 );
			$portraitheight = apply_filters( 'kt_post_excerpt_image_height_portrait', 365 );
			if ( has_post_thumbnail( get_the_ID() ) ) {
				$image_id = get_post_thumbnail_id( get_the_ID() );
			} else {
				$image_id = null;
			}
			$img_args = array(
				'width'         => $portraitwidth,
				'height'        => $portraitheight,
				'crop'          => true,
				'class'         => 'iconhover',
				'alt'           => null,
				'id'            => $image_id,
				'placeholder'   => true,
				'schema'        => false,
				'intrinsic'     => true,
				'intrinsic_max' => true,
			);
			?>
			<div class="<?php echo esc_attr( $kt_portraitimg_size ); ?> post-image-container">
				<div class="imghoverclass img-margin-center">
					<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
						<?php virtue_print_full_image_output( $img_args ); ?>
					</a> 
				</div>
			</div>
			<?php
		} elseif ( 'slider_landscape' === $postsummery ) {
			$textsize = 'col-md-12';
			?>
			<div class="col-md-12 post-land-image-container">
				<?php
				$image_gallery = get_post_meta( get_the_ID(), '_kad_image_gallery', true );
				virtue_build_slider( get_the_ID(), $image_gallery, $slidewidth, $slideheight, 'image', 'kt-slider-same-image-ratio' );
				?>
			</div>
			<?php
		} elseif ( 'slider_portrait' === $postsummery ) {
			$textsize       = $kt_portraittext;
			$portraitwidth  = apply_filters( 'kt_post_excerpt_image_width_portrait', 365 );
			$portraitheight = apply_filters( 'kt_post_excerpt_image_height_portrait', 365 );
			?>
			<div class="<?php echo esc_attr( $kt_portraitimg_size ); ?> post-image-container">
				<?php
				$image_gallery = get_post_meta( get_the_ID(), '_kad_image_gallery', true );
				virtue_build_slider( get_the_ID(), $image_gallery, $portraitwidth, $portraitheight, 'image', 'kt-slider-same-image-ratio' );
				?>
			</div>
			<?php
		} elseif ( 'video' === $postsummery ) {
			$textsize = 'col-md-12';
			?>
			<div class="col-md-12 post-land-image-container">
				<div class="videofit">
					<?php
					$video = get_post_meta( get_the_ID(), '_kad_post_video', true );
					echo do_shortcode( $video );
					?>
				</div>
			</div>
			<?php
		} else {
			$textsize = 'col-md-12 kttextpost';
		}
		?>
		<div class="<?php echo esc_attr( $textsize ); ?> post-text-container postcontent">
			<?php
			/**
			 * Virtue Post Excerpt Before Header
			 *
			 * @hooked virtue_post_before_header_meta_date - 20
			 */
			do_action( 'virtue_post_excerpt_before_header' );
			?>
			<header>
				<?php
				/**
				 * Virtue Post Excerpt Header
				 *
				 * @hooked virtue_post_excerpt_header_title - 10
				 * @hooked virtue_post_header_meta - 20
				 */
				do_action( 'virtue_post_excerpt_header' );
				?>
			</header>
			<div class="entry-content">
				<?php
				do_action( 'kadence_post_excerpt_content_before' );

				the_excerpt();

				do_action( 'kadence_post_excerpt_content_after' );
				?>
			</div>
			<footer>
				<?php
				/**
				 * Virtue Post Excerpt Footer
				 *
				 * @hooked virtue_post_footer_tags - 10
				 */
				do_action( 'virtue_post_excerpt_footer' );
				?>
			</footer>
			<?php
				do_action( 'virtue_post_excerpt_after_footer' );
			?>
		</div><!-- Text size -->
	</div><!-- row-->
</article> <!-- Article -->

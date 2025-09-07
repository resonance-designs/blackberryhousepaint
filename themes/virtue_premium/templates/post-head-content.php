<?php
/**
 * Post Head Content.
 *
 * @package Virtue Theme
 */

global $post, $kt_feat_width;
$height         = get_post_meta( $post->ID, '_kad_posthead_height', true );
$swidth         = get_post_meta( $post->ID, '_kad_posthead_width', true );
$kt_headcontent = get_post_meta( $post->ID, '_kad_blog_head', true );

if ( ! empty( $height ) ) {
	$slideheight = $height;
	$imageheight = $height;
} else {
	$slideheight = 400;
	$imageheight = apply_filters( 'virtue_single_post_image_height', 400 );
}
if ( ! empty( $swidth ) ) {
	$slidewidth = $swidth;
} else {
	$slidewidth = $kt_feat_width;
}
if ( empty( $kt_headcontent ) || 'default' === $kt_headcontent ) {
	$kt_headcontent = virtue_premium_get_option( 'post_head_default' );
}

if ( 'flex' === $kt_headcontent ) {
	$image_gallery = get_post_meta( $post->ID, '_kad_image_gallery', true );
	echo '<div class="postfeat">';
		virtue_build_slider( $post->ID, $image_gallery, $slidewidth, $slideheight, 'image', 'kt-slider-same-image-ratio' );
	echo '</div>';

} elseif ( 'carouselslider' === $kt_headcontent ) {
	$image_gallery = get_post_meta( $post->ID, '_kad_image_gallery', true );
	echo '<div class="postfeat">';
		virtue_build_slider( $post->ID, $image_gallery, null, $slideheight, 'image', 'kt-slider-different-image-ratio', 'slider', 'false', 'true', '7000', 'true', 'false' );
	echo '</div>';
} elseif ( 'video' === $kt_headcontent ) {
	?>
	<div class="postfeat">
		<div class="videofit" style="max-width:<?php echo esc_attr( $slidewidth ); ?>px; margin:0 auto;">
			<?php
			$video = get_post_meta( $post->ID, '_kad_post_video', true );
			echo do_shortcode( $video );
			?>
		</div>
		<?php
		if ( has_post_thumbnail( $post->ID ) ) {
			$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
		}
		?>
	</div>
	<?php
} elseif ( 'carousel' === $kt_headcontent || 'shortcode' === $kt_headcontent ) {
	if ( has_post_thumbnail( $post->ID ) ) {
		$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
	}
} elseif ( 'image' === $kt_headcontent ) {
	if ( has_post_thumbnail( $post->ID ) ) {
		$img = virtue_get_image_array( $slidewidth, $imageheight, true, null, null, get_post_thumbnail_id(), false );

		$img['schema'] = true;
		?>
		<div class="imghoverclass postfeat post-single-img">
			<a href="<?php echo esc_url( $img['full'] ); ?>" rel-data="lightbox">
				<?php virtue_print_image_output( $img ); ?>
			</a>
		</div>
		<?php
	}
}

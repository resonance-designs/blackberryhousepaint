<?php
/**
 * Content Full Post Loop.
 *
 * @package Virtue Theme
 */

global $post, $virtue_premium, $kt_feat_width;

if ( virtue_display_sidebar() ) {
	$kt_feat_width = apply_filters( 'kt_blog_full_image_width_sidebar', 848 );
} else {
	$kt_feat_width = apply_filters( 'kt_blog_full_image_width', 1170 );
}

$kt_headcontent_class = array();
$kt_headcontent       = get_post_meta( $post->ID, '_kad_blog_head', true );
if ( 'none' !== $kt_headcontent ) {
	$kt_headcontent_class[] = 'kt_post_header_content-' . $kt_headcontent;
} else {
	$kt_headcontent_class[] = 'kt_no_post_header_content';
}
$kt_headcontent_class[] = 'kad_blog_item';

/**
 * Virtue single post begin hook.
 *
 * @hooked virtue_single_post_upper_headcontent - 10
 */
do_action( 'virtue_single_post_begin' );

/**
 * Virtue single post before hook.
 */
do_action( 'virtue_single_post_before' );
?>
<article <?php post_class( $kt_headcontent_class ); ?>>
	<?php
	/**
	 * Virtue single post before header hook.
	 *
	 * @hooked virtue_single_post_headcontent - 10
	 * @hooked virtue_single_post_meta_date - 20
	 */
	do_action( 'virtue_single_post_before_header' );
	?>
	<header>
	<?php
	/**
	 * Virtue Single Loop Post Header
	 *
	 * @hooked virtue_post_full_loop_title - 20
	 * @hooked virtue_post_header_meta - 30
	 */
	do_action( 'virtue_single_loop_post_header' );
	?>
	</header>
	<div class="entry-content clearfix">
		<?php
		do_action( 'kadence_single_post_content_before' );

		global $more;
		$more     = 0;
		$readmore = virtue_premium_get_option( 'post_readmore_text', __( 'Read More', 'virtue' ) );
		the_content( $readmore );

		do_action( 'kadence_single_post_content_after' );
		?>
	</div>
	<footer class="single-footer">
		<?php
		/**
		 * Virtue Single loop post footer
		 *
		 * @hooked virtue_post_footer_tags - 20
		 */
		do_action( 'virtue_single_loop_post_footer' );

		if ( comments_open() ) :
			echo '<p class="kad_comments_link">';
			comments_popup_link(
				__( 'Leave a Reply', 'virtue' ),
				__( '1 Comment', 'virtue' ),
				__( '% Comments', 'virtue' ),
				'comments-link',
				__( 'Comments are Closed', 'virtue' )
			);
			echo '</p>';
		endif;
		?>
	</footer>
</article>

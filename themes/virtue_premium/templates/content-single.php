<?php
/**
 * Content Single post.
 *
 * @package Virtue Theme.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $post, $kt_feat_width, $virtue_premium;
if ( virtue_display_sidebar() ) {
	$kt_feat_width = apply_filters( 'kt_blog_full_image_width_sidebar', 848 );
} else {
	$kt_feat_width = apply_filters( 'kt_blog_full_image_width', 1170 );
}
$kt_headcontent = get_post_meta( $post->ID, '_kad_blog_head', true );
if ( 'default' == $kt_headcontent || empty( $kt_headcontent ) ) {
	if ( ! empty( $virtue_premium['post_head_default'] ) ) {
		$kt_headcontent = $virtue_premium['post_head_default'];
	} else {
		$kt_headcontent = 'none';
	}
}
if ( $kt_headcontent !== 'none' ) {
	$kt_headcontent_class = 'kt_post_header_content-' . $kt_headcontent;
} else {
	$kt_headcontent_class = 'kt_no_post_header_content';
}
/**
 * Virtue single post begin hook.
 *
 * @hooked virtue_single_post_upper_headcontent - 10
 */
do_action( 'virtue_single_post_begin' );
?>
<div id="content" class="container">
	<div id="post-<?php the_ID(); ?>" class="row single-article">
		<div class="main <?php echo esc_attr( virtue_main_class() ); ?>" id="ktmain" role="main">
			<?php
			while ( have_posts() ) :
				the_post();

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
					 * Virtue single post header hook.
					 *
					 * @hooked virtue_post_header_breadcrumbs - 10
					 * @hooked virtue_post_header_title - 20
					 * @hooked virtue_post_header_meta - 30
					 */
					do_action( 'virtue_single_post_header' );
					?>
					</header>
					<div class="entry-content clearfix" itemprop="articleBody">
						<?php
						do_action( 'kadence_single_post_content_before' );

						the_content();

						do_action( 'kadence_single_post_content_after' );
						?>
					</div>
					<footer class="single-footer">
						<?php
						/**
						 * Virtue single post footer hook.
						 *
						 * @hooked virtue_post_footer_pagination - 10
						 * @hooked virtue_post_footer_tags - 20
						 * @hooked virtue_post_footer_meta - 30
						 * @hooked virtue_post_nav - 40
						 */
						do_action( 'virtue_single_post_footer' );
						?>
					</footer>
				</article>
				<?php
				/**
				 * Virtue single post after hook.
				 *
				 * @hooked virtue_post_authorbox - 20
				 * @hooked virtue_post_bottom_carousel - 30
				 * @hooked virtue_post_comments - 40
				 */
				do_action( 'virtue_single_post_after' );

			endwhile;
			?>
		</div>
<?php
do_action( 'virtue_single_post_end' );

<?php
/**
 * Home Latest Posts
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $virtue_mini_post_column, $virtue_mini_word_count;
// Check for Sidebar.
if ( virtue_display_sidebar() ) {
	$postwidthclass          = 'col-md-6 col-sm-6 home-sidebar';
	$virtue_mini_post_column = false;
} else {
	$postwidthclass          = 'col-md-6 col-sm-6';
	$virtue_mini_post_column = false;
}
// Check for 1 column count.
if ( '1' === virtue_premium_get_option( 'home_post_column' ) ) {
	$postwidthclass          = 'col-md-12 col-sm-12';
	$virtue_mini_post_column = true;
}

$btitle                 = virtue_premium_get_option( 'blog_title', __( 'Latest from the Blog', 'virtue' ) );
$blogcount              = virtue_premium_get_option( 'home_post_count' );
$base_word_count        = virtue_premium_get_option( 'post_word_count' );
$virtue_mini_word_count = virtue_premium_get_option( 'home_post_word_count' );
$virtue_mini_cat        = virtue_premium_get_option( 'home_post_type' );
if ( ! empty( $virtue_mini_cat ) ) {
	$blog_cat      = get_term_by( 'id', $virtue_mini_cat, 'category' );
	$blog_cat_slug = $blog_cat->slug;
} else {
	$blog_cat_slug = '';
}
if ( $virtue_mini_word_count > $base_word_count ) {
	$virtue_mini_word_count = $base_word_count;
}

?>
<div class="home_blog home-margin clearfix home-padding kad-animation" data-animation="fade-in" data-delay="0">
	<div class="clearfix">
		<h3 class="hometitle">
			<?php echo wp_kses_post( $btitle ); ?>
		</h3>
	</div>
	<div class="row">
		<?php
		$loop = new WP_Query();
		$loop->query(
			array(
				'posts_per_page'      => $blogcount,
				'category_name'       => $blog_cat_slug,
				'ignore_sticky_posts' => 1,
			)
		);
		$xyz = 0;
		if ( $loop ) {
			while ( $loop->have_posts() ) :
				$loop->the_post();
				?>
				<div class="<?php echo esc_attr( $postwidthclass ); ?> clearclass<?php echo esc_attr( $xyz % 2 ); ?>">
					<?php get_template_part( 'templates/content', 'mini-loop' ); ?>
				</div>
				<?php
				$xyz++;
			endwhile;
		} else {
			?>
			<div class="error-not-found"><?php esc_html_e( 'Sorry, no post entries found.', 'virtue' ); ?></div>
			<?php
		}
		wp_reset_postdata();
		?>
	</div>
</div> <!--home-blog -->

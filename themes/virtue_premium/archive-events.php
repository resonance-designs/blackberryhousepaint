<?php
/**
 * Events Archive for Event Organizer
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();
?>
<div class="wrap clearfix contentclass hfeed" role="document">
<?php
do_action( 'kt_afterheader' );

global $virtue_premium, $kt_post_with_sidebar;

if ( virtue_display_sidebar() ) {
	$display_sidebar      = true;
	$fullclass            = '';
	$kt_post_with_sidebar = true;
} else {
	$display_sidebar      = false;
	$fullclass            = 'fullwidth';
	$kt_post_with_sidebar = false;
}
$postclass = 'postlist';

/**
 * Page header Action
 *
 * @hooked virtue_page_title - 20
 */
do_action( 'kadence_page_title_container' );
?>
	<div id="content" class="container">
		<div class="row">
			<div class="main <?php echo esc_attr( virtue_main_class() ); ?>  <?php echo esc_attr( $postclass ) . ' ' . esc_attr( $fullclass ); ?>" role="main">
			<?php do_action( 'kadence_page_before_content' ); ?>
			<?php if ( ! have_posts() ) : ?>
				<div class="alert">
					<?php esc_html_e( 'Sorry, no results were found.', 'virtue' ); ?>
				</div>
				<?php get_search_form(); ?>
			<?php endif; ?>

			<div class="kt_archivecontent event-archive-content"> 
				<?php
				while ( have_posts() ) :
					the_post();
					the_content();
					//get_template_part( 'templates/content', get_post_format() );
				endwhile;
				?>
			</div> 
			<?php

			/*
			 * @hoooked virtue_pagination_markup - 20;
			 */
			do_action( 'virtue_pagination' );

			?>
			</div><!-- /.main -->
			<?php
			/**
			 * Sidebar Action
			 *
			 * @hooked virtue_sidebar_markup - 10
			 */
			do_action( 'virtue_sidebar' );
			?>
			</div><!-- /.row-->
			<?php do_action( 'kt_after_content' ); ?>
		</div><!-- /.content -->
	</div><!-- /.wrap -->
<?php
get_footer();

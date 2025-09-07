<?php
/**
 * Page Header Template.
 *
 * @package Virtue Theme
 */
?>
<div id="pageheader" class="titleclass">
	<div class="container">
		<div class="page-header">
			<?php
			do_action( 'virtue_before_page_title' );
			?>
			<h1 class="entry-title" itemprop="name">
				<?php
				echo wp_kses_post( apply_filters( 'kadence_page_title', virtue_title() ) );
				?>
			</h1>
			<?php
			if ( kadence_display_page_breadcrumbs() ) {
				echo '<div class="page-bread-container clearfix">';
					kadence_breadcrumbs();
				echo '</div>';
			}
			do_action( 'virtue_after_page_title' );
			if ( is_page() ) {
				global $post;
				$bsub = get_post_meta( $post->ID, '_kad_subtitle', true );
				if ( ! empty( $bsub ) ) {
					echo '<p class="subtitle"> ' . wp_kses_post( $bsub ) . ' </p>';
				}
			} elseif ( is_category() && category_description() ) {
				echo '<p class="subtitle">' . wp_kses_post( category_description() ) . '</p>';
			} elseif ( is_tag() && tag_description() ) {
				echo '<p class="subtitle">' . wp_kses_post( tag_description() ) . '</p>';
			}
			do_action( 'virtue_after_page_subtitle' );
			?>
		</div>
	</div>
</div> <!--titleclass-->

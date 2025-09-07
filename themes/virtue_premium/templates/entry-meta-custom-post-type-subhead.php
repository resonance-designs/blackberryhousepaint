<?php
/**
 * Custom Post Type Meta Sub Head
 *
 * @package Virtue Theme
 */

?>
<div class="subhead">
	<?php
	do_action( 'virtue_before_post_meta_subhead' );
	if ( '1' === virtue_premium_get_option( 'custom_post_show_author' ) ) {
		$authorbytext = virtue_premium_get_option( 'post_by_text', __( 'by', 'virtue' ) );
		?>
		<span class="postauthortop author vcard">
			<i class="icon-user2"></i>
			<?php echo esc_html( $authorbytext ) . ' '; ?>
			<span itemprop="author"><a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" class="fn" rel="author"><?php echo esc_html( get_the_author() ); ?></a></span>
			<span class="virtue-meta-divider post-author-divider"> | </span>
		</span>
		<?php
	}
	if ( '1' === virtue_premium_get_option( 'custom_post_show_comment' ) ) {
		?>
		<span class="postcommentscount">
			<a href="<?php the_permalink(); ?>#virtue_comments">
				<i class="icon-bubbles"></i>
				<?php comments_number( '0', '1', '%' ); ?>
			</a>
		</span>
		<?php
	}
	do_action( 'virtue_after_post_meta_subhead' );
	?>
</div>

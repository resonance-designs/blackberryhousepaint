<?php
/**
 * Content Search Results.
 *
 * @package Virtue Theme.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>
<div id="post-<?php the_ID(); ?>" class="blog_item kt_item_fade_in kad_blog_fade_in kt_item_fade_in grid_item">
	<?php
	if ( has_post_thumbnail( $post->ID ) ) {
		$img = virtue_get_image_array( 260, null, true, null, null, get_post_thumbnail_id(), false );
		$img['schema'] = true;
		?>
		<div class="imghoverclass img-margin-center">
			<a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
				<?php virtue_print_image_output( $img ); ?>
			</a>
		</div>
	<?php } ?>
	<div class="postcontent">
		<header>
			<a href="<?php the_permalink(); ?>">
				<h5 class="entry-title"><?php the_title(); ?></h5>
			</a>
			<div class="subhead color_gray">
				<span class="postauthortop author vcard" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( get_the_author() ); ?>">
					<i class="icon-user"></i>
				</span>
				<span class="kad-hidepostauthortop"> | </span>
				<?php
				$post_category = get_the_category( $post->ID );
				if ( ! empty( $post_category ) ) {
					?>
					<span class="postedintop" rel="tooltip" data-placement="top" data-original-title="<?php
					foreach ( $post_category as $category ) {
						echo esc_attr( $category->name ) . '&nbsp;';
					} ?>"><i class="icon-folder"></i>
					</span>
					<span class="kad-hidepostedin">|</span>
				<?php } ?>
				<?php if ( comments_open() || ( get_comments_number() != 0 ) ) { ?>                        
					<span class="postcommentscount" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( get_comments_number() ); ?>">
					<i class="icon-bubbles"></i>
					</span>
					<span class="postdatetooltip">|</span>
				<?php } ?>
				<span style="margin-left:3px;" class="postdatetooltip updated" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( get_the_date( get_option( 'date_format' ) ) ); ?>">
					<i class="icon-calendar"></i>
				</span>
			</div>
		</header>
		<div class="entry-content">
			<?php the_excerpt(); ?>
		</div>
		<footer>
		<?php
		$tags = get_the_tags();
		if ( $tags ) {
			?>
			<span class="posttags color_gray"><i class="icon-tag"></i> <?php the_tags( '', ', ', '' ); ?> </span>
		<?php } ?>
		</footer>
	</div><!-- Text size -->
</div> <!-- Blog Item -->


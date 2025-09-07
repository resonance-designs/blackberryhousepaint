<?php
/**
 * Staff Post Template
 *
 * @package Virtue Theme
 */

?>
<div id="content" class="container">
	<div class="row single-article">
		<div class="main <?php echo esc_attr( virtue_main_class() ); ?>" id="ktmain" role="main">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class(); ?>>
					<div class="clearfix">
						<?php if ( has_post_thumbnail() ) { ?>
							<div class="staff-img thumbnail alignleft clearfix">
								<?php the_post_thumbnail( 'medium' ); ?>
							</div>
						<?php } ?>
						<header>
							<?php
							if ( virtue_display_staff_breadcrumbs() ) {
								virtue_breadcrumbs();
							}
							?>
							<h1 class="entry-title"><?php the_title(); ?></h1>
						</header>
						<div class="entry-content">
							<?php the_content(); ?>
						</div>
					</div>
					<footer class="single-footer">
						<?php
						wp_link_pages(
							array(
								'before'      => '<nav class="pagination kt-pagination">',
								'after'       => '</nav>',
								'link_before' => '<span>',
								'link_after'  => '</span>',
							)
						);
						?>
					</footer>
					<?php comments_template( '/templates/comments.php' ); ?>
				</article>
			<?php endwhile; ?>
		</div>

<?php
/**
 * Post Hooks.
 *
 * @package Virtue Theme.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Home Mini Title
 */
function virtue_post_mini_excerpt_header_title() {
	echo '<a href="' . esc_attr( get_the_permalink() ) . '">';
	echo '<h4 class="entry-title">';
		the_title();
	echo '</h4>';
	echo '</a>';
}
add_action( 'virtue_post_grid_small_excerpt_header', 'virtue_post_mini_excerpt_header_title', 10 );
add_action( 'virtue_post_mini_excerpt_header', 'virtue_post_mini_excerpt_header_title', 10 );

/**
 * Home Mini Tooltip Subhead
 */
function virtue_post_meta_tooltip_subhead() {
	get_template_part( 'templates/entry', 'meta-tooltip-subhead' );
}
add_action( 'virtue_post_mini_excerpt_header', 'virtue_post_meta_tooltip_subhead', 20 );

/**
 * Home Mini Date
 */
function virtue_post_meta_date() {
	get_template_part( 'templates/entry', 'meta-date' );
}
add_action( 'virtue_post_mini_excerpt_before_header', 'virtue_post_meta_date', 10 );

/**
 * Filter Post loop image height.
 */
function virtue_post_header_single_image_height() {
	if ( '1' === virtue_premium_get_option( 'post_header_single_image_height' ) ) {
		return null;
	} else {
		return 400;
	}
}
add_filter( 'virtue_single_post_image_height', 'virtue_post_header_single_image_height', 10 );


/**
 * Virtue Post Upper Head Content.
 */
function virtue_single_post_upper_headcontent() {
	if ( 'post' === get_post_type() ) {
		get_template_part( 'templates/post', 'head-upper-content' );
	}
}
add_action( 'virtue_single_post_begin', 'virtue_single_post_upper_headcontent', 10 );

/**
 * Virtue Post Head Content.
 */
function virtue_single_post_headcontent() {
	if ( 'post' === get_post_type() ) {
		get_template_part( 'templates/post', 'head-content' );
	}
}
add_action( 'virtue_single_post_before_header', 'virtue_single_post_headcontent', 10 );

/**
 * Virtue Post Head Date.
 */
function virtue_single_post_meta_date() {
	get_template_part( 'templates/entry', 'meta-date' );
}
add_action( 'virtue_single_post_before_header', 'virtue_single_post_meta_date', 20 );
add_action( 'virtue_post_excerpt_before_header', 'virtue_single_post_meta_date', 20 );

/**
 * Function to add in featured images for custom post types
 */
function virtue_single_custom_post_featured_image() {
	if ( 'post' !== get_post_type() && '1' === virtue_premium_get_option( 'custom_post_show_featured_image' ) ) {
		if ( has_post_thumbnail( get_the_ID() ) ) {
			global $kt_feat_width;
			$imageheight = apply_filters( 'kt_single_custom_post_image_height', null );
			$imagewidth  = apply_filters( 'kt_single_custom_post_image_width', $kt_feat_width );
			$img         = virtue_get_image_array( $imagewidth, $imageheight, true, null, null, get_post_thumbnail_id(), false );
			?>
			<div class="imghoverclass postfeat post-single-img">
				<a href="<?php echo esc_url( $img['full'] ); ?>" rel-data="lightbox">
					<?php virtue_print_image_output( $img ); ?>
				</a>
			</div>
			<?php
		}
	}
}
add_action( 'virtue_single_post_before_header', 'virtue_single_custom_post_featured_image', 10 );

/**
 * Function to add in breadcrumbs for single posts title area.
 */
function virtue_post_header_breadcrumbs() {
	if ( '1' === virtue_premium_get_option( 'show_breadcrumbs_post' ) ) {
		virtue_breadcrumbs();
	}
}
add_action( 'virtue_single_post_header', 'virtue_post_header_breadcrumbs', 10 );
/**
 * Function to add in single post title.
 */
function virtue_post_header_title() {
	echo '<h1 class="entry-title">';
		the_title();
	echo '</h1>';
}
add_action( 'virtue_single_post_header', 'virtue_post_header_title', 20 );

/**
 * Function to add in single post meta in title area.
 */
function virtue_post_header_meta() {
	if ( 'post' === get_post_type() ) {
		get_template_part( 'templates/entry', 'meta-subhead' );
	}
}
add_action( 'virtue_single_post_header', 'virtue_post_header_meta', 30 );
add_action( 'virtue_post_excerpt_header', 'virtue_post_header_meta', 20 );
add_action( 'virtue_single_loop_post_header', 'virtue_post_header_meta', 30 );

/**
 * Function to add in custom post type meta in title area.
 */
function virtue_custom_post_header_meta() {
	if ( 'post' !== get_post_type() ) {
		get_template_part( 'templates/entry', 'meta-custom-post-type-subhead' );
	}
}
add_action( 'virtue_single_post_header', 'virtue_custom_post_header_meta', 30 );


/**
 * Function to add in single post footer pagination.
 */
function virtue_post_footer_pagination() {
	wp_link_pages(
		array(
			'before'      => '<nav class="pagination kt-pagination">',
			'after'       => '</nav>',
			'link_before' => '<span>',
			'link_after'  => '</span>',
		)
	);
}
add_action( 'virtue_single_post_footer', 'virtue_post_footer_pagination', 10 );

/**
 * Function to add in single post footer tags.
 */
function virtue_post_footer_tags() {
	if ( 'post' === get_post_type() ) {
		$tags = get_the_tags();
		if ( $tags ) {
			echo '<span class="posttags"><i class="icon-tag"></i>';
			the_tags( '', ', ', '' );
			echo '</span>';
		}
	}
}
add_action( 'virtue_single_post_footer', 'virtue_post_footer_tags', 20 );
add_action( 'virtue_post_grid_excerpt_footer', 'virtue_post_footer_tags', 10 );
add_action( 'virtue_post_excerpt_footer', 'virtue_post_footer_tags', 10 );
add_action( 'virtue_single_loop_post_footer', 'virtue_post_footer_tags', 20 );


/**
 * Function to add in single post footer meta
 */
function virtue_post_footer_meta() {
	if ( 'post' === get_post_type() ) {
		get_template_part( 'templates/entry', 'meta-footer' );
	}
}
add_action( 'virtue_single_post_footer', 'virtue_post_footer_meta', 30 );

/**
 * Function to add in single post navigation
 */
function virtue_post_nav() {
	if ( '1' === virtue_premium_get_option( 'show_postlinks' ) && is_singular( 'post' ) ) {
		get_template_part( 'templates/entry', 'post-links' );
	}
}
add_action( 'virtue_single_post_footer', 'virtue_post_nav', 40 );

/**
 * Function to add in author box.
 */
function virtue_post_authorbox() {
	if ( is_singular( 'post' ) ) {
		$authorbox = get_post_meta( get_the_ID(), '_kad_blog_author', true );
		if ( empty( $authorbox ) || 'default' === $authorbox ) {
			if ( 'yes' === virtue_premium_get_option( 'post_author_default' ) ) {
				virtue_author_box();
			}
		} elseif ( 'yes' === $authorbox ) {
			virtue_author_box();
		}
	}
}
add_action( 'virtue_single_post_after', 'virtue_post_authorbox', 20 );

/**
 * Function to add in post bottom carousel.
 */
function virtue_post_bottom_carousel() {
	if ( is_singular( 'post' ) ) {
		$blog_carousel_recent = get_post_meta( get_the_ID(), '_kad_blog_carousel_similar', true );
		if ( empty( $blog_carousel_recent ) || 'default' === $blog_carousel_recent ) {
			$blog_carousel_recent = virtue_premium_get_option( 'post_carousel_default' );
		}
		if ( 'similar' === $blog_carousel_recent ) {
			get_template_part( 'templates/similarblog', 'carousel' );
		} elseif ( 'recent' === $blog_carousel_recent ) {
			get_template_part( 'templates/recentblog', 'carousel' );
		}
	}
}
add_action( 'virtue_single_post_after', 'virtue_post_bottom_carousel', 30 );

/**
 * Virtue Post comments
 */
function virtue_post_comments() {
	comments_template( '/templates/comments.php' );
}
add_action( 'virtue_single_post_after', 'virtue_post_comments', 40 );

/**
 * Grid Title
 */
function virtue_post_grid_excerpt_header_title() {
	echo '<a href="' . esc_attr( get_the_permalink() ) . '">';
		echo '<h4 class="entry-title">';
				the_title();
		echo '</h4>';
	echo '</a>';
}
add_action( 'virtue_post_grid_excerpt_header', 'virtue_post_grid_excerpt_header_title', 10 );

/**
 * Grid tooltip
 */
function virtue_post_grid_header_meta() {
	get_template_part( 'templates/entry', 'meta-grid-tooltip-subhead' );
}
add_action( 'virtue_post_grid_small_excerpt_header', 'virtue_post_grid_header_meta', 20 );
add_action( 'virtue_post_grid_excerpt_header', 'virtue_post_grid_header_meta', 20 );

/**
 * Carousel section
 */

/**
 * Carousel post title.
 */
function virtue_post_carousel_title() {
	echo '<h5 class="entry-title">';
		the_title();
	echo '</h5>';
}
add_action( 'virtue_post_carousel_small_excerpt_header', 'virtue_post_carousel_title', 10 );

/**
 * Carousel post Date.
 */
function virtue_post_carousel_date() {
	echo '<div class="subhead">';
		echo '<span class="postday published kad-hidedate">' . get_the_date( get_option( 'date_format' ) ) . '</span>';
	echo '</div>';
}
add_action( 'virtue_post_carousel_small_excerpt_header', 'virtue_post_carousel_date', 20 );

/**
 * Allow child to overide author box function.
 */
if ( ! function_exists( 'virtue_author_box' ) ) {
	/**
	 * Load Author Box
	 */
	function virtue_author_box() {
		get_template_part( 'templates/author', 'box' );
	}
}

<?php
/**
 * Theme wrapper
 *
 * @link http://scribu.net/wordpress/theme-wrappers.html
 */
function kadence_template_path() {
	return Kadence_Wrapping::$main_template;
}

function kadence_sidebar_path() {
	return new Kadence_Wrapping( 'templates/sidebar.php' );
}

class Kadence_Wrapping {
	// Stores the full path to the main template file.
	public static $main_template;

	// Basename of template file.
	public $slug;

	public $templates;
	// Stores the base name of the template file; e.g. 'page' for 'page.php' etc.
	public static $base;

	public function __construct( $template = 'base.php' ) {
	
		$this->slug = basename( $template, '.php' );
		$this->templates = array( $template );

		if (self::$base) {
			$str = substr($template, 0, -4);
			array_unshift($this->templates, sprintf($str . '-%s.php', self::$base));
		}
	}
	public function __toString() {
		$this->templates = apply_filters('kadence_wrap_' . $this->slug, $this->templates);
		return locate_template($this->templates);
	}

	static function wrap( $main ) { 
		if ( is_embed() ) {
			return $main;
		}
		// Check for other filters returning null
		if ( ! is_string( $main ) ) {
			return $main;
		}
		self::$main_template = $main;
		self::$base = basename(self::$main_template, '.php');

		if (self::$base === 'index') {
			self::$base = false;
		}

		return new Kadence_Wrapping();
	}
}

add_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );

add_action( 'init', 'virtue_toolset_layout_support' );
function virtue_toolset_layout_support() {
	// Add tool layout Support.
	if ( class_exists( 'WPDDL_Templates_Settings' ) ) {
		// SET in the default template path.
		add_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 10 );
	}
}

add_action( 'template_include', 'virtue_stories_layout_support', 10 );
function virtue_stories_layout_support( $template ) {
	// Add stories Support.
	if ( defined( 'WEBSTORIES_VERSION' ) && is_singular( 'web-story' ) ) {
		remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
	}
	return $template;
}

add_filter( 'template_include', 'virtue_event_cal_support', 10 );
function virtue_event_cal_support( $template_path ) {
	if ( class_exists( 'Tribe__Events__Main' ) && function_exists( 'tribe_get_option' ) ) {
		if ( tribe_get_option( 'tribeEventsTemplate', 'default' ) === '' ) {
			if ( is_archive() && function_exists( 'tribe_is_month' ) && ( tribe_is_month() || tribe_is_list_view() || tribe_is_day() ) && ! is_tag() ) {
				remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
			} elseif ( is_archive() && function_exists( 'tribe_is_photo' ) && ( tribe_is_map() || tribe_is_photo() || tribe_is_week() ) ) {
				remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
			} elseif ( is_post_type_archive( 'event' ) || is_post_type_archive( 'tribe_events' ) ) {
				remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
			} elseif ( is_singular( 'tribe_events' ) ) {
				remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
			}
		}
	}
	return $template_path;
}
add_action( 'init', 'virtue_premium_tribe_support' );
function virtue_premium_tribe_support() {
	if ( function_exists( 'tribe_is_event_query' ) && function_exists( 'tribe_get_option' ) && tribe_get_option( 'tribeEventsTemplate', 'default' ) === '' ) {
		add_filter( 'kadence_display_sidebar', 'kt_tribe_sidebar', 100 );
		add_filter( 'tribe_events_before_html', 'virtue_premium_tribe_before_html_data_wrapper' );
		add_filter( 'tribe_events_after_html', 'virtue_premium_tribe_after_html_data_wrapper' );
	}
}
add_action('init', function(){
	add_filter('tribe_events_views_v2_is_enabled', '__return_false');
});

function kt_tribe_sidebar( $sidebar ) {
	if ( tribe_is_event_query() ) {
		return false;
	}
	return $sidebar;
}
function virtue_premium_tribe_before_html_data_wrapper( $before ) {
	$html = '<!-- kt-event-code -->
	<div id="content" class="container">
	<!-- stop kt-event-code -->';
	return $html . $before;
}
function virtue_premium_tribe_after_html_data_wrapper( $after ) {
	$html = '<!-- kt-event-code -->
	</div>
	<!-- stop kt-event-code -->';
	return $after . $html;
}
add_filter( 'template_include', 'virtue_event_organizer_support', 10 );
function virtue_event_organizer_support( $template_path ) {
	if ( class_exists( 'EO_Theme_Compatabilty' ) ) {
		global $wp_query;
		if ( is_archive() && eventorganiser_is_event_query( $wp_query ) ) {
			remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
		}
	}
	return $template_path;
}
add_action( 'after_setup_theme', 'virtue_event_organizer_template_support' );
function virtue_event_organizer_template_support() {
	add_filter( 'eventorganiser_theme_compatability_templates', 'virtue_event_organizer_archive_template_issue' );
}
/**
 * Virtue event organizer filter
 *
 * @param string $template archive template.
 */
function virtue_event_organizer_archive_template_issue( $template ) {
	if ( is_archive() ) {
		return get_template_part( 'archive', 'events' );
	}
	return $template;
}

/**
 * BetterDocs Support
 *
 * @param string $template_path the template path.
 */
function virtue_betterdocs_support( $template_path ) {
	if ( class_exists( 'BetterDocs' ) && ( is_singular( 'docs' ) || is_tax( 'doc_category' ) || is_tax( 'doc_tag' ) ) ) {
		remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
	}
	return $template_path;
}
add_filter( 'template_include', 'virtue_betterdocs_support', 10 );

/**
 * Sprout Invoice Support
 *
 * @param string $template_path the template path.
 */
function virtue_sprout_invoice_support( $template_path ) {
	if ( is_singular( 'sa_invoice' ) || is_singular( 'sa_estimate' ) ) {
		remove_filter( 'template_include', array( 'Kadence_Wrapping', 'wrap' ), 101 );
	}
	return $template_path;
}
add_filter( 'template_include', 'virtue_sprout_invoice_support', 10 );
/**
 * Page titles
 */
function kadence_title() {
	error_log( "The kadence_title() function is deprecated since version 4.6.2. Please use virtue_title() instead." );
	return virtue_title();
}
/**
 * Function to show page title.
 */
function virtue_title() {
	if ( is_home() ) {
		if ( get_option( 'page_for_posts', true ) ) {
			$title = get_the_title( get_option( 'page_for_posts', true ) );
		} else {
			$title = __( 'Latest Posts', 'virtue' );
		}
	} elseif ( is_archive() ) {
		$title = get_the_archive_title();
	} elseif ( is_search() ) {
		/* translators: %s: search term */
		$title = sprintf( __( 'Search Results for %s', 'virtue' ), get_search_query() );
	} elseif ( is_404() ) {
		$title = __( 'Not Found', 'virtue' );
	} else {
		$title = get_the_title();
	}
	return apply_filters( 'kadence_title', $title );
}

/**
 * Filter for the archive title.
 *
 * @param string $title the archive title.
 */
function virtue_filter_archive_title( $title ) {
	$term = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
	if ( is_category() ) {
		$title = single_cat_title( '', false );
	} elseif ( is_tag() ) {
		$title = single_tag_title( '', false );
	} elseif ( is_author() ) {
		/* translators: %s: Author Name */
		$title = sprintf( __( 'Author Archives: %s', 'virtue' ), get_the_author() );
	} elseif ( $term ) {
		$title = $term->name;
	} elseif ( is_day() ) {
		/* translators: %s: Date */
		$title = sprintf( __( 'Daily Archives: %s', 'virtue' ), get_the_date() );
	} elseif ( is_month() ) {
		/* translators: %s: Date showing year and month */
		$title = sprintf( __( 'Monthly Archives: %s', 'virtue' ), get_the_date( 'F Y' ) );
	} elseif ( is_year() ) {
		/* translators: %s: Date showing year only */
		$title = sprintf( __( 'Yearly Archives: %s', 'virtue' ), get_the_date( 'Y' ) );
	} elseif ( is_tax( array( 'product_cat', 'product_tag' ) ) ) {
		$title = single_term_title( '', false );
	} elseif ( function_exists( 'is_bbpress' ) ) {
		if ( is_bbpress() ) {
			$title = bbp_title();
		}
	} elseif ( function_exists( 'tribe_is_month' ) ) {
		if ( tribe_is_month() ) {
			$title = tribe_get_event_label_plural();
		}
	}
	return $title;
}
add_filter( 'get_the_archive_title', 'virtue_filter_archive_title' );

/**
 * Portfolio Permalink
 */
function virtue_permalinks() {
	global $wp_rewrite;
	$virtue_premium = virtue_premium_get_options();
	if ( ! empty( $virtue_premium['portfolio_permalink'] ) ) {
		$port_rewrite = $virtue_premium['portfolio_permalink'];
	} else {
		$port_rewrite = 'portfolio';
	}
	$portfolio_structure = '/' . $port_rewrite . '/%portfolio%';
	$wp_rewrite->add_rewrite_tag( '%portfolio%', '([^/]+)', 'portfolio=' );
	$wp_rewrite->add_permastruct( 'portfolio', $portfolio_structure, false );

	// Add filter to plugin init function.
	add_filter( 'post_type_link', 'virtue_portfolio_permalink', 10, 3 );
	// Adapted from get_permalink function in wp-includes/link-template.php.
}
add_action( 'after_setup_theme', 'virtue_permalinks');

function virtue_portfolio_permalink( $permalink, $post_id, $leavename ) {
		$post = get_post($post_id);
		$rewritecode = array(
		'%year%',
		'%monthnum%',
		'%day%',
		'%hour%',
		'%minute%',
		'%second%',
		$leavename? '' : '%postname%',
		'%post_id%',
		'%category%',
		'%author%',
		$leavename? '' : '%pagename%',
	);

	if ( '' != $permalink && !in_array( $post->post_status, array('draft', 'pending', 'auto-draft') ) ) {
		$unixtime = strtotime($post->post_date);

		$category = '';
		if ( strpos($permalink, '%category%') !== false ) {
			$cats = wp_get_post_terms($post->ID, 'portfolio-type', array( 'orderby' => 'parent', 'order' => 'DESC' ));
			if ( $cats ) {
				//usort($cats, '_usort_terms_by_ID'); // order by ID
				$category = $cats[0]->slug;
			}
			// show default category in permalinks, without
			// having to assign it explicitly
			if ( empty($category) ) {
				$category = 'portfolio-category';
			}
		}

		$author = '';
		if ( strpos($permalink, '%author%') !== false ) {
			$authordata = get_userdata($post->post_author);
			$author = $authordata->user_nicename;
		}

		$date = explode(" ",date('Y m d H i s', $unixtime));
		$rewritereplace = array(
			$date[0],
			$date[1],
			$date[2],
			$date[3],
			$date[4],
			$date[5],
			$post->post_name,
			$post->ID,
			$category,
			$author,
			$post->post_name,
		);
		$permalink = str_replace( $rewritecode, $rewritereplace, $permalink );
	} else { // if they're not using the fancy permalink option
	}

	return $permalink;
}
/**
 * Custom 404
 *
 * @param string $template the template name.
 */
function kadence_custom_404_filter_template( $template ) {

	global $virtue_premium;

	if ( isset( $virtue_premium['enable_custom_404'] ) && '1' == $virtue_premium['enable_custom_404'] ) {
		if ( isset( $virtue_premium['custom_404_page'] ) && ! empty( $virtue_premium['custom_404_page'] ) ) {
			global $wp_query;
			global $post;
			$post = get_post( $virtue_premium['custom_404_page'] );

			$wp_query->posts             = array( $post );
			$wp_query->queried_object_id = $post->ID;
			$wp_query->queried_object    = $post;
			$wp_query->post_count        = 1;
			$wp_query->found_posts       = 1;
			$wp_query->max_num_pages     = 0;
			$wp_query->is_404            = false;
			$wp_query->is_page           = true;
			// $wp_query = null;
			// $wp_query = new WP_Query();
			// $wp_query->query( 'page_id=' . $virtue_premium['custom_404_page'] );
			// $wp_query->the_post();

			// $template = get_page_template();
			// error_log( print_r( $template, true ) );
			// rewind_posts();

			return get_page_template();

		} else {
			return $template;
		}
	} else {
		return $template;
	}
}
add_filter( '404_template', 'kadence_custom_404_filter_template', 9999 );

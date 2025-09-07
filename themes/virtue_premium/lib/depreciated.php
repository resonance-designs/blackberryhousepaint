<?php
/**
 * Virtue depreciated
 *
 * @package Virtue Theme
 */

/**
 * Virtue depreciated filters
 */
function virtue_depreciated_filters() {
	/**
	 * Virtue depreciated filters
	 */
	global $virtue_map_deprecated_filters;

	$virtue_map_deprecated_filters = array(
		'virtue_site_name' => 'kad_site_name',
	);

	foreach ( $virtue_map_deprecated_filters as $new => $old ) {
		add_filter( $new, 'virtue_deprecated_filter_mapping' );
	}

	/**
	 * Virtue depreciated filters maping
	 *
	 * @param string $data The filter string.
	 * @param mixed  $arg_1 The filter first arg.
	 * @param mixed  $arg_2 The filter second arg.
	 * @param mixed  $arg_3 The filter third arg.
	 */
	function virtue_deprecated_filter_mapping( $data, $arg_1 = '', $arg_2 = '', $arg_3 = '' ) {
		global $virtue_map_deprecated_filters;
		$filter = current_filter();
		if ( isset( $virtue_map_deprecated_filters[ $filter ] ) ) {
			if ( has_filter( $virtue_map_deprecated_filters[ $filter ] ) ) {
				$data = apply_filters( $virtue_map_deprecated_filters[ $filter ], $data, $arg_1, $arg_2, $arg_3 );
				error_log( 'The ' . $virtue_map_deprecated_filters[ $filter ] . ' filter is deprecated. Please use ' . $filter . ' instead.' );
			}
		}
		return $data;
	}
}
add_action( 'after_setup_theme', 'virtue_depreciated_filters' );


/**
 * Depreciated kadence_sidebar_class
 */
function kadence_sidebar_class() {
	error_log( 'The kadence_sidebar_class() function is deprecated since version 4.3.5. Please use virtue_sidebar_class() instead.' );
	return virtue_sidebar_class();
}
/**
 * Depreciated kadence_main_class
 */
function kadence_main_class() {
	error_log( 'The kadence_main_class() function is deprecated since version 4.3.5. Please use virtue_main_class() instead.' );
	return virtue_main_class();
}
/**
 * Depreciated kadence_display_sidebar
 */
function kadence_display_sidebar() {
	error_log( 'The kadence_display_sidebar() function is deprecated since version 4.3.5. Please use virtue_display_sidebar() instead.' );
	return virtue_display_sidebar();
}
/**
 * Depreciated kadence_sidebar_id
 */
function kadence_sidebar_id() {
	if ( defined( 'WP_DEBUG' ) && true === WP_DEBUG && apply_filters( 'doing_it_wrong_trigger_error', true ) ) {
		virtue_deprecated_function( 'kadence_sidebar_id', '4.3.5', 'virtue_sidebar_id' );
	}
	return virtue_sidebar_id();
}

/**
 * Depreciated "kadence_display_staff_breadcrumbs"
 */
function kadence_display_staff_breadcrumbs() {
	if ( defined( 'WP_DEBUG' ) && true === WP_DEBUG && apply_filters( 'doing_it_wrong_trigger_error', true ) ) {
		virtue_deprecated_function( 'kadence_display_staff_breadcrumbs', '4.9.12', 'virtue_display_staff_breadcrumbs' );
	}
	virtue_display_staff_breadcrumbs();
}

/**
 * Depreciated "kadence_shop_layout_css"
 */
function kadence_shop_layout_css() {
	global $virtue_premium;
	if ( virtue_display_sidebar() ) {
		if ( isset( $virtue_premium['product_shop_layout'] ) ) {
			$columns = "shopcolumn" . $virtue_premium['product_shop_layout'] . " shopsidebarwidth";
		} else {
			$columns = "shopcolumn4 shopsidebarwidth";
		}
	} else {
		if ( isset( $virtue_premium['product_shop_layout'] ) ) {
			$columns = "shopcolumn" . $virtue_premium['product_shop_layout'] . " shopfullwidth";
		} else {
			$columns = "shopcolumn4 shopfullwidth";
		}
	}

	return $columns;
}

/**
 * Check for woo extras update.
 */
function virtue_check_woo_extra_update_fix() {
	if ( is_admin() && defined( 'KADENCE_WOO_EXTRAS_VERSION' ) ) {
		if ( '1.4.6' === KADENCE_WOO_EXTRAS_VERSION ) {
			if ( class_exists( 'PluginUpdateChecker_2_0' ) && 'Activated' === get_option( 'kt_api_manager_kadence_woo_activated' ) ) {
				if ( defined( 'KADENCE_WOO_EXTRAS_PATH' ) ) {
					$kad_woo_extras_updater = new PluginUpdateChecker_2_0( 'https://kernl.us/api/v1/updates/57a0dc911d25838411878099/', KADENCE_WOO_EXTRAS_PATH . 'kadence-woo-extras.php', 'kadence-woo-extras', 1 );
				}
			}
		}
	}
}
add_action( 'after_setup_theme', 'virtue_check_woo_extra_update_fix' );

/**
 * Function to issue error for deprecated functions.
 *
 * @param string $function the old function name.
 * @param string $version the version when changed.
 * @param string $new_function the new function name.
 */
function virtue_deprecated_function( $function = '', $version = '', $new_function = '' ) {
	if ( defined( 'WP_DEBUG' ) && true === WP_DEBUG && apply_filters( 'doing_it_wrong_trigger_error', true ) ) {
		trigger_error(
			sprintf(
				/* translators: 1: old function name, 2: version when changed, 3: new function name */
				esc_html__( 'The function: %1$s has been deprecated since version: %2$s Please update your templates to use %3$s instead.', 'virtue' ),
				esc_html( $function ),
				esc_html( $version ),
				esc_html( $new_function )
			)
		);
	}
}

/**
 * Function to issue error for deprecated actions.
 *
 * @param string $action the old action name.
 * @param string $version the version when changed.
 * @param string $new_action the new action name.
 */
function virtue_deprecated_action( $action = '', $version = '', $new_action = '' ) {
	if ( defined( 'WP_DEBUG' ) && true === WP_DEBUG && apply_filters( 'doing_it_wrong_trigger_error', true ) ) {
		trigger_error(
			sprintf(
				/* translators: 1: old action name, 2: version when changed, 3: new action name */
				esc_html__( 'The action: %1$s has been deprecated since version: %2$s Please update your templates to use %3$s instead.', 'virtue' ),
				esc_html( $action ),
				esc_html( $version ),
				esc_html( $new_action )
			)
		);
	}
}

/**
 * Virtue hook into old actions for child theme support.
 */
function virtue_deprecated_actions_call() {
	$actions = array(
		array( 'kadence_single_post_begin', '4.9.12', 'virtue_single_post_begin', 'virtue_single_post_upper_headcontent', 10 ),
		array( 'kadence_single_post_before_header', '4.9.12', 'virtue_single_post_before_header', 'virtue_single_post_headcontent', 10 ),
		array( 'kadence_single_post_before_header', '4.9.12', 'virtue_single_post_before_header', 'virtue_single_post_meta_date', 20 ),
		array( 'kadence_single_post_before_header', '4.9.12', 'virtue_single_post_before_header', 'virtue_single_custom_post_featured_image', 10 ),
		array( 'kadence_single_post_header', '4.9.12', 'virtue_single_post_header', 'virtue_post_header_breadcrumbs', 10 ),
		array( 'kadence_single_post_header', '4.9.12', 'virtue_single_post_header', 'virtue_post_header_title', 20 ),
		array( 'kadence_single_post_header', '4.9.12', 'virtue_single_post_header', 'virtue_post_header_meta', 30 ),
		array( 'kadence_single_post_footer', '4.9.12', 'virtue_single_post_footer', 'virtue_post_footer_pagination', 10 ),
		array( 'kadence_single_post_footer', '4.9.12', 'virtue_single_post_footer', 'virtue_post_footer_tags', 20 ),
		array( 'kadence_single_post_footer', '4.9.12', 'virtue_single_post_footer', 'virtue_post_footer_meta', 30 ),
		array( 'kadence_single_post_footer', '4.9.12', 'virtue_single_post_footer', 'virtue_post_nav', 40 ),
		array( 'kadence_single_post_after', '4.9.12', 'virtue_single_post_after', 'virtue_post_authorbox', 20 ),
		array( 'kadence_single_post_after', '4.9.12', 'virtue_single_post_after', 'virtue_post_bottom_carousel', 30 ),
		array( 'kadence_single_post_after', '4.9.12', 'virtue_single_post_after', 'virtue_post_comments', 40 ),
		array( 'kadence_post_excerpt_header', '4.9.12', 'virtue_post_excerpt_header', 'virtue_post_excerpt_header_title', 10 ),
		array( 'kadence_post_excerpt_header', '4.9.12', 'virtue_post_excerpt_header', 'virtue_post_header_meta', 20 ),
		array( 'kadence_post_excerpt_before_header', '4.9.12', 'virtue_post_excerpt_before_header', 'virtue_single_post_meta_date', 20 ),
		array( 'kadence_post_mini_excerpt_header', '4.9.12', 'virtue_post_mini_excerpt_header', 'virtue_post_mini_excerpt_header_title', 10 ),
		array( 'kadence_post_mini_excerpt_header', '4.9.12', 'virtue_post_mini_excerpt_header', 'virtue_post_meta_tooltip_subhead', 20 ),
		array( 'kadence_post_mini_excerpt_before_header', '4.9.12', 'virtue_post_mini_excerpt_before_header', 'virtue_post_meta_date', 10 ),
		array( 'kadence_post_grid_small_excerpt_header', '4.9.12', 'virtue_post_grid_small_excerpt_header', 'virtue_post_mini_excerpt_header_title', 10 ),
		array( 'kadence_post_grid_small_excerpt_header', '4.9.12', 'virtue_post_grid_small_excerpt_header', 'virtue_post_grid_header_meta', 20 ),
		array( 'kadence_post_grid_excerpt_footer', '4.9.12', 'virtue_post_grid_excerpt_footer', 'virtue_post_footer_tags', 10 ),
		array( 'kadence_post_excerpt_footer', '4.9.12', 'virtue_post_excerpt_footer', 'virtue_post_footer_tags', 10 ),
		array( 'kadence_single_loop_post_footer', '4.9.12', 'virtue_single_loop_post_footer', 'virtue_post_footer_tags', 20 ),
		array( 'kadence_single_loop_post_header', '4.9.12', 'virtue_single_loop_post_header', 'virtue_post_full_loop_title', 20 ),
		array( 'kadence_single_loop_post_header', '4.9.12', 'virtue_single_loop_post_header', 'virtue_post_header_meta', 30 ),
		array( 'kadence_post_grid_excerpt_header', '4.9.12', 'virtue_post_grid_excerpt_header', 'virtue_post_grid_excerpt_header_title', 10 ),
		array( 'kadence_post_grid_excerpt_header', '4.9.12', 'virtue_post_grid_excerpt_header', 'virtue_post_grid_header_meta', 20 ),
		array( 'kadence_post_carousel_small_excerpt_header', '4.9.12', 'virtue_post_carousel_small_excerpt_header', 'virtue_post_carousel_title', 10 ),
		array( 'kadence_post_carousel_small_excerpt_header', '4.9.12', 'virtue_post_carousel_small_excerpt_header', 'virtue_post_carousel_date', 20 ),
		array( 'kt_woocommerce_page_title_left', '4.9.12', 'virtue_woocommerce_page_title_left', 'virtue_woocommerce_page_title_output', 10 ),
		array( 'kt_woocommerce_page_title_left', '4.9.12', 'virtue_woocommerce_page_title_left', 'woocommerce_result_count', 20 ),
		array( 'kt_woocommerce_page_title_right', '4.9.12', 'virtue_woocommerce_page_title_right', 'virtue_woocommerce_page_title_toggle', 20 ),
		array( 'kt_woocommerce_page_title_right', '4.9.12', 'virtue_woocommerce_page_title_right', 'woocommerce_catalog_ordering', 30 ),
		array( 'kt_woocommerce_page_title_right', '4.9.12', 'virtue_woocommerce_page_title_right', 'virtue_woocommerce_page_title_shortcode', 40 ),
	);
	foreach ( $actions as $action ) {
		add_action(
			$action[0],
			function() use ( $action ) {
				if ( ! did_action( $action[2] ) ) {
					virtue_deprecated_action( $action[0], $action[1], $action[2] );
					call_user_func( $action[3] );
				}
			},
			$action[4]
		);
	}
}
add_action( 'init', 'virtue_deprecated_actions_call' );

/**
 * Keep old add filter call for child theme support.
 */
add_filter( 'kt_single_post_image_height', 'virtue_post_header_single_image_height', 10 );


<?php
/**
 * Template Hooks Init File, calls in other template hoook functions
 *
 * @package Virtue Theme.
 */

require_once trailingslashit( get_template_directory() ) . 'lib/template-hooks/posts.php';      // Posts Template Hooks.
require_once trailingslashit( get_template_directory() ) . 'lib/template-hooks/portfolio.php';  // Portfolio Template Hooks.
require_once trailingslashit( get_template_directory() ) . 'lib/template-hooks/page.php';       // Page Template Hooks.
require_once trailingslashit( get_template_directory() ) . 'lib/template-hooks/posts-list.php'; // Post List Template Hooks.

/**
 * Footer Sitewide Hook.
 */
function virtue_sitewide_shortcode_output() {
	$sitewide_footer = virtue_premium_get_option( 'sitewide_footer_shortcode_input' );
	if ( ! empty( $sitewide_footer ) ) {
		echo '<div class="clearfix kt_footer_sitewide_shortcode">';
		echo do_shortcode( $sitewide_footer );
		echo '</div>';
	}
}
add_action( 'kt_before_footer', 'virtue_sitewide_shortcode_output', 10 );

/**
 * Footer Sitewide Hook.
 */
function virtue_sitewide_calltoaction_output() {
	if ( '1' == virtue_premium_get_option( 'sitewide_calltoaction' ) ) {
		get_template_part( 'templates/sitewide', 'calltoaction' );
	}
}
add_action( 'kt_before_footer', 'virtue_sitewide_calltoaction_output', 20 );

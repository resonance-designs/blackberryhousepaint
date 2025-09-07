<?php
/**
 *  Post list Hooks
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 *  Post Header Title.
 */
function virtue_post_excerpt_header_title() {
	echo '<a href="' . esc_url( get_the_permalink() ) . '">';
		echo '<h2 class="entry-title">';
			the_title();
		echo '</h2>';
	echo '</a>';
}
add_action( 'virtue_post_excerpt_header', 'virtue_post_excerpt_header_title', 10 );

/**
 *  Full Post Header Title.
 */
function virtue_post_full_loop_title() {
	echo '<a href="' . esc_url( get_the_permalink() ) . '">';
		echo '<h2 class="entry-title">';
			the_title();
		echo '</h2>';
	echo '</a>';
}
add_action( 'virtue_single_loop_post_header', 'virtue_post_full_loop_title', 20 );

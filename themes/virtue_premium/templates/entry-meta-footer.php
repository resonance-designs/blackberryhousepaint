<?php
/**
 * Schema for single Post.
 *
 * @package Virtue Theme
 */

echo '<meta itemprop="dateModified" content="' . esc_attr( get_the_modified_date( 'c' ) ) . '">';
echo '<meta itemscope itemprop="mainEntityOfPage" content="' . esc_url( get_the_permalink() ) . '" itemType="https://schema.org/WebPage" itemid="' . esc_url( get_the_permalink() ) . '">';
echo '<div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">';
$logo_img = virtue_premium_get_option( 'x1_virtue_logo_upload' );
if ( isset( $logo_img['url'] ) && ! empty( $logo_img['url'] ) ) {
	echo '<div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">';
	echo '<meta itemprop="url" content="' . esc_attr( $logo_img['url'] ) . '">';
	echo '<meta itemprop="width" content="' . esc_attr( $logo_img['width'] ) . '">';
	echo '<meta itemprop="height" content="' . esc_attr( $logo_img['height'] ) . '">';
	echo '</div>';
}
echo '<meta itemprop="name" content="' . esc_attr( get_bloginfo( 'name' ) ) . '">';
echo '</div>';

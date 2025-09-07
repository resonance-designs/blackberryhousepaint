<?php
/**
 * The Template for displaying products in a product category. Simply includes the archive template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/taxonomy-product-cat.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     4.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$cat_term_id = get_queried_object()->term_id;
$meta        = get_option( 'product_cat_slider' );
if ( empty( $meta ) ) {
	$meta = array();
}
if ( ! is_array( $meta ) ) {
	$meta = (array) $meta;
}
$meta = isset( $meta[ $cat_term_id ] ) ? $meta[ $cat_term_id ] : array();

if ( isset( $meta['cat_short_slider'] ) ) {
	echo '<div class="sliderclass kad_cat_slider">' . do_shortcode( $meta['cat_short_slider'] ) . '</div>';
}
wc_get_template( 'archive-product.php' );

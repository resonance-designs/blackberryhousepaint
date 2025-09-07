<?php
/**
 * Single Product Up-Sells
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/up-sells.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     9.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $upsells ) :
	// Enqueue theme's Slick carousel initializer.
	wp_enqueue_script( 'virtue-slick-init' );

	// Columns/responsive config preserved from theme, with filter.
	$product_related_column = function_exists( 'virtue_premium_get_option' ) ? virtue_premium_get_option( 'related_item_column', '4' ) : '4';

	$rpc = array();
	if ( '2' === (string) $product_related_column ) {
		$rpc = array( 'xxl' => 2, 'xl' => 2, 'md' => 2, 'sm' => 2, 'xs' => 1, 'ss' => 1 );
	} elseif ( '3' === (string) $product_related_column ) {
		$rpc = array( 'xxl' => 3, 'xl' => 3, 'md' => 3, 'sm' => 3, 'xs' => 2, 'ss' => 1 );
	} elseif ( '6' === (string) $product_related_column ) {
		$rpc = array( 'xxl' => 6, 'xl' => 6, 'md' => 6, 'sm' => 4, 'xs' => 3, 'ss' => 2 );
	} elseif ( '5' === (string) $product_related_column ) {
		$rpc = array( 'xxl' => 5, 'xl' => 5, 'md' => 5, 'sm' => 4, 'xs' => 3, 'ss' => 2 );
	} else {
		$rpc = array( 'xxl' => 4, 'xl' => 4, 'md' => 4, 'sm' => 3, 'xs' => 2, 'ss' => 1 );
	}
	$rpc = apply_filters( 'kt_upsell_products_columns', $rpc );

	$heading = apply_filters( 'woocommerce_product_upsells_products_heading', __( 'You may also like&hellip;', 'woocommerce' ) );
	?>

	<section class="up-sells upsells products carousel_outerrim">
		<?php if ( $heading ) : ?>
			<h2><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>

		<div class="fredcarousel">
			<div id="carouselcontainer-upsell" class="rowtight">
				<div id="upsale-product-carousel" class="products slick-slider product_upsell_carousel kt-slickslider kt-content-carousel loading clearfix" data-slider-fade="false" data-slider-type="content-carousel" data-slider-anim-speed="400" data-slider-scroll="1" data-slider-auto="true" data-slider-speed="9000" data-slider-xxl="<?php echo esc_attr( $rpc['xxl'] ); ?>" data-slider-xl="<?php echo esc_attr( $rpc['xl'] ); ?>" data-slider-md="<?php echo esc_attr( $rpc['md'] ); ?>" data-slider-sm="<?php echo esc_attr( $rpc['sm'] ); ?>" data-slider-xs="<?php echo esc_attr( $rpc['xs'] ); ?>" data-slider-ss="<?php echo esc_attr( $rpc['ss'] ); ?>">

					<?php foreach ( $upsells as $upsell ) : ?>
						<?php
						$post_object = get_post( $upsell->get_id() );
						setup_postdata( $GLOBALS['post'] = $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found
						wc_get_template_part( 'content', 'product' );
						?>
					<?php endforeach; ?>

				</div>
			</div>
		</div>
	</section>

	<?php
endif;

wp_reset_postdata();
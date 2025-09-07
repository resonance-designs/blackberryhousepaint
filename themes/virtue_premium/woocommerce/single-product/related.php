<?php
/**
 * Related Products
 *
 * @author      WooThemes
 * @package     WooCommerce/Templates
 * @version     3.9.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( $related_products ) :

	$product_related_column = virtue_premium_get_option( 'related_item_column', '4' );

	$rpc = array();
	if ( '2' == $product_related_column ) {
		$rpc['xxl'] = 2;
		$rpc['xl']  = 2;
		$rpc['md']  = 2;
		$rpc['sm']  = 2;
		$rpc['xs']  = 1;
		$rpc['ss']  = 1;
	} elseif ( '3' == $product_related_column ) {
		$rpc['xxl'] = 3;
		$rpc['xl']  = 3;
		$rpc['md']  = 3;
		$rpc['sm']  = 3;
		$rpc['xs']  = 2;
		$rpc['ss']  = 1;
	} elseif ( '6' == $product_related_column ) {
		$rpc['xxl'] = 6;
		$rpc['xl']  = 6;
		$rpc['md']  = 6;
		$rpc['sm']  = 4;
		$rpc['xs']  = 3;
		$rpc['ss']  = 2;
	} elseif ( '5' == $product_related_column ) {
		$rpc['xxl'] = 5;
		$rpc['xl']  = 5;
		$rpc['md']  = 5;
		$rpc['sm']  = 4;
		$rpc['xs']  = 3;
		$rpc['ss']  = 2;
	} else {
		$rpc['xxl'] = 4;
		$rpc['xl']  = 4;
		$rpc['md']  = 4;
		$rpc['sm']  = 3;
		$rpc['xs']  = 2;
		$rpc['ss']  = 1;
	}
	$rpc = apply_filters( 'kt_related_products_columns', $rpc );

	wp_enqueue_script( 'virtue-slick-init' );

	$heading = apply_filters( 'woocommerce_product_related_products_heading', virtue_premium_get_option( 'related_products_text', __( 'Related Products', 'virtue' ) ) );
	?>

	<section class="related products carousel_outerrim">
		<?php
		if ( $heading ) :
			?>
			<h3><?php echo esc_html( $heading ); ?></h3>
		<?php endif; ?>
		<div class="fredcarousel">
			<div id="carouselcontainer" class="rowtight">
				<div id="related-product-carousel" class="products slick-slider product_related_carousel kt-slickslider kt-content-carousel loading clearfix" data-slider-fade="false" data-slider-type="content-carousel" data-slider-anim-speed="400" data-slider-scroll="1" data-slider-auto="true" data-slider-speed="9000" data-slider-xxl="<?php echo esc_attr( $rpc['xxl'] ); ?>" data-slider-xl="<?php echo esc_attr( $rpc['xl'] ); ?>" data-slider-md="<?php echo esc_attr( $rpc['md'] ); ?>" data-slider-sm="<?php echo esc_attr( $rpc['sm'] ); ?>" data-slider-xs="<?php echo esc_attr( $rpc['xs'] ); ?>" data-slider-ss="<?php echo esc_attr( $rpc['ss'] ); ?>">
					<?php foreach ( $related_products as $related_product ) : ?>

						<?php
						$post_object = get_post( $related_product->get_id() );

						setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found

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

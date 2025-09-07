<?php
/**
 * Home Featured Carousel
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $virtue_premium;


$ptitle          = virtue_premium_get_option( 'product_title', __( 'Featured Products', 'virtue' ) );
$product_tcolumn = virtue_premium_get_option( 'home_product_feat_column' );
$hp_procount     = virtue_premium_get_option( 'home_product_count' );
$hp_featspeed    = virtue_premium_get_option( 'home_product_feat_speed' );
$hp_featspeed    = $hp_featspeed . '000';
if ( 'all' === virtue_premium_get_option( 'home_product_feat_scroll' ) ) {
	$hp_featscroll = '';
} else {
	$hp_featscroll = '1';
}
?>
	<div class="home-product home-margin carousel_outerrim home-padding kad-animation" data-animation="fade-in" data-delay="0">
		<div class="clearfix">
			<h3 class="hometitle">
				<?php echo esc_html( $ptitle ); ?>
			</h3>
		</div>
		<?php
		virtue_build_post_content_carousel( 'featured', $product_tcolumn, 'product', null, $hp_procount, 'menu_order', 'ASC', 'products', null, 'true', $hp_featspeed, $hp_featscroll, 'true', '400', 'featured' );
		?>
</div>

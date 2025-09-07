<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
global $virtue_premium;
if ( 1 == virtue_premium_get_option( 'shop_toggle' ) ) {
	if ( 1 == virtue_premium_get_option( 'product_shop_layout' ) ) {
		?>
		<div class="kt_product_toggle_container_list single_to_grid">
			<div title="<?php echo esc_html__( 'List View', 'virtue' ); ?>" class="toggle_list toggle_active" data-toggle="product_list">
			<i class="icon-menu4"></i>
			</div>
			<div title="<?php echo esc_html__( 'Grid View', 'virtue' ); ?>" class="toggle_grid" data-toggle="product_grid">
				<i class="icon-grid5"></i>
			</div>
		</div>
	<?php } else { ?>
		<div class="kt_product_toggle_container">
			<div title="<?php echo esc_html__( 'Grid View', 'virtue' ); ?>" class="toggle_grid toggle_active" data-toggle="product_grid">
				<i class="icon-grid5"></i>
			</div>
			<div title="<?php echo esc_html__( 'List View', 'virtue' ); ?>" class="toggle_list" data-toggle="product_list">
				<i class="icon-menu4"></i>
			</div>
		</div>
		<?php
	}
}

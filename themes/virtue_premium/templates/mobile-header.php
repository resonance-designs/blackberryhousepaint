<?php
/**
 * Mobile Header Template.
 *
 * @package Virtue Theme
 */

global $virtue_premium, $woocommerce; 

if ( 1 == virtue_premium_get_option( 'mobile_header_sticky' ) ) {
	$sticky = '1';
} else {
	$sticky = '0';
}
if ( 1 == virtue_premium_get_option( 'mobile_header_account' ) ) {
	$account = '1';
} else {
	$account = '0';
}
if ( 1 == virtue_premium_get_option( 'mobile_header_cart' ) ) {
	$cart = '1';
} else {
	$cart = '0';
}
if ( 1 == virtue_premium_get_option( 'mobile_header_search' ) ) {
	$msearch = '1';
} else {
	$msearch = '0';
}
$height = virtue_premium_get_option( 'mobile_header_height' );
$count  = $cart + $msearch + $account;
if ( '3' == $count ) {
	$padding = '200';
	$right   = '160';
} elseif ( '2' == $count ) {
	$padding = '150';
	$right   = '110';
} elseif ( '1' == $count ) {
	$padding = '100';
	$right   = '60';
} else {
	$padding = '50';
	$right   = '';
}
$accountright = '';
?>
<div id="kad-mobile-banner" class="banner mobile-headerclass" data-mobile-header-sticky="<?php echo esc_attr( $sticky ); ?>">
	<div class="container mobile-header-container" style="height:<?php echo esc_attr( $height ); ?>px">
		<div class="clearfix kad-mobile-header-logo">
			<a class="mobile-logo" href="<?php echo esc_url( apply_filters( 'kadence_logo_link', home_url( '/' ) ) ); ?>" style="padding-right:<?php echo esc_attr( $padding ); ?>px; height:<?php echo esc_attr( $height ); ?>px">
				<div class="mobile-logo-inner" style="height:<?php echo esc_attr( $height ); ?>px">
				<?php
				if ( ! empty( $virtue_premium['mobile_header_logo']['url'] ) ) {
					?>
					<img src="<?php echo esc_url( $virtue_premium['mobile_header_logo']['url'] ); ?>" style="max-height:<?php echo esc_attr( $height ); ?>px;" alt="<?php bloginfo( 'name' ); ?>" class="kad-mobile-logo" />
				<?php } ?>
				</div>
			</a> <!-- Close #mobile-logo -->
		</div><!-- Close .kad-mobile-header-logo -->
		<?php do_action( 'kadence_mobile_header_before_items' ); ?>
		<?php if ( has_nav_menu( 'mobile_navigation' ) ) : ?>
			<button class="mh-nav-trigger-case collapsed" data-toggle="collapse" rel="nofollow" title="<?php echo esc_html__( 'Menu', 'virtue' ); ?>" aria-label="<?php echo esc_html__( 'Menu', 'virtue' ); ?>" data-target=".mh-mobile_menu_collapse" style="line-height:<?php echo esc_attr( $height ); ?>px;">
				<span class="kad-navbtn clearfix"><i class="icon-menu"></i></span>
			</button>
			<?php
		endif;

		if ( class_exists( 'woocommerce' ) ) {
			if ( '1' == $cart ) :
				?>
				<a class="menu-cart-btn mh-menu-cart-btn" title="<?php echo esc_html__( 'Your Cart', 'virtue' ); ?>" aria-label="<?php echo esc_html__( 'Your Cart', 'virtue' ); ?>" style="line-height:<?php echo esc_attr( $height ); ?>px;" href="<?php echo esc_url( wc_get_cart_url() ); ?>">
				<div class="kt-cart-container"><i class="icon-cart"></i>
					<span class="kt-cart-total">
						<?php echo WC()->cart->get_cart_contents_count(); ?>
					</span></div>
				</a>
				<?php
				$accountright = '110px';
			endif;
			if ( '1' == $account ) :
				?>
				<a class="menu-account-btn mh-menu-account-btn" title="<?php echo esc_attr__( 'My Account', 'virtue' ); ?>" aria-label="<?php echo esc_html__( 'My Account', 'virtue' ); ?>" style="line-height:<?php echo esc_attr( $height ); ?>px; right:<?php echo esc_attr( $accountright ); ?>;" href="<?php echo esc_url( get_permalink( get_option( 'woocommerce_myaccount_page_id' ) ) ); ?>">
					<div class="kt-account-container"><i class="icon-user2"></i></div>
				</a> 
				<?php
			endif;
		}

		if ( $msearch == '1' ) :
			?>
			<a class="kt-menu-search-btn mh-kt-menu-search-btn collapsed" style="line-height:<?php echo esc_attr( $height ); ?>px; right:<?php echo esc_attr( $right ); ?>px;" aria-label="<?php echo esc_html__( 'Search', 'virtue' ); ?>" title="<?php echo esc_attr__( 'Search', 'virtue' ); ?>" data-toggle="collapse" data-target="#mh-kad-menu-search-popup">
			<i class="icon-search"></i>
			</a>
			<div id="mh-kad-menu-search-popup" class="search-container container collapse">
				<div class="mh-kt-search-container">
					<?php
					if ( class_exists( 'woocommerce' ) && '1' == virtue_premium_get_option( 'mobile_header_search_woo' ) ) {
						get_product_search_form();
					} else {
						get_search_form();
					}
					?>
				</div>
			</div>
			<?php
		endif;
		?>
		<?php do_action( 'kadence_mobile_header_after_items' ); ?>
	</div> <!-- Close Container -->
	<?php if (has_nav_menu('mobile_navigation')) : ?>
	<div class="container mobile-dropdown-container">
		<div id="mg-kad-mobile-nav" class="mh-kad-mobile-nav kad-mobile-nav">
			<div class="mh-kad-nav-inner kad-nav-inner mobileclass">
				<div id="mh-mobile_menu_collapse" class="mh-kad-nav-collapse collapse mh-mobile_menu_collapse">
				<?php
				if ( '1' == virtue_premium_get_option( 'mobile_submenu_collapse' ) ) {
					wp_nav_menu( array('theme_location' => 'mobile_navigation', 'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>', 'menu_class' => 'kad-mnav', 'walker' => new Virtue_Mobile_Nav_Walker() ) );
				} else {
					wp_nav_menu( array( 'theme_location' => 'mobile_navigation','items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>', 'menu_class' => 'kad-mnav' ) );
				}
				?>
		</div>
		</div>
			</div>   
		</div>
	<?php endif; ?> 
</div>

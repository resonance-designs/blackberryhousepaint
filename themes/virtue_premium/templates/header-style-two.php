<?php
/**
 * Lagacy - Header Style Two template.
 *
 * @package Virtue
 */

?>
<header id="kad-banner" class="banner headerclass kad-header-style-two" data-header-shrink="0" data-mobile-sticky="0">
	<?php
	if ( '1' == virtue_premium_get_option( 'topbar' ) ) {
		get_template_part( 'templates/header', 'topbar' );
	}
	if ( 'logocenter' == virtue_premium_get_option( 'logo_layout' ) ) {
		$logocclass = 'col-md-4 col-lg-2';
		$menulclass = 'col-md-4 col-lg-5';
	} else {
		$logocclass = 'col-md-4';
		$menulclass = 'col-md-4';
	}
	?>
	<div class="container">
		<div class="row">
			<div class="<?php echo esc_attr( $menulclass ); ?> kad-header-left">
				<?php do_action( 'virtue_before_left_header_content' ); ?>
				<nav class="nav-main" class="clearfix">
				<?php
				if ( has_nav_menu( 'primary_navigation' ) ) :
					wp_nav_menu(
						array(
							'theme_location' => 'primary_navigation',
							'menu_class'     => 'sf-menu',
						)
					);
				endif;
				?>
				</nav>
				<?php do_action( 'virtue_after_left_header_content' ); ?> 
				</div> <!-- Close left_menu -->  
				<div class="<?php echo esc_attr( $logocclass ); ?> clearfix kad-header-center">
					<div id="logo" class="logocase">
						<a class="brand logofont" href="<?php echo esc_url( apply_filters( 'kadence_logo_link', home_url( '/' ) ) ); ?>" title="<?php bloginfo( 'name' ); ?>">
						<?php
						$logo_img = virtue_premium_get_option( 'x1_virtue_logo_upload' );
						if ( isset( $logo_img['url'] ) && ! empty( $logo_img['url'] ) ) {
							?>
							<div id="thelogo">
								<img src="<?php echo esc_url( $logo_img['url'] ); ?>" alt="<?php esc_attr( bloginfo( 'name' ) ); ?>" class="kad-standard-logo" />
								<?php
								$hd_logo_img = virtue_premium_get_option( 'x2_virtue_logo_upload' );
								if ( isset( $hd_logo_img['url'] ) && ! empty( $hd_logo_img['url'] ) ) {
									?>
									<img src="<?php echo esc_url( $hd_logo_img['url'] ); ?>" class="kad-retina-logo" alt="<?php bloginfo( 'name' ); ?>" style="max-height:<?php echo esc_attr( $logo_img['height'] ); ?>px" />
								<?php } ?>
							</div>
							<?php
						} else {
							echo wp_kses_post( apply_filters( 'kad_site_name', get_bloginfo( 'name' ) ) );
						}
						?>
						</a>
						<?php
						$belowlogo_text = virtue_premium_get_option( 'logo_below_text' );
						if ( ! empty( $belowlogo_text ) ) {
							?>
							<p class="kad_tagline belowlogo-text"><?php echo wp_kses_post( $belowlogo_text ); ?></p>
						<?php } ?>
					</div> <!-- Close #logo -->
				</div><!-- close logo container -->

				<div class="<?php echo esc_attr( $menulclass ); ?> kad-header-right">
					<?php do_action( 'virtue_before_right_header_content' ); ?>
					<nav class="nav-main clearfix">
					<?php
					if ( has_nav_menu( 'secondary_navigation' ) ) :
						wp_nav_menu(
							array(
								'theme_location' => 'secondary_navigation',
								'menu_class'     => 'sf-menu',
							)
						);
					endif;
					?>
					</nav> 
					<?php do_action( 'virtue_after_right_header_content' ); ?>
				</div> <!-- Close right_menu -->       
			</div> <!-- Close Row -->
		<?php
		if ( has_nav_menu( 'mobile_navigation' ) ) :
			if ( '1' == virtue_premium_get_option( 'mobile_header' ) && '1' == virtue_premium_get_option( 'mobile_header_tablet_show' ) ) {
				echo '<!-- mobileheader -->';
			} else {
				?>
				<div id="mobile-nav-trigger" class="nav-trigger mobile-nav-trigger-id">
					<button class="nav-trigger-case mobileclass collapsed" title="<?php echo esc_html__( 'Menu', 'virtue' ); ?>" aria-label="<?php echo esc_html__( 'Menu', 'virtue' ); ?>" data-toggle="collapse" rel="nofollow" data-target=".mobile_menu_collapse">
						<span class="kad-navbtn clearfix"><i class="icon-menu"></i></span>
						<span class="kad-menu-name">
							<?php echo esc_html( virtue_premium_get_option( 'mobile_menu_text', __( 'Menu', 'virtue' ) ) ); ?>
						</span>
					</button>
				</div>
				<div id="kad-mobile-nav" class="kad-mobile-nav id-kad-mobile-nav">
					<div class="kad-nav-inner mobileclass">
						<div id="mobile_menu_collapse" class="kad-nav-collapse collapse mobile_menu_collapse">
						<?php
						do_action( 'virtue_mobile_menu_before' );
						if ( '1' == virtue_premium_get_option( 'menu_search' ) ) {
							if ( class_exists( 'woocommerce' ) && '1' == virtue_premium_get_option( 'menu_search_woo' ) ) {
								get_product_search_form();
							} else {
								get_search_form();
							}
						}
						if ( '1' == virtue_premium_get_option( 'mobile_submenu_collapse' ) ) {
							wp_nav_menu(
								array(
									'theme_location' => 'mobile_navigation',
									'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
									'menu_class'     => 'kad-mnav',
									'walker'         => new Virtue_Mobile_Nav_Walker(),
								)
							);
						} else {
							wp_nav_menu(
								array(
									'theme_location' => 'mobile_navigation',
									'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
									'menu_class'     => 'kad-mnav',
								)
							);
						}
						do_action( 'virtue_mobile_menu_after' );
						?>
						</div>
					</div>
				</div>
				<?php
			}
		endif;
		?>
	</div> <!-- Close Container -->
	<?php
	$banner_img = virtue_premium_get_option( 'virtue_banner_upload' );
	if ( isset( $banner_img['url'] ) && ! empty( $banner_img['url'] ) ) {
		?>
		<div class="container virtue_sitewide_banner">
			<div class="virtue_banner">
				<?php
				$banner_link = virtue_premium_get_option( 'virtue_banner_link' );
				if ( ! empty( $banner_link ) ) {
					?>
					<a href="<?php echo esc_url( virtue_premium_get_option( 'virtue_banner_link' ) ); ?>">
					<?php
				}
					$alt_text = get_post_meta( $banner_img['id'], '_wp_attachment_image_alt', true );
				?>
					<img src="<?php echo esc_url( $banner_img['url'] ); ?>" width="<?php echo esc_attr( $banner_img['width'] ); ?>" height="<?php echo esc_attr( $banner_img['height'] ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>" />
				<?php
				if ( ! empty( $banner_link ) ) {
					?>
					</a>
					<?php
				}
				?>
			</div><!--close virtue_banner-->
		</div><!--close container-->
		<?php
	}
	// Deprecated.
	do_action( 'kt_after_header_content' );

	do_action( 'virtue_after_header_content' );
	?>
</header>

<?php
/**
 * Update The Virtue Premium Theme.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( get_option( 'kt_api_manager_virtue_premium_activated' ) == 'Activated' ) {
	if ( class_exists( 'Kadence_Update_Checker' ) ) {
		$Virtue_UpdateChecker = Kadence_Update_Checker::buildUpdateChecker( 'https://kernl.us/api/v1/theme-updates/567242b41c90572e711087ef/', VIRTUE_PREMIUM_PATH, 'virtue_premium' );
	}
} else {
	add_action( 'admin_notices', 'virtue_update_inactive_notice');
}

function virtue_update_inactive_notice() {
	if ( ! current_user_can( 'manage_options' ) ) {
	 	return;
	}
	$screen = get_current_screen();
	if(isset($screen->id)) {
		if('update-core' == $screen->id || 'themes' == $screen->id) {
			echo '<div id="message" class="error" style="background: #dc3232; color: white;">';
		        echo '<p>';
		        printf( __( 'This theme is not activated! To get theme updates you must activate your theme! %sClick here%s to activate the license api key.', 'virtue' ), '<a style="color: white;" href="' . esc_url( admin_url( 'themes.php?page=kt_api_manager_dashboard' ) ) . '">', '</a>' ); 
		        echo '</p>';
		    echo '</div>';
		}
	}
}


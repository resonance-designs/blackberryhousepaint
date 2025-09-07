<?php
/**
 * Include the TGM_Plugin_Activation and add the plugins.
 *
 * @package Virtue Theme
 */

/**
 * Include the TGM_Plugin_Activation class.
 */
require_once trailingslashit( get_template_directory() ) . 'lib/vendor/class-tgm-plugin-activation.php';

if ( 'Activated' === get_option( 'kt_api_manager_virtue_premium_activated' ) ) {
	add_action( 'tgmpa_register', 'virtue_register_bundled_plugins', 30 );
}
/**
 * Register the bundled plugins for this theme.
 */
function virtue_register_bundled_plugins() {
	global $virtue_premium;
	$plugins    = array();
	$addons     = array();
	$activation = get_option( 'kt_api_manager' );
	if ( isset( $activation['kt_api_key'] ) ) {
		$license = substr( $activation['kt_api_key'], 0, 3 );
		if ( ( 'wc_' === $license || 'ord' === $license ) && ( isset( $virtue_premium['kt_revslider_notice'] ) && '1' == $virtue_premium['kt_revslider_notice'] ) ) {
			$addons[] = array(
				'name'    => 'Revolution Slider',
				'slug'    => 'revslider',
				'source'  => 'https://downloads.kadencewp.com/pl-updates/098723746686238794809/revslider.zip',
				'version' => '6.5.25',
			);
		}
	}
	if ( isset( $virtue_premium['kt_cycloneslider_notice'] ) && '1' == $virtue_premium['kt_cycloneslider_notice'] ) {
		$addons[] = array(
			'name'    => 'Cyclone Slider Pro',
			'slug'    => 'cyclone-slider-pro',
			'source'  => 'https://downloads.kadencewp.com/pl-updates/125512389764232323452/cyclone-slider-pro.zip',
			'version' => '2.10.4',
		);
	}
	$addons[] = array(
		'name'    => 'Kadence Slider',
		'slug'    => 'kadence-slider',
		'source'  => 'https://downloads.kadencewp.com/pl-updates/077983577897232983092/kadence-slider.zip',
		'version' => '2.3.4',
	);
	$addons[] = array(
		'name'    => 'Kadence Blocks Pro',
		'slug'    => 'kadence-blocks-pro',
		'source'  => 'https://downloads.kadencewp.com/pl-updates/077983577897232983092/kadence-blocks-pro.zip',
		'version' => '1.7.29',
	);
	$addons[] = array(
		'name'    => 'Kadence Custom Fonts',
		'slug'    => 'kadence-custom-fonts',
		'source'  => 'https://downloads.kadencewp.com/pl-updates/987787236765980923553/kadence-custom-fonts.zip',
		'version' => '1.1.5',
	);
	$addons[] = array(
		'name'    => 'Kadence reCAPTCHA',
		'slug'    => 'kadence-recaptcha',
		'source'  => 'https://downloads.kadencewp.com/pl-updates/987787236765980923553/kadence-recaptcha.zip',
		'version' => '1.3.0',
	);
	$addons[] = array(
		'name'    => 'Kadence Importer',
		'slug'    => 'kadence-importer',
		'source'  => 'https://downloads.kadencewp.com/pl-updates/987787236765980923553/kadence-importer.zip',
		'version' => '2.1.1',
	);

	foreach ( $addons as $ext => $data ) {
		$plugins[ $ext ] = array(
			'name'               => $data['name'],
			'slug'               => $data['slug'],
			'source'             => $data['source'],
			'required'           => false,
			'version'            => $data['version'],
			'force_activation'   => false,
			'force_deactivation' => false,
		);
	}
	/**
	 * Array of configuration settings. Amend each line as needed.
	 * If you want the default strings to be available under your own theme domain,
	 * leave the strings uncommented.
	 * Some of the strings are added into a sprintf, so see the comments at the
	 * end of each line for what each argument will be.
	 */
	$config = array(
		'domain'       => 'virtue',
		'default_path' => '',
		'parent_slug'  => 'themes.php',
		'menu'         => 'install-recommended-plugins',
		'has_notices'  => false,
		'is_automatic' => false,
		'message'      => '',
		'strings'      => array(
			'page_title'                     => __( 'Install Bundled Plugins', 'virtue' ),
			'menu_title'                     => __( 'Theme Plugins', 'virtue' ),
			'oops'                           => __( 'Something went wrong with the plugin API.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'notice_can_install_recommended' => _n_noop( 'This theme comes packaged with the following premium plugin: %1$s. Plugin is not required.', 'This theme comes packaged with the following premium plugins: %1$s. Plugins are not required.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'notice_cannot_install'          => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'virtue' ),
			'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'virtue' ),
			'activate_link'                   => _n_noop( 'Activate installed plugin', 'Activate installed plugins', 'virtue' ),
			'return'                          => __( 'Return to recommended Plugins Installer', 'virtue' ),
			'plugin_activated'                => __( 'Plugin activated successfully.', 'virtue' ),
			/* translators: %1$s = plugin name(s) */
			'complete'                        => __( 'All plugins installed and activated successfully. %s', 'virtue' ),
			'nag_type'                        => 'updated',
		),
	);
	tgmpa( $plugins, $config );
}

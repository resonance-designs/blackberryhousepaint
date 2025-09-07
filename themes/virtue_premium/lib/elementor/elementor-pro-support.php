<?php
/**
 * Elementor Pro Support
 *
 * @package Virtue Theme
 */

namespace Elementor;

// If plugin - 'Elementor' not exist then return.
if ( ! class_exists( '\Elementor\Plugin' ) || ! class_exists( 'ElementorPro\Modules\ThemeBuilder\Module' ) ) {
	return;
}

namespace ElementorPro\Modules\ThemeBuilder\ThemeSupport;

use Elementor\TemplateLibrary\Source_Local;
use ElementorPro\Modules\ThemeBuilder\Classes\Locations_Manager;
use ElementorPro\Modules\ThemeBuilder\Module;


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Ascend Elementor Compatibility
 */
if ( ! class_exists( 'Virtue_Elementor_Pro' ) ) {

	/**
	 * virtue Elementor Compatibility
	 *
	 * @since 1.2.7
	 */
	class Virtue_Elementor_Pro {

		/**
		 * Instance Control Variable
		 *
		 * @var object instance
		 */
		private static $instance;

		/**
		 * Initiator
		 *
		 * @return object Class object.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}
		/**
		 * Constructor
		 */
		public function __construct() {

			add_action( 'elementor/theme/register_locations', array( $this, 'virtue_register_elementor_locations' ) );

			add_action( 'virtue_header', array( $this, 'virtue_elementor_do_header' ), 0 );
			add_action( 'virtue_footer', array( $this, 'virtue_elementor_do_footer' ), 0 );
		}

		/**
		 * Elementor Location support.
		 *
		 * @param object $elementor_theme_manager the theme manager.
		 */
		public function virtue_register_elementor_locations( $elementor_theme_manager ) {
			$elementor_theme_manager->register_location( 'header' );
			$elementor_theme_manager->register_location( 'footer' );
		}

		/**
		 * Header Support
		 *
		 * @return void
		 */
		public function virtue_elementor_do_header() {
			$did_location = Module::instance()->get_locations_manager()->do_location( 'header' );
			if ( $did_location ) {
				remove_action( 'virtue_header', 'virtue_header_markup' );
			}
		}

		/**
		 * Footer Support
		 *
		 * @return void
		 */
		public function virtue_elementor_do_footer() {
			$did_location = Module::instance()->get_locations_manager()->do_location( 'footer' );
			if ( $did_location ) {
				remove_action( 'virtue_footer', 'virtue_footer_markup' );
			}
		}
	}
	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	Virtue_Elementor_Pro::get_instance();
}
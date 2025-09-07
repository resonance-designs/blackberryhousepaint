<?php 

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Virtue_Lazy_Load {
	private static $lazyload = null;

	public static function is_lazy() {
		if ( is_null( self::$lazyload ) ) {
			$lazy = false;
			self::$lazyload = apply_filters( 'kad_lazy_load', $lazy );
		}
		return self::$lazyload;
	}
}

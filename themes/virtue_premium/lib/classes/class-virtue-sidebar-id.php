<?php
/**
 * Virtue Sidebar ID Class
 *
 * @package Virtue Theme
 */

/**
 * Determines what sidebar to show.
 *
 * @return string with sidebar ID.
 */
class Virtue_Sidebar_Id {
	/**
	 * Holds the string for sidebar ID.
	 *
	 * @var values of the sidebar ID string.
	 */
	public static $sidebar = null;

	/**
	 * Checks if page has a sidebar.
	 *
	 * @return boolean True will display the sidebar, False will not
	 */
	public static function sidebar() {
		if ( is_null( self::$sidebar ) ) {
			self::$sidebar = self::check_conditionals();
		}
		return self::$sidebar;
	}
	/**
	 * Checks conditionals to see if page has a sidebar.
	 *
	 * @return boolean True will display the sidebar, False will not.
	 */
	public static function check_conditionals() {
		$sidebar = 'sidebar-primary';
		if ( is_front_page() ) {
			$sidebar = virtue_premium_get_option( 'home_sidebar', 'sidebar-primary' );
		} elseif ( is_home() ) {
			$homeid      = get_option( 'page_for_posts' );
			$postsidebar = get_post_meta( $homeid, '_kad_sidebar_choice', true );
			if ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
				$sidebar = virtue_premium_get_option( 'default_page_sidebar_id', 'sidebar-primary' );
			} else {
				$sidebar = $postsidebar;
			}
		} elseif ( is_page() && ! is_attachment() ) {
			$postsidebar = get_post_meta( get_the_ID(), '_kad_sidebar_choice', true );
			if ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
				$sidebar = virtue_premium_get_option( 'default_page_sidebar_id', 'sidebar-primary' );
			} else {
				$sidebar = $postsidebar;
			}
		} elseif ( is_singular() ) {
			$postsidebar = get_post_meta( get_the_ID(), '_kad_sidebar_choice', true );
			if ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
				if ( is_singular( 'post' ) || is_singular( 'staff' ) ) {
					$sidebar = virtue_premium_get_option( 'blogpost_sidebar_id_default', 'sidebar-primary' );
				} elseif ( is_singular( 'product' ) ) {
					$sidebar = virtue_premium_get_option( 'product_sidebar_default_sidebar', 'sidebar-primary' );
				} elseif ( ! in_array( get_post_type(), array( 'staff', 'testimonial', 'portfolio', 'attachment' ), true ) ) {
					$sidebar = virtue_premium_get_option( 'custom_post_sidebar_id_default', 'sidebar-primary' );
				}
			} else {
				$sidebar = $postsidebar;
			}
		} elseif ( class_exists( 'woocommerce' ) && is_archive() && is_shop() ) {
			$sidebar = virtue_premium_get_option( 'shop_sidebar', 'sidebar-primary' );
		} elseif ( class_exists( 'woocommerce' ) && is_archive() && ( is_product_category() || is_product_tag() || is_tax( 'product_brands' ) || is_tax( 'product_brands' ) ) ) {
			$sidebar = virtue_premium_get_option( 'shop_cat_sidebar', 'sidebar-primary' );
		} elseif ( is_archive() && ! is_tax( 'portfolio-type' ) && ! is_tax( 'portfolio-tag' ) ) {
			$sidebar = virtue_premium_get_option( 'blog_cat_sidebar', 'sidebar-primary' );
		} elseif ( is_search() ) {
			$sidebar = virtue_premium_get_option( 'search_sidebar', 'sidebar-primary' );
		}
		return $sidebar;
	}
}

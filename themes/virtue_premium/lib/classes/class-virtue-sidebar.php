<?php
/**
 * Virtue Sidebar Class
 *
 * @package Virtue Theme
 */

/**
 * Determines whether or not to display the sidebar based on an array of conditional tags or page templates.
 *
 * @return boolean True will display the sidebar, False will not
 */
class Virtue_Sidebar {
	/**
	 * Holds the bool for showing a sidebar.
	 *
	 * @var values of the theme settings.
	 */
	public static $display = null;

	/**
	 * Checks if page has a sidebar.
	 *
	 * @return boolean True will display the sidebar, False will not
	 */
	public static function has_sidebar() {
		if ( is_null( self::$display ) ) {
			self::$display = self::check_conditionals();
		}
		return self::$display;
	}
	/**
	 * Checks conditionals to see if page has a sidebar.
	 *
	 * @return boolean True will display the sidebar, False will not.
	 */
	public static function check_conditionals() {
		$sidebar = false;
		if ( is_front_page() ) {
			if ( 'sidebar' === virtue_premium_get_option( 'home_sidebar_layout' ) ) {
				$sidebar = true;
			}
		} elseif ( is_home() ) {
			$homeid      = get_option( 'page_for_posts' );
			$postsidebar = get_post_meta( $homeid, '_kad_post_sidebar', true );
			if ( isset( $postsidebar ) && 'yes' === $postsidebar ) {
				$sidebar = true;
			} elseif ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
				if ( 'sidebar' === virtue_premium_get_option( 'blog_cat_layout' ) ) {
					$sidebar = true;
				}
			}
		} elseif ( is_page() && ! is_attachment() ) {
			$page_template = get_page_template_slug();
			if ( in_array( $page_template, array( 'page-sidebar.php', 'page-feature-sidebar.php' ), true ) ) {
				$sidebar = true;
			} elseif ( in_array( $page_template, array( 'page-blog.php', 'page-blog-grid.php' ), true ) ) {
				$postsidebar = get_post_meta( get_the_ID(), '_kad_page_sidebar', true );
				if ( isset( $postsidebar ) && 'yes' === $postsidebar ) {
					$sidebar = true;
				} elseif ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
					if ( 'yes' === virtue_premium_get_option( 'default_page_show_sidebar' ) ) {
						$sidebar = true;
					}
				}
			} elseif ( 'page.php' === basename( get_page_template() ) ) {
				$postsidebar = get_post_meta( get_the_ID(), '_kad_page_sidebar', true );
				if ( isset( $postsidebar ) && 'yes' === $postsidebar ) {
					$sidebar = true;
				} elseif ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
					if ( 'yes' === virtue_premium_get_option( 'default_page_show_sidebar' ) ) {
						$sidebar = true;
					}
				}
			} elseif ( ! in_array( $page_template, array( 'page-landing.php', 'page-sidebar.php', 'page-feature-sidebar.php', 'page-blog.php', 'page-blog-grid.php', 'page-contact.php', 'page-fullwidth.php', 'page-feature.php', 'page-portfolio.php', 'page-portfolio-category.php' ), true ) ) {
				$postsidebar = get_post_meta( get_the_ID(), '_kad_page_sidebar', true );
				if ( isset( $postsidebar ) && 'yes' === $postsidebar ) {
					$sidebar = true;
				} elseif ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
					if ( 'yes' === virtue_premium_get_option( 'default_page_show_sidebar' ) ) {
						$sidebar = true;
					}
				}
			}
			if ( class_exists( 'woocommerce' ) && is_account_page() ) {
				if ( is_user_logged_in() ) {
					$sidebar = false;
				}
			}
		} elseif ( is_singular() ) {
			$postsidebar = get_post_meta( get_the_ID(), '_kad_post_sidebar', true );
			if ( isset( $postsidebar ) && 'yes' === $postsidebar ) {
					$sidebar = true;
			} elseif ( isset( $postsidebar ) && 'default' === $postsidebar || empty( $postsidebar ) ) {
				if ( is_singular( 'post' ) ) {
					if ( 'yes' === virtue_premium_get_option( 'blogpost_sidebar_default' ) ) {
						$sidebar = true;
					}
				} elseif ( is_singular( 'product' ) ) {
					if ( 'yes' === virtue_premium_get_option( 'product_sidebar_default' ) ) {
						$sidebar = true;
					}
				} elseif ( ! in_array( get_post_type(), array( 'staff', 'testimonial', 'portfolio', 'attachment' ), true ) ) {
					if ( 'yes' === virtue_premium_get_option( 'custom_post_sidebar_default' ) ) {
						$sidebar = true;
					}
				}
			}
		} elseif ( class_exists( 'woocommerce' ) && is_archive() && is_shop() ) {
			if ( 'sidebar' === virtue_premium_get_option( 'shop_layout' ) ) {
				$sidebar = true;
			}
		} elseif ( class_exists( 'woocommerce' ) && is_archive() && ( is_product_category() || is_product_tag() || is_tax( 'product_brands' ) || is_tax( 'product_brands' ) ) ) {
			if ( 'sidebar' === virtue_premium_get_option( 'shop_cat_layout' ) ) {
				$sidebar = true;
			}
		} elseif ( is_archive() && ! is_tax( 'portfolio-type' ) && ! is_tax( 'portfolio-tag' ) ) {
			if ( 'sidebar' === virtue_premium_get_option( 'blog_cat_layout' ) ) {
				$sidebar = true;
			}
		} elseif ( is_search() ) {
			if ( 'sidebar' === virtue_premium_get_option( 'search_page_layout' ) ) {
				$sidebar = true;
			}
		}
		return $sidebar;
	}
}

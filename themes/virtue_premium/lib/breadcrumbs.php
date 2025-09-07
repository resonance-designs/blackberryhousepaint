<?php
/**
 * Breadcrumbs Function
 *
 * @package Virtue Theme
 */

/**
 * Breadcrumbs on pages
 */
function kadence_display_page_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_page' ) ) {
		return true;
	}
	return false;
}

/**
 * Breadcrumbs on posts
 */
function kadence_display_post_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_post' ) ) {
		return true;
	}
	return false;
}

/**
 * Breadcrumbs on shop
 */
function kadence_display_shop_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_shop' ) ) {
		return true;
	}
	return false;
}

/**
 * Breadcrumbs on products
 */
function kadence_display_product_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_product' ) ) {
		return true;
	}
	return false;
}

/**
 * Breadcrumbs on portfolio
 */
function kadence_display_portfolio_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_portfolio' ) ) {
		return true;
	}
	return false;
}

/**
 * Should Display Breadcrumbs on staff?
 */
function virtue_display_staff_breadcrumbs() {
	if ( '1' == virtue_premium_get_option( 'show_breadcrumbs_staff' ) ) {
		return true;
	}
	return false;
}

if ( ! function_exists( 'kadence_breadcrumbs' ) ) {
	/**
	 * Breadcrumbs deprecated function.
	 */
	function kadence_breadcrumbs() {
		virtue_breadcrumbs();
	}
}
if ( ! function_exists( 'virtue_breadcrumbs' ) ) {
	/**
	 * Breadcrumbs function.
	 */
	function virtue_breadcrumbs() {
		global $post, $wp_query, $virtue_premium;

		if ( ! empty( $virtue_premium['home_breadcrumb_text'] ) ) {
			$home = $virtue_premium['home_breadcrumb_text'];
		} else {
			$home = __( 'Home', 'virtue' );
		}
		$showcurrent      = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show.
		$before           = '<span class="kad-breadcurrent">'; // tag before the current crumb.
		$after            = '</span>'; // tag after the current crumb.
		$homelink         = home_url( '/' );
		$wrap_before      = '<div id="kadbreadcrumbs" class="color_gray">';
		$wrap_after       = '</div>';
		$delimiter        = apply_filters( 'kadence_breadcrumb_delimiter', '&raquo;' );
		$delimiter_before = '<span class="bc-delimiter">';
		$delimiter_after  = '</span>';
		$sep              = ' ' . $delimiter_before . $delimiter . $delimiter_after . ' ';
		$link_before      = '<span>';
		$link_after       = '</span>';
		$link_in_before   = '<span>';
		$link_in_after    = '</span>';
		$link             = $link_before . '<a href="%1$s">' . $link_in_before . '%2$s' . $link_in_after . '</a>' . $link_after;
		$before           = '<span class="kad-breadcurrent">';
		$after            = '</span>';
		$home_link        = $link_before . '<a href="' . esc_url( $homelink ) . '" class="kad-bc-home">' . $link_in_before . esc_html( $home ) . $link_in_after . '</a>' . $link_after . $sep;
		$shop_bread       = '';
		if ( class_exists( 'woocommerce' ) && isset( $virtue_premium['shop_breadcrumbs'] ) && '1' == $virtue_premium['shop_breadcrumbs'] ) {
			$shop_page_id = wc_get_page_id( 'shop' );
			$shop_page    = get_post( $shop_page_id );
			if ( get_option( 'page_on_front' ) !== $shop_page_id ) {
				$shop_bread = $link_before . '<a href="' . esc_url( get_permalink( $shop_page ) ) . '" class="kad-bc-shop">' . $link_in_before . get_the_title( $shop_page_id ) . $link_in_after . '</a>' . $link_after . $sep;
			}
		}
		if ( ! is_front_page() ) {
			echo $wrap_before . $home_link;

			if ( is_category() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}
				$thiscat = get_category( get_query_var( 'cat' ), false );
				if ( $thiscat->parent != 0 ) {
					$cats = get_category_parents( $thiscat->parent, true, $sep );
					$cats = preg_replace( "#^(.+)$sep$#", '$1', $cats );
					$cats = preg_replace( '#<a([^>]+)>([^<]+)<\/a>#', $link_before . '<a$1>' . $link_in_before . '$2' . $link_in_after . '</a>' . $link_after, $cats );
					echo $cats . $sep;
				}
				echo $before . single_cat_title( '', false ) . $after;

			} elseif ( is_tag() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink    = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle       = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}
				echo $before . single_tag_title( '', false ) . $after;
			} elseif ( is_search() ) {
				echo $before . __( 'Search results for', 'virtue' ) . ' "' . get_search_query() . '"' . $after;

			} elseif ( is_day() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}
				echo sprintf( $link, get_year_link( get_the_time( 'Y' ) ), get_the_time( 'Y' ) ) . $sep;
				echo sprintf( $link, get_month_link( get_the_time( 'Y' ), get_the_time( 'm' ) ), get_the_time( 'F' ) ) . $sep;

				echo $before . get_the_time( 'd' ) . $after;

			} elseif ( is_month() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}
				echo sprintf( $link, get_year_link( get_the_time( 'Y' ) ), get_the_time( 'Y' ) ) . $sep;

				echo $before . get_the_time( 'F' ) . $after;

			} elseif ( is_year() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}

				echo $before . get_the_time( 'Y' ) . $after;

			} elseif ( is_single() && ! is_attachment() ) {
				$single_post_types = array(
					'product' => array(
						'post_type'     => 'product',
						'taxonomy'      => 'product_cat',
						'archive_page'  => 'shop',
						'archive_label' => '',
					),
					'portfolio' => array(
						'post_type'     => 'portfolio',
						'taxonomy'      => 'portfolio-type',
						'archive_page'  => 'portfolio_link',
						'archive_label' => '',
					),
					'post' => array(
						'post_type'     => 'post',
						'taxonomy'      => 'category',
						'archive_page'  => 'blog_link',
						'archive_label' => '',
					),
					'staff' => array(
						'post_type'     => 'staff',
						'taxonomy'      => 'staff-group',
						'archive_page'  => 'staff_link',
						'archive_label' => '',
					),
					'testimonial' => array(
						'post_type'     => 'testimonial',
						'taxonomy'      => 'testimonial-group',
						'archive_page'  => '',
						'archive_label' => '',
					),
					'tribe_events' => array(
						'post_type'     => 'tribe_events',
						'taxonomy'      => '',
						'archive_page'  => 'tribe_events',
						'archive_label' => '',
					),
					'event' => array(
						'post_type'     => 'event',
						'taxonomy'      => 'event-category',
						'archive_page'  => '',
						'archive_label' => '',
					),
					'podcast' => array(
						'post_type'     => 'podcast',
						'taxonomy'      => 'series',
						'archive_page'  => '',
						'archive_label' => '',
					),
				);
				$single_post_types = apply_filters( 'virtue_single_post_type_breadcrumbs', $single_post_types );
				$post_type = get_post_type();
				foreach ( $single_post_types as $key => $value ) {
					if ( $post_type == $value['post_type'] ) {
						// Archive page
						if ( ! empty( $value['archive_page'] ) ) {
							if ( is_numeric( $value['archive_page'] ) ) {
								// Check if page ID
								$parentpagelink = get_page_link( $value['archive_page'] );
								$parenttitle = get_the_title( $value['archive_page'] );
								if ( $parentpagelink ) {
									echo sprintf( $link, $parentpagelink, $parenttitle ) . $sep;
								}
							} else if ( 'shop' == $value['archive_page'] ) {
								// Check if Shop
								echo $shop_bread;
							} else if ( 'tribe_events' == $value['archive_page'] ) {
								// Check for tribe
								echo sprintf( $link, tribe_get_events_link(), tribe_get_event_label_plural() ) . $sep;
							} else if ( filter_var( $value['archive_page'], FILTER_VALIDATE_URL ) ) {
								// Check if url
								$parenttitle = ( ! empty( $value['archive_label'] ) ? $value['archive_label'] : __( ' Archive', 'virtue' ) );
								echo sprintf( $link, $value['archive_page'], $parenttitle ) . $sep;
							} else if ( isset( $virtue_premium[ $value['archive_page'] ] ) ) {
								// Check if theme setting
								if ( ! empty( $virtue_premium[ $value['archive_page'] ] ) ) {
									$parentpagelink = get_page_link( $virtue_premium[ $value['archive_page'] ] );
									$parenttitle = get_the_title( $virtue_premium[ $value['archive_page'] ] );
									echo sprintf( $link, $parentpagelink, $parenttitle ) . $sep;
								}
							}
						}
						// Taxonomy
						if ( ! empty( $value['taxonomy'] ) ) {
							$main_term = '';
							if ( class_exists( 'WPSEO_Primary_Term' ) ) {
								$WPSEO_term = new WPSEO_Primary_Term( $value['taxonomy'], $post->ID );
								$WPSEO_term = $WPSEO_term->get_primary_term();
								$WPSEO_term = get_term( $WPSEO_term );
								if ( is_wp_error( $WPSEO_term ) ) {
									if ( $terms = wp_get_post_terms(
										$post->ID,
										$value['taxonomy'],
										array(
											'orderby' => 'parent',
											'order' => 'DESC',
										)
									) ) {
										if ( is_array( $terms ) ) {
											$main_term = $terms[0];
										}
									}
								} else {
									$main_term = $WPSEO_term;
								}
							} elseif ( class_exists( 'RankMath' ) ) {
								$WPSEO_term = get_post_meta( $post->ID, 'rank_math_primary_category', true );
								if ( $WPSEO_term ) {
									$WPSEO_term = get_term( $WPSEO_term );
									if ( is_wp_error( $WPSEO_term ) ) {
										if ( $terms = wp_get_post_terms(
											$post->ID,
											$value['taxonomy'],
											array(
												'orderby' => 'parent',
												'order' => 'DESC',
											)
										) ) {
											if ( is_array( $terms ) ) {
												$main_term = $terms[0];
											}
										}
									} else {
										$main_term = $WPSEO_term;
									}
								} else {
									if ( $terms = wp_get_post_terms(
										$post->ID,
										$value['taxonomy'],
										array(
											'orderby' => 'parent',
											'order' => 'DESC',
										)
									) ) {
										if ( is_array( $terms ) ) {
											$main_term = $terms[0];
										}
									}
								}
							} elseif ( $terms = wp_get_post_terms(
								$post->ID,
								$value['taxonomy'],
								array(
									'orderby' => 'parent',
									'order' => 'DESC',
								)
							) ) {
								if ( is_array( $terms ) ) {
									$main_term = $terms[0];
								}
							}
							if ( $main_term ) {
								$ancestors = get_ancestors( $main_term->term_id, $value['taxonomy'] );
								$ancestors = array_reverse( $ancestors );
								foreach ( $ancestors as $ancestor ) {
									$ancestor_term = get_term( $ancestor, $value['taxonomy'] );
									if ( ! empty( $ancestor_term ) && ! is_wp_error( $ancestor_term ) ) {
										echo sprintf( $link, get_term_link( $ancestor_term->slug, $value['taxonomy'] ), $ancestor_term->name ) . $sep;
									}
								}

								echo sprintf( $link, get_term_link( $main_term->slug, $value['taxonomy'] ), $main_term->name ) . $sep;
							}
						}
					}
				}

				echo $before . get_the_title() . $after;

			} elseif ( is_tax( 'portfolio-type' ) ) {
				if ( ! empty( $virtue_premium['portfolio_link'] ) ) {
					$parentpagelink = get_page_link( $virtue_premium['portfolio_link'] );
					$parenttitle = get_the_title( $virtue_premium['portfolio_link'] );
					echo sprintf( $link, $parentpagelink, $parenttitle ) . $sep;
				}

				echo $before . virtue_title() . $after;

			} elseif ( is_tax( 'portfolio-tag' ) ) {
				if ( ! empty( $virtue_premium['portfolio_link'] ) ) {
					$parentpagelink = get_page_link( $virtue_premium['portfolio_link'] );
					$parenttitle = get_the_title( $virtue_premium['portfolio_link'] );
					echo sprintf( $link, $parentpagelink, $parenttitle ) . $sep;
				}

				echo $before . virtue_title() . $after;

			} elseif ( is_tax( 'staff-group' ) ) {
				if ( ! empty( $virtue_premium['staff_link'] ) ) {
					$parentpagelink = get_page_link( $virtue_premium['staff_link'] );
					$parenttitle = get_the_title( $virtue_premium['staff_link'] );
					echo sprintf( $link, $parentpagelink, $parenttitle ) . $sep;
				}

				echo $before . virtue_title() . $after;

			} elseif ( is_tax( 'product_cat' ) ) {
				echo $shop_bread;
				$ancestors = get_ancestors( get_queried_object()->term_id, 'product_cat' );
				$ancestors = array_reverse( $ancestors );
				foreach ( $ancestors as $ancestor ) {
					$ancestor_term = get_term( $ancestor, 'product_cat' );
					if ( ! empty( $ancestor_term ) && ! is_wp_error( $ancestor_term ) ) {
						echo sprintf( $link, get_term_link( $ancestor_term->slug, 'product_cat' ), $ancestor_term->name ) . $sep;
					}
				}

				echo $before . virtue_title() . $after;

			} elseif ( is_tax( 'product_tag' ) ) {
				echo $shop_bread;
				echo $before . virtue_title() . $after;

			} elseif ( class_exists( 'woocommerce' ) && is_shop() ) {
				$shop_page_id = wc_get_page_id( 'shop' );
				$page_title   = get_the_title( $shop_page_id );
				echo $before . $page_title . $after;

			} elseif ( class_exists( 'woocommerce' ) && ( is_account_page() || is_checkout() ) ) {
				if ( $post->post_parent ) {
					$parent_id  = $post->post_parent;
					$parentcrumbs = array();
					while ( $parent_id ) {
						$page = get_page( $parent_id );
						$parentcrumbs[] = sprintf( $link, get_permalink( $page->ID ), get_the_title( $page->ID ) ) . $sep;
						$parent_id  = $page->post_parent;
					}
					$parentcrumbs = array_reverse( $parentcrumbs );
					foreach ( $parentcrumbs as $parentcrumb ) {
						echo $parentcrumb;
					}
				}
				if ( is_wc_endpoint_url() && ( $endpoint = WC()->query->get_current_endpoint() ) && ( $endpoint_title = WC()->query->get_endpoint_title( $endpoint ) ) ) {
					echo sprintf( $link, get_permalink(), get_the_title() ) . $sep;
					echo $before . $endpoint_title . $after;
				} else {
					echo $before . get_the_title() . $after;
				}
			} elseif ( is_attachment() ) {
				$parent = $post->post_parent;
				if ( $parent ) {
					echo sprintf( $link, get_permalink( $parent ), get_the_title( $parent ) ) . $sep;
				}
				echo $before . get_the_title() . $after;

			} elseif ( is_home() ) {
				echo $before . get_the_title( get_option( 'page_for_posts' ) ) . $after;

			} elseif ( is_page() && ! $post->post_parent ) {
				echo $before . get_the_title() . $after;

			} elseif ( is_page() && $post->post_parent ) {
				$parent_id  = $post->post_parent;
				$parentcrumbs = array();
				while ( $parent_id ) {
					$page = get_page( $parent_id );
					$parentcrumbs[] = sprintf( $link, get_permalink( $page->ID ), get_the_title( $page->ID ) ) . $sep;
					$parent_id  = $page->post_parent;
				}
				$parentcrumbs = array_reverse( $parentcrumbs );
				foreach ( $parentcrumbs as $parentcrumb ) {
					echo $parentcrumb;
				}
				echo $before . get_the_title() . $after;
			} elseif ( is_author() ) {
				if ( ! empty( $virtue_premium['blog_link'] ) ) {
					$bparentpagelink    = get_page_link( $virtue_premium['blog_link'] );
					$bparenttitle       = get_the_title( $virtue_premium['blog_link'] );
					echo sprintf( $link, $bparentpagelink, $bparenttitle ) . $sep;
				}
				global $author;
				$userdata = get_userdata( $author );
				echo $before . $userdata->display_name . $after;

			} elseif ( is_archive() ) {

				echo $before . virtue_title() . $after;

			} elseif ( is_404() ) {
				echo $before . __( 'Error 404', 'virtue' ) . $after;
			}

			if ( get_query_var( 'paged' ) ) {
				echo ' - ' . __( 'Page', 'virtue' ) . ' ' . get_query_var( 'paged' ) . ( $wp_query->max_num_pages !== 0 ? ' ' . __( 'of', 'virtue' ) . ' ' . $wp_query->max_num_pages : '' );
			}

			echo $wrap_after;

		}
	}
}


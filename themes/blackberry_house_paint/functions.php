<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {

    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
add_filter( 'plugins_auto_update_enabled', '__return_false' );

/*
 * WooCommerce customizations moved from template overrides to hooks
 * - Restore carousel wrappers for related and upsells without overriding templates
 * - Improve variable product form (reset link, out-of-stock message, table role)
 * - Optional: render variation attributes as radios (uses Virtue helper if available)
 */

// Enqueue theme's slick init on single product pages.
add_action( 'wp_enqueue_scripts', function () {
    if ( is_product() ) {
        wp_enqueue_script( 'virtue-slick-init' );
    }
});

// Provide out-of-stock message consistent with latest core text domain.
add_filter( 'woocommerce_out_of_stock_message', function( $message ) {
    return __( 'This product is currently out of stock and unavailable.', 'woocommerce' );
});

// Make the reset variations link accessible and customizable.
add_filter( 'woocommerce_reset_variations_link', function( $html ) {
    $clear_text = 'Clear';
    if ( function_exists( 'virtue_premium_get_option' ) ) {
        $opt = virtue_premium_get_option( 'wc_clear_placeholder_text' );
        if ( ! empty( $opt ) ) {
            $clear_text = $opt;
        }
    }
    $link = '<a class="reset_variations" href="#" aria-label="' . esc_attr__( 'Clear options', 'woocommerce' ) . '">' . esc_html( $clear_text ) . '</a>';
    return $link;
});

// Add role="presentation" to the variations table without overriding the template.
add_action( 'wp_footer', function () {
    if ( ! is_product() ) return;
    ?>
    <script>
    (function(){
        var tbl = document.querySelector('.variations');
        if (tbl && !tbl.getAttribute('role')) { tbl.setAttribute('role','presentation'); }
    })();
    </script>
    <?php
});

// Optional: render variation attributes as radios using Virtue's helper if enabled in parent options.
add_filter( 'woocommerce_dropdown_variation_attribute_options_html', function( $html, $args ) {
    if ( ! function_exists( 'kad_wc_radio_variation_attribute_options' ) ) {
        return $html;
    }
    // Check parent theme option that toggles radios.
    $use_radio = false;
    if ( function_exists( 'virtue_premium_get_option' ) ) {
        $use_radio = ( '1' == virtue_premium_get_option( 'product_radio' ) );
    }
    if ( ! $use_radio ) {
        return $html;
    }
    // Build radio HTML using Virtue helper.
    ob_start();
    kad_wc_radio_variation_attribute_options( array(
        'options'   => isset( $args['options'] ) ? $args['options'] : array(),
        'attribute' => isset( $args['attribute'] ) ? $args['attribute'] : '',
        'product'   => isset( $args['product'] ) ? $args['product'] : null,
        'selected'  => isset( $args['selected'] ) ? $args['selected'] : '',
        'class'     => isset( $args['class'] ) ? $args['class'] : 'kad-select',
    ) );
    $radio_html = ob_get_clean();

    // Append accessible reset link after the last attribute via core filter elsewhere; here we just return radios.
    return $radio_html;
}, 10, 2 );

// ---- Carousel wrappers for Related and Upsells via product loop filters ----
// We'll detect when core is rendering upsells/related using flags around their hooked priorities,
// then wrap the UL with the Slick container and add classes/data attributes.

global $bhp_wc_loop_context;
$bhp_wc_loop_context = null;

function bhp_set_loop_context( $ctx = null ) {
    $GLOBALS['bhp_wc_loop_context'] = $ctx;
}

// Flag around upsells (priority 15 by core).
add_action( 'woocommerce_after_single_product_summary', function(){ bhp_set_loop_context('upsells'); }, 14 );
add_action( 'woocommerce_after_single_product_summary', function(){ bhp_set_loop_context(null); }, 16 );

// Flag around related (priority 20 by core).
add_action( 'woocommerce_after_single_product_summary', function(){ bhp_set_loop_context('related'); }, 19 );
add_action( 'woocommerce_after_single_product_summary', function(){ bhp_set_loop_context(null); }, 21 );

// Compute responsive columns similar to Virtue parent.
function bhp_get_responsive_cols() {
    $col = '4';
    if ( function_exists( 'virtue_premium_get_option' ) ) {
        $col = virtue_premium_get_option( 'related_item_column', '4' );
    }
    $rpc = array();
    switch ( (string) $col ) {
        case '2': $rpc = array( 'xxl'=>2,'xl'=>2,'md'=>2,'sm'=>2,'xs'=>1,'ss'=>1 ); break;
        case '3': $rpc = array( 'xxl'=>3,'xl'=>3,'md'=>3,'sm'=>3,'xs'=>2,'ss'=>1 ); break;
        case '6': $rpc = array( 'xxl'=>6,'xl'=>6,'md'=>6,'sm'=>4,'xs'=>3,'ss'=>2 ); break;
        case '5': $rpc = array( 'xxl'=>5,'xl'=>5,'md'=>5,'sm'=>4,'xs'=>3,'ss'=>2 ); break;
        default:  $rpc = array( 'xxl'=>4,'xl'=>4,'md'=>4,'sm'=>3,'xs'=>2,'ss'=>1 );
    }
    // Allow existing theme filters.
    if ( has_filter( 'kt_related_products_columns' ) ) {
        $rpc = apply_filters( 'kt_related_products_columns', $rpc );
    }
    if ( has_filter( 'kt_upsell_products_columns' ) ) {
        $rpc = apply_filters( 'kt_upsell_products_columns', $rpc );
    }
    return $rpc;
}

// Inject wrappers before the <ul class="products"> and add Slick classes/attributes to the UL.
add_filter( 'woocommerce_product_loop_start', function( $html ) {
    $ctx = isset( $GLOBALS['bhp_wc_loop_context'] ) ? $GLOBALS['bhp_wc_loop_context'] : null;
    if ( ! $ctx ) return $html;

    $rpc = bhp_get_responsive_cols();

    // Add IDs and classes per context.
    $carousel_id = ( 'related' === $ctx ) ? 'related-product-carousel' : 'upsale-product-carousel';
    $extra_classes = ' slick-slider kt-slickslider kt-content-carousel loading clearfix ' . ( 'related' === $ctx ? 'product_related_carousel' : 'product_upsell_carousel' );

    // Build data attributes for Slick based on responsive cols.
    $data_attrs = sprintf(
            ' data-slider-fade="false" data-slider-type="content-carousel" data-slider-anim-speed="400" data-slider-scroll="1" data-slider-auto="true" data-slider-speed="9000" data-slider-xxl="%d" data-slider-xl="%d" data-slider-md="%d" data-slider-sm="%d" data-slider-xs="%d" data-slider-ss="%d"',
            isset($rpc['xxl']) ? $rpc['xxl'] : 4,
            isset($rpc['xl']) ? $rpc['xl'] : 4,
            isset($rpc['md']) ? $rpc['md'] : 4,
            isset($rpc['sm']) ? $rpc['sm'] : 3,
            isset($rpc['xs']) ? $rpc['xs'] : 2,
            isset($rpc['ss']) ? $rpc['ss'] : 1
        );

    // Modify the opening UL tag to include our classes, id and data attributes.
    $replacement = '<ul$1 id="' . $carousel_id . '" class="$2' . $extra_classes . '"' . $data_attrs;

    // Prepend Virtue carousel wrappers just before the UL for this context.
    $container_id = ( 'related' === $ctx ) ? 'carouselcontainer' : 'carouselcontainer-upsell';
    $prefix = '<div class="fredcarousel"><div id="' . $container_id . '" class="rowtight">';

    // Only modify if this is a UL.products markup.
    $modified = preg_replace(
        '/<ul([^>]*)class="([^"]*\bproducts\b[^"]*)"/i',
        $replacement,
        $html
    );

    if ( $modified !== null && $modified !== $html ) {
        $html = $prefix . $modified;
    }

    return $html;
}, 10 );

// Close wrappers after the product loop when in related/upsells context.
add_filter( 'woocommerce_product_loop_end', function( $html ) {
    $ctx = isset( $GLOBALS['bhp_wc_loop_context'] ) ? $GLOBALS['bhp_wc_loop_context'] : null;
    if ( ! $ctx ) return $html;

    // Close the two wrapper divs we opened in woocommerce_product_loop_start.
    return $html . '</div></div>';
}, 10 );

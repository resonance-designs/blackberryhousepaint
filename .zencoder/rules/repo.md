# Repository Overview

- Name: blackberryhousepaint
- Stack: WordPress (Virtue Premium parent theme), Child theme: blackberry_house_paint, WooCommerce
- Local path: c:\Dev\Projects\Web\blackberryhousepaint

## Themes
- Parent: themes/virtue_premium
- Child: themes/blackberry_house_paint

## WooCommerce
- Parent theme had template overrides for:
  - single-product/related.php
  - single-product/up-sells.php
  - single-product/add-to-cart/variable.php
- These were disabled to allow core templates + child-theme hooks to render carousels and variable product enhancements:
  - single-product/related.php.disabled
  - single-product/up-sells.php.disabled
  - single-product/add-to-cart/variable.php.disabled
  - Backups present with .bak suffix

## Child theme customizations (functions.php)
- Enqueue parent/child styles
- Disable plugin auto-updates (plugins_auto_update_enabled)
- WooCommerce hooks:
  - Enqueue `virtue-slick-init` on product pages
  - Standardize out-of-stock message
  - Accessible reset variations link (uses Virtue option when present)
  - Adds `role="presentation"` to variations table via footer script
  - Optional: render variation attributes as radios when Virtue option `product_radio` is enabled
  - Recreates Related and Upsells carousels without overriding templates by wrapping the `<ul class="products">` with the Virtue markup and slick attributes using `woocommerce_product_loop_start` and `woocommerce_product_loop_end` filters

## Notes
- Ensure `virtue-slick-init` is registered by the parent theme
- The responsive column values are sourced via `virtue_premium_get_option('related_item_column', '4')` and compatible with Virtue filters `kt_related_products_columns` / `kt_upsell_products_columns`
- If further template overrides exist, consider disabling them similarly to ensure hooks are used
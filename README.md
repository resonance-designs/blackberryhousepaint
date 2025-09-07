# Blackberry House Paint — Ecommerce Site

A WordPress/WooCommerce site built on the Virtue Premium theme with a custom child theme (`blackberry_house_paint`). The child theme replaces WooCommerce template overrides with hook-based render logic to stay closer to core and theme updates.

## Tech Stack
- **CMS**: WordPress
- **Ecommerce**: WooCommerce (installed from WordPress.org, not committed to this repo)
- **Theme**: Virtue Premium (parent) + Blackberry House Paint (child)
- **Language**: PHP, HTML, CSS, JavaScript

## Repository Layout
```
./themes/virtue_premium                 # Parent theme (premium)
./themes/blackberry_house_paint         # Child theme used by the site
```
- Note: `plugins/woocommerce/` is intentionally excluded via `.gitignore` and is not part of this repository.

## Quick Start (Local)
1. Create/launch a local WordPress site (LocalWP, XAMPP, Docker, etc.).
2. Copy theme folders into your WP install:
   - `themes/virtue_premium` → `wp-content/themes/virtue_premium`
   - `themes/blackberry_house_paint` → `wp-content/themes/blackberry_house_paint`
3. Install WooCommerce via WP Admin → Plugins → Add New → “WooCommerce” (Automattic).
4. In WP Admin:
   - Activate the Virtue Premium theme, then activate the Blackberry House Paint child theme.
   - Run the WooCommerce setup wizard as needed.
5. Visit a single product page and verify:
   - Variation UI behaviors
   - Related and Upsells product carousels

## Child Theme Highlights
- **Styles**: Enqueues parent + child styles.
- **Updates**: Disables plugin auto-updates via `plugins_auto_update_enabled`.
- **WooCommerce UX**:
  - Enqueues `virtue-slick-init` on product pages for carousels.
  - Standardized out‑of‑stock messaging.
  - Accessible “Reset variations” link (uses Virtue option when available).
  - Adds `role="presentation"` to the variations table (script injected in footer).
  - Optional: render variation attributes as radio buttons when Virtue option `product_radio` is enabled.
  - Recreates Related and Upsells carousels by wrapping `<ul class="products">` with Virtue markup using `woocommerce_product_loop_start` / `woocommerce_product_loop_end` filters (avoids heavy template overrides).

## WooCommerce Template Overrides (Parent Theme)
The parent previously shipped overrides for:
- `single-product/related.php`
- `single-product/up-sells.php`
- `single-product/add-to-cart/variable.php`

These were disabled in the parent theme to allow core templates + child-theme hooks to render enhanced carousels and variable product UI. You’ll see:
- `*.php.disabled` and backups with `.bak` suffix.

## Configuration Notes
- Ensure `virtue-slick-init` is registered by the parent theme (Virtue Premium provides this for slick carousels).
- Responsive column counts are pulled from `virtue_premium_get_option('related_item_column', '4')` and respect Virtue filters:
  - `kt_related_products_columns`
  - `kt_upsell_products_columns`

## Development Workflow
- **PHP**: Make behavioral changes in `themes/blackberry_house_paint/functions.php` (avoid editing parent). Keep logic hook-based.
- **CSS**: Prefer `themes/blackberry_house_paint/style.css` for changes. Minified files (`child-style.min.css`, `virtue_child.min.css`) are included for legacy reasons; update them only if you need minified assets without a build step.
- **Templates**: Avoid re-introducing template overrides unless strictly necessary; leverage action/filter hooks provided by WooCommerce and Virtue.

## Testing Checklist
- Product page:
  - Variation selection (including reset link and accessibility attributes)
  - Out‑of‑stock messaging
- Related/Upsells:
  - Slick carousel renders and scrolls
  - Correct number of columns at each breakpoint
- Console/network:
  - No JS errors; `virtue-slick-init` is enqueued on relevant pages

## Troubleshooting
- **Carousels don’t render**:
  - Confirm `virtue-slick-init` is registered/enqueued by the parent.
  - Ensure products exist to populate Related/Upsells.
- **Variation radios not showing**:
  - Enable the Virtue option `product_radio`.
- **Unexpected template output**:
  - Check for any re‑enabled parent template overrides or plugin conflicts.

## Version Control Notes
- `plugins/woocommerce/` is intentionally excluded via `.gitignore` to avoid committing third‑party plugin code.
- Install and update WooCommerce through WP Admin (or pin a specific version via a deployment process if required).

## Compatibility and Version Pinning
- **Recommended WooCommerce version**: `10.1.2` (tested with this project)
- **WordPress**: `6.7+` (per WooCommerce 10.1.2 requirements)
- **PHP**: `7.4+` (per WooCommerce 10.1.2 requirements)

### Install a specific WooCommerce version
- **WP‑CLI**:
  ```bash
  wp plugin install woocommerce --version=10.1.2 --force --activate
  ```
- **Manual**:
  - Download https://downloads.wordpress.org/plugin/woocommerce.10.1.2.zip
  - WP Admin → Plugins → Add New → Upload Plugin → choose the ZIP → Install → Activate

### Update policy
- Test new WooCommerce versions on a staging site before updating production.
- After a version bump, verify product variation UI, related/upsell carousels, and any customized hooks still behave as expected.

## Deployment
1. Backup current site and database.
2. Deploy `themes/blackberry_house_paint` (and updates to `themes/virtue_premium` if licensed and approved).
3. Ensure WooCommerce is installed/updated on the target environment.
4. Clear caches (server, plugin, CDN) and verify product pages and carousels.

## License & Credits
- Virtue Premium: © Kadence Themes (subject to its license).
- WooCommerce: GPLv3.
- Custom child theme code: project-specific (internal use).

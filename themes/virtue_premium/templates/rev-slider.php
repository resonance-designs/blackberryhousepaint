<?php
/**
 * Template Featured Rev Slider
 *
 * @package Virtue Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $post;
$revslider = get_post_meta( $post->ID, '_kad_post_rev', true );
?>
<div class="sliderclass">
<?php
if ( ! empty( $revslider && function_exists( 'putRevSlider' ) ) ) {
	putRevSlider( $revslider );
}
?>
</div><!--sliderclass-->

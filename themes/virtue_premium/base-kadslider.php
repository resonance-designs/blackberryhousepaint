<?php
/**
 * Preview Kadence Slider Base
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_template_part('templates/head');
  ?>
	<body <?php body_class(); ?> <?php echo wp_kses_post( virtue_body_data() ); ?>>
		<div id="wrapper" class="container">
		<!--[if lt IE 8]><div class="alert"> <?php esc_html_e( 'You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'virtue' ); ?></div><![endif]-->
	  		<div class="wrap contentclass" style="padding:0px;" role="document">
				<?php include kadence_template_path(); ?>      


			</div><!-- /.wrap -->
		<?php do_action( 'get_footer' ); 
			wp_footer(); ?>
		</div><!--Wrapper-->
	</body>
</html>

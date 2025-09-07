<?php
/**
 * Meta Tooltip Sub Head
 *
 * @package Virtue Theme
 */

?>
<div class="subhead color_gray">
	<?php
	do_action( 'virtue_before_post_meta_tooltip' );
	if ( '1' === virtue_premium_get_option( 'hide_author' ) ) {
		?>
		<span class="postauthortop author vcard" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( get_the_author() ); ?>">
			<meta itemprop="author" class="fn" content="<?php echo esc_attr( get_the_author() ); ?>">
			<i class="icon-user"></i>
		</span>
		<span class="virtue-meta-divider post-author-divider kad-hidepostauthortop"> | </span>
		<?php
	}
	if ( '1' === virtue_premium_get_option( 'hide_postedin' ) && has_category() ) {
		$post_category = get_the_category();
		$categories    = '';
		foreach ( $post_category as $category ) {
			$categories .= esc_attr( $category->name ) . '&nbsp;';
		}
		?>
		<span class="postedintop" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( $categories ); ?>">
			<i class="icon-folder"></i>
		</span>
		<?php
	}
	if ( '1' === virtue_premium_get_option( 'hide_commenticon' ) ) {
		$num_comments = get_comments_number();
		?>
		<span class="virtue-meta-divider post-comment-divider kad-hidepostedin"> | </span>
		<span class="postcommentscount" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( $num_comments ); ?>">
			<i class="icon-bubbles"></i>
		</span>
		<?php
	}
	if ( '1' === virtue_premium_get_option( 'hide_postdate' ) ) {
		?>
		<span class="postdatetooltip"> | </span>
		<span style="margin-left:3px;" class="postdatetooltip" rel="tooltip" data-placement="top" data-original-title="<?php echo esc_attr( get_the_date( get_option( 'date_format' ) ) ); ?>">
			<i class="icon-calendar"></i>
		</span>
		<?php
	}

	do_action( 'virtue_after_post_meta_tooltip' );
	?>
</div>

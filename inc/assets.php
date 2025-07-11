<?php

namespace Flynt\Assets;

use Flynt\Utils\Asset;
use Flynt\ComponentManager;
use Flynt\Utils\ScriptAndStyleLoader;

call_user_func(function (): void {
    $loader = new ScriptAndStyleLoader();
    add_filter('script_loader_tag', [$loader, 'filterScriptLoaderTag'], 10, 3);
});

add_action('wp_enqueue_scripts', function (): void {
    wp_enqueue_script('Flynt/assets/main', Asset::requireUrl('assets/main.js'), [], null);
    wp_script_add_data('Flynt/assets/main', 'module', true);

    wp_localize_script('Flynt/assets/main', 'FlyntData', [
        'componentsWithScript' => ComponentManager::getInstance()->getComponentsWithScript(),
        'templateDirectoryUri' => get_template_directory_uri(),
    ]);

    wp_enqueue_style('Flynt/assets/main', Asset::requireUrl('assets/main.scss'), [], null);
    wp_enqueue_style('Flynt/assets/print', Asset::requireUrl('assets/print.scss'), [], null, 'print');
});

add_action('admin_enqueue_scripts', function (): void {
    wp_enqueue_script('Flynt/assets/admin', Asset::requireUrl('assets/admin.js'), [], null);
    wp_script_add_data('Flynt/assets/admin', 'module', true);

    wp_localize_script('Flynt/assets/admin', 'FlyntData', [
        'componentsWithScript' => ComponentManager::getInstance()->getComponentsWithScript(),
        'templateDirectoryUri' => get_template_directory_uri(),
    ]);

    wp_enqueue_style('Flynt/assets/admin', Asset::requireUrl('assets/admin.scss'), [], null);
});

// add_action('wp_enqueue_scripts', function (): void {
//     wp_enqueue_style('hello-elementor-child-style',get_stylesheet_directory_uri() . '/style.css',['hello-elementor-theme-style'],'1.0.17');
//     wp_enqueue_script( 'jquery-new', "https://code.jquery.com/jquery-3.4.1.min.js", array(), '3.4.1' );
// 	wp_enqueue_script('hello-elementor-child-script-main',get_stylesheet_directory_uri() . '/main.js',[ 'jquery' ],'1.0.17',true);
// 	wp_enqueue_style( 'bootstrap-style', get_stylesheet_directory_uri() . '/css/bootstrap.css', array() );
// 	wp_enqueue_script( 'bootstrap-js', get_stylesheet_directory_uri() . '/js/bootstrap.bundle.min.js', array('jquery-new'), '4.4.1', true );
//     if ( !is_user_logged_in() ) {
//         wp_deregister_style( 'elementor-icons' ); 
// 	}
// });

function ele_disable_page_title($return)
{
    return false;
}
// add_filter( 'hello_elementor_page_title', 'ele_disable_page_title' );

function wpb_search_filter($query)
{
    if ($query->is_search && !is_admin()) {
        $query->set('post_type', 'post');
    }
    return $query;
}

// add_filter('pre_get_posts', __NAMESPACE__ . '\\wpb_search_filter');

if (function_exists('acf_add_options_page')) {
    acf_add_options_page();
}

function footer_scripts()
{
    if ($footer_scripts = get_field('footer_scripts', 'options')) {
        echo $footer_scripts;
    }
}
// add_action( 'wp_footer', __NAMESPACE__ . '\\footer_scripts', 10);

function header_scripts()
{
    if ($header_scripts = get_field('header_scripts', 'options')) {
        echo $header_scripts;
    }
}
// add_action( 'wp_head', __NAMESPACE__ . '\\header_scripts', 10);

function body_scripts()
{
    if ($body_scripts = get_field('body_scripts', 'options')) {
        echo $body_scripts;
    }
}
// add_action( 'wp_body_open', __NAMESPACE__ . '\\body_scripts', 10);

add_filter('gform_confirmation_anchor_51', '__return_false');
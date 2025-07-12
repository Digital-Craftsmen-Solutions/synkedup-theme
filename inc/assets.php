<?php

namespace Flynt\Assets;

use Flynt\Utils\Asset;
use Flynt\ComponentManager;
use Flynt\Utils\ScriptAndStyleLoader;
use Flynt\Utils\Options;

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


Options::addGlobal('Scripts', [
    [
        'label' => __('Header Scripts', 'flynt'),
        'name' => 'headerScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => 'wpautop',
    ],
    [
        'label' => __('Body Scripts', 'flynt'),
        'name' => 'bodyScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => 'wpautop',
    ],
    [
        'label' => __('Footer Scripts', 'flynt'),
        'name' => 'footerScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => 'wpautop',
    ],
]);


function wpb_search_filter($query)
{
    if ($query->is_search && !is_admin()) {
        $query->set('post_type', 'post');
    }
    return $query;
}

add_filter('pre_get_posts', __NAMESPACE__ . '\\wpb_search_filter');

add_filter('gform_confirmation_anchor_51', '__return_false');

add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('global-styles');
}, 100);
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

    // wp_enqueue_script('jquery-new', "https://code.jquery.com/jquery-3.4.1.min.js", array(), '3.4.1');
    $current_id = get_queried_object_id();
    if (!is_front_page() && !is_home() && !is_page(26194)) {
        wp_enqueue_script('jquery');
    }
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


Options::addGlobal('Scripts', [
    [
        'label' => __('Header Scripts', 'flynt'),
        'name' => 'headerScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => ''
    ],
    [
        'label' => __('Body Scripts', 'flynt'),
        'name' => 'bodyScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => ''
    ],
    [
        'label' => __('Footer Scripts', 'flynt'),
        'name' => 'footerScripts',
        'type' => 'textarea',
        'rows' => 5,
        'new_lines' => ''
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

add_filter('gform_enable_legacy_markup', '__return_true');

add_action('wp_footer', function () {
    $footerScripts = Options::getGlobal('Scripts', 'footerScripts');
    if (!empty($footerScripts) && get_the_ID() !== 26194) {
        echo $footerScripts;
    }
}, 10);

add_action('wp_head', function () {
    $headerScripts = Options::getGlobal('Scripts', 'headerScripts');
    if (!empty($headerScripts) && get_the_ID() !== 26194) {
        echo $headerScripts;
    }
}, 10);

add_action('wp_body_open', function () {
    $bodyScripts = Options::getGlobal('Scripts', 'bodyScripts');
    if (!empty($bodyScripts) && get_the_ID() !== 26194) {
        echo $bodyScripts;
    }
}, 10);


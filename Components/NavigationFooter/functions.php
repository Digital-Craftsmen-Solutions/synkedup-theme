<?php

namespace Flynt\Components\NavigationFooter;

use Flynt\Utils\Asset;
use Flynt\Utils\Options;
use Timber\Timber;

add_action('init', function (): void {
    register_nav_menus([
        'navigation_footer_1' => __('Navigation Footer Column 1', 'flynt'),
        'navigation_footer_2' => __('Navigation Footer Column 2', 'flynt'),
        'navigation_footer_3' => __('Navigation Footer Column 3', 'flynt'),
        'navigation_footer_4' => __('Navigation Footer Column 4', 'flynt'),
        'navigation_footer_5' => __('Navigation Footer Bottom', 'flynt'),
    ]);
});

add_filter('Flynt/addComponentData?name=NavigationFooter', function (array $data): array {
    $data['menu1'] = Timber::get_menu('navigation_footer_1') ?? (object) ['title' => 'Footer 1', 'items' => []];
    $data['menu2'] = Timber::get_menu('navigation_footer_2') ?? array();
    $data['menu3'] = Timber::get_menu('navigation_footer_3') ?? array();
    $data['menu4'] = Timber::get_menu('navigation_footer_4') ?? array();
    $data['menu5'] = Timber::get_menu('navigation_footer_5') ?? array();
    $data['logo'] = [
        'src' => Asset::requireUrl('assets/images/logo.svg'),
        'alt' => get_bloginfo('name')
    ];
    $data['copyright'] = '© 2025 SynkedUP';
    $data['address'] = '8583 Woodbury <br> Pike Hollidaysburg, <br> PA 16648';
    $data['app_store_logo'] = [
        'src' => Asset::requireUrl('assets/images/app-store-badge.svg'),
        'alt' => 'App store logo',
    ];
    $data['app_store_site'] = [
        'link' => 'https://apps.apple.com/us/app/synkedup/id1482613991',
        'target' => '_blank',
    ];
    $data['play_store_logo'] = [
        'src' => Asset::requireUrl('assets/images/google-play-badge.png'),
        'alt' => 'Play store logo',
    ];
    $data['play_store_site'] = [
        'link' => 'https://play.google.com/store/apps/details?id=com.tussey.synkedup&hl=en_US',
        'target' => '_blank',
    ];
    return $data;
});

Options::addTranslatable('NavigationFooter', [
    [
        'label' => __('Content', 'flynt'),
        'name' => 'contentTab',
        'type' => 'tab',
        'placement' => 'top',
        'endpoint' => 0
    ],
    [
        'label' => __('Text', 'flynt'),
        'name' => 'contentHtml',
        'type' => 'wysiwyg',
        'delay' => 0,
        'media_upload' => 0,
        'required' => 1,
        'toolbar' => 'basic',
        'default_value' => '©&nbsp;' . date_i18n('Y') . ' ' . get_bloginfo('name'),
    ],
    [
        'label' => __('Labels', 'flynt'),
        'name' => 'labelsTab',
        'type' => 'tab',
        'placement' => 'top',
        'endpoint' => 0
    ],
    [
        'label' => '',
        'name' => 'labels',
        'type' => 'group',
        'sub_fields' => [
            [
                'label' => __('Aria Label', 'flynt'),
                'name' => 'ariaLabel',
                'type' => 'text',
                'default_value' => __('Footer Navigation', 'flynt'),
                'required' => 1,
                'wrapper' => [
                    'width' => '50',
                ],
            ],
        ],
    ],
]);
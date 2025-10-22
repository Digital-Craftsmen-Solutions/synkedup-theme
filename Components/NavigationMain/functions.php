<?php

namespace Flynt\Components\NavigationMain;

use Flynt\Utils\Asset;
use Flynt\Utils\Options;
use Timber\Timber;

add_action('init', function (): void {
    register_nav_menus([
        'navigation_main' => __('Navigation Main', 'flynt')
    ]);
});

add_filter('Flynt/addComponentData?name=NavigationMain', function (array $data): array {
    $data['menu'] = Timber::get_menu('navigation_main') ?? Timber::get_pages_menu();
    $data['logo'] = [
        'src' => Asset::requireUrl('assets/images/logo-light.svg'),
        'alt' => get_bloginfo('name')
    ];
    $data['options'] = Options::getGlobal('MainNavigation');
    return $data;
});

Options::addGlobal('MainNavigation', [
    [
        'label' => __('Top Bar Announcement', 'flynt'),
        'name' => 'topBarAnnouncement',
        'type' => 'wysiwyg',
        'media_upload' => 0,
        'tabs' => 'visual,text',
        'delay' => 0,
        'instructions' => __('Optional announcement text to show at the top of the site.', 'flynt'),
    ],
    [
        'label' => __('CTA Button', 'flynt'),
        'name' => 'ctaButton',
        'type' => 'link',
        'return_format' => 'array',
    ],
    [
        'label' => __('Secondary Button', 'flynt'),
        'name' => 'secondaryButton',
        'type' => 'link',
        'return_format' => 'array',
    ],
]);

Options::addTranslatable('NavigationMain', [
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
                'default_value' => __('Main Navigation', 'flynt'),
                'required' => 1,
                'wrapper' => [
                    'width' => '50',
                ],
            ],
        ],
    ],
]);
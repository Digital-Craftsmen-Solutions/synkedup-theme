<?php

namespace Flynt\Components\LayoutTabsReusable;

use Flynt\FieldVariables;
use Flynt\Components;

add_filter('Flynt/addComponentData?name=LayoutTabsReusable', function (array $data): array {

    return ['model' => $data];
});

function getACFLayout(): array
{
    return [
        'name' => 'LayoutTabsReusable',
        'label' => __('Layout: Tabs', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading('h2'),
            // [
            //     'label' => __('Tabs', 'flynt'),
            //     'name' => 'tabs',
            //     'type' => 'repeater',
            //     'layout' => 'row',
            //     'button_label' => __('Add Tab', 'flynt'),
            //     'sub_fields' => [
            //         [
            //             'label' => __('Component', 'flynt'),
            //             'name' => 'LayoutTabs',
            //             'type' => 'post_object',
            //             'post_type' => [
            //                 'reusable-components'
            //             ],
            //             'allow_null' => 0,
            //             'multiple' => 0,
            //             'ui' => 1,
            //             'required' => 1,
            //             'return_format' => 'object',
            //         ],
            //     ]
            // ],
            [
                'label' => __('Tabs', 'flynt'),
                'name' => 'tabs',
                'type' => 'flexible_content',
                'button_label' => __('Add Component', 'flynt'),
                'layouts' => [
                    Components\SectionFeatureBlock\getACFLayout(),
                    Components\SectionAccordion\getACFLayout(),
                    Components\Wysiwyg\getACFLayout(),
                    // Components\LayoutTabs\getACFLayout(),
                ],
            ],
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    FieldVariables\getTheme('dark'),
                ],
            ],
        ],

        // 'name' => 'LayoutTabs',
        // 'label' => sprintf('%1$s <i class="dashicons dashicons-controls-repeat"></i>', __('Reusable', 'flynt')),
        // 'sub_fields' => [
        //     [
        //         'label' => __('Select Reusable Component', 'flynt'),
        //         'name' => 'LayoutTabs',
        //         'type' => 'post_object',
        //         'post_type' => [
        //             'reusable-components'
        //         ],
        //         'allow_null' => 0,
        //         'multiple' => 0,
        //         'ui' => 1,
        //         'required' => 1,
        //         'return_format' => 'object',
        //     ],
        // ],
    ];
}


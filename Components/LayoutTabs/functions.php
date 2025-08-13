<?php

namespace Flynt\Components\LayoutTabs;

use Flynt\FieldVariables;
use Flynt\Components;


add_filter('Flynt/addComponentData?name=LayoutTabs', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'tabs' => array_map(function ($tab, $index) use ($data) {
            $tab['component'][0]['options']['theme'] = $data['options']['theme'] ?? null;

            return [
                'id' => !empty($tab['id']) ? $tab['id'] : uniqid('accordion_' . $index . '_'),
                'title' => $tab['title'],
                'component' => $tab['component'][0],
            ];
        }, $data['tabs'] ?? [], array_keys($data['tabs'] ?: [])),
        'options' => $data['options'] ?: [],
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'LayoutTabs',
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
            [
                'label' => __('Tabs', 'flynt'),
                'name' => 'tabs',
                'type' => 'repeater',
                'layout' => 'row',
                'button_label' => __('Add Tab', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Title', 'flynt'),
                        'name' => 'title',
                        'required' => 1,
                        'type' => 'text',
                        'wrapper' => ['width' => 80],
                    ],
                    [
                        'label' => __('Anchor Id', 'flynt'),
                        'name' => 'id',
                        'type' => 'text',
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Inner Component', 'flynt'),
                        'name' => 'component',
                        'type' => 'flexible_content',
                        'required' => 1,
                        'min' => 1,
                        'max' => 1,
                        'button_label' => __('Add Component', 'flynt'),
                        'layouts' => [
                            Components\ReusableComponent\getACFLayout(),
                        ],
                    ],
                ]
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
                    FieldVariables\getTheme(),
                ],
            ],
        ],
    ];
}


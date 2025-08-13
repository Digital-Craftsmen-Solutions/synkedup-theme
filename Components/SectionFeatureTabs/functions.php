<?php

namespace Flynt\Components\SectionFeatureTabs;

use Flynt\FieldVariables;
use Flynt\Components;


add_filter('Flynt/addComponentData?name=SectionFeatureTabs', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'tabs' => array_map(function ($tab, $index) {
            return [
                'id' => !empty($item['id']) ? $tab['id'] : uniqid('accordion_' . $index . '_'),
                'title' => $tab['title'],
                'actionButton' => isset($tab['actionButton'])
                    ? array_merge($tab['actionButton'], ['type' => 'secondary'])
                    : null,
                'description' => $tab['description'] ?? '',
                'image' => $tab['image'] ?? [],
            ];
        }, $data['tabs'] ?? [], array_keys($data['tabs'] ?: [])),
        'options' => $data['options'] ?: [],
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'SectionFeatureTabs',
        'label' => __('Section: Feature Tabs', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => __('Show Heading?', 'flynt'),
                'name' => 'showHeading',
                'type' => 'true_false',
                'default_value' => 0,
                'ui' => 1
            ],
            array_merge(
                FieldVariables\getHeading('h2'),
                [
                    'conditional_logic' => [
                        [
                            [
                                'fieldPath' => 'showHeading',
                                'operator' => '==',
                                'value' => 1,
                            ],
                        ],
                    ],
                ]
            ),
            [
                'label' => __('Tabs', 'flynt'),
                'name' => 'tabs',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => __('Add Tab', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Title', 'flynt'),
                        'name' => 'title',
                        'required' => 1,
                        'type' => 'text',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Action Button', 'flynt'),
                        'name' => 'actionButton',
                        'type' => 'link',
                        'wrapper' => ['width' => 30],
                    ],
                    [
                        'label' => __('Anchor Id', 'flynt'),
                        'name' => 'id',
                        'type' => 'text',
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'wysiwyg',
                        'media_upload' => 0,
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Image', 'flynt'),
                        'name' => 'image',
                        'type' => 'image',
                        'return_format' => 'array',
                        'preview_size' => 'medium',
                        'mime_types' => 'jpg,jpeg,png,webp,svg',
                        'required' => 1,
                        'wrapper' => ['width' => 50],
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


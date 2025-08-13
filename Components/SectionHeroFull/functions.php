<?php

namespace Flynt\Components\SectionHeroFull;

use Flynt\Utils\Breadcrumbs;
use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionHeroFull', function (array $data): array {
    $model = [
        'backgroundImage' => $data['backgroundImage'],
        'mobileImage' => isset($data['mobileImage']) ? $data['mobileImage'] : null,
        'heading' => $data['heading'],
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
            'gravityForm' => $data['actionType'] == 'form' ? $data['gravityForm'] : null,
        ],
        'extraItems' => !empty($data['extraItems'])
            ? [
                'items' => array_map(function ($item) {
                    return [
                        'type' => $item['type'],
                        'icon' => $item['type'] === 'icon' ? $item['icon'] : null,
                        'image' => $item['type'] === 'image' ? $item['image'] : null,
                        'title' => $item['title'],
                        'description' => $item['description'],
                    ];
                }, $data['extraItems'])
            ]
            : null,
        'breadcrumbs' => isset($data['options']['showBreadcrumbs']) && $data['options']['showBreadcrumbs']
            ? [
                'items' => Breadcrumbs::get(),
            ]
            : null,
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionHeroFull',
        'label' => __('Section: Hero', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading('h1'),
            FieldVariables\getAction(),
            [
                'label' => __('Image', 'flynt'),
                'name' => 'backgroundImage',
                'type' => 'image',
                'instructions' => __('Optional image.', 'flynt'),
                'preview_size' => 'medium',
                'return_format' => 'array',
                'mime_types' => 'jpg,jpeg,png,webp',
                'wrapper' => ['width' => 50],
            ],
            [
                'label' => __('Mobile Image', 'flynt'),
                'name' => 'mobileImage',
                'type' => 'image',
                'instructions' => __('Optional image to replace with on mobile screens.', 'flynt'),
                'preview_size' => 'medium',
                'return_format' => 'array',
                'mime_types' => 'jpg,jpeg,png,webp',
                'wrapper' => ['width' => 50],
            ],
            [
                'label' => __('Extra Items', 'flynt'),
                'name' => 'extraItems',
                'type' => 'repeater',
                'layout' => 'block',
                'min' => 0,
                'max' => 3,
                'button_label' => __('Add Item', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Type', 'flynt'),
                        'name' => 'type',
                        'type' => 'button_group',
                        'choices' => [
                            'icon' => __('Icon', 'flynt'),
                            'image' => __('Image', 'flynt'),
                            'figure' => __('Figure', 'flynt'),
                        ],
                        'default_value' => 'icon',
                        'layout' => 'horizontal',
                        'wrapper' => ['width' => 20],
                    ],
                    array_merge(
                        FieldVariables\getIcon(),
                        [
                            'conditional_logic' => [
                                [
                                    [
                                        'fieldPath' => 'type',
                                        'operator' => '==',
                                        'value' => 'icon',
                                    ],
                                ],
                            ],
                        ]
                    ),
                    [
                        'label' => __('Image', 'flynt'),
                        'name' => 'image',
                        'type' => 'image',
                        'return_format' => 'array',
                        'conditional_logic' => [
                            [
                                [
                                    'fieldPath' => 'type',
                                    'operator' => '==',
                                    'value' => 'image',
                                ],
                            ],
                        ],
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Title', 'flynt'),
                        'name' => 'title',
                        'type' => 'text',
                        'conditional_logic' => [
                            [
                                [
                                    'fieldPath' => 'type',
                                    'operator' => '==',
                                    'value' => 'figure',
                                ],
                            ],
                        ],
                        'wrapper' => ['width' => 30],
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'text',
                        'wrapper' => ['width' => 30],
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
                    FieldVariables\getTheme('dark'),
                    [
                        'label' => __('Image Display', 'flynt'),
                        'name' => 'display',
                        'type' => 'button_group',
                        'choices' => [
                            'full' => __('Full', 'flynt'),
                            'split' => __('Split', 'flynt'),
                        ],
                        'default_value' => 'full',
                        'allow_null' => 0,
                    ],
                    [
                        'label' => __('Show Breadcrumbs?', 'flynt'),
                        'name' => 'showBreadcrumbs',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1
                    ]
                ],
            ],
        ],
    ];
}

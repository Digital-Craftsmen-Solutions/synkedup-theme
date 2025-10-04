<?php

namespace Flynt\Components\SectionHeroFull;

use Flynt\Utils\Breadcrumbs;
use Flynt\FieldVariables;
use Flynt\Utils\Oembed;

add_filter('Flynt/addComponentData?name=SectionHeroFull', function (array $data): array {
    $model = [
        'backgroundImage' => $data['backgroundImage'],
        'heading' => $data['heading'],
        'image' => $data['mediaType'] === 'image' ? $data['image'] : null,
        'mobileImage' => $data['mediaType'] === 'image' && !empty($data['mobileImage']) ? $data['mobileImage'] : null,
        'gravityForm' => $data['mediaType'] === 'gravityForm' ? $data['gravityForm'] : null,
        'video' => $data['mediaType'] === 'video' && !empty($data['video']) ? [
            'posterImage' => $data['video']['posterImage'],
            'oembed' => Oembed::setSrcAsDataAttribute(
                $data['video']['oembed'] ?? '',
                [
                    'autoplay' => 'true'
                ]
            )
        ] : null,
        'embed' => $data['mediaType'] === 'embed' && !empty($data['embed']) ? $data['embed'] : null,
        'features' => array_map(function ($feature) {
            return [
                'label' => $feature['label'],
                'icon' => empty($feature['icon']) ? 'checkGreen' : $feature['icon'],
            ];
        }, $data['features'] ?: []),
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
                        'figure' => $item['figure'],
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
            [
                'label' => __('Background Image', 'flynt'),
                'name' => 'backgroundImage',
                'type' => 'image',
                'instructions' => __('Optional image.', 'flynt'),
                'preview_size' => 'medium',
                'return_format' => 'array',
                'mime_types' => 'jpg,jpeg,png,webp',
                'wrapper' => ['width' => 100],
            ],
            FieldVariables\getHeading('h1'),
            FieldVariables\getMedia(),
            FieldVariables\getFeatures(),
            FieldVariables\getAction(),
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
                        'label' => __('Figure', 'flynt'),
                        'name' => 'figure',
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
                        'wrapper' => ['width' => 20],
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

<?php

namespace Flynt\Components\SectionIconCards;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionIconCards', function (array $data): array {
    $model = [
        'heading' => array_filter($data['heading'] ?? [], fn($value, $key) => $key !== 'type' && !empty($value), ARRAY_FILTER_USE_BOTH) ? $data['heading'] : null,
        'cards' => array_map(function ($card) {
            return [
                'type' => $card['type'] ?? 'icon',
                'icon' => $card['icon'] ?? null,
                'image' => $card['image'] ?? null,
                'title' => $card['title'] ?? '',
                'badge' => $card['showBadge'] ? [
                    'text' => $card['badge'],
                    'type' => $card['badgeType'],
                ] : null,
                'figure' => $card['figure'] ?? '',
                'description' => $card['description'] ?? '',
                'features' => $card['showFeatures'] ? $card['features'] ?? [] : [],
                'actionButton' => !empty($card['actionButton'])
                    ? array_merge($card['actionButton'], ['type' => 'secondary'])
                    : null,
            ];
        }, $data['cards'] ?: []),
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
            'gravityForm' => $data['actionType'] == 'form' ? $data['gravityForm'] : null,
        ],
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionIconCards',
        'label' => __('Section: Icon Cards', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading(),
            [
                'label' => __('Cards', 'flynt'),
                'name' => 'cards',
                'type' => 'repeater',
                'layout' => 'block',
                'min' => 1,
                'button_label' => __('Add Card', 'flynt'),
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
                    [
                        'label' => __('Title', 'flynt'),
                        'name' => 'title',
                        'type' => 'text',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Show Features?', 'flynt'),
                        'name' => 'showFeatures',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1,
                        'wrapper' => ['width' => 15],
                    ],
                    [
                        'label' => __('Show Badge?', 'flynt'),
                        'name' => 'showBadge',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1,
                        'wrapper' => ['width' => 15],
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
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Action Button', 'flynt'),
                        'name' => 'actionButton',
                        'type' => 'link',
                        'wrapper' => ['width' => 30],
                    ],
                    [
                        'label' => __('Badge', 'flynt'),
                        'name' => 'badge',
                        'type' => 'text',
                        'wrapper' => ['width' => 20],
                        'conditional_logic' => [
                            [
                                [
                                    'fieldPath' => 'showBadge',
                                    'operator' => '==',
                                    'value' => 1,
                                ],
                            ],
                        ],
                    ],
                    [
                        'label' => __('Badge Type', 'flynt'),
                        'name' => 'badgeType',
                        'type' => 'button_group',
                        'choices' => [
                            'green' => __('Green', 'flynt'),
                            'orange' => __('Orange', 'flynt'),
                        ],
                        'default_value' => 'green',
                        'wrapper' => ['width' => 20],
                        'conditional_logic' => [
                            [
                                [
                                    'fieldPath' => 'showBadge',
                                    'operator' => '==',
                                    'value' => 1,
                                ],
                            ],
                        ],
                    ],
                    array_merge(
                        FieldVariables\getFeatures(),
                        [
                            'conditional_logic' => [
                                [
                                    [
                                        'fieldPath' => 'showFeatures',
                                        'operator' => '==',
                                        'value' => 1,
                                    ],
                                ],
                            ],
                        ]
                    ),
                ]
            ],
            FieldVariables\getAction(),
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
                    [
                        'label' => __('Align', 'flynt'),
                        'name' => 'align',
                        'type' => 'button_group',
                        'choices' => [
                            'left' => __('Left', 'flynt'),
                            'center' => __('Center', 'flynt'),
                        ],
                        'default_value' => 'left',
                        'layout' => 'horizontal',
                    ],
                    [
                        'label' => __('Card Columns', 'flynt'),
                        'name' => 'cardCols',
                        'type' => 'button_group',
                        'choices' => [
                            'auto' => __('Auto', 'flynt'),
                            '1' => __('1', 'flynt'),
                            '2' => __('2', 'flynt'),
                            '3' => __('3', 'flynt'),
                        ],
                        'default_value' => 'auto',
                        'layout' => 'horizontal',
                    ],
                    FieldVariables\getTheme(),
                ],
            ],
        ],
    ];
}
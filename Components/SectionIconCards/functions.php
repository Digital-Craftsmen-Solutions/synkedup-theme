<?php

namespace Flynt\Components\SectionIconCards;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionIconCards', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'cards' => array_map(function ($card) {
            return [
                'type' => $card['type'] ?? 'icon',
                'icon' => $card['icon'] ?? null,
                'image' => $card['image'] ?? null,
                'title' => $card['title'] ?? '',
                'description' => $card['description'] ?? '',
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
                        'wrapper' => ['width' => 60],
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'text',
                        'wrapper' => ['width' => 70],
                    ],
                    [
                        'label' => __('Action Button', 'flynt'),
                        'name' => 'actionButton',
                        'type' => 'link',
                        'wrapper' => ['width' => 30],
                    ],
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
                    FieldVariables\getTheme(),
                ],
            ],
        ],
    ];
}
<?php

namespace Flynt\Components\SectionFeatureCards;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionFeatureCards', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'cards' => array_map(function ($card) {
            return [
                'title' => $card['title'],
                'description' => $card['description'],
                'subtitle' => $card['subtitle'],
                'backgroundImage' => $card['backgroundImage'],
                'action' => $card['action'],
            ];
        }, $data['cards']),
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
        'name' => 'sectionFeatureCards',
        'label' => __('Section: Feature Cards', 'flynt'),
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
                        'label' => __('Title', 'flynt'),
                        'name' => 'title',
                        'type' => 'text',
                        'wrapper' => ['width' => 35],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Subtitle', 'flynt'),
                        'name' => 'subtitle',
                        'type' => 'text',
                        'wrapper' => ['width' => 25],
                    ],
                    [
                        'label' => __('Card Click', 'flynt'),
                        'name' => 'actionType',
                        'type' => 'button_group',
                        'choices' => [
                            'none' => __('None', 'flynt'),
                            'link' => __('Link', 'flynt'),
                        ],
                        'default_value' => 'none',
                        'layout' => 'horizontal',
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Link', 'flynt'),
                        'name' => 'action',
                        'type' => 'link',
                        'layout' => 'block',
                        'wrapper' => ['width' => 20],
                        'conditional_logic' => [
                            [
                                [
                                    'fieldPath' => 'actionType',
                                    'operator' => '==',
                                    'value' => 'link',
                                ],
                            ],
                        ],
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'textarea',
                        'rows' => 3,
                        'wrapper' => ['width' => 60],
                    ],
                    [
                        'label' => __('Background Image', 'flynt'),
                        'name' => 'backgroundImage',
                        'type' => 'image',
                        'return_format' => 'array',
                        'preview_size' => 'medium',
                        'mime_types' => 'jpg,jpeg,png,webp',
                        'required' => 1,
                        'wrapper' => ['width' => 40],
                    ],
                ],
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
                    FieldVariables\getTheme(),
                    [
                        'label' => __('Align', 'flynt'),
                        'name' => 'align',
                        'type' => 'button_group',
                        'choices' => [
                            'left' => __('Left', 'flynt'),
                            'center' => __('Center', 'flynt'),
                        ],
                        'default_value' => 'left',
                    ],
                    [
                        'label' => __('Display', 'flynt'),
                        'name' => 'display',
                        'type' => 'button_group',
                        'choices' => [
                            'imageTop' => __('Image Top', 'flynt'),
                            'imageBottom' => __('Image Bottom', 'flynt'),
                            'imageOverlay' => __('Image Overlay', 'flynt'),
                        ],
                        'default_value' => 'imageBottom',
                    ],
                ],
            ],
        ],
    ];
}

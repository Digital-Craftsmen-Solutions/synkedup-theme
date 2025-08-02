<?php

namespace Flynt\Components\SectionFeatureBlock;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionFeatureBlock', function (array $data): array {
    $model = [
        'icon' => $data['icon'] ?? null,
        'heading' => $data['heading'],
        'features' => array_map(function ($feature) {
            return [
                'label' => $feature['label'],
            ];
        }, $data['features'] ?? []),
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
            'gravityForm' => $data['actionType'] == 'form' ? $data['gravityForm'] : null,
        ],
        'quote' => ($data['showQuote'] && !empty($data['quote'])) ? $data['quote'] : null,
        'image' => $data['image'] ?? null,
        'mobileImage' => $data['mobileImage'] ?? null,
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionFeatureBlock',
        'label' => __('Section: Feature Block', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getIcon(),
            FieldVariables\getHeading(),
            [
                'label' => __('Features', 'flynt'),
                'name' => 'features',
                'type' => 'repeater',
                'layout' => 'block',
                'min' => 1,
                'button_label' => __('Add Feature', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Label', 'flynt'),
                        'name' => 'label',
                        'type' => 'text',
                        'wrapper' => ['width' => 100],
                        'required' => 1,
                    ],
                ],
            ],
            FieldVariables\getAction(),
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
            [
                'label' => __('Mobile Image', 'flynt'),
                'name' => 'mobileImage',
                'type' => 'image',
                'instructions' => __('Optional image to replace with on mobile screens.', 'flynt'),
                'return_format' => 'array',
                'preview_size' => 'medium',
                'mime_types' => 'jpg,jpeg,png,webp,svg',
                'required' => 0,
                'wrapper' => ['width' => 50],
            ],
            [
                'label' => __('Show Bottom Quote', 'flynt'),
                'name' => 'showQuote',
                'type' => 'true_false',
                'ui' => 1,
                'message' => __('Show Quote at the bottom?', 'flynt'),
                'default_value' => 0,
            ],
            [
                'label' => __('Quote', 'flynt'),
                'name' => 'quote',
                'type' => 'group',
                'layout' => 'block',
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'showQuote',
                            'operator' => '==',
                            'value' => 1,
                        ],
                    ],
                ],
                'sub_fields' => [
                    FieldVariables\getQuote(),
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
                    FieldVariables\getTheme(),
                    [
                        'label' => __('Image Display', 'flynt'),
                        'name' => 'imageDisplay',
                        'type' => 'button_group',
                        'choices' => [
                            'right' => __('Right', 'flynt'),
                            'left' => __('Left', 'flynt'),
                            'full' => __('Center', 'flynt'),
                        ],
                        'default_value' => 'right',
                        'allow_null' => 1,
                    ],
                ],
            ],
        ],
    ];
}
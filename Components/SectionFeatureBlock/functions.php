<?php

namespace Flynt\Components\SectionFeatureBlock;

use Flynt\FieldVariables;
use Flynt\Utils\Oembed;

add_filter('Flynt/addComponentData?name=SectionFeatureBlock', function (array $data): array {
    $model = [
        'icon' => $data['icon'] ?? null,
        'heading' => $data['heading'],
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
            'reusable' => $data['actionType'] == 'reusable' ? $data['reusable'] : null,
        ],
        'quote' => ($data['showQuote'] && !empty($data['quote'])) ? $data['quote'] : null,
        'image' => $data['mediaType'] === 'image' ? $data['image'] : null,
        'mobileImage' => $data['mediaType'] === 'image' && !empty($data['mobileImage']) ? $data['mobileImage'] : null,
        'gravityForm' => $data['mediaType'] === 'gravityForm' ? $data['gravityForm'] : null,
        'hubspotForm' => $data['mediaType'] === 'hubspot' && !empty($data['hubspotForm']) ? $data['hubspotForm'] : null,
        'calendly' => $data['mediaType'] === 'calendly' && !empty($data['calendly']) ? $data['calendly'] : null,
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
            FieldVariables\getFeatures(),
            FieldVariables\getMedia($default = 'image'),
            FieldVariables\getAction(['includeReusable' => true]),
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
                        'label' => __('Media Display', 'flynt'),
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
                    [
                        'label' => __('Media Align', 'flynt'),
                        'name' => 'imageAlign',
                        'type' => 'button_group',
                        'choices' => [
                            'bottom' => __('Bottom', 'flynt'),
                            'center' => __('Center', 'flynt'),
                            'top' => __('Top', 'flynt'),
                        ],
                        'default_value' => 'bottom',
                        'allow_null' => 1,
                    ],
                    [
                        'label' => __('Text Align', 'flynt'),
                        'name' => 'textAlign',
                        'type' => 'button_group',
                        'choices' => [
                            'default' => __('Default', 'flynt'),
                            'center' => __('Center', 'flynt'),
                            'left' => __('Left', 'flynt'),
                        ],
                        'default_value' => 'default',
                        'allow_null' => 1,
                    ],
                ],
            ],
        ],
    ];
}
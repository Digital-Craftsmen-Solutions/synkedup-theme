<?php

namespace Flynt\Components\SectionSocialProof;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionSocialProof', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
            'gravityForm' => $data['actionType'] == 'form' ? $data['gravityForm'] : null,
        ],
        'stats' => array_map(function ($stat) {
            return [
                'figure' => $stat['figure'],
                'description' => $stat['description'],
            ];
        }, $data['stats'] ?: []),
        'testimonials' => $data['testimonials'],
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionSocialProof',
        'label' => __('Section: Social Proof', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading(),
            FieldVariables\getAction(),
            [
                'label' => __('Stats', 'flynt'),
                'name' => 'stats',
                'type' => 'repeater',
                'layout' => 'block',
                'min' => 1,
                'button_label' => __('Add Stat', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Figure', 'flynt'),
                        'name' => 'figure',
                        'type' => 'text',
                        'wrapper' => ['width' => 30],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'text',
                        'wrapper' => ['width' => 70],
                        'required' => 1,
                    ],
                ],
            ],
            [
                'label' => __('Testimonials', 'flynt'),
                'name' => 'testimonials',
                'type' => 'group',
                'layout' => 'block',
                'sub_fields' => [
                    [
                        'label' => __('Quotes', 'flynt'),
                        'name' => 'quotes',
                        'type' => 'repeater',
                        'layout' => 'block',
                        'min' => 1,
                        'button_label' => __('Add Quote', 'flynt'),
                        'sub_fields' => [
                            FieldVariables\getQuote()
                        ]
                    ]
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
                        'label' => __('Testimonials: Show Arrows', 'flynt'),
                        'name' => 'showArrows',
                        'type' => 'true_false',
                        'default_value' => 1,
                        'ui' => 1,
                    ],
                    [
                        'label' => __('Testimonials: Autoplay', 'flynt'),
                        'name' => 'autoPlay',
                        'type' => 'true_false',
                        'ui' => 1,
                    ],
                ],
            ],
        ],
    ];
}

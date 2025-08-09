<?php

namespace Flynt\Components\SectionCallToAction;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionCallToAction', function (array $data): array {
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
        'options' => $data['options'] ?: []
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionCallToAction',
        'label' => __('Section: Call To Action', 'flynt'),
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
                        'label' => __('Theme', 'flynt'),
                        'name' => 'theme',
                        'type' => 'button_group',
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 0,
                        'ajax' => 0,
                        'choices' => [
                            'light' => __('Light', 'flynt'),
                            'dark' => __('Dark', 'flynt'),
                            'alt' => __('Alternate', 'flynt'),
                        ],
                        'default_value' => 'light',
                    ],
                    [
                        'label' => __('Display', 'flynt'),
                        'name' => 'display',
                        'type' => 'button_group',
                        'choices' => [
                            'full' => __('Full', 'flynt'),
                            'split' => __('Split', 'flynt'),
                        ],
                        'default_value' => 'full',
                        'wrapper' => ['width' => 50],
                    ],
                ],
            ],
        ],
    ];
}

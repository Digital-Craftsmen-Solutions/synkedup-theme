<?php

namespace Flynt\Components\SectionHeroFull;

use Flynt\FieldVariables;


add_filter('Flynt/addComponentData?name=SectionHeroFull', function (array $data): array {
    $model = [
        'backgroundImage' => $data['backgroundImage'],
        'title' => $data['title'],
        'contentHtml' => $data['contentHtml'],
        'ctaType' => $data['ctaType'],
        'ctaButtons' => [
            'primaryButton' => $data['ctaButtons']['primaryButton'],
            'secondaryButton' => $data['ctaButtons']['secondaryButton']
        ],
        'options' => $data['options'] ?? []
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionHeroFull',
        'label' => __('Section: Hero Full', 'flynt'),
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
                'instructions' => __('Optional background image. Format: JPG, PNG, WebP.', 'flynt'),
                'name' => 'backgroundImage',
                'type' => 'image',
                'preview_size' => 'medium',
                'required' => 0,
                'mime_types' => 'jpg,jpeg,png,webp',
            ],
            [
                'label' => __('Title', 'flynt'),
                'name' => 'title',
                'type' => 'group',
                'layout' => 'block',
                'sub_fields' => [
                    [
                        'label' => __('Before Highlight', 'flynt'),
                        'name' => 'before',
                        'type' => 'text',
                        'required' => 1,
                        'wrapper' => ['width' => 40],
                    ],
                    [
                        'label' => __('Highlighted', 'flynt'),
                        'name' => 'highlight',
                        'type' => 'text',
                        'required' => 1,
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('After Highlight', 'flynt'),
                        'name' => 'after',
                        'type' => 'text',
                        'required' => 0,
                        'wrapper' => ['width' => 40],
                    ],
                ],
            ],
            [
                'label' => __('Text', 'flynt'),
                'name' => 'contentHtml',
                'type' => 'wysiwyg',
                'media_upload' => 0,
                'required' => 1,
                'delay' => 0,
            ],
            [
                'label' => __('CTA Type', 'flynt'),
                'name' => 'ctaType',
                'type' => 'button_group',
                'choices' => [
                    'buttons' => __('Buttons', 'flynt'),
                    'form' => __('Gravity Form', 'flynt'),
                ],
                'default_value' => 'buttons',
                'layout' => 'horizontal',
            ],
            [
                'label' => __('Buttons', 'flynt'),
                'name' => 'ctaButtons',
                'type' => 'group',
                'layout' => 'block',
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'ctaType',
                            'operator' => '==',
                            'value' => 'buttons',
                        ],
                    ],
                ],
                'sub_fields' => [
                    [
                        'label' => __('Primary Button', 'flynt'),
                        'name' => 'primaryButton',
                        'type' => 'link',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Secondary Button', 'flynt'),
                        'name' => 'secondaryButton',
                        'type' => 'link',
                        'wrapper' => ['width' => 50],
                    ],
                ],
            ],
            [
                'label' => __('Gravity Form', 'flynt'),
                'name' => 'gravityForm',
                'type' => 'select',
                'instructions' => __('Select a Gravity Form to display.', 'flynt'),
                'choices' => [],
                'allow_null' => 1,
                'return_format' => 'value',
                'ui' => 1,
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'ctaType',
                            'operator' => '==',
                            'value' => 'form',
                        ],
                    ],
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
                    FieldVariables\getTheme()
                ],
            ],
        ],
    ];
}

add_filter('acf/load_field/name=gravityForm', function ($field) {
    if (!class_exists('GFAPI')) {
        return $field;
    }

    $forms = \GFAPI::get_forms();
    $choices = [];

    foreach ($forms as $form) {
        $choices[$form['id']] = $form['title'];
    }

    $field['choices'] = $choices;

    return $field;
});
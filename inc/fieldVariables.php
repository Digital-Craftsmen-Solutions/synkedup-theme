<?php

/**
 * Defines field variables to be used across multiple components.
 */

namespace Flynt\FieldVariables;

function getTheme($default = 'light'): array
{
    return [
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
        ],
        'default_value' => $default,
    ];
}

function getSize($default = 'medium'): array
{
    return [
        'label' => __('Size', 'flynt'),
        'name' => 'size',
        'type' => 'radio',
        'other_choice' => 0,
        'save_other_choice' => 0,
        'layout' => 'horizontal',
        'choices' => [
            'medium' => __('Medium', 'flynt'),
            'wide' => __('Wide', 'flynt'),
            'full' => __('Full', 'flynt'),
        ],
        'default_value' => $default
    ];
}

function getAlignment($args = []): array
{
    $options = wp_parse_args($args, [
        'label' => __('Align', 'flynt'),
        'name' => 'align',
        'default' => 'center',
    ]);

    return [
        'label' => $options['label'],
        'name' => $options['name'],
        'type' => 'radio',
        'other_choice' => 0,
        'save_other_choice' => 0,
        'layout' => 'horizontal',
        'choices' => [
            'left' => __('Left', 'flynt'),
            'center' => __('Center', 'flynt'),
        ],
        'default_value' => $options['default']
    ];
}

function getTextAlignment($args = []): array
{
    $options = wp_parse_args($args, [
        'label' => __('Align text', 'flynt'),
        'name' => 'textAlign',
        'default' => 'left',
    ]);

    return [
        'label' => $options['label'],
        'name' => $options['name'],
        'type' => 'button_group',
        'choices' => [
            'left' => sprintf('<i class="dashicons dashicons-editor-alignleft" title="%1$s"></i>', __('Align text left', 'flynt')),
            'center' => sprintf('<i class="dashicons dashicons-editor-aligncenter" title="%1$s"></i>', __('Align text center', 'flynt'))
        ],
        'default_value' => $options['default']
    ];
}

function getHeading($typeDefault = 'h2'): array
{
    return [
        'label' => __('Heading', 'flynt'),
        'name' => 'heading',
        'type' => 'group',
        'layout' => 'block',
        'sub_fields' => [
            [
                'label' => __('Title', 'flynt'),
                'name' => 'before',
                'type' => 'text',
                'wrapper' => ['width' => 30],
            ],
            [
                'label' => __('Highlight', 'flynt'),
                'name' => 'highlight',
                'type' => 'text',
                'wrapper' => ['width' => 20],
            ],
            [
                'label' => __('After', 'flynt'),
                'name' => 'after',
                'type' => 'text',
                'wrapper' => ['width' => 30],
            ],
            [
                'label' => __('Type', 'flynt'),
                'name' => 'type',
                'type' => 'button_group',
                'choices' => $typeDefault == 'h1' ? [
                    'h1' => 'H1',
                    'h2' => 'H2',
                    'h3' => 'H3',
                ] : [
                    'h2' => 'H2',
                    'h3' => 'H3',
                ],
                'default_value' => $typeDefault,
                'wrapper' => ['width' => 20],
            ],
            [
                'label' => __('Description', 'flynt'),
                'name' => 'description',
                'type' => 'wysiwyg',
                'media_upload' => 0,
            ],
        ],
    ];
}

function getImage($label = 'Image', $required = 0, $previewSize = 'large', $mimeTypes = 'jpg,jpeg,png,webp,svg'): array
{
    return [
        'label' => __($label, 'flynt'),
        'name' => 'image',
        'type' => 'image',
        'return_format' => 'array',
        'preview_size' => $previewSize,
        'mime_types' => $mimeTypes,
        'required' => $required,
    ];
}

function getAction(): array
{
    return [
        [
            'label' => __('Action', 'flynt'),
            'name' => 'actionType',
            'type' => 'button_group',
            'choices' => [
                'none' => __('None', 'flynt'),
                'buttons' => __('Buttons', 'flynt'),
                // 'form' => __('Gravity Form', 'flynt'),
            ],
            'default_value' => 'none',
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
                        'fieldPath' => 'actionType',
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
        // [
        //     'label' => __('Gravity Form', 'flynt'),
        //     'name' => 'gravityForm',
        //     'type' => 'select',
        //     'instructions' => __('Select a Gravity Form to display.', 'flynt'),
        //     'choices' => [],
        //     'allow_null' => 1,
        //     'return_format' => 'value',
        //     'ui' => 1,
        //     'conditional_logic' => [
        //         [
        //             [
        //                 'fieldPath' => 'actionType',
        //                 'operator' => '==',
        //                 'value' => 'form',
        //             ],
        //         ],
        //     ],
        // ],
    ];
}

function getMedia($default = 'none')
{
    return [
        [
            'label' => __('Media Content', 'flynt'),
            'name' => 'mediaType',
            'type' => 'button_group',
            'choices' => [
                'none' => __('None', 'flynt'),
                'image' => __('Image', 'flynt'),
                'video' => __('Video', 'flynt'),
                'gravityForm' => __('Gravity Form', 'flynt'),
            ],
            'default_value' => $default,
        ],
        [
            'label' => __('Image', 'flynt'),
            'name' => 'image',
            'type' => 'image',
            'instructions' => __('Optional image.', 'flynt'),
            'preview_size' => 'medium',
            'return_format' => 'array',
            'mime_types' => 'jpg,jpeg,png,webp',
            'wrapper' => ['width' => 50],
            'conditional_logic' => [
                [
                    [
                        'fieldPath' => 'mediaType',
                        'operator' => '==',
                        'value' => 'image',
                    ],
                ],
            ],
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
            'conditional_logic' => [
                [
                    [
                        'fieldPath' => 'mediaType',
                        'operator' => '==',
                        'value' => 'image',
                    ],
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
                        'fieldPath' => 'mediaType',
                        'operator' => '==',
                        'value' => 'gravityForm',
                    ],
                ],
            ],
        ],
    ];
}

function getIcon($label = 'Icon', $required = 0, $icons = []): array
{
    if (empty($icons)) {
        $icons = [
            'hardHat',
            'plus',
            'minus',
            'search',
            'check',
            'chevronDown',
            'chevronUp',
            'chevronRight',
            'chevronLeft',
            'home',
            'stars',
            'menu',
            'close',
            'link',
            'smartphone',
            'calculator',
            'sheet',
            'cog',
            'penLine',
            'hourglass',
            'dollarSign',
            'dollarBadge',
            'zap',
            'file',
            'calendar',
            'calendarClock',
            'calendarCheck',
            'presentation',
            'user',
            'fileText',
            'circleCheck',
        ];
    }
    sort($icons);
    $choices = [];
    foreach ($icons as $icon) {
        $choices[$icon] = ucwords(preg_replace('/([a-z])([A-Z])/', '$1 $2', $icon));
    }

    return [
        'label' => __($label, 'flynt'),
        'name' => 'icon',
        'type' => 'select',
        'choices' => $choices,
        'ui' => 1,
        'allow_null' => 1,
        'return_format' => 'value',
        'required' => $required,
        'wrapper' => [
            'width' => 20
        ],
    ];
}

function getQuote(): array
{
    return [
        [
            'label' => __('Quote', 'flynt'),
            'name' => 'quote',
            'type' => 'textarea',
            'rows' => 3,
            'required' => 1,
        ],
        [
            'label' => __('Avatar', 'flynt'),
            'name' => 'avatar',
            'type' => 'image',
            'return_format' => 'array',
            'preview_size' => 'thumbnail',
            'mime_types' => 'jpg,jpeg,png,webp',
            'wrapper' => ['width' => 20],
        ],
        [
            'label' => __('Author Name', 'flynt'),
            'name' => 'authorName',
            'type' => 'text',
            'required' => 1,
            'wrapper' => ['width' => 40],
        ],
        [
            'label' => __('Source Title', 'flynt'),
            'name' => 'sourceTitle',
            'type' => 'text',
            'required' => 1,
            'wrapper' => ['width' => 40],
        ],
    ];
}
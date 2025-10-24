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



function getHubSpotForm(): array
{
    return [
        'label' => __('HubSpot Form', 'flynt'),
        'name' => 'hubspotForm',
        'type' => 'group',
        'layout' => 'block',
        'sub_fields' => [
            [
                'label' => __('Editor', 'flynt'),
                'name' => 'editor',
                'type' => 'button_group',
                'choices' => [
                    'legacy' => __('Legacy', 'flynt'),
                    'new' => __('New editor', 'flynt'),
                ],
                'default_value' => 'legacy',
                'layout' => 'horizontal',
            ],
            [
                'label' => __('Portal ID', 'flynt'),
                'name' => 'portalId',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'label' => __('Form ID', 'flynt'),
                'name' => 'formId',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'label' => __('Redirect Rules (optional)', 'flynt'),
                'name' => 'redirectRules',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => __('Add Redirect Rule', 'flynt'),
                'instructions' => __('If a submitted field equals a given value, redirect to the specified URL.', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Field Name', 'flynt'),
                        'name' => 'fieldName',
                        'type' => 'text',
                        'default_value' => 'email',
                        'wrapper' => ['width' => 30],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Match Value', 'flynt'),
                        'name' => 'matchValue',
                        'type' => 'text',
                        'wrapper' => ['width' => 35],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Redirect URL', 'flynt'),
                        'name' => 'redirectUrl',
                        'type' => 'url',
                        'wrapper' => ['width' => 35],
                        'required' => 1,
                    ],
                ],
            ],
        ],
    ];
}

function getAction($options = []): array
{
    $defaults = [
        'includeHubspot' => false,
    ];
    
    $settings = wp_parse_args($options, $defaults);

    $choices = [
        'none' => __('None', 'flynt'),
        'buttons' => __('Buttons', 'flynt'),
    ];

    if ($settings['includeHubspot']) {
        $choices['hubspot'] = __('Hubspot Form', 'flynt');
    }

    $fields = [
        [
            'label' => __('Action', 'flynt'),
            'name' => 'actionType',
            'type' => 'button_group',
            'choices' => $choices,
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
    ];

    if ($settings['includeHubspot']) {
        $fields[] = array_merge(
            getHubSpotForm(),
            [
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'actionType',
                            'operator' => '==',
                            'value' => 'hubspot',
                        ],
                    ],
                ],
            ]
        );
    }

    return $fields;
}

function getMedia($default = 'none', $choicesFilter = []): array
{
    $choices = [
        'none' => __('None', 'flynt'),
        'image' => __('Image', 'flynt'),
        'video' => __('Video', 'flynt'),
        'gravityForm' => __('Gravity Form', 'flynt'),
        'embed' => __('Embed', 'flynt'),
        'hubspot' => __('HubSpot Form', 'flynt'),
        'calendly' => __('Calendly', 'flynt'),
    ];
    if (!empty($choicesFilter)) {
        $choices = array_intersect_key($choices, array_flip($choicesFilter));
    }
    return [
        [
            'label' => __('Media Content', 'flynt'),
            'name' => 'mediaType',
            'type' => 'button_group',
            'choices' => $choices,
            'default_value' => $default,
        ],
        [
            'label' => __('Image', 'flynt'),
            'name' => 'image',
            'type' => 'image',
            'instructions' => __('', 'flynt'),
            'preview_size' => 'medium',
            'return_format' => 'array',
            'mime_types' => 'jpg,jpeg,png,webp',
            'required' => 1,
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
        array_merge(
            getHubSpotForm(),
            [
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'mediaType',
                            'operator' => '==',
                            'value' => 'hubspot',
                        ],
                    ],
                ],
            ]
        ),
        [
            'label' => __('Calendly', 'flynt'),
            'name' => 'calendly',
            'type' => 'group',
            'layout' => 'block',
            'conditional_logic' => [
                [
                    [
                        'fieldPath' => 'mediaType',
                        'operator' => '==',
                        'value' => 'calendly',
                    ],
                ],
            ],
            'sub_fields' => [
                [
                    'label' => __('Scheduling URL', 'flynt'),
                    'name' => 'url',
                    'type' => 'url',
                    'required' => 1,
                ],
                [
                    'label' => __('Prefill from page query params', 'flynt'),
                    'name' => 'prefillFromQuery',
                    'type' => 'true_false',
                    'ui' => 1,
                    'default_value' => 1,
                    'wrapper' => ['width' => 33],
                ],
            ],
        ],
        array_merge(
            getVideo(),
            [
                'conditional_logic' => [
                    [
                        [
                            'fieldPath' => 'mediaType',
                            'operator' => '==',
                            'value' => 'video',
                        ],
                    ],
                ],
            ]
        ),
        [
            'label' => __('Embed', 'flynt'),
            'name' => 'embed',
            'type' => 'textarea',
            'required' => 1,
            'conditional_logic' => [
                [
                    [
                        'fieldPath' => 'mediaType',
                        'operator' => '==',
                        'value' => 'embed',
                    ],
                ],
            ],
        ],
    ];
}

function getVideo(): array
{
    return [
        'label' => __('Video', 'flynt'),
        'name' => 'video',
        'type' => 'group',
        'layout' => 'block',
        'sub_fields' => [
            [
                'label' => __('Poster Image', 'flynt'),
                'instructions' => __('Image-Format: JPG, PNG, SVG, WebP. Aspect Ratio: 16:9. Recommended Size: 1920px × 1080px.', 'flynt'),
                'name' => 'posterImage',
                'type' => 'image',
                'preview_size' => 'medium',
                'mime_types' => 'jpg,jpeg,png,svg,webp',
                'required' => 1,
            ],
            [
                'label' => __('Video', 'flynt'),
                'name' => 'oembed',
                'type' => 'oembed',
                'required' => 1,
                'videoParams' => [
                    'autoplay' => 1,
                ]
            ]
        ]
    ];
}

function getFeatures(): array
{
    return [
        'label' => __('Features', 'flynt'),
        'name' => 'features',
        'type' => 'repeater',
        'layout' => 'table',
        'button_label' => __('Add Feature', 'flynt'),
        'sub_fields' => [
            getIcon(),
            [
                'label' => __('Label', 'flynt'),
                'name' => 'label',
                'type' => 'text',
                'wrapper' => ['width' => 100],
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
            'checkGreen',
            'email',
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
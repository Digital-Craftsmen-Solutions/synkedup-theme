<?php

namespace Flynt\Components\BlogPostFooter;

use Flynt\Utils\Options;
use Flynt\Components;


Options::addGlobal('BlogPostFooter', [
    [
        'label' => __('', 'flynt'),
        'name' => 'blogFooterComponent',
        'instructions' => __('Select a reusable component to be used as a footer the blog page and blog posts.', 'flynt'),
        'type' => 'flexible_content',
        'required' => 1,
        'min' => 1,
        'max' => 2,
        'button_label' => __('Add Component', 'flynt'),
        'layouts' => [
            [
                'name' => 'ReusableComponent',
                'label' => sprintf('%1$s <i class="dashicons dashicons-controls-repeat"></i>', __('Reusable', 'flynt')),
                'sub_fields' => [
                    [
                        'label' => __('Select Reusable Component', 'flynt'),
                        'name' => 'reusableComponent',
                        'type' => 'post_object',
                        'post_type' => [
                            'reusable-components'
                        ],
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 1,
                        'required' => 1,
                        'return_format' => 'object',
                    ],
                ],
            ]
        ],
    ],
]);

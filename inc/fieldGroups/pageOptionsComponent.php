<?php

namespace Flynt\FieldGroups;

use ACFComposer\ACFComposer;
use Flynt\FieldVariables;

add_action('init', function () {
  ACFComposer::registerFieldGroup([
    'name' => 'pageOptionsSidebar',
    'title' => __('Page Options', 'flynt'),
    'position' => 'side', // puts it in the right sidebar meta box
    'style' => 'default',
    'menu_order' => 0,
    'fields' => [
      [
        'label' => __('Use Slim Header & Footer', 'flynt'),
        'name' => 'useSlimHeaderFooter',
        'type' => 'true_false',
        'ui' => 1,
        'default_value' => 0,
      ],
      FieldVariables\getJsonLd(),
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'page',
        ],
      ],
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'feature',
        ],
      ],
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'partner',
        ],
      ],
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'competitor',
        ],
      ],
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'industry',
        ],
      ],
    ]
  ]);
});
<?php

use ACFComposer\ACFComposer;
use Flynt\Components;
use Flynt\Utils\Options;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'featureComponents',
    'title' => __('Feature Components', 'flynt'),
    'style' => 'seamless',
    'menu_order' => 1,
    'fields' => [

      [
        'name' => 'pageFeature',
        'label' => __('', 'flynt'),
        'type' => 'group',
        'sub_fields' => [
          Components\PageFeature\getACFLayout(),
        ]
      ],
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'feature'
        ],
      ]
    ]
  ]);
});


<?php

use ACFComposer\ACFComposer;
use Flynt\Components;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'industryComponents',
    'title' => __('Industry Components', 'flynt'),
    'style' => 'seamless',
    'menu_order' => 1,
    'fields' => [
      [
        'name' => 'pageIndustry',
        'label' => __('', 'flynt'),
        'type' => 'group',
        'sub_fields' => [
          Components\PageIndustry\getACFLayout(),
        ]
      ],
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'industry'
        ],
      ]
    ]
  ]);
});


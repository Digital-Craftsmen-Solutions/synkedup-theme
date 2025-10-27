<?php

use ACFComposer\ACFComposer;
use Flynt\Components;
use Flynt\Utils\Options;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'competitorComponents',
    'title' => __('Competitor Components', 'flynt'),
    'style' => 'seamless',
    'menu_order' => 1,
    'fields' => [

      [
        'name' => 'pageCompetitor',
        'label' => __('', 'flynt'),
        'type' => 'group',
        'sub_fields' => [
          Components\PageCompetitor\getACFLayout(),
        ]
      ],
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'competitor'
        ],
      ]
    ]
  ]);
});


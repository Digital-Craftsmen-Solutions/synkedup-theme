<?php

use ACFComposer\ACFComposer;
use Flynt\Components;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'partnerComponents',
    'title' => __('Partner Components', 'flynt'),
    'style' => 'seamless',
    'menu_order' => 1,
    'fields' => [

      [
        'name' => 'pagePartner',
        'label' => __('', 'flynt'),
        'type' => 'group',
        'sub_fields' => [
          Components\PagePartner\getACFLayout(),
        ]
      ],
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'partner'
        ],
      ]
    ]
  ]);
});


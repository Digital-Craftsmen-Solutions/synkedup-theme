<?php

use ACFComposer\ACFComposer;
use Flynt\Components;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'reusableBlocks',
    'title' => __('Reusable Blocks', 'flynt'),
    'style' => 'seamless',
    'menu_order' => 1,
    'fields' => [
      [
        'name' => 'reusableBlocks',
        'label' => __('Reusable Blocks', 'flynt'),
        'type' => 'flexible_content',
        'button_label' => __('Add Block', 'flynt'),
        'layouts' => [
          Components\BlockCtaButtons\getACFLayout(),
          Components\BlockHubspotForm\getACFLayout(),


        ],
      ]
    ],
    'location' => [
      [
        [
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'reusable-blocks'
        ],
      ]
    ]
  ]);
});

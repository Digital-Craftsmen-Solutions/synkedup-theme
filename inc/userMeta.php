<?php

namespace Flynt\UserMeta;

use ACFComposer\ACFComposer;

add_action('init', function () {
  ACFComposer::registerFieldGroup([
    'name' => 'userMeta',
    'title' => __('Author Meta', 'flynt'),
    'style' => 'default',
    'fields' => [
      [
        'label' => __('Title', 'flynt'),
        'name' => 'authorTitle',
        'type' => 'text',
      ],
      [
        'label' => __('Bio', 'flynt'),
        'name' => 'authorBio',
        'type' => 'textarea',
      ],
      [
        'label' => __('Subscribe Link', 'flynt'),
        'name' => 'authorSubscribeLink',
        'type' => 'url',
      ],
    ],
    'location' => [
      [
        [
          'param' => 'user_form',
          'operator' => '==',
          'value' => 'all',
        ],
      ],
    ],
  ]);
});


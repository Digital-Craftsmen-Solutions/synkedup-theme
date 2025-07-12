<?php

use ACFComposer\ACFComposer;

add_action('Flynt/afterRegisterComponents', function (): void {
  ACFComposer::registerFieldGroup([
    'name' => 'menuItemFields',
    'title' => __('Menu Item Fields', 'flynt'),
    'style' => 'seamless',
    'fields' => [
      [
        'label' => __('Icon', 'flynt'),
        'name' => 'icon',
        'type' => 'select',
        'choices' => [
          'menu' => 'Menu',
          'close' => 'Close',
          'search' => 'Search',
          'chevron-down' => 'Chevron Down',
          'user' => 'User',
          'home' => 'Home',
          'settings' => 'Settings',
          'arrow-right' => 'Arrow Right',
          'arrow-left' => 'Arrow Left',
          // Add more as needed
        ],
        'allow_null' => true,
        'ui' => true,
        'return_format' => 'value',
        'wrapper' => ['width' => '50'],
      ],
    ],
    'location' => [
      [
        [
          'param' => 'nav_menu_item',
          'operator' => '==',
          'value' => 'all',
        ],
      ],
    ],
  ]);
});
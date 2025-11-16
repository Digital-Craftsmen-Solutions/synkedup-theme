<?php

use ACFComposer\ACFComposer;
use Flynt\FieldVariables;

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
        'choices' => FieldVariables\getIconChoices(),
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
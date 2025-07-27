<?php


add_filter('acf/load_field/name=gravityForm', function ($field) {
  if (!class_exists('GFAPI')) {
    return $field;
  }

  $forms = \GFAPI::get_forms();
  $choices = [];

  foreach ($forms as $form) {
    $choices[$form['id']] = $form['title'];
  }

  $field['choices'] = $choices;

  return $field;
});

add_filter('Flynt/addComponentData', function (array $data): array {

  $data['twc'] = [
    'section' => 'tw-section',
  ];

  return $data;
});
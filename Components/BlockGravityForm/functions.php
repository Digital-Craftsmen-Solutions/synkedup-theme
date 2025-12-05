<?php
namespace Flynt\Components\BlockGravityForm;

add_filter('Flynt/addComponentData?name=BlockGravityForm', function (array $data): array {

  $model = [
    'gravityForm' => $data['gravityForm'],
    'options' => $data['options'] ?? [],
  ];


  return ['model' => $model];
});

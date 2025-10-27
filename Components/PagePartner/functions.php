<?php

namespace Flynt\Components\PagePartner;

use Flynt\FieldVariables;
use Flynt\Components;
use Flynt\Utils\Breadcrumbs;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=PagePartner', function (array $data): array {

  $hero = [
    'heading' => $data['hero']['heading'],
    'mediaType' => $data['hero']['mediaType'],
    'image' => $data['hero']['image'],
    'mobileImage' => $data['hero']['mediaType'] === 'image' && !empty($data['hero']['mobileImage']) ? $data['hero']['mobileImage'] : null,
    'action' => [
      'actionType' => $data['hero']['actionType'],
      'ctaButtons' => $data['hero']['actionType'] == 'buttons' ? [
        'primaryButton' => $data['hero']['ctaButtons']['primaryButton'],
        'secondaryButton' => $data['hero']['ctaButtons']['secondaryButton']
      ] : null,
    ],
  ];
  $model = [
    'hero' => $hero,
    'partnerContent' => $data['partnerContent'],
    'partnerTopComponents' => $data['partnerTopComponents'] ?? [],
    'partnerBottomComponents' => $data['partnerBottomComponents'] ?? [],
  ];
  return ['model' => $model];
});


function getACFLayout(): array
{
  return [
    [
      'name' => 'hero',
      'label' => __('Hero', 'flynt'),
      'type' => 'group',
      'sub_fields' => [
        FieldVariables\getHeading('h1'),
        FieldVariables\getMedia('none', ['none', 'image']),
        FieldVariables\getAction(),
      ]
    ],
    [
      'name' => 'partnerContent',
      'label' => __('Content', 'flynt'),
      'type' => 'flexible_content',
      'button_label' => __('Add Section', 'flynt'),
      'layouts' => [
        Components\SectionFeatureBlock\getACFLayout(),
      ],
    ],
  ];
}

Options::addGlobal('PagePartner', [
  [
    'label' => __('Bottom Sections', 'flynt'),
    'name' => 'partnerBottomComponents',
    'type' => 'flexible_content',
    'button_label' => __('Add Component', 'flynt'),
    'layouts' => [
      [
        'name' => 'ReusableComponent',
        'label' => sprintf('%1$s <i class="dashicons dashicons-controls-repeat"></i>', __('Reusable', 'flynt')),
        'sub_fields' => [
          [
            'label' => __('Select Reusable Component', 'flynt'),
            'name' => 'reusableComponent',
            'type' => 'post_object',
            'post_type' => [
              'reusable-components'
            ],
            'allow_null' => 0,
            'multiple' => 0,
            'ui' => 1,
            'required' => 1,
            'return_format' => 'object',
          ],
        ],
      ]
    ],
  ],
]);

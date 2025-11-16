<?php

namespace Flynt\Components\PageCompetitor;

use Flynt\FieldVariables;
use Flynt\Components;
use Flynt\Utils\Breadcrumbs;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=PageCompetitor', function (array $data): array {
  $breadcrumbs = Breadcrumbs::get();
  $competitorsLink = [
    'label' => __('Competitors', 'flynt'),
    'url' => '/competitors/',
    'icon' => null,
    'isCurrent' => false,
  ];

  array_splice($breadcrumbs, 1, 0, [$competitorsLink]);

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
    'breadcrumbs' => [
      'items' => $breadcrumbs,
    ],
  ];
  $model = [
    'hero' => $hero,
    'competitorContent' => $data['competitorContent'],
    'competitorBottomComponents' => $data['competitorBottomComponents'] ?? [],
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
      'name' => 'competitorContent',
      'label' => __('Content', 'flynt'),
      'type' => 'flexible_content',
      'button_label' => __('Add Section', 'flynt'),
      'layouts' => [
        Components\SectionFeatureBlock\getACFLayout(),
      ],
    ],
  ];
}

Options::addGlobal('PageCompetitor', [
  [
    'label' => __('Bottom Sections', 'flynt'),
    'name' => 'competitorBottomComponents',
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

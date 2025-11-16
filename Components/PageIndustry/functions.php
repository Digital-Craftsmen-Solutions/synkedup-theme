<?php

namespace Flynt\Components\PageIndustry;

use Flynt\FieldVariables;
use Flynt\Components;
use Flynt\Utils\Breadcrumbs;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=PageIndustry', function (array $data): array {
  $breadcrumbs = Breadcrumbs::get();
  $industriesLink = [
    'label' => __('Industries', 'flynt'),
    'url' => '/industries/',
    'icon' => null,
    'isCurrent' => false,
  ];

  array_splice($breadcrumbs, 1, 0, [$industriesLink]);

  $hero = [
    'backgroundImage' => $data['hero']['backgroundImage'],
    'heading' => $data['hero']['heading'],
    'action' => [
      'actionType' => $data['hero']['actionType'],
      'ctaButtons' => $data['hero']['actionType'] == 'buttons' ? [
        'primaryButton' => $data['hero']['ctaButtons']['primaryButton'],
        'secondaryButton' => $data['hero']['ctaButtons']['secondaryButton']
      ] : null,
      'reusable' => $data['hero']['actionType'] == 'reusable' ? $data['hero']['reusable'] : null,
    ],
    'breadcrumbs' => [
      'items' => $breadcrumbs,
    ],
  ];
  $model = [
    'hero' => $hero,
    'industryContent' => $data['industryContent'],
    'industryTopComponents' => $data['industryTopComponents'] ?? [],
    'industryBottomComponents' => $data['industryBottomComponents'] ?? [],
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
        [
          'label' => __('Background Image', 'flynt'),
          'name' => 'backgroundImage',
          'type' => 'image',
          'instructions' => __('Optional image.', 'flynt'),
          'preview_size' => 'medium',
          'return_format' => 'array',
          'mime_types' => 'jpg,jpeg,png,webp',
          'wrapper' => ['width' => 100],
        ],
        FieldVariables\getHeading('h1'),
        FieldVariables\getAction(['includeReusable' => true]),
      ]
    ],
    [
      'name' => 'industryContent',
      'label' => __('Content', 'flynt'),
      'type' => 'flexible_content',
      'button_label' => __('Add Section', 'flynt'),
      'layouts' => [
        Components\SectionFeatureBlock\getACFLayout(),
        Components\SectionAccordion\getACFLayout(),

      ],
    ],
  ];
}

Options::addGlobal('PageIndustry', [
  [
    'label' => __('Bottom Sections', 'flynt'),
    'name' => 'industryBottomComponents',
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

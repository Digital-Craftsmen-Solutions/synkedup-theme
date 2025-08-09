<?php

namespace Flynt\Components\SectionAccordion;

use Flynt\FieldVariables;


add_filter('Flynt/addComponentData?name=SectionAccordion', function (array $data): array {
    $model = [
        'heading' => $data['heading'] ?? [],
        'accordion' => [
            'items' => array_map(function ($item, $index) {
                return [
                    'id' => !empty($item['id']) ? $item['id'] : uniqid('accordion_' . $index . '_'),
                    'heading' => $item['heading'] ?? '',
                    'contentHtml' => $item['contentHtml'] ?? '',
                    'expanded' => !empty($item['expanded']),
                ];
            }, $data['accordion']['items'] ?? [], array_keys($data['accordion']['items'] ?? [])),
        ],
        'options' => $data['options'] ?? [],
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionAccordion',
        'label' => __('Section: Accordion', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading(),
            [
                'label' => __('Accordion', 'flynt'),
                'name' => 'accordion',
                'type' => 'group',
                'layout' => 'block',
                'sub_fields' => [
                    [
                        'label' => __('Items', 'flynt'),
                        'name' => 'items',
                        'type' => 'repeater',
                        'layout' => 'block',
                        'button_label' => __('Add Accordion Item', 'flynt'),
                        'sub_fields' => [
                            [
                                'label' => __('Heading', 'flynt'),
                                'name' => 'heading',
                                'type' => 'text',
                                'required' => 1,
                                'wrapper' => ['width' => 80],
                            ],
                            [
                                'label' => __('Anchor Id', 'flynt'),
                                'name' => 'id',
                                'type' => 'text',
                                'wrapper' => ['width' => 20],
                            ],
                            [
                                'label' => __('Content', 'flynt'),
                                'name' => 'contentHtml',
                                'type' => 'wysiwyg',
                                'media_upload' => 0,
                                'delay' => 0,
                                'required' => 1,
                            ],
                        ],
                    ],
                ],
            ],
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    FieldVariables\getTheme(),
                    [
                        'label' => __('Keep Open?', 'flynt'),
                        'name' => 'keepOpen',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1
                    ]
                ],
            ],
        ],
    ];
}
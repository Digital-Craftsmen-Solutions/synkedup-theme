<?php

namespace Flynt\Components\SectionAccordion;

use Flynt\FieldVariables;


add_filter('Flynt/addComponentData?name=SectionAccordion', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'accordion' => [
            'items' => array_map(function ($item, $index) {
                return [
                    'id' => !empty($item['id']) ? $item['id'] : uniqid('accordion_' . $index . '_'),
                    'heading' => $item['heading'] ?? '',
                    'contentHtml' => $item['contentHtml'] ?? '',
                    'expanded' => !empty($item['expanded']),
                ];
            }, $data['accordion']['items'] ?: [], array_keys($data['accordion']['items'] ?: [])),
        ],
        'options' => $data['options'] ?: [],
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
            FieldVariables\getAccordion(),
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
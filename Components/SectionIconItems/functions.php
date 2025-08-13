<?php

namespace Flynt\Components\SectionIconItems;

use Flynt\FieldVariables;


add_filter('Flynt/addComponentData?name=SectionIconItems', function (array $data): array {
    $model = [

        'options' => $data['options'] ?: []
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'SectionIconItems',
        'label' => __('Section: Icon Items', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
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
                    FieldVariables\getTheme()
                ],
            ],
        ],
    ];
}
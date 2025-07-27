<?php

namespace Flynt\Components\SectionCompanyLogos;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionCompanyLogos', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'logos' => array_map(function ($logo) {
            return $logo;
        }, $data['logos'] ?? []),
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionCompanyLogos',
        'label' => __('Section: Company Logos', 'flynt'),
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
                'label' => __('Logos', 'flynt'),
                'name' => 'logos',
                'instructions' => __('Image-Format: JPG, PNG, WebP.', 'flynt'),
                'type' => 'gallery',
                'min' => 2,
                'preview_size' => 'medium',
                'mime_types' => 'jpg,jpeg,png,webp',
                'required' => 1
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
<?php

namespace Flynt\Components\BlockVideoOembed;

use Flynt\FieldVariables;
use Flynt\Utils\Oembed;
use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=BlockVideoOembed', function (array $data): array {
    $data['oembed'] = Oembed::setSrcAsDataAttribute(
        $data['oembed'] ?? '',
        [
            'autoplay' => 'true'
        ]
    );

    return $data;
});

function getACFLayout(): array
{
    return [
        'name' => 'blockVideoOembed',
        'label' => __('Block: Video', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0
            ],
            [
                'label' => __('Poster Image', 'flynt'),
                'instructions' => __('Image-Format: JPG, PNG, SVG, WebP. Aspect Ratio: 16:9. Recommended Size: 1920px × 1080px.', 'flynt'),
                'name' => 'posterImage',
                'type' => 'image',
                'preview_size' => 'medium',
                'mime_types' => 'jpg,jpeg,png,svg,webp',
                'required' => 1,
            ],
            [
                'label' => __('Video', 'flynt'),
                'name' => 'oembed',
                'type' => 'oembed',
                'required' => 1,
                'videoParams' => [
                    'autoplay' => 1,
                ]
            ],
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    FieldVariables\getTheme(),
                    FieldVariables\getSize()
                ]
            ]
        ]
    ];
}


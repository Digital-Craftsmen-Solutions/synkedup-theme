<?php

namespace Flynt\Components\SectionTeam;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionTeam', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'team' => array_map(function ($team) {
            return [
                'name' => $team['name'],
                'role' => $team['role'],
                'image' => $team['image'],
            ];
        }, $data['team'] ?: []),
        'options' => $data['options']
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionTeam',
        'label' => __('Section: Team Members', 'flynt'),
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
                'label' => __('Team Members', 'flynt'),
                'name' => 'team',
                'type' => 'repeater',
                'layout' => 'table',
                'button_label' => __('Add Team Member', 'flynt'),
                'sub_fields' => [
                    [
                        'label' => __('Name', 'flynt'),
                        'name' => 'name',
                        'type' => 'text',
                        'wrapper' => ['width' => 30],
                    ],
                    [
                        'label' => __('Role', 'flynt'),
                        'name' => 'role',
                        'type' => 'text',
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Image', 'flynt'),
                        'name' => 'image',
                        'type' => 'image',
                        'return_format' => 'array',
                        'preview_size' => 'thumbnail',
                        'mime_types' => 'jpg,jpeg,png,webp,svg',
                        'required' => 0,
                        'wrapper' => ['width' => 30],
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

                ],
            ],
        ],
    ];
}
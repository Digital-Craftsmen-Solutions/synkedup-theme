<?php

namespace Flynt\Components\SectionNotFound;

use Flynt\Utils\Options;

add_filter('Flynt/addComponentData?name=SectionNotFound', function (array $data): array {
    $model = [
        'heading' => [
            'before' => 'Not Found',
            'description' => 'The page you are looking for does not exist.',
            'type' => 'h1',
        ],
        'action' => [
            'actionType' => 'buttons',
            'ctaButtons' => [
                'secondaryButton' => [
                    'title' => 'Go to Homepage',
                    'url' => home_url(),
                ],
            ],
        ],
        'options' => [
            'theme' => 'dark',
        ],
    ];

    return ['model' => $model];
});


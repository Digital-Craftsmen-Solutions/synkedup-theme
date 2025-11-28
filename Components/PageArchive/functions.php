<?php

namespace Flynt\Components\PageArchive;

use Timber\Timber;

add_filter('Flynt/addComponentData?name=PageArchive', function (array $data): array {

    $hero = [
        'heading' => [
            'before' => get_the_archive_title(),
        ],
    ];

    $author = Timber::get_user(get_queried_object_id());
    if (is_search()) {
        $hero['heading']['before'] = __('Search Results', 'flynt');
    } else if ($author) {
        $hero['heading']['before'] = $author->display_name;
        $hero['heading']['description'] = '<p class="text-xl">' . $author->meta('authorTitle') . '</p><p>' . $author->meta('authorBio') . '</p>';
        $hero['heading']['mediaType'] = 'image';
        $hero['heading']['image'] = [
            'src' => $author->avatar(['size' => 300]),
            'alt' => $author->name,
        ];
        if ($author->meta('authorSubscribeLink')) {
            $hero['action'] = [
                'actionType' => 'buttons',
                'ctaButtons' => [
                    'secondaryButton' => [
                        'title' => 'Subscribe',
                        'url' => $author->meta('authorSubscribeLink'),
                        'target' => '_blank',
                    ],
                ],
            ];
        }
        if ($author->avatar()) {
            $hero['mediaType'] = 'image';
            $hero['image'] = [
                'src' => $author->avatar(['size' => 192]),
                'alt' => $author->name,
                'class' => 'author-thumbnail',
            ];
        }
    }

    $model = [
        'hero' => $hero,
    ];

    return ['model' => $model];
});

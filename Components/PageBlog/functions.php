<?php

namespace Flynt\Components\PageBlog;

use Timber\Timber;
use Flynt\Utils\Breadcrumbs;

\Flynt\SchemaGenerator\registerSchemaGenerator(
    'post',
    'Components/Schema/Partials/_post.twig'
);

add_filter('Flynt/addComponentData?name=PageBlog', function (array $data): array {
    $post = Timber::get_post();
    $author = $post->author();

    $breadcrumbs = [
        [
            'label' => __('Home', 'flynt'),
            'url' => home_url('/'),
            'icon' => 'home',
            'isCurrent' => is_front_page(),
        ],
        [
            'label' => __('Blog', 'flynt'),
            'url' => '/blog/',
            'icon' => null,
            'isCurrent' => false,
        ],
        [
            'label' => $post->categories[0]->name,
            'url' => '/blog/?category=' . $post->categories[0]->slug,
            'icon' => null,
            'isCurrent' => false,
        ],
    ];


    $hero = [
        'heading' => [
            'before' => $post->title,
            'description' => $post->excerpt->read_more(false),
        ],
        'backgroundImage' => $post->thumbnail, // or $post->thumbnail(['size' => 'full'])
        'extraItems' => [
            'items' => [
                [
                    'type' => 'image',
                    'image' => [
                        'src' => $post->author->avatar(['size' => 96]),
                        'alt' => $post->author->name,
                    ],
                    'title' => $post->author->name,
                    'description' => $author->meta('authorTitle'),
                    'link' => $post->author->link,
                ],
                [
                    'title' => 'Last Updated',
                    'description' => $post->modified_date('F j, Y'),
                ],
            ],
        ],
        'breadcrumbs' => [
            'items' => $breadcrumbs,
        ],
    ];

    $carousel = [
        'heading' => [
            'before' => 'Related Articles',
            'type' => 'h3',
        ],
        'actionType' => 'buttons',
        'ctaButtons' => [
            'primaryButton' => null,
            'secondaryButton' => [
                'title' => 'View All',
                'url' => '/blog',
            ],
        ],
    ];

    $model = [
        'hero' => $hero,
        'carousel' => $carousel,
        'content' => $post->content,
        'categories' => $post->categories,
    ];

    return ['model' => $model];
});

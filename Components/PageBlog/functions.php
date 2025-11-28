<?php

namespace Flynt\Components\PageBlog;

use Timber\Timber;

\Flynt\SchemaGenerator\registerSchemaGenerator(
    'post',
    'Components/Schema/Partials/_post.twig'
);

add_filter('Flynt/addComponentData?name=PageBlog', function (array $data): array {
    $post = Timber::get_post();
    $author = $post->author();


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

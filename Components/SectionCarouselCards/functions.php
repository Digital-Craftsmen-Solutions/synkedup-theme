<?php

namespace Flynt\Components\SectionCarouselCards;

use Flynt\FieldVariables;
use Timber\Timber;

const POST_TYPE = 'post';

add_filter('Flynt/addComponentData?name=SectionCarouselCards', function (array $data): array {
    $data['uuid'] ??= wp_generate_uuid4();
    $data['taxonomies'] = $data['taxonomies'] ?: [];
    $data['options']['maxColumns'] = 3;
    $postsPerPage = $data['options']['maxPosts'] ?? 6;

    $posts = Timber::get_posts([
        'post_status' => 'publish',
        'post_type' => POST_TYPE,
        'cat' => implode(',', array_map(function ($taxonomy) {
            return $taxonomy->term_id;
        }, $data['taxonomies'])),
        'posts_per_page' => $postsPerPage + 1,
        'ignore_sticky_posts' => 1,
    ]);

    $postCards = array_slice(array_filter($posts->to_array(), function ($post): bool {
        return $post->ID !== get_the_ID();
    }), 0, $postsPerPage);

    $model = [
        'heading' => $data['heading'],
        'cards' => array_map(function ($card) {
            return [
                'title' => $card->title,
                'subtitle' => $card->subtitle,
                'backgroundImage' => $card->thumbnail,
                'actionButton' => [
                    'title' => $card->title,
                    'url' => $card->link,
                ],
            ];
        }, $postCards),
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
        ],
        'options' => $data['options'] ?: [],
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionCarouselCards',
        'label' => __('Section: Blog Carousel', 'flynt'),
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
                'label' => __('Categories', 'flynt'),
                'instructions' => __('Select 1 or more categories or leave empty to show from all posts.', 'flynt'),
                'name' => 'taxonomies',
                'type' => 'taxonomy',
                'taxonomy' => 'category',
                'field_type' => 'multi_select',
                'allow_null' => 1,
                'multiple' => 1,
                'add_term' => 0,
                'save_terms' => 0,
                'load_terms' => 0,
                'return_format' => 'object'
            ],
            FieldVariables\getAction(),
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
                        'label' => __('Max Posts', 'flynt'),
                        'name' => 'maxPosts',
                        'type' => 'number',
                        'default_value' => 6,
                        'min' => 1,
                        'step' => 1
                    ],
                    [
                        'label' => __('Align', 'flynt'),
                        'name' => 'align',
                        'type' => 'button_group',
                        'choices' => [
                            'left' => __('Left', 'flynt'),
                            'center' => __('Center', 'flynt'),
                        ],
                        'default_value' => 'center',
                    ],
                    [
                        'label' => __('Display', 'flynt'),
                        'name' => 'display',
                        'type' => 'button_group',
                        'choices' => [
                            'imageTop' => __('Image Top', 'flynt'),
                            'imageBottom' => __('Image Bottom', 'flynt'),
                            'imageOverlay' => __('Image Overlay', 'flynt'),
                        ],
                        'default_value' => 'imageTop',
                    ],
                ],
            ],
        ],
    ];
}
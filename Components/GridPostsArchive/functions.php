<?php

namespace Flynt\Components\GridPostsArchive;

use Flynt\FieldVariables;
use Flynt\Utils\Options;
use Timber\Timber;
use Flynt\Components;

const POST_TYPE = 'post';
const FILTER_BY_TAXONOMY = 'category';

add_filter('Flynt/addComponentData?name=GridPostsArchive', function (array $data): array {
    $data['uuid'] ??= wp_generate_uuid4();
    $postType = POST_TYPE;
    $taxonomy = FILTER_BY_TAXONOMY;
    $terms = get_terms([
        'taxonomy' => $taxonomy,
        'hide_empty' => true,
    ]);
    $queriedObject = get_queried_object();
    if (count($terms) > 1) {
        $data['terms'] = array_map(function ($term) use ($queriedObject) {
            $timberTerm = Timber::get_term($term);

            // if ($queriedObject->taxonomy ?? null) {
            //     $timberTerm->isActive = $queriedObject->taxonomy === $term->taxonomy && $queriedObject->term_id === $term->term_id;
            // }
            if (isset($_GET['category'])) {
                $timberTerm->isActive = ($_GET['category'] === $term->slug);
            } else {
                $timberTerm->isActive = false;
            }

            return $timberTerm;
        }, $terms);

        $data['terms'] = array_map(function ($term) {
            return [
                // 'url' => $term->link,
                'url' => get_post_type_archive_link('post') . '?category=' . $term->slug,
                'title' => $term->title,
                'isActive' => $term->isActive,
            ];
        }, $data['terms']);

        // Add item for all posts
        array_unshift($data['terms'], [
            'url' => get_post_type_archive_link($postType),
            'title' => 'All',
            'isActive' => !isset($_GET['category']),
        ]);
    }


    if (is_search()) {
        $data['title'] = __('Search Results', 'flynt');
    } else if (is_home()) {
        $data['isHome'] = true;
        $data['title'] = $queriedObject->post_title ?? get_bloginfo('name');
    } else {
        $data['title'] = get_the_archive_title();
        $data['description'] = get_the_archive_description();
    }

    $data['options'] = [
        'theme' => 'light',
    ];

    return $data;
});


add_action('pre_get_posts', function ($query) {
    if (!is_admin() && $query->is_main_query() && is_home()) {
        if (isset($_GET['category'])) {
            $query->set('category_name', sanitize_text_field($_GET['category']));
        }
    }
});
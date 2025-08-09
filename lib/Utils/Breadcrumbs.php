<?php

namespace Flynt\Utils;

/**
 * Provides a set of methods that are used to modify oembeds.
 */
class Breadcrumbs
{
  /**
   * Returns breadcrumbs for current context.
   * Each item: [
   *   'label' => string,
   *   'url' => string|null,
   *   'icon' => string|null,
   *   'isCurrent' => bool
   * ]
   */
  public static function get(): array
  {
    $breadcrumbs = [];

    // Home
    $breadcrumbs[] = [
      'label' => __('Home', 'flynt'),
      'url' => home_url('/'),
      'icon' => 'home',
      'isCurrent' => is_front_page(),
    ];

    if (is_front_page()) {
      return $breadcrumbs;
    }

    global $post;

    // Example: Category
    if (is_category() || is_single()) {
      $cat = get_the_category();
      if (!empty($cat)) {
        $breadcrumbs[] = [
          'label' => $cat[0]->name,
          'url' => get_category_link($cat[0]->term_id),
          'icon' => null,
          'isCurrent' => false,
        ];
      }
    }

    // Example: Single Post/Page
    if (is_single() || is_page()) {
      $ancestors = get_post_ancestors($post);
      $ancestors = array_reverse($ancestors);
      foreach ($ancestors as $ancestor_id) {
        $ancestor = get_post($ancestor_id);
        $breadcrumbs[] = [
          'label' => $ancestor->post_title,
          'url' => get_permalink($ancestor_id),
          'icon' => null,
          'isCurrent' => false,
        ];
      }
      $breadcrumbs[] = [
        'label' => get_the_title($post),
        'url' => null,
        'icon' => null,
        'isCurrent' => true,
      ];
    }

    // Example: Archive
    if (is_archive() && !is_category()) {
      $breadcrumbs[] = [
        'label' => post_type_archive_title('', false),
        'url' => null,
        'icon' => null,
        'isCurrent' => true,
      ];
    }

    // Example: Search
    if (is_search()) {
      $breadcrumbs[] = [
        'label' => sprintf(__('Search results for "%s"', 'flynt'), get_search_query()),
        'url' => null,
        'icon' => null,
        'isCurrent' => true,
      ];
    }

    // Example: 404
    if (is_404()) {
      $breadcrumbs[] = [
        'label' => __('404 Not Found', 'flynt'),
        'url' => null,
        'icon' => null,
        'isCurrent' => true,
      ];
    }

    return $breadcrumbs;
  }
}

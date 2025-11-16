<?php

namespace Flynt\CustomPostTypes;

add_action('init', function (): void {
  $labels = [
    'name' => _x('Features', 'Post Type General Name', 'flynt'),
    'singular_name' => _x('Feature', 'Post Type Singular Name', 'flynt'),
    'menu_name' => __('Features', 'flynt'),
    'name_admin_bar' => __('Feature', 'flynt'),
    'archives' => __('Feature Archives', 'flynt'),
    'attributes' => __('Feature Attributes', 'flynt'),
    'parent_item_colon' => __('Parent Feature:', 'flynt'),
    'all_items' => __('All Features', 'flynt'),
    'add_new_item' => __('Add New Feature', 'flynt'),
    'add_new' => __('Add New', 'flynt'),
    'new_item' => __('New Feature', 'flynt'),
    'edit_item' => __('Edit Feature', 'flynt'),
    'update_item' => __('Update Feature', 'flynt'),
    'view_item' => __('View Feature', 'flynt'),
    'view_items' => __('View Features', 'flynt'),
    'search_items' => __('Search Features', 'flynt'),
    'not_found' => __('No features found', 'flynt'),
    'not_found_in_trash' => __('No features found in Trash', 'flynt'),
    'featured_image' => __('Feature Image', 'flynt'),
    'set_featured_image' => __('Set feature image', 'flynt'),
    'remove_featured_image' => __('Remove feature image', 'flynt'),
    'use_featured_image' => __('Use as feature image', 'flynt'),
    'items_list' => __('Features list', 'flynt'),
    'items_list_navigation' => __('Features list navigation', 'flynt'),
    'filter_items_list' => __('Filter features list', 'flynt'),
  ];

  $args = [
    'labels' => $labels,
    'supports' => ['title', 'revisions'],
    'hierarchical' => false,
    'capability_type' => 'post',
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_rest' => true,
    'menu_position' => 20,
    'menu_icon' => 'dashicons-awards',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'can_export' => true,
    'has_archive' => false,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'query_var' => true,
    'rewrite' => [
      'slug' => 'features',
      'with_front' => false,
    ],
  ];

  register_post_type('feature', $args);
});

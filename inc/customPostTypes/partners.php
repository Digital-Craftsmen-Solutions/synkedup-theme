<?php

namespace Flynt\CustomPostTypes;

add_action('init', function (): void {
  $labels = [
    'name' => _x('Partners', 'Post Type General Name', 'flynt'),
    'singular_name' => _x('Partner', 'Post Type Singular Name', 'flynt'),
    'menu_name' => __('Partners', 'flynt'),
    'name_admin_bar' => __('Partner', 'flynt'),
    'archives' => __('Partner Archives', 'flynt'),
    'attributes' => __('Partner Attributes', 'flynt'),
    'parent_item_colon' => __('Parent Partner:', 'flynt'),
    'all_items' => __('All Partners', 'flynt'),
    'add_new_item' => __('Add New Partner', 'flynt'),
    'add_new' => __('Add New', 'flynt'),
    'new_item' => __('New Partner', 'flynt'),
    'edit_item' => __('Edit Partner', 'flynt'),
    'update_item' => __('Update Partner', 'flynt'),
    'view_item' => __('View Partner', 'flynt'),
    'view_items' => __('View Partners', 'flynt'),
    'search_items' => __('Search Partners', 'flynt'),
    'not_found' => __('No partners found', 'flynt'),
    'not_found_in_trash' => __('No partners found in Trash', 'flynt'),
    'featured_image' => __('Partner Image', 'flynt'),
    'set_featured_image' => __('Set partner image', 'flynt'),
    'remove_featured_image' => __('Remove partner image', 'flynt'),
    'use_featured_image' => __('Use as partner image', 'flynt'),
    'items_list' => __('Partners list', 'flynt'),
    'items_list_navigation' => __('Partners list navigation', 'flynt'),
    'filter_items_list' => __('Filter partners list', 'flynt'),
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
    'menu_icon' => 'dashicons-groups',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'can_export' => true,
    'has_archive' => false,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'query_var' => true,
    'rewrite' => [
      'slug' => 'partners',
      'with_front' => false,
    ],
  ];

  register_post_type('partner', $args);
});

<?php

namespace Flynt\CustomPostTypes;

add_action('init', function (): void {
  $labels = [
    'name' => _x('Industries', 'Post Type General Name', 'flynt'),
    'singular_name' => _x('Industry', 'Post Type Singular Name', 'flynt'),
    'menu_name' => __('Industries', 'flynt'),
    'name_admin_bar' => __('Industry', 'flynt'),
    'archives' => __('Industry Archives', 'flynt'),
    'attributes' => __('Industry Attributes', 'flynt'),
    'parent_item_colon' => __('Parent Industry:', 'flynt'),
    'all_items' => __('All Industries', 'flynt'),
    'add_new_item' => __('Add New Industry', 'flynt'),
    'add_new' => __('Add New', 'flynt'),
    'new_item' => __('New Industry', 'flynt'),
    'edit_item' => __('Edit Industry', 'flynt'),
    'update_item' => __('Update Industry', 'flynt'),
    'view_item' => __('View Industry', 'flynt'),
    'view_items' => __('View Industries', 'flynt'),
    'search_items' => __('Search Industries', 'flynt'),
    'not_found' => __('No industries found', 'flynt'),
    'not_found_in_trash' => __('No industries found in Trash', 'flynt'),
    'featured_image' => __('Industry Image', 'flynt'),
    'set_featured_image' => __('Set industry image', 'flynt'),
    'remove_featured_image' => __('Remove industry image', 'flynt'),
    'use_featured_image' => __('Use as industry image', 'flynt'),
    'items_list' => __('Industries list', 'flynt'),
    'items_list_navigation' => __('Industries list navigation', 'flynt'),
    'filter_items_list' => __('Filter industries list', 'flynt'),
  ];

  $args = [
    'labels' => $labels,
    'supports' => ['title', 'revisions'],
    'hierarchical' => false,
    'capability_type' => 'page',
    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'show_in_rest' => true,
    'menu_position' => 20,
    'menu_icon' => 'dashicons-admin-page',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'can_export' => true,
    'has_archive' => false,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'query_var' => true,
  ];

  register_post_type('industry', $args);
});

<?php

namespace Flynt\CustomPostTypes;

add_action('init', function (): void {
  $labels = [
    'name' => _x('Reusable Blocks', 'Block Post Type', 'flynt'),
    'singular_name' => _x('Reusable Blocks', 'Block Post Type', 'flynt'),
    'menu_name' => _x('Reusable Blocks', 'Block Post Type', 'flynt'),
    'name_admin_bar' => __('Reusable Blocks', 'flynt'),
    'archives' => __('Reusable Block Archives', 'flynt'),
    'attributes' => __('Reusable Block Attributes', 'flynt'),
    'parent_item_colon' => __('Parent Reusable Block:', 'flynt'),
    'all_items' => __('All Reusable Blocks', 'flynt'),
    'add_new_item' => __('Add New Reusable Blocks', 'flynt'),
    'new_item' => __('New Reusable Blocks', 'flynt'),
    'edit_item' => __('Edit Reusable Blocks', 'flynt'),
    'update_item' => __('Update Reusable Blocks', 'flynt'),
    'view_item' => __('View Reusable Blocks', 'flynt'),
    'view_items' => __('View Reusable Blocks', 'flynt'),
    'search_items' => __('Search Reusable Blocks', 'flynt'),
    'not_found' => __('No reusable Blocks found', 'flynt'),
    'not_found_in_trash' => __('No reusable Blocks found in Trash', 'flynt'),
    'items_list' => __('Reusable Blocks list', 'flynt'),
    'items_list_navigation' => __('Reusable Blocks list navigation', 'flynt'),
    'filter_items_list' => __('Filter reusable Blocks list', 'flynt'),
  ];

  $args = [
    'labels' => $labels,
    'supports' => ['title', 'revisions'],
    'hierarchical' => false,
    'public' => false,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 20,
    'menu_icon' => 'dashicons-controls-repeat',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => false,
    'can_export' => true,
    'has_archive' => false,
    'exclude_from_search' => true,
    'capability_type' => 'page',
    'rewrite' => false
  ];

  register_post_type('reusable-Blocks', $args);
});

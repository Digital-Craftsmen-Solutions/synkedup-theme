<?php

namespace Flynt\CustomPostTypes;

add_action('init', function (): void {
  $labels = [
    'name' => _x('Competitors', 'Post Type General Name', 'flynt'),
    'singular_name' => _x('Competitor', 'Post Type Singular Name', 'flynt'),
    'menu_name' => __('Competitors', 'flynt'),
    'name_admin_bar' => __('Competitor', 'flynt'),
    'archives' => __('Competitor Archives', 'flynt'),
    'attributes' => __('Competitor Attributes', 'flynt'),
    'parent_item_colon' => __('Parent Competitor:', 'flynt'),
    'all_items' => __('All Competitors', 'flynt'),
    'add_new_item' => __('Add New Competitor', 'flynt'),
    'add_new' => __('Add New', 'flynt'),
    'new_item' => __('New Competitor', 'flynt'),
    'edit_item' => __('Edit Competitor', 'flynt'),
    'update_item' => __('Update Competitor', 'flynt'),
    'view_item' => __('View Competitor', 'flynt'),
    'view_items' => __('View Competitors', 'flynt'),
    'search_items' => __('Search Competitors', 'flynt'),
    'not_found' => __('No competitors found', 'flynt'),
    'not_found_in_trash' => __('No competitors found in Trash', 'flynt'),
    'featured_image' => __('Competitor Image', 'flynt'),
    'set_featured_image' => __('Set competitor image', 'flynt'),
    'remove_featured_image' => __('Remove competitor image', 'flynt'),
    'use_featured_image' => __('Use as competitor image', 'flynt'),
    'items_list' => __('Competitors list', 'flynt'),
    'items_list_navigation' => __('Competitors list navigation', 'flynt'),
    'filter_items_list' => __('Filter competitors list', 'flynt'),
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
    'menu_icon' => 'dashicons-shield',
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => true,
    'can_export' => true,
    'has_archive' => false,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'query_var' => true,
    'rewrite' => [
      'slug' => 'competitors',
      'with_front' => false,
    ],
  ];

  register_post_type('competitor', $args);
});

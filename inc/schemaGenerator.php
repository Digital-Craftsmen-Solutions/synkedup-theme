<?php

/**
 * Generates and saves JSON-LD schema for posts.
 */

namespace Flynt\SchemaGenerator;

use Timber\Timber;

/**
 * Generate JSON-LD schema from a Twig template
 *
 * @param int $postId The post ID
 * @param string $templatePath Path to the Twig template (e.g., 'Components/Schema/Partials/_feature.twig')
 * @return string The generated schema
 */
function generateSchema(int $postId, string $templatePath): string
{
    $pageUrl = get_permalink($postId);
    $pageTitle = get_the_title($postId);
    $pageDescription = '';
    if (has_excerpt($postId)) {
        $pageDescription = get_the_excerpt($postId);
    } else {
        $pageDescription = $pageTitle;
    }
    $featuredImage = '';
    if (has_post_thumbnail($postId)) {
        $featuredImage = get_the_post_thumbnail_url($postId, 'large');
    }
    
    $context = [
        'PAGE_URL' => $pageUrl,
        'PAGE_TITLE' => $pageTitle,
        'PAGE_DESCRIPTION' => $pageDescription,
        'FEATURE_IMAGE' => $featuredImage,
    ];
    
    $context = apply_filters('Flynt/SchemaGenerator/context', $context, $postId);
    $schema = Timber::compile($templatePath, $context);
    
    return trim($schema);
}

/**
 * Save JSON-LD schema to post meta when post is saved
 *
 * @param string $postType The post type to hook into
 * @param string $templatePath Path to the Twig template
 */
function registerSchemaGenerator(string $postType, string $templatePath): void
{
    add_action('save_post', function($postId, $post, $update) use ($postType, $templatePath) {
        if ($post->post_type !== $postType) {
            return;
        }
        
        if (wp_is_post_autosave($postId) || wp_is_post_revision($postId)) {
            return;
        }
        
        $jsonLd = generateSchema($postId, $templatePath);
        update_post_meta($postId, 'json_ld', $jsonLd);
    }, 10, 3);
}

// Register schema generator for default WordPress post type
registerSchemaGenerator(
    'post',
    'Components/Schema/Partials/_post.twig'
);

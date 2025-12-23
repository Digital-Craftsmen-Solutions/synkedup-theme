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
    $post = get_post($postId);
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
        'DATE_PUBLISHED' => get_the_date('Y-m-d', $postId),
        'DATE_MODIFIED' => get_the_modified_date('Y-m-d', $postId),
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

/**
 * Regenerate JSON-LD schema for all published posts
 *
 * @param string $postType The post type to regenerate schema for
 * @param string $templatePath Path to the Twig template
 * @return array Array with 'success' count and 'total' count
 */
function regenerateAllSchemas(string $postType, string $templatePath): array
{
    $args = [
        'post_type' => $postType,
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
    ];
    
    $postIds = get_posts($args);
    $successCount = 0;
    
    foreach ($postIds as $postId) {
        try {
            $jsonLd = generateSchema($postId, $templatePath);
            update_post_meta($postId, 'json_ld', $jsonLd);
            $successCount++;
        } catch (\Exception $e) {
            error_log("Failed to generate schema for post {$postId}: " . $e->getMessage());
        }
    }
    
    return [
        'success' => $successCount,
        'total' => count($postIds),
    ];
}

/**
 * Run schema regeneration once on admin load
 */
// add_action('admin_init', function (): void {
//     if (get_transient('schema_regeneration_completed')) {
//         return;
//     }
    
//     $result = regenerateAllSchemas('post', 'Components/Schema/Partials/_post.twig');
    
//     set_transient('schema_regeneration_completed', true, YEAR_IN_SECONDS);
    
//     error_log("Schema regeneration completed: {$result['success']} of {$result['total']} posts updated.");
// });

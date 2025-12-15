<?php

/**
 * Adds a meta box to allow manual editing of the last modified time for blog posts.
 */

namespace Flynt\CustomModifiedDate;

/**
 * Register the meta box for posts only
 */
add_action('add_meta_boxes', function (): void {
    add_meta_box(
        'custom_modified_date',
        'Modified Date',
        __NAMESPACE__ . '\\renderMetaBox',
        'post',
        'side',
        'core'
    );
});

/**
 * Render the meta box content
 *
 * @param \WP_Post $post The current post object
 */
function renderMetaBox(\WP_Post $post): void
{
    wp_nonce_field('custom_modified_date_nonce', 'custom_modified_date_nonce_field');
    
    $currentModified = $post->post_modified;
    
    $datetime = new \DateTime($currentModified);
    $formattedDate = $datetime->format('Y-m-d\TH:i');
    
    echo '<div class="misc-pub-section">';
    echo '<label for="custom_modified_date_input" style="font-weight: 600;">Last Modified Date:</label><br/>';
    echo '<input type="datetime-local" id="custom_modified_date_input" name="custom_modified_date" value="' . esc_attr($formattedDate) . '" style="width: 100%; margin-top: 5px;" />';
    echo '<p class="description" style="margin-top: 8px; margin-bottom: 0;">Override the automatic modified date.</p>';
    echo '</div>';
}

/**
 * Intercept post data before saving to preserve custom modified date
 */
add_filter('wp_insert_post_data', function (array $data, array $postarr): array {
    if ($data['post_type'] !== 'post') {
        return $data;
    }
    
    if (!isset($_POST['custom_modified_date_nonce_field'])) {
        return $data;
    }
    
    if (!wp_verify_nonce($_POST['custom_modified_date_nonce_field'], 'custom_modified_date_nonce')) {
        return $data;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return $data;
    }
    
    if (!empty($_POST['custom_modified_date'])) {
        $customDate = sanitize_text_field($_POST['custom_modified_date']);
        $datetime = new \DateTime($customDate, new \DateTimeZone(wp_timezone_string()));
        $modifiedLocal = $datetime->format('Y-m-d H:i:s');
        $datetime->setTimezone(new \DateTimeZone('UTC'));
        $modifiedGmt = $datetime->format('Y-m-d H:i:s');
        
        $data['post_modified'] = $modifiedLocal;
        $data['post_modified_gmt'] = $modifiedGmt;
    }
    
    return $data;
}, 10, 2);

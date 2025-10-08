<?php
// filepath: inc/PageMetaCopier.php

namespace Flynt\Plugins\PageMetaCopier;

if (!\is_admin()) {
    return;
}

\add_action('admin_menu', __NAMESPACE__ . '\\registerPage');

function registerPage(): void
{
    \add_management_page(
        \__('Copy Page Meta', 'flynt'),
        \__('Copy Page Meta', 'flynt'),
        'manage_options',
        'copy-page-meta',
        __NAMESPACE__ . '\\renderPage'
    );
}

function renderPage(): void
{
    if (!\current_user_can('manage_options')) {
        \wp_die(\__('You do not have sufficient permissions to access this page.', 'flynt'));
    }

    $message = '';
    $messageType = 'updated';

    // Handle form submit
    if (isset($_POST['copy_page_meta_submit'])) {
        \check_admin_referer('copy_page_meta_action', 'copy_page_meta_nonce');

        $sourceId = isset($_POST['source_page']) ? (int) $_POST['source_page'] : 0;
        $targetIds = isset($_POST['target_pages']) ? array_map('intval', (array) $_POST['target_pages']) : [];
        $overwrite = !empty($_POST['overwrite_existing']);

        if ($sourceId <= 0 || empty($targetIds)) {
            $message = \__('Please select a source page and at least one target page.', 'flynt');
            $messageType = 'error';
        } elseif (!\get_post($sourceId)) {
            $message = \__('The selected source page does not exist.', 'flynt');
            $messageType = 'error';
        } else {
            // Hardening: ensure source is a page and user can edit it
            if (\get_post_type($sourceId) !== 'page') {
                $message = \__('Source must be a page.', 'flynt');
                $messageType = 'error';
            } elseif (!\current_user_can('edit_post', $sourceId)) {
                $message = \__('You do not have permission to edit the source page.', 'flynt');
                $messageType = 'error';
            } else {
                // Filter targets: must be pages the user can edit
                $validTargetIds = [];
                foreach ($targetIds as $tid) {
                    $tid = (int) $tid;
                    if (!\get_post($tid)) {
                        continue;
                    }
                    if (\get_post_type($tid) !== 'page') {
                        continue;
                    }
                    if (!\current_user_can('edit_post', $tid)) {
                        continue;
                    }
                    $validTargetIds[] = $tid;
                }

                if (empty($validTargetIds)) {
                    $message = \__('No valid target pages selected that you can edit.', 'flynt');
                    $messageType = 'error';
                } else {
                    $result = processCopy($sourceId, $validTargetIds, $overwrite);
                    $message = \esc_html($result['message']);
                    $messageType = $result['success'] ? 'updated' : 'error';
                }
            }
        }
    }

    $selectedSource = isset($_POST['source_page']) ? (int) $_POST['source_page'] : 0;
    $selectedTargets = isset($_POST['target_pages']) ? array_map('intval', (array) $_POST['target_pages']) : [];
    $overwriteChecked = !empty($_POST['overwrite_existing']);

    $pages = \get_pages([
        'sort_column' => 'post_title',
        'sort_order' => 'ASC',
        'post_status' => ['publish', 'draft', 'pending', 'private']
    ]);

    echo '<div class="wrap">';
    echo '<h1>' . \esc_html__('Copy Page Meta', 'flynt') . '</h1>';

    if (!empty($message)) {
        \printf('<div class="%1$s"><p>%2$s</p></div>', \esc_attr($messageType), $message);
    }

    echo '<form method="post">';
    \wp_nonce_field('copy_page_meta_action', 'copy_page_meta_nonce');

    echo '<p class="description">' . \esc_html__('This tool copies only metadata for:', 'flynt') . ' <code>pageComponents</code> ' . \esc_html__('(including all nested subfields) and', 'flynt') . ' <code>json_ld</code>. ' . \esc_html__('No other meta keys are affected.', 'flynt') . '</p>';

    echo '<table class="form-table" role="presentation">';

    echo '<tr><th scope="row">' . \esc_html__('Source Page', 'flynt') . '</th><td>';
    \wp_dropdown_pages([
        'post_type' => 'page',
        'selected' => $selectedSource,
        'name' => 'source_page',
        'show_option_none' => \__('— Select —', 'flynt'),
        'option_none_value' => '0',
        'sort_column' => 'post_title',
    ]);
    echo '</td></tr>';

    echo '<tr><th scope="row">' . \esc_html__('Target Pages', 'flynt') . '</th><td>';
    echo '<select multiple size="10" name="target_pages[]" style="min-width: 320px;">';
    foreach ($pages as $page) {
        printf(
            '<option value="%1$d" %2$s>%3$s</option>',
            (int) $page->ID,
            \selected(in_array((int) $page->ID, $selectedTargets, true), true, false),
            \esc_html(\get_the_title($page)) . ' (#' . (int) $page->ID . ')'
        );
    }
    echo '</select>';
    echo '<p class="description">' . \esc_html__('Hold Cmd/Ctrl to select multiple targets.', 'flynt') . '</p>';
    echo '</td></tr>';

    echo '<tr><th scope="row">' . \esc_html__('Options', 'flynt') . '</th><td>';
    echo '<label><input type="checkbox" name="overwrite_existing" value="1" ' . \checked($overwriteChecked, true, false) . '> ' . \esc_html__('Overwrite existing values on target', 'flynt') . '</label>';
    echo '</td></tr>';

    echo '</table>';

    echo '<p><button type="submit" name="copy_page_meta_submit" class="button button-primary">' . \esc_html__('Copy Meta', 'flynt') . '</button></p>';

    echo '</form>';
    echo '</div>';
}

function processCopy(int $sourceId, array $targetIds, bool $overwrite): array
{
    // Hardening: ensure source is a page
    if (\get_post_type($sourceId) !== 'page') {
        return [
            'success' => false,
            'message' => \__('Source must be a page.', 'flynt'),
        ];
    }

    $denyList = [
        '_edit_lock',
        '_edit_last',
        '_pingme',
        '_encloseme',
    ];

    $allMeta = \get_post_meta($sourceId);

    // Only keys associated with ACF fields: pageComponents (and nested) and json_ld
    $keys = array_keys($allMeta);
    $keys = array_values(array_filter($keys, function ($k) use ($denyList) {
        if (in_array($k, $denyList, true)) {
            return false;
        }
        if ($k === 'json_ld' || $k === '_json_ld') {
            return true;
        }
        if ($k === 'pageComponents' || $k === '_pageComponents') {
            return true;
        }
        if (\strpos($k, 'pageComponents_') === 0 || \strpos($k, '_pageComponents_') === 0) {
            return true;
        }
        return false;
    }));

    if (empty($keys)) {
        return [
            'success' => false,
            'message' => \__('No matching meta keys found on the source page.', 'flynt')
        ];
    }

    $copiedCount = 0;
    $targetCount = 0;

    foreach ($targetIds as $targetId) {
        // Defense-in-depth: ensure each target is a page the user can edit
        if (!\get_post($targetId) || \get_post_type($targetId) !== 'page') {
            continue;
        }
        if (!\current_user_can('edit_post', $targetId)) {
            continue;
        }
        $targetCount++;

        foreach ($keys as $key) {
            $values = \get_post_meta($sourceId, $key, false);
            if ($values === []) {
                continue;
            }

            if ($overwrite) {
                \delete_post_meta($targetId, $key);
            } elseif (\metadata_exists('post', $targetId, $key)) {
                continue;
            }

            foreach ($values as $v) {
                \add_post_meta($targetId, $key, $v);
                $copiedCount++;
            }
        }
    }

    if ($targetCount === 0) {
        return [
            'success' => false,
            'message' => \__('No valid target pages selected.', 'flynt')
        ];
    }

    return [
        'success' => true,
        'message' => \sprintf(
            \esc_html__('%1$d meta values copied to %2$d target(s).', 'flynt'),
            (int) $copiedCount,
            (int) $targetCount
        )
    ];
}

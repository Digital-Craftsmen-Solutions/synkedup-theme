<?php

namespace Flynt\Components\ReusableBlock;

function getACFLayout(): array
{
    return [
        'name' => 'ReusableBlock',
        'label' => sprintf('%1$s <i class="dashicons dashicons-controls-repeat"></i>', __('Reusable', 'flynt')),
        'sub_fields' => [
            [
                'label' => __('Select Reusable Block', 'flynt'),
                'name' => 'reusableBlock',
                'type' => 'post_object',
                'post_type' => [
                    'reusable-blocks'
                ],
                'allow_null' => 0,
                'multiple' => 0,
                'ui' => 1,
                'required' => 1,
                'return_format' => 'object',
            ],
        ],
    ];
}

function prepareReusableField(array $field, string $postType, string $labelText): array
{
    $reusableAdminLink = admin_url("edit.php?post_type={$postType}");
    $postEditLink = get_edit_post_link($field['value']);
    $postTitle = get_the_title($field['value']);
    $postId = $field['value'] ?: get_the_ID();

    $instructions = sprintf(
        // translators: 1: <a> element 2: label text 3: </a> element
        __('Add %1$s%2$s%3$s.', 'flynt'),
        "<a href='{$reusableAdminLink}' target='_blank' rel='noopener noreferrer'>",
        $labelText,
        "</a>"
    );
    $editLink = sprintf(
        // translators: %s: Link and title of selected reusable-post
        __(' Edit %s.', 'flynt'),
        "<a class='reusable-postLink' data-postId='{$postId}' href='{$postEditLink}' target='_blank' rel='noopener noreferrer'>{$postTitle}</a>"
    );

    if ($field['value']) {
        $instructions .= $editLink;
    } else {
        $instructions .= "<span hidden>{$editLink}</span>";
    }

    $field['instructions'] = $instructions;
    return $field;
}

add_filter('acf/prepare_field/name=reusableBlock', function (array $field): array {
    return prepareReusableField($field, 'reusable-blocks', 'reusable block');
}, 1);

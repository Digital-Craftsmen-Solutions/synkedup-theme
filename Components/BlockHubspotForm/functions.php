<?php

namespace Flynt\Components\BlockHubspotForm;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=BlockHubspotForm', function ($data) {
    // Extract form configuration safely
    $hs = $data['hubspotForm'] ?? null;

    if (empty($hs['portalId']) || empty($hs['formId'])) {
        // No HubSpot form configured
        return [
            'model' => [
                'hubspotForm' => null,
                'options' => [],
            ]
        ];
    }

    // Editor type: new or legacy
    $editor = $hs['editor'] ?? 'legacy';

    // Build redirect rules
    $rules = [];
    if (!empty($hs['redirectRules']) && is_array($hs['redirectRules'])) {
        foreach ($hs['redirectRules'] as $rule) {
            $matchValue = $rule['matchValue'] ?? null;
            $redirectUrl = $rule['redirectUrl'] ?? null;

            if ($matchValue && $redirectUrl) {
                $rules[] = [
                    'field' => $rule['fieldName'] ?? 'email',
                    'value' => $matchValue,
                    'url' => $redirectUrl,
                ];
            }
        }
    }

    // Enqueue HubSpot assets only on the frontend
    if (!is_admin() && function_exists('wp_register_script')) {
        static $legacyLoaded = false;
        static $newLoaded = false;

        if ($editor === 'new' && !$newLoaded) {
            wp_register_script(
                'hubspot-forms-developer',
                'https://js.hsforms.net/forms/embed/developer/21666517.js',
                [],
                null,
                true
            );
            wp_enqueue_script('hubspot-forms-developer');
            $newLoaded = true;
        }

        if ($editor !== 'new' && !$legacyLoaded) {
            wp_register_script(
                'hubspot-forms',
                'https://js.hsforms.net/forms/embed/v2.js',
                [],
                null,
                true
            );
            wp_enqueue_script('hubspot-forms');
            $legacyLoaded = true;
        }
    }

    // Prepare model data
    $model = [
        'hubspotForm' => [
            'editor' => $editor === 'new' ? 'new' : 'legacy',
            'portalId' => $hs['portalId'],
            'formId' => $hs['formId'],
            'redirectRules' => $rules,
        ],
        'options' => $data['options'] ?? [],
    ];

    return ['model' => $model];
});

function getACFLayout()
{
    return [
        'name' => 'blockHubspotForm',
        'label' => 'Block: HubSpot Form',
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHubSpotForm(),
            [
                'label' => __('Options', 'flynt'),
                'name' => 'optionsTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            [
                'label' => '',
                'name' => 'options',
                'type' => 'group',
                'layout' => 'row',
                'sub_fields' => [
                    [
                        'label' => __('Display Inline?', 'flynt'),
                        'name' => 'inline',
                        'type' => 'true_false',
                        'default_value' => 0,
                        'ui' => 1
                    ],
                ],
            ],
        ]
    ];
}

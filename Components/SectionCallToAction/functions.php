<?php

namespace Flynt\Components\SectionCallToAction;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionCallToAction', function (array $data): array {
    $model = [
        'heading' => $data['heading'],
        'action' => [
            'actionType' => $data['actionType'],
            'ctaButtons' => $data['actionType'] == 'buttons' ? [
                'primaryButton' => $data['ctaButtons']['primaryButton'],
                'secondaryButton' => $data['ctaButtons']['secondaryButton']
            ] : null,
            'hubspotForm' => null,
        ],
        'options' => $data['options'] ?: []
    ];

    if ($data['actionType'] === 'hubspot' && !empty($data['hubspotForm'])) {
        $hs = $data['hubspotForm'];
        $editor = $hs['editor'] ?? 'legacy';
        if (!empty($hs['portalId']) && !empty($hs['formId'])) {
            $rules = [];
            if (!empty($hs['redirectRules']) && is_array($hs['redirectRules'])) {
                foreach ($hs['redirectRules'] as $r) {
                    if (!empty($r['matchValue']) && !empty($r['redirectUrl'])) {
                        $rules[] = [
                            'field' => !empty($r['fieldName']) ? $r['fieldName'] : 'email',
                            'value' => $r['matchValue'],
                            'url' => $r['redirectUrl'],
                        ];
                    }
                }
            }
            $model['action']['hubspotForm'] = [
                'editor' => $editor === 'new' ? 'new' : 'legacy',
                'portalId' => $hs['portalId'],
                'formId' => $hs['formId'],
                'redirectRules' => $rules,
            ];
            // Enqueue HubSpot assets when included via partial
            if (!is_admin() && function_exists('wp_register_script')) {
                static $hubspotLegacyDone = false;
                static $hubspotNewDone = false;
                if ($editor === 'new') {
                    if (!$hubspotNewDone) {
                        wp_register_script('hubspot-forms-developer', 'https://js.hsforms.net/forms/embed/developer/21666517.js', [], null, true);
                        wp_enqueue_script('hubspot-forms-developer');
                        $hubspotNewDone = true;
                    }
                } else {
                    if (!$hubspotLegacyDone) {
                        wp_register_script('hubspot-forms', 'https://js.hsforms.net/forms/embed/v2.js', [], null, true);
                        wp_enqueue_script('hubspot-forms');
                        $hubspotLegacyDone = true;
                    }
                }
            }
        }
    }

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionCallToAction',
        'label' => __('Section: Call To Action', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading(),
            FieldVariables\getAction(['includeHubspot' => true, 'includeReusable' => true]),
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
                        'label' => __('Theme', 'flynt'),
                        'name' => 'theme',
                        'type' => 'button_group',
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 0,
                        'ajax' => 0,
                        'choices' => [
                            'light' => __('Light', 'flynt'),
                            'dark' => __('Dark', 'flynt'),
                            'alt' => __('Alternate', 'flynt'),
                        ],
                        'default_value' => 'light',
                    ],
                    [
                        'label' => __('Display', 'flynt'),
                        'name' => 'display',
                        'type' => 'button_group',
                        'choices' => [
                            'full' => __('Full', 'flynt'),
                            'split' => __('Split', 'flynt'),
                        ],
                        'default_value' => 'full',
                        'wrapper' => ['width' => 50],
                    ],
                ],
            ],
        ],
    ];
}

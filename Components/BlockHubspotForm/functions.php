<?php

namespace Flynt\Components\BlockHubspotForm;

if (function_exists('add_filter')) {
    add_filter('Flynt/addComponentData?name=BlockHubspotForm', function ($data) {
        // Normalize props passed via model for server-side includes
        if (!empty($data['model']) && is_array($data['model'])) {
            $model = $data['model'];
            $data['portalId'] = $model['portalId'] ?? $model['portalID'] ?? $model['portal_id'] ?? null;
            $data['formId'] = $model['formId'] ?? $model['formID'] ?? $model['form_id'] ?? null;
        }
        return $data;
    });
}

if (function_exists('add_action')) {
    add_action('wp_enqueue_scripts', function () {
        if (function_exists('wp_register_script') && function_exists('get_template_directory_uri')) {
            wp_register_script('hubspot-forms', 'https://js.hsforms.net/forms/embed/v2.js', [], null, true);
            wp_register_script('flynt-block-hubspot-form', get_template_directory_uri() . '/Components/BlockHubspotForm/script.js', ['hubspot-forms'], null, true);
            if (function_exists('wp_enqueue_script')) {
                wp_enqueue_script('hubspot-forms');
                wp_enqueue_script('flynt-block-hubspot-form');
            }
        }
    });
}

function getACFLayout()
{
    return [
        'name' => 'blockHubspotForm',
        'label' => 'Block: HubSpot Form',
        'sub_fields' => [
            [
                'label' => 'Portal ID',
                'name' => 'portalId',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'label' => 'Form ID',
                'name' => 'formId',
                'type' => 'text',
                'required' => 1,
            ],
        ],
    ];
}

<?php

namespace Flynt\Components\BlockHubspotFormNew;

add_filter('Flynt/addComponentData?name=BlockHubspotFormNew', function ($data) {
    // Expect portalId fixed or passed in model
    if (!empty($data['model']) && is_array($data['model'])) {
        $model = $data['model'];
        $data['formId'] = $model['formId'] ?? $model['formID'] ?? $model['form_id'] ?? null;
    }

    if (function_exists('wp_register_script')) {
        wp_register_script('hubspot-forms-developer', 'https://js.hsforms.net/forms/embed/developer/21666517.js', [], null, true);
    }
    if (function_exists('wp_enqueue_script')) {
        wp_enqueue_script('hubspot-forms-developer');
    }

    return $data;
});

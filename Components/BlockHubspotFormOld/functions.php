<?php

namespace Flynt\Components\BlockHubspotFormOld;


add_filter('Flynt/addComponentData?name=BlockHubspotFormOld', function ($data) {
    // Normalize props when included via a model array
    if (!empty($data['model']) && is_array($data['model'])) {
        $model = $data['model'];
        $data['portalId'] = $model['portalId'] ?? $model['portalID'] ?? $model['portal_id'] ?? null;
        $data['formId'] = $model['formId'] ?? $model['formID'] ?? $model['form_id'] ?? null;
    }

    // Enqueue HubSpot V2 script only when this component is present
    if (function_exists('wp_register_script')) {
        wp_register_script('hubspot-forms', 'https://js.hsforms.net/forms/embed/v2.js', [], null, true);
    }
    if (function_exists('wp_enqueue_script')) {
        wp_enqueue_script('hubspot-forms');
    }

    return $data;
});


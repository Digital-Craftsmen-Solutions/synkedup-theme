<?php

namespace Flynt\Components\BlockHubspotFormNew;

if (function_exists('add_action')) {
    add_action('wp_enqueue_scripts', function () {
        if (!function_exists('wp_register_script')) {
            return;
        }
        // Only enqueue the HubSpot developer embed script; component script.js is handled by Flynt.
        wp_register_script('hubspot-forms-developer-21666517', 'https://js.hsforms.net/forms/embed/developer/21666517.js', [], null, true);
        if (function_exists('wp_enqueue_script')) {
            wp_enqueue_script('hubspot-forms-developer-21666517');
        }
    });
}

<?php

namespace Flynt\Components\BlockHubspotFormNew;

if (function_exists('add_action')) {
    add_action('wp_enqueue_scripts', function () {
        if (!function_exists('wp_register_script') || !function_exists('get_template_directory_uri')) {
            return;
        }
        $base = get_template_directory_uri() . '/Components/BlockHubspotFormNew';
        // Listener must load before the HubSpot embed executes
        wp_register_script('flynt-block-hs-new-listener', $base . '/script.js', [], null, true);
        wp_register_script('hubspot-forms-developer-21666517', 'https://js.hsforms.net/forms/embed/developer/21666517.js', ['flynt-block-hs-new-listener'], null, true);

        if (function_exists('wp_enqueue_script')) {
            wp_enqueue_script('flynt-block-hs-new-listener');
            wp_enqueue_script('hubspot-forms-developer-21666517');
        }
    });
}

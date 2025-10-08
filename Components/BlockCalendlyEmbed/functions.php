<?php

namespace Flynt\Components\BlockCalendlyEmbed;

if (function_exists('add_action')) {
    add_action('wp_enqueue_scripts', function () {
        if (!function_exists('wp_register_script') || !function_exists('get_template_directory_uri')) {
            return;
        }
        // Only enqueue Calendly external assets; component script.js is handled by Flynt.
        wp_register_script('calendly-widget', 'https://assets.calendly.com/assets/external/widget.js', [], null, true);
        if (function_exists('wp_register_style')) {
            wp_register_style('calendly-widget', 'https://assets.calendly.com/assets/external/widget.css', [], null);
        }

        if (function_exists('wp_enqueue_script')) {
            wp_enqueue_script('calendly-widget');
        }
        if (function_exists('wp_enqueue_style')) {
            wp_enqueue_style('calendly-widget');
        }
    });
}

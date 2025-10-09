<?php

namespace Flynt\Components\BlockCalendlyEmbed;

// Enqueue Calendly assets only when this component data is prepared (i.e., component is on the page)
add_filter('Flynt/addComponentData?name=BlockCalendlyEmbed', function ($data) {
    if (function_exists('wp_register_script')) {
        wp_register_script('calendly-widget', 'https://assets.calendly.com/assets/external/widget.js', [], null, true);
    }
    if (function_exists('wp_register_style')) {
        wp_register_style('calendly-widget', 'https://assets.calendly.com/assets/external/widget.css', [], null);
    }
    if (function_exists('wp_enqueue_script')) {
        wp_enqueue_script('calendly-widget');
    }
    if (function_exists('wp_enqueue_style')) {
        wp_enqueue_style('calendly-widget');
    }
    return $data;
});

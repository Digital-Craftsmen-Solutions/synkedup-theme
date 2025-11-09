<?php

namespace Flynt\Components\BlockCalendlyEmbed;

// Enqueue Calendly assets only when this component data is prepared (i.e., component is on the page)
add_filter('Flynt/addComponentData?name=BlockCalendlyEmbed', function ($data) {
    $cd = $data['calendly'];

    if (empty($cd['url'])) {
        return [
            'model' => [
                'calendly' => null,
                'options' => [],
            ]
        ];
    }

    $model = [
        'url' => $cd['url'],
        'prefillFromQuery' => isset($cd['prefillFromQuery']) ? (bool) $cd['prefillFromQuery'] : true,
        'options' => $data['options'] ?? [],
    ];

    if (!is_admin() && function_exists('wp_register_script')) {
        static $enqueued = false;
        if (!$enqueued) {
            wp_register_script('calendly-widget', 'https://assets.calendly.com/assets/external/widget.js', [], null, true);
            if (function_exists('wp_register_style')) {
                wp_register_style('calendly-widget', 'https://assets.calendly.com/assets/external/widget.css', [], null);
            }
            wp_enqueue_script('calendly-widget');
            if (function_exists('wp_enqueue_style')) {
                wp_enqueue_style('calendly-widget');
            }
            $enqueued = true;
        }
    }

    return ['model' => $model];
});

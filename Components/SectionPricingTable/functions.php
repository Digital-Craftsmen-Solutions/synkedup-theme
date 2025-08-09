<?php

namespace Flynt\Components\SectionPricingTable;
use Flynt\Utils\Options;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionPricingTable', function (array $data): array {
    $pricingOptions = \Flynt\Utils\Options::getGlobal('PricingTable');
    $features = [];
    if (!empty($pricingOptions['features']) && is_array($pricingOptions['features'])) {
        foreach ($pricingOptions['features'] as $feature) {
            if (is_array($feature) && !empty($feature['label'])) {
                $features[] = $feature['label'];
            }
        }
    }
    $plans = $data['plans'] ?? [];

    $head = array_merge(
        [['label' => 'Feature', 'key' => 'feature']],
        array_map(function ($plan) {
            return [
                'label' => $plan['name'] ?? '',
                'key' => $plan['name'] ?? '',
            ];
        }, $plans)
    );

    $rows = [];
    foreach ($features as $featureLabel) {
        $row = ['feature' => $featureLabel];
        foreach ($plans as $plan) {
            $value = false;
            if (!empty($plan['planFeatures']) && is_array($plan['planFeatures'])) {
                foreach ($plan['planFeatures'] as $f) {
                    // Match by feature label
                    if (
                        isset($f['planFeature']) &&
                        $f['planFeature'] === $featureLabel
                    ) {
                        $value = !empty($f['text']) ? $f['text'] : true;
                        break;
                    }
                }
            }
            $row[$plan['name']] = $value;
        }
        $rows[] = $row;
    }

    return [
        'model' => [
            'heading' => $data['heading'] ?? [],
            'table' => [
                'head' => $head,
                'rows' => $rows,
            ],
            'options' => $data['options'] ?? [],
        ],
    ];
});

Options::addGlobal('PricingTable', [
    [
        'label' => __('All Features', 'flynt'),
        'name' => 'features',
        'type' => 'repeater',
        'layout' => 'table',
        'button_label' => __('Add Feature', 'flynt'),
        'required' => 1,
        'sub_fields' => [
            [
                'label' => __('Label', 'flynt'),
                'name' => 'label',
                'type' => 'text',
                'required' => 1,
            ],
        ],
    ],
]);


function getACFLayout(): array
{
    return [
        'name' => 'sectionPricingTable',
        'label' => __('Section: Pricing Table', 'flynt'),
        'sub_fields' => [
            [
                'label' => __('Content', 'flynt'),
                'name' => 'contentTab',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ],
            FieldVariables\getHeading(),
            [
                'label' => __('Plans', 'flynt'),
                'name' => 'plans',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => __('Add Plan', 'flynt'),
                'required' => 1,
                'sub_fields' => [
                    [
                        'label' => __('Name', 'flynt'),
                        'name' => 'name',
                        'type' => 'text',
                        'required' => 1,
                    ],
                    [
                        'label' => __('Included Features'),
                        'name' => 'planFeatures',
                        'type' => 'repeater',
                        'layout' => 'table',
                        'instructions' => __('Features included in this plan. Features can be modified in Global Options.'),
                        'button_label' => __('Add Feature', 'flynt'),
                        'sub_fields' => [
                            [
                                'label' => __('Feature'),
                                'name' => 'planFeature',
                                'type' => 'select',
                                'choices' => [], // Dynamically populated from features repeater (see below)
                                'ui' => 1,
                                'wrapper' => ['width' => 60],
                            ],
                            [
                                'label' => __('Text Override'),
                                'name' => 'text',
                                'type' => 'text',
                                'wrapper' => ['width' => 40],
                                'instructions' => __('Optional. Show this text instead of a checkmark '),
                            ],
                        ],
                    ],
                ],
            ],
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
                    FieldVariables\getTheme(),
                ],
            ],
        ],
    ];
}

add_filter('acf/load_field/name=planFeature', function ($field) {

    $options = Options::getGlobal('PricingTable');
    $features = $options['features'] ?? [];
    $choices = [];
    if (is_array($features)) {
        foreach ($features as $feature) {
            if (!empty($feature['label'])) {
                $choices[$feature['label']] = $feature['label'];
            }
        }
    }
    $field['choices'] = $choices;
    return $field;
});
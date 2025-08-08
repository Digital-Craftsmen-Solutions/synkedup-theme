<?php

namespace Flynt\Components\SectionPricingCards;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=SectionPricingCards', function (array $data): array {
    $model = [
        'heading' => isset($data['heading']) ? $data['heading'] : null,
        'labelMonth' => $data['labelMonth'],
        'labelYear' => $data['labelYear'],
        'defaultPeriod' => $data['defaultPeriod'] ?? 'month',
        'periodSwitch' => [
            'id' => 'pricing-switch-' . uniqid(),
            'labelOff' => 'Monthly',
            'labelOn' => 'Annually',
            'labelOnBadge' => $data['labelOnSwitchBadge'],
        ],
        'cards' => array_map(function ($card) {
            return [
                'icon' => $card['icon'],
                'title' => $card['title'],
                'description' => $card['description'],
                'priceMonth' => $card['priceMonth'],
                'priceYear' => $card['priceYear'],
                'extraCost' => $card['extraCost'],
                'badge' => $card['badge'],
                'features' => $card['features'] ?? [],
                'actionButton' => $card['action'],
            ];
        }, $data['cards'] ?? []),
        'options' => $data['options'] ?? [],
    ];

    return ['model' => $model];
});

function getACFLayout(): array
{
    return [
        'name' => 'sectionPricingCards',
        'label' => __('Section: Pricing Cards', 'flynt'),
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
                'label' => __('Label Month', 'flynt'),
                'name' => 'labelMonth',
                'type' => 'text',
                'default_value' => '/month',
                'required' => 1,
                'wrapper' => ['width' => 30],
            ],
            [
                'label' => __('Label Annual', 'flynt'),
                'name' => 'labelYear',
                'type' => 'text',
                'default_value' => '/month billed annually',
                'required' => 1,
                'wrapper' => ['width' => 30],
            ],
            [
                'label' => __('Label Annual Saving', 'flynt'),
                'name' => 'labelOnSwitchBadge',
                'type' => 'text',
                'default_value' => 'Save 10%',
                'required' => 0,
                'wrapper' => ['width' => 40],
            ],
            [
                'label' => __('Pricing Cards', 'flynt'),
                'name' => 'cards',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => __('Add Card', 'flynt'),
                'sub_fields' => [
                    FieldVariables\getIcon(),
                    [
                        'label' => __('Plan', 'flynt'),
                        'name' => 'title',
                        'type' => 'text',
                        'required' => 1,
                        'wrapper' => ['width' => 20],
                    ],
                    [
                        'label' => __('Description', 'flynt'),
                        'name' => 'description',
                        'type' => 'text',
                        'wrapper' => ['width' => 60],
                    ],
                    [
                        'label' => __('Price Month', 'flynt'),
                        'name' => 'priceMonth',
                        'type' => 'number',
                        'wrapper' => ['width' => 25],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Price Year', 'flynt'),
                        'name' => 'priceYear',
                        'type' => 'number',
                        'wrapper' => ['width' => 25],
                        'required' => 1,
                    ],
                    [
                        'label' => __('Extra Cost', 'flynt'),
                        'name' => 'extraCost',
                        'type' => 'text',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Action Button', 'flynt'),
                        'name' => 'action',
                        'type' => 'link',
                        'layout' => 'block',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Badge', 'flynt'),
                        'name' => 'badge',
                        'type' => 'text',
                        'wrapper' => ['width' => 50],
                    ],
                    [
                        'label' => __('Features', 'flynt'),
                        'name' => 'features',
                        'type' => 'repeater',
                        'layout' => 'row',
                        'button_label' => __('Add Feature', 'flynt'),
                        'sub_fields' => [
                            [
                                'label' => __('Label', 'flynt'),
                                'name' => 'label',
                                'type' => 'text',
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
                    [
                        'label' => __('Align', 'flynt'),
                        'name' => 'align',
                        'type' => 'button_group',
                        'choices' => [
                            'left' => __('Left', 'flynt'),
                            'center' => __('Center', 'flynt'),
                        ],
                        'default_value' => 'left',
                    ],
                ],
            ],
        ],
    ];
}
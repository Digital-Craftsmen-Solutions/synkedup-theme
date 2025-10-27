<?php

use ACFComposer\ACFComposer;
use Flynt\Components;

add_action('Flynt/afterRegisterComponents', function (): void {
    ACFComposer::registerFieldGroup([
        'name' => 'reusableComponents',
        'title' => __('Reusable Components', 'flynt'),
        'style' => 'seamless',
        'menu_order' => 1,
        'fields' => [
            [
                'name' => 'reusableComponents',
                'label' => __('Reusable Components', 'flynt'),
                'type' => 'flexible_content',
                'button_label' => __('Add Component', 'flynt'),
                'layouts' => [
                    Components\SectionHeroFull\getACFLayout(),
                    Components\SectionFeatureBlock\getACFLayout(),
                    Components\SectionFeatureCards\getACFLayout(),
                    Components\SectionIconCards\getACFLayout(),
                    Components\SectionIconItems\getACFLayout(),
                    Components\SectionCompanyLogos\getACFLayout(),
                    Components\SectionSocialProof\getACFLayout(),
                    Components\SectionCarouselCards\getACFLayout(),
                    Components\SectionCallToAction\getACFLayout(),
                    Components\SectionFeatureTabs\getACFLayout(),
                    Components\SectionPricingCards\getACFLayout(),
                    Components\SectionPricingTable\getACFLayout(),
                    Components\SectionTeam\getACFLayout(),
                    Components\SectionAccordion\getACFLayout(),
                    Components\LayoutTabs\getACFLayout(),

                ],
            ]
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'reusable-components'
                ],
            ]
        ]
    ]);
});

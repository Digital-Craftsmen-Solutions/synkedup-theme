<?php

use ACFComposer\ACFComposer;
use Flynt\Components;

add_action('Flynt/afterRegisterComponents', function (): void {
    ACFComposer::registerFieldGroup([
        'name' => 'pageComponents',
        'title' => __('Page Components', 'flynt'),
        'style' => 'seamless',
        'fields' => [
            [
                'name' => 'pageComponents',
                'label' => __('Page Components', 'flynt'),
                'type' => 'flexible_content',
                'button_label' => __('Add Component', 'flynt'),
                'layouts' => [
                    Components\SectionHeroFull\getACFLayout(),
                    Components\ReusableComponent\getACFLayout(),
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
                    Components\SectionAccordion\getACFLayout(),
                    Components\SectionTeam\getACFLayout(),

                    Components\LayoutTabs\getACFLayout(),

                ],
            ],
            [
                'name' => 'json_ld',
                'label' => __('JSON-LD', 'flynt'),
                'type' => 'textarea',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'page'
                ]
            ],
        ],
    ]);
});
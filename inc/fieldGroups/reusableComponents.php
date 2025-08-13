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
                    Components\SectionCompanyLogos\getACFLayout(),
                    Components\SectionSocialProof\getACFLayout(),
                    Components\SectionFeatureBlock\getACFLayout(),
                    Components\SectionFeatureCards\getACFLayout(),
                    Components\SectionIconCards\getACFLayout(),
                    Components\SectionIconItems\getACFLayout(),
                    Components\SectionCarouselCards\getACFLayout(),
                    Components\SectionCallToAction\getACFLayout(),
                    Components\SectionFeatureTabs\getACFLayout(),
                    Components\SectionPricingCards\getACFLayout(),
                    Components\SectionPricingTable\getACFLayout(),
                    Components\SectionAccordion\getACFLayout(),

                    // Components\BlockImage\getACFLayout(),
                    // Components\BlockImageText\getACFLayout(),
                    // Components\BlockSpacer\getACFLayout(),
                    // Components\BlockVideoOembed\getACFLayout(),
                    // Components\Wysiwyg\getACFLayout(),
                    // Components\GridImageText\getACFLayout(),
                    // Components\GridPostsLatest\getACFLayout(),
                    // Components\ListComponents\getACFLayout(),
                    // Components\SliderImages\getACFLayout(),
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

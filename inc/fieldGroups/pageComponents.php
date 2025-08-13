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
                    Components\LayoutTabs\getACFLayout(),

                    // Components\BlockAnchor\getACFLayout(),
                    // Components\BlockImage\getACFLayout(),
                    // Components\BlockImageText\getACFLayout(),
                    // Components\BlockSpacer\getACFLayout(),
                    // Components\BlockVideoOembed\getACFLayout(),
                    // Components\Wysiwyg\getACFLayout(),
                    // Components\GridImageText\getACFLayout(),
                    // Components\GridPostsLatest\getACFLayout(),
                    // Components\ListComponents\getACFLayout(),

                ],
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
<?php

namespace Flynt\Components\BlockCtaButtons;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=BlockCtaButtons', function ($data) {
    $model = [
        'actionType' => 'buttons',
        'ctaButtons' => $data['ctaButtons'],
    ];
    return ['model' => $model];
});

function getACFLayout()
{
    return [
        'name' => 'blockCtaButtons',
        'label' => 'Block: CTA Buttons',
        'sub_fields' => [
            FieldVariables\getCtaButtons(),
        ]
    ];
}

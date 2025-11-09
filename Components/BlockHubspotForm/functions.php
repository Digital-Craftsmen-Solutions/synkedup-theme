<?php

namespace Flynt\Components\BlockHubspotForm;

use Flynt\FieldVariables;

add_filter('Flynt/addComponentData?name=BlockHubspotForm', function ($data) {
    $model = [
        'hubspotForm' => $data['hubspotForm'],
    ];
    return ['model' => $model];
});

function getACFLayout()
{
    return [
        'name' => 'blockHubspotForm',
        'label' => 'Block: HubSpot Form',
        'sub_fields' => [
            FieldVariables\getHubSpotForm(),
        ]
    ];
}

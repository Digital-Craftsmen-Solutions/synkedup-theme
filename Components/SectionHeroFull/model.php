<?php

namespace Flynt\Components\SectionHeroFull;

use Flynt\Components\Button;
use Timber\Image;

class SectionHeroFullModel
{
  public ?array $backgroundImage;
  public array $title;
  public string $contentHtml;
  public string $ctaType;
  public array $ctaButtons;

  public static function fromACF(array $data): self
  {
    $model = new self();

    // Handle Timber\Image object
    $image = $data['backgroundImage'] ?? null;

    if ($image instanceof Image) {
      $model->backgroundImage = [
        'src' => $image->src(),
        'alt' => $image->alt ?? '',
      ];
    } else {
      $model->backgroundImage = null;
    }

    // Map title (assuming flat ACF field array as per your earlier example)
    $model->title = [
      'before' => $data['title']['before'] ?? '',
      'highlight' => $data['title']['highlight'] ?? '',
      'after' => $data['title']['after'] ?? '',
    ];

    $model->contentHtml = $data['contentHtml'] ?? '';
    $model->ctaType = $data['ctaType'] ?? 'buttons';

    $model->ctaButtons = [
      'primaryButton' => isset($data['ctaButtons']['primaryButton']) ? ButtonModel::fromACF($data['ctaButtons']['primaryButton']) : null,
      'secondaryButton' => isset($data['ctaButtons']['secondaryButton']) ? ButtonModel::fromACF($data['ctaButtons']['secondaryButton']) : null,
    ];

    return $model;
  }

  public function toArray(): array
  {
    return [
      'backgroundImage' => $this->backgroundImage,
      'title' => $this->title,
      'contentHtml' => $this->contentHtml,
      'ctaType' => $this->ctaType,
      'ctaButtons' => $this->ctaButtons,
    ];
  }
}
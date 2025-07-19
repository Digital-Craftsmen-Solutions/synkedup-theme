<?php
namespace Flynt\Components\Button;

class ButtonModel
{
  public string $title;
  public string $url;
  public string $target;

  public static function fromACF(array $acf): self
  {
    $model = new self();
    $model->title = $acf['title'] ?? '';
    $model->url = $acf['url'] ?? '';
    $model->target = $acf['target'] ?? '_self';
    return $model;
  }
}
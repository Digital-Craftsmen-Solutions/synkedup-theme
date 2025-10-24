<?php

use Timber\Timber;

$context = Timber::context();

Timber::render('templates/single-feature.twig', $context);

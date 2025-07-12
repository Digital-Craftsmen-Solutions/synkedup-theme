
import 'vite/modulepreload-polyfill'
import '@preline/accordion';
import '@preline/carousel';
import '@preline/dropdown';
import '@preline/overlay';
import '@preline/tabs';
import '@preline/tooltip';
import '@preline/collapse';

import FlyntComponent from './scripts/FlyntComponent'

import 'lazysizes'

if (import.meta.env.DEV) {
  import('@vite/client')
}

import.meta.glob([
  '../Components/**',
  '../assets/**',
  '!**/*.js',
  '!**/*.scss',
  '!**/*.php',
  '!**/*.twig',
  '!**/screenshot.png',
  '!**/*.md'
])

window.customElements.define(
  'flynt-component',
  FlyntComponent
)

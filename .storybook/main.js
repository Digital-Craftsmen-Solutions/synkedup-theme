import path from 'path';

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    // "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    '../Components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  "core": {
    "builder": {
      "name": '@storybook/builder-vite',
      "options": {
        "viteConfigPath": '.storybook/vite.storybook.config.js',
      },
    },
  },
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
};
export default config;
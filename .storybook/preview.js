import '@/assets/main.scss';
import '@/assets/main.js';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: 'hsla(0, 0%, 4%, 1)' },
        light: { name: 'Light', value: '#FFFFFF' },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Intro', 'Pages', 'Components'],
      },
    },
  },
};

export default preview;
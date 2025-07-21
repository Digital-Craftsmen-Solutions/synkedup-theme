import '@/assets/main.scss';
import '@/assets/main.js';

const INITIAL_VIEWPORTS = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
    type: 'tablet',
  },
  large: {
    name: 'Large',
    styles: {
      width: '1024px',
      height: '768px',
    },
    type: 'desktop',
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
    type: 'desktop',
  },
  monitor: {
    name: 'Monitor',
    styles: {
      width: '1440px',
      height: '900px',
    },
    type: 'desktop',
  },
};

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
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },

};

export default preview;
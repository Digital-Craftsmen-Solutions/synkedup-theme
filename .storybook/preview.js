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
  mobilePlus: {
    name: 'Mobile Plus',
    styles: {
      width: '640px',
      height: '1024px',
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
        light: { name: 'Light', value: '#F7F9FD' },
        dark: { name: 'Dark', value: 'hsla(0, 0%, 4%, 1)' },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Intro', 'Pages', 'Components', 'Sections'],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },

};

export default preview;
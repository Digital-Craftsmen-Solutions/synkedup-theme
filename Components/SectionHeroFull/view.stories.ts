import template from '@/Components/SectionHeroFull/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionHeroFullModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionHeroFullModel = {
  backgroundImage: undefined,
  title: {
    before: 'Welcome to',
    highlight: 'Our Product',
    after: 'Today'
  },
  contentHtml: '<p>This is a hero section with full background and call to action buttons.</p>',
  action: {
    ctaType: 'buttons',
    ctaButtons: {
      primaryButton: {
        title: 'Get Started',
        url: '/get-started',
        target: '_self'
      },
      secondaryButton: {
        title: 'Learn More',
        url: '/learn-more',
        target: '_blank'
      }
    }
  },
  options: {
    theme: 'light'
  }
};

const meta: Meta<SectionHeroFullModel> = {
  title: 'Sections/HeroFull',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    // Control action.ctaType, not ctaType (moved to action)
    action: {
      control: 'object'
    },
    options: {
      control: 'object'
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionHeroFullModel) => {
  return compiled.render({ model: args });
};

export const Light: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=1280&q=80',
      alt: 'Hero Background'
    },
    title: {
      before: 'Introducing',
      highlight: 'Something New'
    },
    contentHtml: '<p>Experience our secondary theme with more features and flexibility.</p>',
    action: {
      ctaType: 'buttons',
      ctaButtons: {
        primaryButton: {
          title: 'Explore',
          url: '/explore'
        }
      }
    },
    options: {
      theme: 'dark'
    }
  }
};

export const Simple: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    action: {
      ctaType: 'none',
      ctaButtons: {}
    }
  }
};

export const ExtraItems: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    extraItems: {
      items: [
        {
          type: 'figure',
          title: '$N.NN',
          description: 'Easily customizable to fit your needs',
        },
        {
          type: 'icon',
          icon: 'stars',
          description: 'Easily customizable to fit your needs.',
        }
      ]
    }
  }
};

export const ExtraItemsDark: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=1280&q=80',
      alt: 'Hero Background'
    },
    extraItems: {
      items: [
        {
          type: 'figure',
          title: '$N.NN',
          description: 'Easily customizable to fit your needs',
        },
        {
          type: 'figure',
          title: '$N.NN',
          description: 'Easily customizable to fit your needs',
        },
        {
          type: 'icon',
          icon: 'stars',
          description: 'Easily customizable to fit your needs.',
        }
      ]
    },
    options: {
      theme: 'dark'
    }
  }
};
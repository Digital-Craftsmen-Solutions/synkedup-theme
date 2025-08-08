import template from '@/Components/SectionHeroFull/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionHeroFullModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionHeroFullModel = {
  backgroundImage: undefined,
  heading: {
    before: 'Welcome to',
    highlight: 'Our Product',
    after: 'Today',
    description: '<p>This is a hero section with full background and call to action buttons.</p>',
  },
  action: {
    actionType: 'buttons',
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
  title: 'Sections/Hero',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
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

export const LightSplit: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&w=800&q=80',
      alt: 'Hero Background'
    },
    mobileImage: {
      src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=1280&q=80',

      alt: 'Hero Background'
    },
    breadcrumbs: {
      items: [
        {
          label: 'Home',
          url: '#',
          icon: 'home'
        },
        {
          label: 'App Center',
          url: '#',
          icon: 'appcenter'
        },
        {
          label: 'Application',
          isCurrent: true
        }
      ]
    },
    options: {
      theme: 'light',
      display: 'split',
    }
  }
};

export const Dark: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=1280&q=80',
      alt: 'Hero Background'
    },
    heading: {
      before: 'Introducing',
      highlight: 'Something New',
      description: '<p>Experience our secondary theme with more features and flexibility.</p>',
    },
    action: {
      actionType: 'buttons',
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

export const DarkSplit: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&w=800&q=80',
      alt: 'Hero Background'
    },
    mobileImage: {
      src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=1280&q=80',

      alt: 'Hero Background'
    },
    heading: {
      before: 'Introducing',
      highlight: 'Something New',
      description: '<p>Experience our secondary theme with more features and flexibility.</p>',
    },
    action: {
      actionType: 'buttons',
      ctaButtons: {
        primaryButton: {
          title: 'Explore',
          url: '/explore'
        }
      }
    },
    breadcrumbs: {
      items: [
        {
          label: 'Home',
          url: '#',
          icon: 'home'
        },
        {
          label: 'App Center',
          url: '#',
          icon: 'appcenter'
        },
        {
          label: 'Application',
          isCurrent: true
        }
      ]
    },
    options: {
      theme: 'dark',
      display: 'split'
    }
  }
};

export const Simple: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    breadcrumbs: {
      items: [
        {
          label: 'Home',
          url: '#',
          icon: 'home'
        },
        {
          label: 'App Center',
          url: '#',
          icon: 'appcenter'
        },
        {
          label: 'Application',
          isCurrent: true
        }
      ]
    },
    action: {
      actionType: 'none',
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

export const ExtraItemsDarkSplit: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData,
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&w=800&q=80',
      alt: 'Hero Background'
    },
    mobileImage: {
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
      ]
    },
    options: {
      theme: 'dark',
      display: 'split'
    }
  }
};
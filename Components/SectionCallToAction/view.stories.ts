import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionCallToActionModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionCallToActionModel = {
  heading: {
    before: 'Ready to',
    highlight: 'take action?',
    after: '',
    type: 'h2',
    description: 'Your journey starts here. Get in touch or get started with our platform now.',
    options: {
      align: 'center'
    }
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
        title: 'Contact Us',
        url: '/contact',
        target: '_blank'
      }
    }
  },
  options: {
    theme: 'light',
    display: 'full'
  }
};

const meta: Meta<SectionCallToActionModel> = {
  title: 'Sections/CallToAction',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  parameters: {
    docs: {
      description: {
        component: 'A call to action section with heading and flexible action placement, supporting full and split layouts.'
      }
    }
  },
  argTypes: {
    options: {
      control: 'object'
    }
  }
};
export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionCallToActionModel) => compiled.render({ model: args });

export const Full: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'full'
    },
  }
};

export const Split: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'split'
    },
  }
};

export const Dark: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'full',
      theme: 'dark'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};

export const DarkLongHeading: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    heading: {
      ...defaultData.heading,
      before: 'Over',
      highlight: '$NN,NN0,000 of Profit',
      after: 'Generated With SynkedUP',
      options: {
        ...defaultData.heading.options,
        align: 'center',
        hideHighlight: true
      }
    },
    options: {
      ...defaultData.options,
      display: 'split',
      theme: 'dark'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};

export const Alternate: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'full',
      theme: 'alt'
    },
  },
};

export const AlternateSplit: StoryObj<SectionCallToActionModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'split',
      theme: 'alt'
    },
  },
};
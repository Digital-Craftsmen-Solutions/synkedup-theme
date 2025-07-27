import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionFeatureBlockModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionFeatureBlockModel = {
  icon: 'home',
  heading: {
    before: 'Discover our features',
    description: 'From your first estimate to your final invoice, we guide you step-by-step to build a business that runs profitably. No tech skills? No problem. We\'ve got your back!',
    type: 'h2',
  },
  features: [
    { label: 'Recover your overhead. Know your break-even. ' },
    { label: 'Intuitive design and amazing' },
    { label: '24/7 Support' }
  ],
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
  quote: {
    quote: '“This product changed my life!”',
    authorName: 'Jane Doe',
    sourceTitle: 'Happy Customer',
    avatar: {
      src: 'https://randomuser.me/api/portraits/women/68.jpg',
      alt: 'Jane Doe'
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    alt: 'Feature Image',
    width: 800,
    height: 600
  },
  options: {
    theme: 'light',
    imageDisplay: 'right'
  }
};

const meta: Meta<SectionFeatureBlockModel> = {
  title: 'Sections/FeatureBlock',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: {
      control: 'object'
    }
  }
};
export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionFeatureBlockModel) => compiled.render({ model: args });

export const RightImage: StoryObj<SectionFeatureBlockModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      imageDisplay: 'right'
    }
  }
};

export const LeftImage: StoryObj<SectionFeatureBlockModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      imageDisplay: 'left'
    }
  }
};

export const FullImage: StoryObj<SectionFeatureBlockModel> = {
  render: Template,
  args: {
    ...defaultData,
    features: [
      { label: 'Know your break-even' },
      { label: 'Intuitive design' },
      { label: '24/7 Support' }
    ],
    options: {
      ...defaultData.options,
      imageDisplay: 'full',
    }
  }
};

export const FullImageDark: StoryObj<SectionFeatureBlockModel> = {
  render: Template,
  args: {
    ...defaultData,
    features: [
      { label: 'Know your break-even' },
      { label: 'Intuitive design' },
      { label: '24/7 Support' }
    ],
    options: {
      ...defaultData.options,
      imageDisplay: 'full',
      theme: 'dark'
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};
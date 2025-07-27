import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionFeatureCardsModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionFeatureCardsModel = {
  heading: {
    before: 'Discover our',
    highlight: 'Features',
    after: '',
    type: 'h2',
    description: '<p>Explore the key features of our product below.</p>',
  },
  cards: [
    {
      title: 'Fast & Accurate Estimates ',
      description: 'Build estimates in minutes with drag and drop templates, priced to recover your overhead. ',
      subtitle: 'First Subtitle',
      backgroundImage: {
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=300&q=80',
        alt: 'Feature One'
      },
    },
    {
      title: 'Feature Two',
      description: 'Short description for feature two.',
      subtitle: 'Second Subtitle',
      backgroundImage: {
        src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=300&q=80',
        alt: 'Feature Two'
      },
    },
    {
      title: 'Feature Three',
      description: 'Short description for feature three.',
      backgroundImage: {
        src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=300&q=80',
        alt: 'Feature Three'
      },
    }
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
  options: {
    theme: 'light',
    align: 'left',
    display: 'imageBottom'
  }
};

const meta: Meta<SectionFeatureCardsModel> = {
  title: 'Sections/FeatureCards',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: {
      control: { type: 'object' }
    },
    action: {
      control: { type: 'object' }
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionFeatureCardsModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionFeatureCardsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionFeatureCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    cards: defaultData.cards.map(card => ({
      ...card,
    })),
    options: {
      theme: 'dark'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const OverlayImage: StoryObj<SectionFeatureCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'imageOverlay'
    }
  }
};

export const TopImageCenter: StoryObj<SectionFeatureCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      theme: 'light',
      align: 'center',
      display: 'imageTop'
    }
  },
};
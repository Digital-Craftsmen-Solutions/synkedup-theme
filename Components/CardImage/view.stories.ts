import template from '@/Components/CardImage/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { CardImageModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: CardImageModel = {
  title: 'Card title',
  description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
  subtitle: 'Last updated 5 mins ago',
  backgroundImage: {
    src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=320&q=80',
    alt: 'Card Image'
  },
  options: {
    theme: 'light',
    align: 'left',
    display: 'imageBottom'
  }
};

const meta: Meta<CardImageModel> = {
  title: 'Components/CardImage',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  decorators: [
    (Story) => `<div class="max-w-sm">${Story()}</div>`
  ]
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: CardImageModel) => {
  return compiled.render({ model: args });
};

export const ImageBottom: StoryObj<CardImageModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'imageBottom'
    }
  }
};

export const ImageTop: StoryObj<CardImageModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      display: 'imageTop'
    }
  }
};

export const CenterAligned: StoryObj<CardImageModel> = {
  render: Template,
  args: {
    ...defaultData,
    actionButton: {
      url: '#',
      title: 'Learn More',
    },
    options: {
      ...defaultData.options,
      align: 'center',
      display: 'imageTop'
    }
  }
};

export const ImageOverlay: StoryObj<CardImageModel> = {
  render: Template,
  args: {
    ...defaultData,
    actionButton: {
      url: '#',
      title: 'Learn More',
    },
    options: {
      ...defaultData.options,
      display: 'imageOverlay'
    }
  }
};

export const Dark: StoryObj<CardImageModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      theme: 'dark',
      align: 'left',
      display: 'imageBottom'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
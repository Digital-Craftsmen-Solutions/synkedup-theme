import template from '@/Components/CardPost/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { CardPostModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: CardPostModel = {
  title: 'Card title',
  description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
  subtitle: 'Last updated 5 mins ago',
  actionButton: {
    url: '#',
    title: 'Learn More',
    type: 'secondary',
  },
  backgroundImage: {
    src: 'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?auto=format&fit=crop&w=320&q=80',
    alt: 'Card Image',
  },
  options: {
    theme: 'light',
  }
};

const meta: Meta<CardPostModel> = {
  title: 'Components/CardPost',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  decorators: [
    (Story) => `<div>${Story()}</div>`
  ]
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: CardPostModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<CardPostModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
    }
  }
};

export const Dark: StoryObj<CardPostModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      theme: 'dark',
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
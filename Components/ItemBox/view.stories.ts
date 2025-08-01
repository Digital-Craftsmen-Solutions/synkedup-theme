import template from '@/Components/ItemBox/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { ItemBoxModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: ItemBoxModel = {
  type: 'icon',
  icon: 'home',
  image: {
    src: '../stories/assets/logo.svg',
    alt: 'Placeholder Image'
  },
  title: 'Responsive',
  description: 'Responsive, and mobile-first project on the web',
  class: '',
  options: {
    align: 'left',
    theme: 'light'
  }
};

const meta: Meta<ItemBoxModel> = {
  title: 'Components/ItemBox',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['icon', 'image', 'figure']
    },
  },
  decorators: [
    (Story) => `<div class="max-w-sm mx-auto">${Story()}</div>`
  ]
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: ItemBoxModel) => {
  return compiled.render({ model: args });
};

export const Icon: StoryObj<ItemBoxModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const CenterAlign: StoryObj<ItemBoxModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      align: 'center'
    }
  }
};

export const Dark: StoryObj<ItemBoxModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      theme: 'dark'
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Image: StoryObj<ItemBoxModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: 'image',
  }
};

export const FigureCenter: StoryObj<ItemBoxModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: 'figure',
    title: '$N.NN',
    description: 'Profit Generated by Customers',
    options: {
      ...defaultData.options,
      align: 'center'
    }
  }
};

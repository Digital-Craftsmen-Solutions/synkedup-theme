import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionIconItemsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { ButtonModel } from '../Button/model';

const defaultData: SectionIconItemsModel = {
  items: [
    {
      type: 'icon',
      icon: 'home',
      title: 'Responsive',
      description: 'Responsive, and mobile-first project on the web',
    },
    {
      type: 'icon',
      icon: 'home',
      title: 'Responsive',
      description: 'Responsive, and mobile-first project on the web',
    },
    {
      type: 'icon',
      icon: 'home',
      title: 'Responsive',
      description: 'Responsive, and mobile-first project on the web',
    }
  ],
  options: {
    theme: 'light',
    align: 'left'
  }
};

const meta: Meta<SectionIconItemsModel> = {
  title: 'Sections/IconItems',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionIconItemsModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionIconItemsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const CenterAlign: StoryObj<SectionIconItemsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      theme: 'light',
      align: 'center',
    }
  },
};

export const Dark: StoryObj<SectionIconItemsModel> = {
  render: Template,
  args: {
    ...defaultData,
    items: defaultData.items.map(item => ({
      ...item,
    })),
    options: {
      ...defaultData.options,
      theme: 'dark'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Stacked: StoryObj<SectionIconItemsModel> = {
  render: Template,
  args: {
    ...defaultData,
    items: [
      ...defaultData.items,
      ...defaultData.items,
      defaultData.items[0]
    ],
    options: {
      ...defaultData.options,
      theme: 'dark',
      align: 'center',
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const MixedType: StoryObj<SectionIconItemsModel> = {
  render: Template,
  args: {
    ...defaultData,
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
      },
      {
        type: 'image',
        image: {
          src: '../stories/assets/logo.svg',
          alt: 'Placeholder'
        },
        description: 'This is an example of an item with an image.',
      },
    ],
    options: {
      theme: 'light',
      align: 'center',
    }
  },
};
import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionFeatureItemsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { ButtonModel } from '../Button/model';

const defaultData: SectionFeatureItemsModel = {
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

const meta: Meta<SectionFeatureItemsModel> = {
  title: 'Sections/Featureitems',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionFeatureItemsModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionFeatureItemsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const CenterAlign: StoryObj<SectionFeatureItemsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      theme: 'light',
      align: 'center',
    }
  },
};

export const Dark: StoryObj<SectionFeatureItemsModel> = {
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

export const Stacked: StoryObj<SectionFeatureItemsModel> = {
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

export const MixedType: StoryObj<SectionFeatureItemsModel> = {
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
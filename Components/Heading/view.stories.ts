import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { HeadingModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: HeadingModel = {
  before: 'An',
  highlight: 'Amazing',
  after: 'Heading',
  type: 'h1',
  description: 'This is a description for the heading. You can add more context here as needed.',
  options: {
    theme: 'light',
    align: 'center',
    size: 'default'
  }
};

const meta: Meta<HeadingModel> = {
  title: 'Components/Heading',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['h1', 'h2', 'h3'],
      defaultValue: 'h1'
    },
    options: {
      control: { type: 'object' }
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: HeadingModel) => compiled.render({ model: args });

export const H1: StoryObj<HeadingModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: 'h1'
  }
};

export const H2: StoryObj<HeadingModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: 'h2'
  }
};

export const H3: StoryObj<HeadingModel> = {
  render: Template,
  args: {
    ...defaultData,
    type: 'h3'
  }
};

export const LeftAlignedWide: StoryObj<HeadingModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      align: 'left',
      size: 'wide'
    }
  }
};

export const Wide: StoryObj<HeadingModel> = {
  render: Template,
  args: {
    ...defaultData,
    description:
      'This heading includes a longer description to demonstrate how additional information appears below the heading. You can use this for subheadings, intros, or explanatory text.',
    options: {
      ...defaultData.options,
      size: 'wide'
    }
  }
};

export const Dark: StoryObj<HeadingModel> = {
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

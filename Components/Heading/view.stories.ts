import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { HeadingModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: HeadingModel = {
  before: 'An',
  highlight: 'Amazing',
  after: 'Heading',
  type: 'h1',
  options: {
    theme: 'light'
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
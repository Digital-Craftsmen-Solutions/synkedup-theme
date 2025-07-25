import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { QuoteModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: QuoteModel = {
  quote: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
  authorName: 'Josh Grazioso',
  sourceTitle: 'Source title',
  avatar: {
    src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    alt: 'Avatar'
  },
  options: {
    display: 'bordered',
    theme: 'light'
  }
};

const meta: Meta<QuoteModel> = {
  title: 'Components/Quote',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: {
      control: { type: 'object' }
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: QuoteModel) => compiled.render({ model: args });

export const Plain: StoryObj<QuoteModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, display: 'plain' }
  }
};

export const Bordered: StoryObj<QuoteModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, display: 'bordered' }
  }
};

export const Dark: StoryObj<QuoteModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, display: 'bordered' }
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};
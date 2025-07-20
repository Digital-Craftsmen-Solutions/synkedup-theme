import template from '@/Components/Alert/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { AlertModel } from './model';
import { renderTwig } from '../../stories/utils';

const meta: Meta<AlertModel> = {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      defaultValue: 'menu'
    },
    title: {
      control: 'text',
      defaultValue: 'Responsive'
    },
    text: {
      control: 'text',
      defaultValue: 'Responsive, and mobile-first project on the web'
    },
    class: {
      control: 'text',
      defaultValue: ''
    }
  }
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: AlertModel) => {
  return compiled.render({ model: args });
};

export const Icon: StoryObj<AlertModel> = {
  render: Template,
  args: {
    icon: 'menu',
    title: 'Responsive',
    text: 'Responsive, and mobile-first project on the web',
    class: ''
  }
};

export const Figure: StoryObj<AlertModel> = {
  render: Template,
  args: {
    title: '$N.NN',
    text: 'Profit generated',
    class: ''
  }
};

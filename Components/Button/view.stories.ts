import template from '@/Components/Button/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import { type ButtonModel } from './model';
import { renderTwig } from '../../stories/utils';

const meta: Meta<ButtonModel> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    title: {
      control: 'text',
    },
    url: {
      control: 'text',
    },
    target: {
      control: 'radio',
      options: ['_self', '_blank'],
    },
    class: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => `<div class="min-w-sm text-center">${Story()}</div>`
  ]
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: ButtonModel) => {
  return compiled.render({ model: args });
};

export const Primary: StoryObj<ButtonModel> = {
  render: Template,
  args: {
    type: 'primary',
    title: 'Click Me',
    url: '#',
    target: '_self',
    class: '',
  },
  parameters: {
    layout: 'centered',
  },
};

export const Secondary: StoryObj<ButtonModel> = {
  render: Template,
  args: {
    type: 'secondary',
    title: 'Click Me',
    url: '#',
    target: '_self',
    class: ''
  },
  parameters: {
    layout: 'centered',
  },
};

export const Block: StoryObj<ButtonModel> = {
  render: Template,
  args: {
    type: 'primary',
    title: 'Click Me',
    url: '#',
    target: '_self',
    blockMode: true,
    class: ''
  },
  parameters: {
    layout: 'centered',
  },
};

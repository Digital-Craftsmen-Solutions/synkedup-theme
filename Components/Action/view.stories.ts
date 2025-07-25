import template from '@/Components/Action/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { ActionModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: ActionModel = {
  ctaType: 'buttons',
  ctaButtons: {
    primaryButton: {
      title: 'Get Started',
      url: '/get-started',
      target: '_self'
    },
    secondaryButton: {
      title: 'Learn More',
      url: '/learn-more',
      target: '_blank'
    }
  },
  gravityForm: 'gravity_form_id',
  options: {
    theme: 'light'
  }
};

const meta: Meta<ActionModel> = {
  title: 'Components/Action',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    ctaType: {
      control: { type: 'radio' },
      options: ['none', 'buttons', 'form'],
      defaultValue: 'buttons'
    },
    options: {
      control: 'object',
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: ActionModel) => {
  return compiled.render({ model: args });
};

export const Buttons: StoryObj<ActionModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

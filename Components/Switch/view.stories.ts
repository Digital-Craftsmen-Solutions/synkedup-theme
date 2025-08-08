import template from '@/Components/Switch/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SwitchModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SwitchModel = {
  id: 'switch',
  labelOff: 'Monthly',
  labelOn: 'Annually',
  labelOnBadge: 'Save 15%',
  checked: false,
  disabled: false,
  options: {
    theme: 'light',
  },
};

const meta: Meta<SwitchModel> = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  args: {
    ...defaultData,
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelOff: { control: 'text' },
    labelOn: { control: 'text' },
    labelOnBadge: { control: 'text' },
    options: {
      control: 'object'
    }
  },
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SwitchModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<SwitchModel> = {
  render: Template,
  args: {
    ...defaultData,
    id: 'switch-Default',
  }
};

export const Checked: StoryObj<SwitchModel> = {
  render: Template,
  args: {
    ...defaultData,
    id: 'switch-Checked',
    checked: true
  }
};

export const WithBadge: StoryObj<SwitchModel> = {
  render: Template,
  args: {
    ...defaultData,
    id: 'switch-WithBadge',
    labelOnBadge: 'Save 25%'
  }
};

export const Disabled: StoryObj<SwitchModel> = {
  render: Template,
  args: {
    ...defaultData,
    id: 'switch-Disabled',
    disabled: true
  }
};

export const DarkTheme: StoryObj<SwitchModel> = {
  render: Template,
  args: {
    ...defaultData,
    id: 'switch-DarkTheme',
    options: {
      theme: 'dark'
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
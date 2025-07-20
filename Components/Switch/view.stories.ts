import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SwitchModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SwitchModel = {
  id: 'hs-basic-usage',
  checked: false,
  disabled: false,
  options: {
    theme: 'light'
  }
};

const meta: Meta<SwitchModel> = {
  title: 'Components/Switch',
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
const Template = (args: SwitchModel) => compiled.render({ model: args });

export const Default: StoryObj<SwitchModel> = {
  render: Template,
  args: { ...defaultData }
};

export const Checked: StoryObj<SwitchModel> = {
  render: Template,
  args: { ...defaultData, checked: true }
};

export const Disabled: StoryObj<SwitchModel> = {
  render: Template,
  args: { ...defaultData, disabled: true }
};
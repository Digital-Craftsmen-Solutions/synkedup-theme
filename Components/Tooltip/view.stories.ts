import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { TooltipModel } from './model';
import { renderTwig } from '../../stories/utils';
import { HSOverlay } from 'preline';

const defaultData: TooltipModel = {
  label: 'Tooltip Top',
  tooltip: 'Tooltip on top',
  placement: 'top',
  icon: 'chevron-down',
  options: {
    theme: 'light'
  }
};

const withAutoInit = {
  play: async () => {
    HSOverlay.autoInit();
  }
};

const meta: Meta<TooltipModel> = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    placement: {
      control: { type: 'radio' },
      options: ['top', 'left', 'right', 'bottom'],
      defaultValue: 'top'
    },
    icon: {
      control: { type: 'radio' },
      options: ['chevron-down', 'chevron-left', 'chevron-right', 'chevron-up'],
      defaultValue: 'chevron-down'
    },
    options: {
      control: { type: 'object' }
    }
  },
  decorators: [
    (Story) => `<div class="p-10">${Story()}</div>`
  ],
  ...withAutoInit
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: TooltipModel) => compiled.render({ model: args });

export const Top: StoryObj<TooltipModel> = {
  render: Template,
  args: { ...defaultData, placement: 'top', icon: 'chevron-down', tooltip: 'Tooltip on top', label: 'Tooltip Top' }
};
export const Left: StoryObj<TooltipModel> = {
  render: Template,
  args: { ...defaultData, placement: 'left', icon: 'chevron-left', tooltip: 'Tooltip on left', label: 'Tooltip Left' }
};
export const Right: StoryObj<TooltipModel> = {
  render: Template,
  args: { ...defaultData, placement: 'right', icon: 'chevron-right', tooltip: 'Tooltip on right', label: 'Tooltip Right' }
};
export const Bottom: StoryObj<TooltipModel> = {
  render: Template,
  args: { ...defaultData, placement: 'bottom', icon: 'chevron-up', tooltip: 'Tooltip on bottom', label: 'Tooltip Bottom' }
};
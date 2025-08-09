import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { TableModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: TableModel = {
  head: [
    { label: 'Features', key: 'feature' },
    { label: 'Standard', key: 'standard' },
    { label: 'Pro', key: 'pro' },
    { label: 'Enterprise', key: 'enterprise' }
  ],
  rows: [
    {
      feature: 'Price',
      standard: '$19/mo',
      pro: '$49/mo',
      enterprise: '$99/mo'
    },
    {
      feature: 'Unlimited Projects',
      standard: true,
      pro: true,
      enterprise: true
    },
    {
      feature: 'Priority Support',
      standard: false,
      pro: true,
      enterprise: true
    },
    {
      feature: 'Advanced Analytics',
      standard: false,
      pro: true,
      enterprise: true
    },
    {
      feature: 'Custom Branding',
      standard: false,
      pro: false,
      enterprise: true
    }
  ],
  options: {
    align: 'center',
    theme: 'light'
  }
};

const meta: Meta<TableModel> = {
  title: 'Components/Table',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  parameters: {
    docs: {
      description: {
        component: 'A dynamic pricing table with configurable plans and features.'
      }
    }
  },
  argTypes: {
    options: {
      control: 'object'
    }
  }
};
export default meta;

const compiled = renderTwig(template);
const Template = (args: TableModel) => compiled.render({ model: args });

export const Default: StoryObj<TableModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Left: StoryObj<TableModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      align: 'left'
    }
  }
};

export const Dark: StoryObj<TableModel> = {
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
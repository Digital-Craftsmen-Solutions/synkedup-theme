import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionPricingTableModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionPricingTableModel = {
  heading: {
    before: "Compare Our",
    highlight: "Plans",
    after: "",
    description: "Find the plan that fits your business.",
    type: "h2"
  },
  table: {
    head: [
      { label: 'Feature', key: 'feature' },
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
  },
  options: {
    theme: 'light'
  }
};

const meta: Meta<SectionPricingTableModel> = {
  title: 'Sections/PricingTable',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  parameters: {
    docs: {
      description: {
        component: 'A pricing table section with a heading and a comparison table.'
      }
    }
  },
  argTypes: {
    options: {
      control: 'object'
    },
    table: {
      control: 'object'
    },
    heading: {
      control: 'object'
    }
  }
};
export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionPricingTableModel) => compiled.render({ model: args });

export const Default: StoryObj<SectionPricingTableModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionPricingTableModel> = {
  render: Template,
  args: {
    ...defaultData,
    table: {
      ...defaultData.table,
      options: {
        ...defaultData.table.options,
        theme: 'dark'
      }
    },
    options: {
      theme: 'dark'
    }
  }
};
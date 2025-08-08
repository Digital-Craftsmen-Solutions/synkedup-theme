import template from '@/Components/PricingCard/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { PricingCardModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: PricingCardModel = {
  icon: 'home',
  title: 'Standard Plan',
  description: 'Perfect for individuals and small teams.',
  priceMonth: 19,
  priceYear: 190,
  labelMonth: '/month',
  labelYear: '/month paid annually',
  period: 'month',
  features: [
    { label: '10 Projects' },
    { label: '5 GB Storage' },
    { label: 'Email Support' },
  ],
  actionButton: {
    type: 'primary',
    title: 'Choose Plan',
    url: '#',
    target: '_self'
  },
  options: {
    align: 'left',
    theme: 'light',
  }
};

const meta: Meta<PricingCardModel> = {
  title: 'Components/PricingCard',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    icon: { control: 'text' },
    options: {
      control: 'object'
    },
    priceMonth: { control: 'number' },
    priceYear: { control: 'number' },
    labelMonth: { control: 'text' },
    labelYear: { control: 'text' },
    period: {
      control: { type: 'radio' },
      options: ['month', 'year']
    }
  },
  decorators: [
    (Story) => `<div class="max-w-md">${Story()}</div>`
  ]
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: PricingCardModel) => {
  return compiled.render({ model: args });
};

export const Basic: StoryObj<PricingCardModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      align: 'left',
      theme: 'light'
    }
  }
};

export const WithBadgeAndExtraCost: StoryObj<PricingCardModel> = {
  render: Template,
  args: {
    ...defaultData,
    title: 'Pro Plan',
    description: 'For growing teams and businesses.',
    priceMonth: 49,
    priceYear: 490,
    labelMonth: 'month',
    labelYear: 'per year',
    period: 'month',
    extraCost: '+ $10 setup fee',
    badge: 'Popular',
    features: [
      { label: 'Unlimited Projects' },
      { label: '100 GB Storage' },
      { label: 'Priority Support' },
    ],
    actionButton: {
      type: 'secondary',
      title: 'Get Started',
      url: '#',
      target: '_blank'
    },
    options: {
      align: 'left',
      theme: 'dark',
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const CenterAligned: StoryObj<PricingCardModel> = {
  render: Template,
  args: {
    ...defaultData,
    title: 'Pro Plan',
    description: 'For growing teams and businesses.',
    priceMonth: 49,
    priceYear: 490,
    labelMonth: 'month',
    labelYear: 'per year',
    period: 'month',
    extraCost: '+ $10 setup fee',
    badge: 'Popular',
    features: [
      { label: 'Unlimited Projects' },
      { label: '100 GB Storage' },
      { label: 'Priority Support' },
    ],
    actionButton: {
      type: 'secondary',
      title: 'Get Started',
      url: '#',
      target: '_blank'
    },
    options: {
      align: 'center',
      theme: 'light',
    }
  },
};

export const YearlyOnly: StoryObj<PricingCardModel> = {
  render: Template,
  args: {
    ...defaultData,
    title: 'Yearly Plan',
    description: 'Best value for annual commitment.',
    priceMonth: 0,
    priceYear: 299,
    labelMonth: '',
    labelYear: '/month paid annually',
    period: 'year',
    features: [
      { label: 'Everything in Pro' },
      { label: 'Dedicated Account Manager' },
    ],
    actionButton: {
      type: 'primary',
      title: 'Upgrade Now',
      url: '#',
      target: '_self'
    },
    options: {
      align: 'left',
      theme: 'light',
    }
  }
};
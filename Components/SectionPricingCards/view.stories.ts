import template from '@/Components/SectionPricingCards/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionPricingCardsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { SwitchModel } from '../Switch/model';
import { CardPricingModel } from '../CardPricing/model.js';
import HSToggleClass from '../../assets/scripts/toggle-class.js'

const defaultSwitch: SwitchModel = {
  id: 'pricing-period-switch',
  labelOff: 'Monthly',
  labelOn: 'Annually',
  labelOnBadge: 'Save 10%',
  checked: false,
  disabled: false,
};

const defaultCard: CardPricingModel = {
  icon: 'home',
  title: 'Standard Plan',
  description: 'Perfect for individuals and small teams.',
  priceMonth: 399,
  priceYear: 349,
  labelMonth: '/month',
  labelYear: '/month paid annually',
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
};

const defaultData: SectionPricingCardsModel = {
  heading: {
    before: 'Choose your',
    highlight: 'Plan',
    after: '',
    description: 'Select the plan that fits your needs.',
    type: 'h2',
  },
  labelMonth: '/month',
  labelYear: '/month paid annually',
  defaultPeriod: 'month',
  periodSwitch: { ...defaultSwitch },
  cards: [
    { ...defaultCard },
    {
      ...defaultCard,
      title: 'Pro Plan',
      description: 'For growing teams and businesses.',
      priceMonth: 599,
      priceYear: 549,
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
      badge: 'Popular',
    }
  ],
  options: {
    theme: 'light',
    align: 'left',
  }
};

const withAutoInit = {
  play: async () => {
    HSToggleClass.autoInit();
  }
};

const meta: Meta<SectionPricingCardsModel> = {
  title: 'Sections/PricingCards',
  tags: ['autodocs'],
  args: {
    ...defaultData,
  },
  argTypes: {
    defaultPeriod: {
      control: { type: 'radio' },
      options: ['month', 'year']
    },
    labelMonth: { control: 'text' },
    labelYear: { control: 'text' },
    options: { control: 'object' }
  },
  ...withAutoInit,
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionPricingCardsModel) => {
  return compiled.render({ model: args });
};

export const Basic: StoryObj<SectionPricingCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    periodSwitch: { ...defaultSwitch, id: 'pricing-period-switch-basic' },
  }
};

export const YearlyPeriod: StoryObj<SectionPricingCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    periodSwitch: { ...defaultSwitch, id: 'pricing-period-switch-yearly' },
    defaultPeriod: 'year',
  }
};

export const DarkTheme: StoryObj<SectionPricingCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    periodSwitch: { ...defaultSwitch, id: 'pricing-period-switch-dark' },
    options: {
      theme: 'dark',
      align: 'center'
    },
  },
  globals: {
    backgrounds: { value: 'dark' }
  }
};
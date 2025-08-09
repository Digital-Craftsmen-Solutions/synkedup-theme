import template from '@/Components/SectionIconCards/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionIconCardsModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionIconCardsModel = {
  heading: {
    before: 'Our',
    highlight: 'Features',
    after: '',
    description: 'Explore the key features of our service.',
    type: 'h2',
  },
  cards: [
    {
      type: 'icon',
      icon: 'home',
      title: 'Quality',
      description: 'We deliver high quality results.',
    },
    {
      type: 'icon',
      icon: 'home',
      title: 'Speed',
      description: 'Fast turnaround time.',
    },
    {
      type: 'icon',
      icon: 'home',
      title: 'Security',
      description: 'Your data is safe with us.',
    },
  ],
  options: {
    align: 'left',
    theme: 'light',
  },
};

const compiled = renderTwig(template);
const Template = (args: SectionIconCardsModel) => {
  return compiled.render({ model: args });
};

const meta: Meta<SectionIconCardsModel> = {
  title: 'Sections/IconCards',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
};

export default meta;

export const Default: StoryObj<SectionIconCardsModel> = {
  args: {
    ...defaultData
  },
  render: Template,
};

export const CenterAlign: StoryObj<SectionIconCardsModel> = {
  args: {
    ...defaultData,
    options: {
      align: 'center',
      theme: 'light',
    },
  },
  render: Template,
};

export const Dark: StoryObj<SectionIconCardsModel> = {
  args: {
    ...defaultData,
    options: {
      align: 'center',
      theme: 'dark',
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },

  render: Template,
};
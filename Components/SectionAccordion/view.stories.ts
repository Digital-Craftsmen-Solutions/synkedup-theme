import template from '@/Components/SectionAccordion/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionAccordionModel } from './model';
import { renderTwig } from '../../stories/utils';
import { HSAccordion } from 'preline';

const defaultData: SectionAccordionModel = {
  heading: {
    before: 'Frequently Asked',
    highlight: 'Questions',
    after: '',
    description: 'Here are some of the most common questions and answers.',
    type: 'h2',
  },
  accordion: {
    items: [
      {
        id: 'faq1',
        heading: 'What is Flynt?',
        contentHtml: '<p>Flynt is a modular WordPress starter theme using Timber and ACF Pro.</p>',
        expanded: false,
      },
      {
        id: 'faq2',
        heading: 'How do I add a new component?',
        contentHtml: '<p>Just create a new folder in the Components directory and register it.</p>',
        expanded: false,
      },
    ],
  },
  options: {
    theme: 'light'
  }
};

const withAutoInit = {
  play: async () => {
    HSAccordion.autoInit();
  }
};

const meta: Meta<SectionAccordionModel> = {
  title: 'Sections/Accordion',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  ...withAutoInit
};

export default meta;
const compiled = renderTwig(template);
const Template = (args: SectionAccordionModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<SectionAccordionModel> = {
  args: {
    ...defaultData
  },
  render: Template,
};

export const KeepOpen: StoryObj<SectionAccordionModel> = {
  args: {
    heading: defaultData.heading,
    accordion: {
      ...defaultData.accordion,
      items: [
        { ...defaultData.accordion.items[0], id: 'faq-keep-open-1' },
        { ...defaultData.accordion.items[1], id: 'faq-keep-open-2' }
      ],
    },
    options: {
      keepOpen: true,
      theme: 'light'
    }
  },
  render: Template,
};

export const Dark: StoryObj<SectionAccordionModel> = {
  args: {
    heading: defaultData.heading,
    accordion: {
      ...defaultData.accordion,
      items: [
        { ...defaultData.accordion.items[0], id: 'faq-dark-open-1' },
        { ...defaultData.accordion.items[1], id: 'faq-dark-open-2' }
      ],
    },
    options: {
      theme: 'dark'
    }
  },
  render: Template,
};
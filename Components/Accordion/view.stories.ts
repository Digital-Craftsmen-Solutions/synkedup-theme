import template from '@/Components/Accordion/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { AccordionModel } from './model';
import { renderTwig } from '../../stories/utils';
import './script';
import { HSAccordion } from 'preline';

const defaultData = {
  items: [
    {
      id: 'item-1',
      heading: 'Accordion Item 1',
      contentHtml: '<p>This is the first accordion item content.</p>',
      expanded: true,
      class: '',
    },
    {
      id: 'item-2',
      heading: 'Accordion Item 2',
      contentHtml: '<p>This is the second accordion item content.</p>',
      expanded: false,
      class: '',
    },
    {
      id: 'item-3',
      heading: 'Accordion Item 3',
      contentHtml: '<p>This is the second accordion item content.</p>',
      expanded: false,
      class: '',
    }
  ],
  options: {
    keepOpen: false
  }
}

const meta: Meta<AccordionModel> = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  args: {
    ...defaultData
  }
};

export default meta;
const compiled = renderTwig(template);
const Template = (args: AccordionModel) => {
  return compiled.render({ model: args });
};

const withAutoInit = {
  play: async () => {
    HSAccordion.autoInit();
  }
};

export const Default: StoryObj<AccordionModel> = {
  args: {
    ...defaultData
  },
  render: Template,
  ...withAutoInit
};

export const KeepOpen: StoryObj<AccordionModel> = {
  args: {
    items: [
      { ...defaultData.items[0], id: 'item-keep-open-1' },
      { ...defaultData.items[1], id: 'item-keep-open-2' },
      { ...defaultData.items[2], id: 'item-keep-open-3' }
    ],

    options: {
      keepOpen: true
    }
  },

  render: Template,
  ...withAutoInit
};


export const Dark: StoryObj<AccordionModel> = {
  args: {
    items: [
      { ...defaultData.items[0], id: 'item-dark-open-1' },
      { ...defaultData.items[1], id: 'item-dark-open-2' },
      { ...defaultData.items[2], id: 'item-dark-open-3' }
    ],

    options: {
      theme: 'dark'
    }
  },

  render: Template,
  ...withAutoInit
};

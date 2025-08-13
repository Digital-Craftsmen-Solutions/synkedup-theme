import template from '@/Components/LayoutTabs/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { LayoutTabsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { HSTabs } from 'preline';

const defaultData: LayoutTabsModel = {
  heading: {
    before: 'Explore',
    highlight: 'Tabs',
    after: '',
    description: 'Switch between different content panels.',
    type: 'h2',
  },
  tabs: [
    {
      id: 'FirstTab',
      title: 'Quote',
      component: '<div>Content for the first tab.</div>',
    },
    {
      id: 'SecondTab',
      title: 'Schedule',
      component: '<div>Content for the second tab.</div>',
    },
    {
      id: 'ThirdTab',
      title: 'Complete Job',
      component: '<div>Content for the third tab.</div>',
    },
    {
      id: 'FourthTab',
      title: 'Get Paid',
      component: '<div>Content for the third tab.</div>',
    },
  ],
  options: {
    theme: 'light'
  },
};

const compiled = renderTwig(template);
const Template = (args: LayoutTabsModel) => {
  return compiled.render({ model: args });
};

const withAutoInit = {
  play: async () => {
    HSTabs.autoInit();
  }
};

const meta: Meta<LayoutTabsModel> = {
  title: 'Layouts/Tabs',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  ...withAutoInit
};

export default meta;

export const Default: StoryObj<LayoutTabsModel> = {
  args: {
    ...defaultData
  },
  render: Template,
};

export const Dark: StoryObj<LayoutTabsModel> = {
  args: {
    ...defaultData,
    options: {
      theme: 'dark'
    }
  },
  render: Template,
};

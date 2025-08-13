import template from '@/Components/SectionFeatureTabs/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { FeatureTabModel, SectionFeatureTabsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { HSTabs } from 'preline';

const defaultTabData: FeatureTabModel = {
  id: '',
  title: '',
  description: '<div>Content for the first tab.</div>',
  actionButton: {
    title: 'Learn More',
    url: '/learn-more',
    target: '_blank'
  },
  image: {
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    alt: 'Feature Image',
    width: 800,
    height: 600
  },
}

const defaultData: SectionFeatureTabsModel = {
  heading: {
    before: 'Explore',
    highlight: 'Tabs',
    after: '',
    description: 'Switch between different content panels.',
    type: 'h2',
  },
  tabs: [
    {
      ...defaultTabData,
      id: 'FirstTab',
      title: 'Optional line items',
      description: '<div>Content for the first tab.</div>',
    },
    {
      ...defaultTabData,
      id: 'SecondTab',
      title: 'Quote follow-ups',
      description: '<div>Content for the second tab.</div>',
    },
    {
      ...defaultTabData,
      id: 'ThirdTab',
      title: 'Quote approvals',
      description: '<div>Content for the third tab.</div>',
    },
    {
      ...defaultTabData,
      id: 'FourthTab',
      title: 'Markups',
      description: '<div>Content for the third tab.</div>',
    },
  ],
  options: {
    theme: 'light'
  },
};

const compiled = renderTwig(template);
const Template = (args: SectionFeatureTabsModel) => {
  return compiled.render({ model: args });
};

const withAutoInit = {
  play: async () => {
    HSTabs.autoInit();
  }
};

const meta: Meta<SectionFeatureTabsModel> = {
  title: 'Sections/FeatureTabs',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  ...withAutoInit
};

export default meta;

export const Default: StoryObj<SectionFeatureTabsModel> = {
  args: {
    ...defaultData
  },
  render: Template,
};

export const Dark: StoryObj<SectionFeatureTabsModel> = {
  args: {
    ...defaultData,
    options: {
      theme: 'dark'
    }
  },
  render: Template,
};

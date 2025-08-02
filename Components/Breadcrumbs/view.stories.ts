import template from '@/Components/Breadcrumbs/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { BreadcrumbsModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: BreadcrumbsModel = {
  items: [
    {
      label: 'Home',
      url: '#',
      icon: 'home'
    },
    {
      label: 'App Center',
      url: '#',
      icon: 'appcenter'
    },
    {
      label: 'Application',
      isCurrent: true
    }
  ]
};

const meta: Meta<BreadcrumbsModel> = {
  title: 'Components/Breadcrumbs',
  tags: ['autodocs'],
  args: {
    ...defaultData
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: BreadcrumbsModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<BreadcrumbsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const WithoutIcons: StoryObj<BreadcrumbsModel> = {
  render: Template,
  args: {
    items: [
      {
        label: 'Home',
        url: '#'
      },
      {
        label: 'App Center',
        url: '#'
      },
      {
        label: 'Application',
        isCurrent: true
      }
    ]
  }
};
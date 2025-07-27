import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { AvatarModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: AvatarModel = {
  image: {
    src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    alt: 'Avatar',
  },
  options: {
    size: 'medium',
    theme: 'light'
  }
};

const meta: Meta<AvatarModel> = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: {
      control: { type: 'object' }
    }
  }
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: AvatarModel) => compiled.render({ model: args });

export const Small: StoryObj<AvatarModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, size: 'small' }
  }
};

export const Medium: StoryObj<AvatarModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, size: 'medium' }
  }
};

export const Large: StoryObj<AvatarModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: { ...defaultData.options, size: 'large' }
  }
};
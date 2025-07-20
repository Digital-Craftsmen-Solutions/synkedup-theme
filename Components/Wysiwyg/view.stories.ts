import template from '@/Components/Wysiwyg/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { WysiwygModel } from './model';
import { renderTwig } from '../../stories/utils';

const meta: Meta<WysiwygModel> = {
  title: 'Components/Wysiwyg',
  tags: ['autodocs'],
  argTypes: {
    contentHtml: {
      control: 'text',
      defaultValue: '<p>This is WYSIWYG editor content.</p>'
    },
    class: {
      control: 'text',
      defaultValue: ''
    }
  }
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: WysiwygModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<WysiwygModel> = {
  render: Template,
  args: {
    contentHtml: '<p>This is WYSIWYG editor content.</p>',
    class: ''
  }
};

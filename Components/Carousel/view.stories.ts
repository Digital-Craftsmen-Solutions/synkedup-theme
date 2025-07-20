import template from '@/Components/Carousel/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { CarouselModel } from './model';
import { renderTwig } from '../../stories/utils';

const meta: Meta<CarouselModel> = {
  title: 'Components/Carousel',
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      defaultValue: 'menu'
    },
    title: {
      control: 'text',
      defaultValue: 'Responsive'
    },
    text: {
      control: 'text',
      defaultValue: 'Responsive, and mobile-first project on the web'
    },
    class: {
      control: 'text',
      defaultValue: ''
    }
  }
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: CarouselModel) => {
  return compiled.render({ model: args });
};

export const Icon: StoryObj<CarouselModel> = {
  render: Template,
  args: {
    icon: 'menu',
    title: 'Responsive',
    text: 'Responsive, and mobile-first project on the web',
    class: ''
  }
};

export const Figure: StoryObj<CarouselModel> = {
  render: Template,
  args: {
    title: '$N.NN',
    text: 'Profit generated',
    class: ''
  }
};

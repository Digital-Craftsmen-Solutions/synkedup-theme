import template from '@/Components/Testimonials/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { TestimonialsModel } from './model';
import { renderTwig } from '../../stories/utils';
import HSCarousel from '@preline/carousel';

const defaultData: TestimonialsModel = {
  quotes: [
    {
      quote: 'Flynt made our WordPress development so much more maintainable and scalable.',
      authorName: 'Jane Doe',
      sourceTitle: 'Lead Developer, Acme Inc.',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/44.jpg',
        alt: 'Jane Doe'
      },
    },
    {
      quote: 'The component-based approach just works for our agency workflow.',
      authorName: 'John Smith',
      sourceTitle: 'CTO, WebWorks',
      avatar: {
        src: 'https://randomuser.me/api/portraits/men/32.jpg',
        alt: 'John Smith'
      },
    },
    {
      quote: 'I love how easy it is to create beautiful, consistent sites.',
      authorName: 'Emily Johnson',
      sourceTitle: 'Designer',
      avatar: {
        src: 'https://randomuser.me/api/portraits/women/65.jpg',
        alt: 'Emily Johnson'
      },
    }
  ],
  options: {
    showArrows: true,
    showDots: true,
    theme: 'light'
  }
};

const withAutoInit = {
  play: async () => {
    HSCarousel.autoInit();
  }
};

const meta: Meta<TestimonialsModel> = {
  title: 'Components/Testimonials',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: {
      control: 'object'
    }
  },
  ...withAutoInit
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: TestimonialsModel) => {
  return compiled.render({ model: args });
};

export const Default: StoryObj<TestimonialsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const NoArrows: StoryObj<TestimonialsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      showArrows: false
    }
  }
};

export const NoDots: StoryObj<TestimonialsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      showDots: false
    }
  }
};

export const Dark: StoryObj<TestimonialsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      theme: 'dark'
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};
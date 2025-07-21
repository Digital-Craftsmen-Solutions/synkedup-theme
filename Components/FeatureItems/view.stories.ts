import template from '@/Components/FeatureItems/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { FeatureItemsModel } from './model';
import { renderTwig } from '../../stories/utils';

const meta: Meta<FeatureItemsModel> = {
  title: 'Sections/FeatureItems',
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: {
      control: 'object',
    },
    title: {
      control: 'object',
    },
    contentHtml: {
      control: 'text',
    },
    ctaType: {
      control: { type: 'select' },
      options: ['buttons', 'form', 'none'],
      defaultValue: 'buttons'
    },
    ctaButtons: {
      control: 'object',
    }
  }
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: FeatureItemsModel) => {
  return compiled.render({ model: args });
};

export const Light: StoryObj<FeatureItemsModel> = {
  render: Template,
  args: {
    backgroundImage: undefined,
    title: {
      before: 'Welcome to',
      highlight: 'Our Product',
      after: 'Today'
    },
    contentHtml: '<p>This is a hero section with full background and call to action buttons.</p>',
    ctaType: 'buttons',
    ctaButtons: {
      primaryButton: {
        title: 'Get Started',
        url: '/get-started',
        target: '_self'
      },
      secondaryButton: {
        title: 'Learn More',
        url: '/learn-more',
        target: '_blank'
      }
    }
  }
};

export const Dark: StoryObj<FeatureItemsModel> = {
  render: Template,
  args: {
    backgroundImage: {
      src: 'https://synkedup.local/wp-content/uploads/resized/2025/05/SynkedUP-Background-768x0-c-default.jpg',
      alt: 'Hero Background'
    },
    title: {
      before: 'Introducing',
      highlight: 'Something New'
    },
    contentHtml: '<p>Experience our secondary theme with more features and flexibility.</p>',
    ctaType: 'buttons',
    ctaButtons: {
      primaryButton: {
        title: 'Explore',
        url: '/explore'
      }
    },
    options: {
      theme: 'dark'
    }
  }
};

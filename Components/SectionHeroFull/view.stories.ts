import template from '@/Components/SectionHeroFull/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionHeroFullModel } from './model';
import { renderTwig } from '../../stories/utils';

const defaultData: SectionHeroFullModel =
{
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
  },
  options: {
    theme: 'light'
  }
}

const meta: Meta<SectionHeroFullModel> = {
  title: 'Sections/HeroFull',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    ctaType: {
      control: { type: 'radio' },
      options: ['none', 'buttons', 'form'],
      defaultValue: 'buttons'
    },
  }
};

export default meta;

const compiled = renderTwig(template)
const Template = (args: SectionHeroFullModel) => {
  return compiled.render({ model: args });
};

export const Light: StoryObj<SectionHeroFullModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionHeroFullModel> = {
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

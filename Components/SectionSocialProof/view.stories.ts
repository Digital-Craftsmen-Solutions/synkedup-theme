import template from '@/Components/SectionSocialProof/index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionSocialProofModel } from './model';
import { renderTwig } from '../../stories/utils';
import HSCarousel from '@preline/carousel';

const defaultData: SectionSocialProofModel = {
  heading: {
    before: 'Trusted by',
    highlight: 'thousands',
    after: 'of happy customers',
    type: 'h2',
    options: { theme: 'light' }
  },
  action: {
    actionType: 'buttons',
    ctaButtons: {
      primaryButton: {
        title: 'Get Started',
        url: '/get-started',
      },
      secondaryButton: {
        title: 'Contact Sales',
        url: '/contact',
      }
    }
  },
  stats: [
    { figure: '10K+', description: 'Jobs estimated & sold by SynkedUP powered businesses' },
    { figure: '99.99%', description: 'Jobs estimated & sold by SynkedUP powered businesses' },
    { figure: '500+', description: 'Jobs estimated & sold by SynkedUP powered businesses' },
    { figure: '24/7', description: 'Jobs estimated & sold by SynkedUP powered businesses' }
  ],
  testimonials: {
    quotes: [
      {
        quote: 'Flynt made our WordPress development so much more maintainable and scalable.',
        authorName: 'Jane Doe',
        sourceTitle: 'Lead Developer, Acme Inc.',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/44.jpg',
          alt: 'Jane Doe'
        },
        options: { display: 'plain', theme: 'light' }
      },
      {
        quote: 'The component-based approach just works for our agency workflow.',
        authorName: 'John Smith',
        sourceTitle: 'CTO, WebWorks',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/32.jpg',
          alt: 'John Smith'
        },
        options: { display: 'plain', theme: 'light' }
      },
      {
        quote: 'I love how easy it is to create beautiful, consistent sites.',
        authorName: 'Emily Johnson',
        sourceTitle: 'Designer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/65.jpg',
          alt: 'Emily Johnson'
        },
        options: { display: 'plain', theme: 'light' }
      }
    ],
    options: {
      showArrows: true,
      showDots: true,
      theme: 'light'
    }
  },
  options: {
    theme: 'light'
  }
};

const withAutoInit = {
  play: async () => {
    HSCarousel.autoInit();
  }
};

const meta: Meta<SectionSocialProofModel> = {
  title: 'Sections/SocialProof',
  tags: ['autodocs'],
  args: {
    ...defaultData
  },
  argTypes: {
    options: { control: 'object' }
  },
  ...withAutoInit
};

export default meta;

const compiled = renderTwig(template);
const Template = (args: SectionSocialProofModel) => {
  return compiled.render({ model: args });
};

export const Light: StoryObj<SectionSocialProofModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionSocialProofModel> = {
  render: Template,
  args: {
    ...defaultData,
    heading: {
      ...defaultData.heading,
      options: { theme: 'dark' }
    },
    testimonials: {
      ...defaultData.testimonials,
      options: {
        ...defaultData.testimonials.options,
        theme: 'dark'
      },
      quotes: defaultData.testimonials.quotes.map(q => ({
        ...q,
        options: { ...q.options, theme: 'dark' }
      }))
    },
    options: {
      theme: 'dark'
    }
  },
  globals: {
    backgrounds: { value: 'dark' },
  }
};
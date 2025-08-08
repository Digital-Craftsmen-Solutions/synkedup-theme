import template from './index.twig?url';
import type { Meta, StoryObj } from '@storybook/html';
import type { SectionCarouselCardsModel } from './model';
import { renderTwig } from '../../stories/utils';
import { CardImageModel } from '../CardImage/model';
import HSCarousel from '@preline/carousel';

const cards: CardImageModel[] = [
  {
    title: 'Card One',
    description: 'This is the description of the first card.',
    subtitle: 'Subtitle 1',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      alt: 'Card 1'
    },
    actionButton: {
      title: 'Read More',
      url: '/card-1'
    },
  },
  {
    title: 'Card Two',
    description: 'Second card with overlay image style.',
    subtitle: 'Subtitle 2',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      alt: 'Card 2'
    },
    actionButton: {
      title: 'Explore',
      url: '/card-2'
    },
  },
  {
    title: 'Card Three',
    description: 'The image is displayed at the bottom.',
    subtitle: 'Subtitle 3',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      alt: 'Card 3'
    },
    actionButton: {
      title: 'Discover',
      url: '/card-3'
    },
  },
  {
    title: 'Card Three',
    description: 'The image is displayed at the bottom.',
    subtitle: 'Subtitle 3',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      alt: 'Card 3'
    },
    actionButton: {
      title: 'Discover',
      url: '/card-3'
    },
  },
  {
    title: 'Card Three',
    description: 'The image is displayed at the bottom.',
    subtitle: 'Subtitle 3',
    backgroundImage: {
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      alt: 'Card 3'
    },
    actionButton: {
      title: 'Discover',
      url: '/card-3'
    },
  }
];

const defaultData: SectionCarouselCardsModel = {
  heading: {
    before: 'Learn From the Pro\'s. Tap Into Your Potential',
    highlight: 'Potential',
    type: 'h3'
  },
  cards,
  action: {
    actionType: 'buttons',
    ctaButtons: {
      secondaryButton: {
        title: 'Learn More',
        url: '/learn-more',
        target: '_blank'
      }
    }
  },
  options: {
    theme: 'light',
    align: 'left',
    display: 'imageOverlay'
  }
};

const withAutoInit = {
  play: async () => {
    HSCarousel.autoInit();
  }
};

const meta: Meta<SectionCarouselCardsModel> = {
  title: 'Sections/CarouselCards',
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
const Template = (args: SectionCarouselCardsModel) => compiled.render({ model: args });

export const Light: StoryObj<SectionCarouselCardsModel> = {
  render: Template,
  args: {
    ...defaultData
  }
};

export const Dark: StoryObj<SectionCarouselCardsModel> = {
  render: Template,
  args: {
    ...defaultData,
    options: {
      ...defaultData.options,
      theme: 'dark'
    }
  },

};
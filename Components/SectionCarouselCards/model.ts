import type { HeadingModel } from '../Heading/model';
import type { CardImageModel } from '../CardImage/model';
import type { ActionModel } from '../Action/model';

export type SectionCarouselCardsModel = {
  heading: HeadingModel;
  cards: CardImageModel[];
  action?: ActionModel;
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
  };
};
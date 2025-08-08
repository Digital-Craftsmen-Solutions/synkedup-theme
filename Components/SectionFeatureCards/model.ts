import type { CardImageModel } from '../CardImage/model';
import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';

export type SectionFeatureCardsModel = {
  heading?: HeadingModel;
  cards: CardImageModel[];
  action?: ActionModel;
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
    expandFirst?: boolean
  };
};
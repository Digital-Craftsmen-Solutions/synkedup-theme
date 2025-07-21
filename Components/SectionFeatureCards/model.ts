import type { CardImageModel } from '../CardImage/model';
import type { HeadingModel } from '../Heading/model';
import type { ButtonModel } from '../Button/model';

export type SectionFeatureCardsModel = {
  title?: HeadingModel;
  contentHtml?: string;
  cards: CardImageModel[];
  ctaButtons?: {
    primaryButton?: ButtonModel;
    secondaryButton?: ButtonModel;
  };
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
  };
};
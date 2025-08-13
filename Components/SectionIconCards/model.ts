import { CardModel } from "../Card/model";
import { HeadingModel } from "../Heading/model";
import type { ActionModel } from '../Action/model';

export type SectionIconCardsModel = {
  heading: HeadingModel;
  cards: CardModel[];
  action?: ActionModel;
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};
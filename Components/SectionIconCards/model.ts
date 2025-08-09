import { CardModel } from "../Card/model";
import { HeadingModel } from "../Heading/model";

export type SectionIconCardsModel = {
  heading: HeadingModel;
  cards: CardModel[];
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};
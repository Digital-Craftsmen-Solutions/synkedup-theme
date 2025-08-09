import type { HeadingModel } from '../Heading/model';
import { CardPricingModel } from '../CardPricing/model';
import { SwitchModel } from '../Switch/model';

export type SectionPricingCardsModel = {
  heading?: HeadingModel;
  labelMonth: string
  labelYear: string;
  defaultPeriod?: 'month' | 'year';
  periodSwitch: SwitchModel,
  cards: CardPricingModel[];
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
  };
};
import type { HeadingModel } from '../Heading/model';
import { PricingCardModel } from '../PricingCard/model';
import { SwitchModel } from '../Switch/model';

export type SectionPricingCardsModel = {
  heading?: HeadingModel;
  labelMonth: string
  labelYear: string;
  defaultPeriod?: 'month' | 'year';
  periodSwitch: SwitchModel,
  cards: PricingCardModel[];
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
  };
};
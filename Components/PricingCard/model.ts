import { ButtonModel } from '../Button/model';

type FeatureListItem = {
  label: string;
};

export type PricingCardModel = {
  icon?: string
  title?: string;
  description?: string;
  priceMonth: number
  priceYear: number;
  labelMonth: string
  labelYear: string;
  switchId?: string;
  period?: 'month' | 'year';
  extraCost?: string;
  actionButton?: ButtonModel;
  badge?: string;
  features: FeatureListItem[];
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};

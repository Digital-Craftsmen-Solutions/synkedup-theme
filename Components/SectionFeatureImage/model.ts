import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { QuoteModel } from '../Quote/model';

export type FeatureListItem = {
  label: string;
};

export type SectionFeatureImageModel = {
  icon?: string;
  heading: HeadingModel;
  features: FeatureListItem[];
  action?: ActionModel;
  quote?: QuoteModel;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  options?: {
    theme?: 'light' | 'dark';
    imageDisplay?: 'full' | 'left' | 'right';
  };
};
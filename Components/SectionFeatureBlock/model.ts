import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { QuoteModel } from '../Quote/model';
import { ImageModel } from '../Common/model';

export type FeatureListItem = {
  label: string;
};

export type SectionFeatureBlockModel = {
  icon?: string;
  heading: HeadingModel;
  features: FeatureListItem[];
  action?: ActionModel;
  quote?: QuoteModel;
  image: ImageModel;
  mobileImage?: ImageModel;
  options?: {
    theme?: 'light' | 'dark';
    imageDisplay?: 'full' | 'left' | 'right';
  };
};
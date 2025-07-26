import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { SectionFeatureItemsModel } from '../SectionFeatureItems/model';

export type SectionHeroFullModel = {
  backgroundImage?: {
    src: string;
    alt: string;
  };
  heading: HeadingModel;
  action?: ActionModel;
  extraItems?: SectionFeatureItemsModel;
  options?: {
    theme?: 'light' | 'dark';
  };
};
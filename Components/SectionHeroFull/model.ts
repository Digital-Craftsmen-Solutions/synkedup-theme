import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { SectionFeatureItemsModel } from '../SectionFeatureItems/model';
import { ImageModel } from '../Common/model';

export type SectionHeroFullModel = {
  backgroundImage?: ImageModel;
  heading: HeadingModel;
  action?: ActionModel;
  extraItems?: SectionFeatureItemsModel;
  options?: {
    theme?: 'light' | 'dark';
  };
};
import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { SectionFeatureItemsModel } from '../SectionFeatureItems/model';
import { ImageModel } from '../Common/model';
import { BreadcrumbsModel } from '../Breadcrumbs/model';

export type SectionHeroFullModel = {
  backgroundImage?: ImageModel;
  mobileImage?: ImageModel;
  heading: HeadingModel;
  action?: ActionModel;
  extraItems?: SectionFeatureItemsModel;
  breadcrumbs?: BreadcrumbsModel;
  options?: {
    theme?: 'light' | 'dark';
    display?: 'full' | 'split';
  };
};
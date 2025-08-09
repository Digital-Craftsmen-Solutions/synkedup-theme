import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';
import type { SectionIconItemsModel } from '../SectionIconItems/model';
import { ImageModel } from '../Common/model';
import { BreadcrumbsModel } from '../Breadcrumbs/model';

export type SectionHeroFullModel = {
  backgroundImage?: ImageModel;
  mobileImage?: ImageModel;
  heading: HeadingModel;
  action?: ActionModel;
  extraItems?: SectionIconItemsModel;
  breadcrumbs?: BreadcrumbsModel;
  options?: {
    theme?: 'light' | 'dark';
    display?: 'full' | 'split';
  };
};
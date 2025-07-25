import { ActionModel } from "../Action/model";
import { SectionFeatureItemsModel } from "../SectionFeatureItems/model";

export type SectionHeroFullModel = {
  backgroundImage?: {
    src: string;
    alt: string;
  };
  title: {
    before: string;
    highlight?: string;
    after?: string;
  };
  contentHtml: string;
  action?: ActionModel;
  extraItems?: SectionFeatureItemsModel;
  options?: {
    theme?: 'light' | 'dark';
  };
};
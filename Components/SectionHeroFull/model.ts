import { ButtonModel } from "../Button/model";
import { ItemBoxModel } from "../ItemBox/model";
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
  ctaType?: 'none' | 'buttons' | 'form';
  ctaButtons: {
    primaryButton?: ButtonModel;
    secondaryButton?: ButtonModel;
  };
  extraItems?: SectionFeatureItemsModel
  options?: {
    theme?: 'light' | 'dark';
  };
};
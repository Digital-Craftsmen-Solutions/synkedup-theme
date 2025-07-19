import { ButtonModel } from "../Button/model";

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
  ctaType: 'none' | 'buttons' | 'form';
  ctaButtons: {
    primaryButton?: ButtonModel;
    secondaryButton?: ButtonModel;
  };
  options?: {
    theme?: 'light' | 'dark';
  };
};
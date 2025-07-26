import type { HeadingModel } from '../Heading/model';
import type { ActionModel } from '../Action/model';

export type SectionCallToActionModel = {
  heading: HeadingModel;
  action?: ActionModel;
  options?: {
    theme?: 'light' | 'dark' | 'alt';
    display?: 'full' | 'split';
  };
};
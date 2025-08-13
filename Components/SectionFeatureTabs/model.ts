import { ButtonModel } from '../Button/model';
import { ImageModel } from '../Common/model';
import type { HeadingModel } from '../Heading/model';

export type FeatureTabModel = {
  id: string;
  title: string;
  description: string;
  image?: ImageModel;
  actionButton?: ButtonModel;
}

export type SectionFeatureTabsModel = {
  heading: HeadingModel;
  tabs: FeatureTabModel[];
  options?: {
    theme?: 'light' | 'dark';
  };
};
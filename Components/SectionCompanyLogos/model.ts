import { ImageModel } from '../Common/model';
import type { HeadingModel } from '../Heading/model';

export type SectionCompanyLogosModel = {
  heading: HeadingModel;
  logos: ImageModel[];
  options?: {
    theme?: 'light' | 'dark';
  };
};
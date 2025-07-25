import type { HeadingModel } from '../Heading/model';

export type CompanyLogo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SectionCompanyLogosModel = {
  heading: HeadingModel;
  logos: CompanyLogo[];
  options?: {
    theme?: 'light' | 'dark';
  };
};
import type { ActionModel } from '../Action/model';
import type { TestimonialsModel } from '../Testimonials/model';
import type { HeadingModel } from '../Heading/model';

export type Stat = {
  figure: string;
  description: string;
};

export type SectionSocialProofModel = {
  heading: HeadingModel;
  action?: ActionModel;
  stats: Stat[];
  testimonials: TestimonialsModel;
  options?: {
    theme?: 'light' | 'dark';
  };
};
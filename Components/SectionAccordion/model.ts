import type { HeadingModel } from '../Heading/model';
import { AccordionModel } from '../Accordion/model';

export type SectionAccordionModel = {
  heading: HeadingModel;
  accordion: AccordionModel;
  options?: {
    theme?: 'light' | 'dark';
    keepOpen?: boolean
  };
};
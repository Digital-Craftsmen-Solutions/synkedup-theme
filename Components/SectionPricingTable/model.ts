import type { TableModel } from '../Table/model';
import type { HeadingModel } from '../Heading/model';

export type SectionPricingTableModel = {
  heading: HeadingModel;
  table: TableModel;
  options?: {
    theme?: 'light' | 'dark';
  };
};
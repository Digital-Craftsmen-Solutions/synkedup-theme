import type { HeadingModel } from '../Heading/model';

export type TabComponentModel = {
  id: string;
  title: string;
  component: any;
}

export type LayoutTabsModel = {
  heading: HeadingModel;
  tabs: TabComponentModel[];
  options?: {
    theme?: 'light' | 'dark';
    display?: 'top' | 'left';
  };
};
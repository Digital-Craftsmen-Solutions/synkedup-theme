import { ItemBoxModel } from "../ItemBox/model";

export type SectionFeatureItemsModel = {
  items: ItemBoxModel[];
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};
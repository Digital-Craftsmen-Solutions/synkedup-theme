import { ItemBoxModel } from "../ItemBox/model";

export type SectionIconItemsModel = {
  items: ItemBoxModel[];
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};
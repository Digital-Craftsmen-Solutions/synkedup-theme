import { ImageModel } from "../Common/model";

export type ItemBoxModel = {
  type: 'icon' | 'image' | 'figure';
  icon?: string
  image?: ImageModel;
  title?: string;
  description?: string;
  class?: string;
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};

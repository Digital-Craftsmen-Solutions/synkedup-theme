import { ImageModel } from "../Common/model";

export type AvatarModel = {
  image: ImageModel;
  options?: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
  };
};
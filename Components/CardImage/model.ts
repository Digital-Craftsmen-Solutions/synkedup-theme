import { ButtonModel } from "../Button/model";
import { ImageModel } from "../Common/model";

export type CardImageModel = {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage: ImageModel;
  actionButton?: ButtonModel,
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
  };
};
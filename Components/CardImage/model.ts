import { ButtonModel } from "../Button/model";

export type CardImageModel = {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  action?: ButtonModel,
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
  };
};
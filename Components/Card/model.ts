import { ButtonModel } from '../Button/model';

export type CardModel = {
  type: 'icon' | 'image';
  icon?: string; // Name of the icon (for @Components/Common/_icon.twig)
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  actionButton?: ButtonModel;
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};
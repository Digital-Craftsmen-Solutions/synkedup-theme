import { ButtonModel } from '../Button/model';
import { ItemBoxModel } from '../ItemBox/model';

export type CardModel = ItemBoxModel & {
  actionButton?: ButtonModel;
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};

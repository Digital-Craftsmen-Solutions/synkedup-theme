import type { ButtonModel } from '../Button/model';

export type ActionModel = {
  ctaType?: 'none' | 'buttons' | 'form';
  ctaButtons?: {
    primaryButton?: ButtonModel;
    secondaryButton?: ButtonModel;
  };
  gravityForm?: string;
  options?: {
    theme?: 'light' | 'dark';
  };
};
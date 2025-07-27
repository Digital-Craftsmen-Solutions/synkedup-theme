import type { ButtonModel } from '../Button/model';

export type ActionModel = {
  actionType: 'none' | 'buttons' | 'form';
  ctaButtons?: {
    primaryButton?: ButtonModel;
    secondaryButton?: ButtonModel;
  };
  gravityForm?: string;
  options?: {
    theme?: 'light' | 'dark';
  };
};
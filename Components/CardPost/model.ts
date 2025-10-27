import { ButtonModel } from "../Button/model";
import { ImageModel } from "../Common/model";

export type CardPostModel = {
  title: string;
  description?: string;
  subtitle?: string;
  backgroundImage: ImageModel;
  actionButton?: ButtonModel,
  options?: {
    theme?: 'light' | 'dark';
  };
};
import { ImageModel } from "../Common/model";

export type QuoteModel = {
  quote: string;
  authorName?: string;
  sourceTitle?: string;
  avatar?: ImageModel;
  options?: {
    display?: 'bordered' | 'plain';
    theme?: 'light' | 'dark';
  };
};
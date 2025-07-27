import type { QuoteModel } from '../Quote/model';

export type TestimonialsModel = {
  quotes: QuoteModel[];
  options?: {
    autoPlay?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    theme?: 'light' | 'dark';
  };
};  
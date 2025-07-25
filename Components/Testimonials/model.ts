import type { QuoteModel } from '../Quote/model';

export type TestimonialsModel = {
  quotes: QuoteModel[];
  options?: {
    showArrows?: boolean;
    showDots?: boolean;
    theme?: 'light' | 'dark';
  };
};  
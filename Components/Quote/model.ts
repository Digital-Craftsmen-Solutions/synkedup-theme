export type QuoteModel = {
  quote: string;
  authorName?: string;
  sourceTitle?: string;
  avatar?: {
    src: string;
    alt?: string;
  };
  options?: {
    display?: 'bordered' | 'plain';
    theme?: 'light' | 'dark';
  };
};
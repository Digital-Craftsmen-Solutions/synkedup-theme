export type HeadingModel = {
  before: string;
  highlight?: string;
  after?: string;
  type?: 'h1' | 'h2' | 'h3';
  options?: {
    theme?: 'light' | 'dark';
  };
};
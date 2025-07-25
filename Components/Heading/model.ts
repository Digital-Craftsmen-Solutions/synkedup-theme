export type HeadingModel = {
  before: string;
  highlight?: string;
  after?: string;
  type?: 'h1' | 'h2' | 'h3';
  description?: string;
  options?: {
    theme?: 'light' | 'dark';
    align?: 'center' | 'left';
    size?: 'default' | 'wide' | 'narrow';
  };
};
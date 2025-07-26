export type HeadingModel = {
  before: string;
  highlight?: string;
  after?: string;
  description?: string;
  type?: 'h1' | 'h2' | 'h3';
  options?: {
    theme?: 'light' | 'dark';
    align?: 'center' | 'left';
    type?: 'h1' | 'h2' | 'h3';
    size?: 'default' | 'wide' | 'narrow';
    hideHighlight?: boolean;
  };
};
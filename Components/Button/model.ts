export type ButtonModel = {
  type?: 'primary' | 'secondary'
  title: string;
  url: string;
  target?: '_self' | '_blank';
  class?: string;
};

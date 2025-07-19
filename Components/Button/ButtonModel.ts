export type ButtonModel = {
  type: 'primary' | 'secondary' | 'ghost' | 'link';
  title: string;
  url: string;
  target?: '_self' | '_blank';
  class?: string;
};

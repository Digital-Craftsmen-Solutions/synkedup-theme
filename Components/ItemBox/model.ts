export type ItemBoxModel = {
  type: 'icon' | 'image' | 'figure';
  icon?: string
  image?: {
    src: string;
    alt: string;
  };
  title?: string;
  description?: string;
  class?: string;
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};

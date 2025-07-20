export type CardImageModel = {
  title: string;
  description: string;
  subtitle?: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  options?: {
    theme?: 'light' | 'dark';
    align?: 'left' | 'center';
    display?: 'imageTop' | 'imageBottom' | 'imageOverlay';
  };
};
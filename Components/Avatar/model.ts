export type AvatarModel = {
  src: string;
  alt?: string;
  options?: {
    size?: 'small' | 'medium' | 'large';
    theme?: 'light' | 'dark';
  };
};
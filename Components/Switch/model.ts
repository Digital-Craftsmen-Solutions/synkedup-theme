export type SwitchModel = {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  options?: {
    theme?: 'light' | 'dark';
  };
};
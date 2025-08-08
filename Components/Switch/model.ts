export type SwitchModel = {
  id?: string;
  labelOff?: string;
  labelOn?: string;
  labelOnBadge?: string;
  checked?: boolean;
  disabled?: boolean;
  options?: {
    theme?: 'light' | 'dark';
  };
};
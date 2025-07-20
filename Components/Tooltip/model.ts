export type TooltipModel = {
  label: string;
  tooltip: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  icon?: 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevron-up';
  options?: {
    theme?: 'light' | 'dark';
  };
};
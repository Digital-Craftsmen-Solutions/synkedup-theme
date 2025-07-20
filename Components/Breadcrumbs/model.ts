export type BreadcrumbItemModel = {
  label: string;
  url?: string;
  icon?: 'home' | 'appcenter' | string;
  isCurrent?: boolean;
};

export type BreadcrumbModel = {
  items: BreadcrumbItemModel[];
  options?: {
    theme?: 'light' | 'dark';
  }
};
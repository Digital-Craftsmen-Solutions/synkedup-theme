export type BreadcrumbItemModel = {
  label: string;
  url?: string;
  icon?: 'home' | 'appcenter' | string;
  isCurrent?: boolean;
};

export type BreadcrumbsModel = {
  items: BreadcrumbItemModel[];
  options?: {
    theme?: 'light' | 'dark';
  }
};
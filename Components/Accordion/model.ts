export type AccordionModel = {
  items: AccordionItemModel[],
  options?: {
    theme?: 'light' | 'dark';
    keepOpen?: boolean
  };
};

export type AccordionItemModel = {
  id: string
  heading: string
  contentHtml: string;
  expanded: boolean;
  class?: string;
};

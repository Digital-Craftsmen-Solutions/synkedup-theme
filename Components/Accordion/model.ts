type AccordionItemModel = {
  id: string
  heading: string
  contentHtml: string;
  expanded: boolean;
  class?: string;
};

export type AccordionModel = {
  items: AccordionItemModel[],
  options?: {
    theme?: 'light' | 'dark';
    keepOpen?: boolean
  };
};

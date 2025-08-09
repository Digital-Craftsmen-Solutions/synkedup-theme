type TableHead = {
  label: string;
  key: string;
};

type TableRow = {
  [key: string]: string | number | boolean;
};

export type TableModel = {
  head: TableHead[];
  rows: TableRow[];
  options?: {
    align?: 'left' | 'center';
    theme?: 'light' | 'dark';
  };
};

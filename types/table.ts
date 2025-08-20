export type TableDataBase = Record<string, any>;

export type TableColumn<TData extends TableDataBase> = {
  display: (data: TData) => string | number | Promise<string | number>;
  label: string;
  width?: `${number}%` | `${number}px`;
  sortable?: boolean;
};

export type TableFetcher<TData> = (params: {
  limit: number;
  sort: {
    by: keyof TData | null;
    direction: "asc" | "desc" | null;
  };
}) => Promise<TData[]>;

export type ApartmentTableProps<TData extends TableDataBase> = {
  columns: Record<string, TableColumn<TData>>;
  fetcher: TableFetcher<TData>;
  title?: string;
};

interface UseSearchOptions<T> {
  items: T[];
  filterFn: (item: T, query: string) => boolean;
}
export declare function useSearch<T>({
  items,
  filterFn,
}: UseSearchOptions<T>): {
  query: string;
  setQuery: import('react').Dispatch<import('react').SetStateAction<string>>;
  filteredItems: T[];
  hasQuery: boolean;
};
export {};

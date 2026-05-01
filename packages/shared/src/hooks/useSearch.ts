import { useState, useMemo } from 'react';

interface UseSearchOptions<T> {
  items: T[];
  filterFn: (item: T, query: string) => boolean;
}

export function useSearch<T>({ items, filterFn }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      return items;
    }
    return items.filter((item) => filterFn(item, trimmedQuery));
  }, [items, query, filterFn]);

  return {
    query,
    setQuery,
    filteredItems,
    hasQuery: query.trim().length > 0,
  };
}

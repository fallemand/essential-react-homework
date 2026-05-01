import { useState, useMemo } from 'react';
export function useSearch({ items, filterFn }) {
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

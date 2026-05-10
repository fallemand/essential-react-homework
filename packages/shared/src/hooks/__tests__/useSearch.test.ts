import { renderHook, act } from '@lottery/testing/web';
import { useSearch } from '../index';

const items = [
  { name: 'Mega Millions' },
  { name: 'Powerball' },
  { name: 'EuroMillions' },
];

const filterFn = (item: { name: string }, query: string) =>
  item.name.toLowerCase().includes(query);

describe('useSearch', () => {
  it('returns all items when query is empty', () => {
    const { result } = renderHook(() => useSearch({ items, filterFn }));

    expect(result.current.filteredItems).toHaveLength(3);
    expect(result.current.hasQuery).toBe(false);
  });

  it('filters items by query', () => {
    const { result } = renderHook(() => useSearch({ items, filterFn }));

    act(() => result.current.setQuery('million'));

    expect(result.current.filteredItems).toEqual([
      { name: 'Mega Millions' },
      { name: 'EuroMillions' },
    ]);
    expect(result.current.hasQuery).toBe(true);
  });

  it('trims whitespace from query before filtering', () => {
    const { result } = renderHook(() => useSearch({ items, filterFn }));

    act(() => result.current.setQuery('  power  '));

    expect(result.current.filteredItems).toEqual([{ name: 'Powerball' }]);
  });
});

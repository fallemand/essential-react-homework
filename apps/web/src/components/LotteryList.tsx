import { useCallback } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import {
  Casino as CasinoIcon,
  SentimentDissatisfied as SadIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useSearch, useLotteries } from '@lottery/shared/hooks';
import type { Lottery } from '@lottery/shared/types';
import { LotteryCard } from './LotteryCard';
import { SearchInput } from './SearchInput';
import { EmptyState } from './EmptyState';

interface LotteryListProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function LotteryList({
  selectedIds,
  onSelectionChange,
}: LotteryListProps) {
  const { lotteries, loading, error, refresh } = useLotteries();

  const filterLottery = useCallback((lottery: Lottery, query: string) => {
    return (
      lottery.name.toLowerCase().includes(query) ||
      lottery.prize.toLowerCase().includes(query) ||
      lottery.id.toLowerCase().includes(query)
    );
  }, []);

  const { query, setQuery, filteredItems } = useSearch({
    items: lotteries,
    filterFn: filterLottery,
  });

  const handleToggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const hasLotteries = lotteries.length > 0;
  const hasResults = filteredItems.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Typography variant="h3" component="h1">
          Lotteries
        </Typography>
        <CasinoIcon sx={{ fontSize: 40 }} />
      </Box>

      {hasLotteries && (
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search lotteries..."
        />
      )}

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      ) : !hasLotteries ? (
        <EmptyState
          icon={<SadIcon sx={{ fontSize: 60, color: 'text.secondary' }} />}
          title="There are no lotteries currently"
        />
      ) : !hasResults ? (
        <EmptyState
          icon={<SearchIcon sx={{ fontSize: 60, color: 'text.secondary' }} />}
          title={`No results found for "${query}"`}
          subtitle="Try a different search term"
        />
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filteredItems.map((lottery) => (
            <LotteryCard
              key={lottery.id}
              lottery={lottery}
              selected={selectedIds.includes(lottery.id)}
              onSelect={handleToggleSelection}
              onRefresh={refresh}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

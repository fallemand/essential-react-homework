import { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Casino as CasinoIcon,
  SentimentDissatisfied as SadIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { LotteryCard } from './LotteryCard';
import { useLotteries } from '../hooks/useLotteries';

interface LotteryListProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function LotteryList({
  selectedIds,
  onSelectionChange,
}: LotteryListProps) {
  const { lotteries, loading, error, refresh } = useLotteries();
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const filteredLotteries = useMemo(() => {
    if (!searchQuery.trim()) {
      return lotteries;
    }

    const query = searchQuery.toLowerCase();
    return lotteries.filter(
      (lottery) =>
        lottery.name.toLowerCase().includes(query) ||
        lottery.prize.toLowerCase().includes(query) ||
        lottery.id.toLowerCase().includes(query),
    );
  }, [lotteries, searchQuery]);

  const hasLotteries = lotteries.length > 0;
  const hasResults = filteredLotteries.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Typography variant="h3" component="h1">
          Lotteries
        </Typography>
        <CasinoIcon sx={{ fontSize: 40 }} />
      </Box>

      {hasLotteries && (
        <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="Search lotteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            gap: 2,
          }}
        >
          <SadIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            There are no lotteries currently
          </Typography>
        </Box>
      ) : !hasResults ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            gap: 2,
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            No results found for &quot;{searchQuery}&quot;
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try a different search term
          </Typography>
        </Box>
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
          {filteredLotteries.map((lottery) => (
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

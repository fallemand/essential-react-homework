import { Container, Typography, Box, CircularProgress } from '@mui/material';
import {
  Casino as CasinoIcon,
  SentimentDissatisfied as SadIcon,
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

  const handleToggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Typography variant="h3" component="h1">
          Lotteries
        </Typography>
        <CasinoIcon sx={{ fontSize: 40 }} />
      </Box>

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
      ) : lotteries.length === 0 ? (
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
          {lotteries.map((lottery) => (
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

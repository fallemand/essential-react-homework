import { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import {
  Casino as CasinoIcon,
  SentimentDissatisfied as SadIcon,
} from '@mui/icons-material';
import { LotteryCard } from './LotteryCard';
import { getLotteries } from '../services/api';
import type { Lottery } from '../types';

export function LotteryList() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotteries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLotteries();
        setLotteries(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load lotteries',
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchLotteries();
  }, []);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLotteries();
      setLotteries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lotteries');
    } finally {
      setLoading(false);
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
              onRefresh={handleRefresh}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

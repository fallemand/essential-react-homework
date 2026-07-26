import { useState, useEffect, useCallback } from 'react';
import { getLotteryById } from '../utils/api';
import type { Lottery } from '../types/index';

export function useLotteryDetails(lotteryId: string) {
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLottery = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLotteryById(id);
      setLottery(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lottery');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchLottery(lotteryId);
  }, [lotteryId, fetchLottery]);

  return {
    lottery,
    loading,
    error,
    refresh: () => fetchLottery(lotteryId),
  };
}

import { useState, useEffect, useCallback } from 'react';
import { getLotteries } from '../utils/api.js';
import type { Lottery } from '../types/index.js';

export function useLotteries() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLotteries();
        setLotteries(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load lotteries'
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  return {
    lotteries,
    loading,
    error,
    refresh,
  };
}

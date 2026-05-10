import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'registered_lotteries';

export function useRegisteredLotteries() {
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRegisteredLotteries();
  }, []);

  const loadRegisteredLotteries = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRegisteredIds(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.warn('Failed to load registered lotteries:', error);
      setRegisteredIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const saveRegisteredLotteries = async (ids: Set<string>) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
    } catch (error) {
      console.warn('Failed to save registered lotteries:', error);
    }
  };

  const addRegisteredLotteries = useCallback(
    async (lotteryIds: string[]) => {
      const newRegisteredIds = new Set([...registeredIds, ...lotteryIds]);
      setRegisteredIds(newRegisteredIds);
      await saveRegisteredLotteries(newRegisteredIds);
    },
    [registeredIds]
  );

  const isRegistered = useCallback(
    (lotteryId: string) => registeredIds.has(lotteryId),
    [registeredIds]
  );

  const clearRegisteredLotteries = useCallback(async () => {
    setRegisteredIds(new Set());
    await saveRegisteredLotteries(new Set());
  }, []);

  return {
    registeredIds,
    loading,
    addRegisteredLotteries,
    isRegistered,
    clearRegisteredLotteries,
  };
}

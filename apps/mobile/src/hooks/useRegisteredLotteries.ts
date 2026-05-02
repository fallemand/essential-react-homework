import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'registered_lotteries';

let AsyncStorage: any = null;

try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  console.warn('AsyncStorage not available:', error);
}

export function useRegisteredLotteries() {
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (AsyncStorage) {
      loadRegisteredLotteries();
    }
  }, []);

  const loadRegisteredLotteries = async () => {
    if (!AsyncStorage) {
      setLoading(false);
      return;
    }
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
    if (!AsyncStorage) return;
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

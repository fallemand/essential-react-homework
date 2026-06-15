import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import type { Lottery } from '@lottery/shared/types';
import { LotteryCard } from './LotteryCard';

interface LotteriesListProps {
  lotteries: Lottery[];
  loading: boolean;
  searchQuery: string;
  selectedIds?: Set<string>;
  registeredIds?: Set<string>;
  onLotteryPress?: (id: string) => void;
  onRefresh?: () => void;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export function LotteriesList({
  lotteries,
  loading,
  searchQuery,
  selectedIds,
  registeredIds,
  onLotteryPress,
  onRefresh,
  onScroll,
}: LotteriesListProps) {
  const hasLotteries = lotteries.length > 0;
  const isSearching = searchQuery.length > 0;

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }

  if (!hasLotteries && !isSearching) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.emptyTitle}>There are no lotteries currently</Text>
      </View>
    );
  }

  if (!hasLotteries && isSearching) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.emptyTitle}>
          No search results for "{searchQuery}"
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={lotteries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LotteryCard
          lottery={item}
          isSelected={selectedIds?.has(item.id)}
          isRegistered={registeredIds?.has(item.id)}
          onPress={() => onLotteryPress?.(item.id)}
          onRefresh={onRefresh}
        />
      )}
      contentContainerStyle={styles.list}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
});

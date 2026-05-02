import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import type { Lottery } from '@lottery/shared/types';
import { LotteryCard } from './LotteryCard';

interface LotteriesListProps {
  lotteries: Lottery[];
  loading: boolean;
  searchQuery: string;
  onRefresh?: () => void;
}

export function LotteriesList({
  lotteries,
  loading,
  searchQuery,
  onRefresh,
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
        <LotteryCard lottery={item} onRefresh={onRefresh} />
      )}
      contentContainerStyle={styles.list}
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

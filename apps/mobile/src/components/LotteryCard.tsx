import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import type { Lottery } from '@lottery/shared/types';

interface LotteryCardProps {
  lottery: Lottery;
  onRefresh?: () => void;
}

export function LotteryCard({ lottery, onRefresh }: LotteryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{lottery.name}</Text>
        <Text style={styles.prize}>{lottery.prize}</Text>
        <Text style={styles.id}>{lottery.id}</Text>
      </View>
      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Text style={styles.refreshIcon}>🔄</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  prize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    color: '#999',
  },
  refreshButton: {
    padding: 8,
  },
  refreshIcon: {
    fontSize: 24,
  },
});

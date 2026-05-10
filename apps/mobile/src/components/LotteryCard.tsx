import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import type { Lottery } from '@lottery/shared/types';

interface LotteryCardProps {
  lottery: Lottery;
  isSelected?: boolean;
  isRegistered?: boolean;
  onPress?: () => void;
  onRefresh?: () => void;
}

export function LotteryCard({
  lottery,
  isSelected,
  isRegistered,
  onPress,
  onRefresh,
}: LotteryCardProps) {
  const handlePress = () => {
    if (!isRegistered && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        isRegistered && styles.registeredCard,
      ]}
      onPress={handlePress}
      disabled={isRegistered}
      activeOpacity={isRegistered ? 1 : 0.7}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isRegistered && styles.registeredText]}>
          {lottery.name}
        </Text>
        <Text style={[styles.prize, isRegistered && styles.registeredText]}>
          {lottery.prize}
        </Text>
        <Text style={[styles.id, isRegistered && styles.registeredText]}>
          {lottery.id}
        </Text>
      </View>
      {isRegistered && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Registered</Text>
        </View>
      )}
      {!isRegistered && onRefresh && (
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Text style={styles.refreshIcon}>🔄</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
  selectedCard: {
    borderColor: '#e91e63',
    borderWidth: 2,
    backgroundColor: '#fff5f8',
  },
  registeredCard: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
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
  registeredText: {
    color: '#999',
  },
  badge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  refreshButton: {
    padding: 8,
  },
  refreshIcon: {
    fontSize: 24,
  },
});

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ReactElement } from 'react';
import { useRoute } from '@react-navigation/native';
import { useLotteryDetails } from '@lottery/shared/hooks';
import type { Lottery } from '@lottery/shared/types';
import type { LotteryDetailsRouteProp } from '../../App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LotteryDetailsError } from '../components/LotteryDetailsError';

/* ----- DATA PROVIDER ----- */

interface LotteryDetailsDataProviderProps {
  children: (lotteryDetails: Lottery) => ReactElement;
  lotteryId: string;
}

const LotteryDetailsDataProvider = ({
  children,
  lotteryId,
}: LotteryDetailsDataProviderProps) => {
  const { lottery, loading, error } = useLotteryDetails(lotteryId);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1976d2" />
      </View>
    );
  }
  if (error || !lottery) {
    throw new Error(error ?? 'Lottery not found');
  }
  return children(lottery);
};

/* ----- VIEW ----- */

interface LotteryDetailsViewProps {
  lottery: Lottery;
}

const LotteryDetailsView = ({ lottery }: LotteryDetailsViewProps) => {
  const isFinished = lottery.status === 'finished';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{lottery.name}</Text>
        <View
          style={[
            styles.statusBadge,
            isFinished ? styles.statusFinished : styles.statusRunning,
          ]}
        >
          <Text style={styles.statusText}>{lottery.status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Prize</Text>
        <Text style={styles.prize}>{lottery.prize}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.value}>{lottery.type}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.id} selectable>
          {lottery.id}
        </Text>
      </View>
    </ScrollView>
  );
};

/* ----- SCREEN ----- */

const fallback = <LotteryDetailsError />;

export const LotteryDetails = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <ErrorBoundary fallback={fallback}>
      <LotteryDetailsDataProvider lotteryId={route.params.id}>
        {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
      </LotteryDetailsDataProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusRunning: {
    backgroundColor: '#4caf50',
  },
  statusFinished: {
    backgroundColor: '#9e9e9e',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  prize: {
    fontSize: 22,
    fontWeight: '600',
    color: '#e91e63',
  },
  value: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  id: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'monospace',
  },
});

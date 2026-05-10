import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useLotteries, useSearch } from '@lottery/shared/hooks';
import type { Lottery } from '@lottery/shared/types';
import { RootStackParamList } from '../../App';
import { SearchBar } from '../components/SearchBar';
import { LotteriesList } from '../components/LotteriesList';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: HomeProps) {
  const { lotteries, loading, error, refresh } = useLotteries();

  const filterLottery = useCallback((lottery: Lottery, query: string) => {
    const q = query.toLowerCase();
    return lottery.name.toLowerCase().includes(q);
  }, []);

  const { query, setQuery, filteredItems } = useSearch({
    items: lotteries,
    filterFn: filterLottery,
  });

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lotteries 🎰</Text>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      <LotteriesList
        lotteries={filteredItems}
        loading={loading}
        searchQuery={query}
        onRefresh={refresh}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddLottery')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
  },
});

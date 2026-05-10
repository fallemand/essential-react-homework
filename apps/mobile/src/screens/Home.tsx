import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useCallback, useState, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useLotteries, useSearch } from '@lottery/shared/hooks';
import { registerForLottery } from '@lottery/shared/utils';
import type { Lottery } from '@lottery/shared/types';
import { RootStackParamList } from '../../App';
import { SearchBar } from '../components/SearchBar';
import { LotteriesList } from '../components/LotteriesList';
import { RegisterModal } from '../components/RegisterModal';
import { useRegisteredLotteries } from '../hooks/useRegisteredLotteries';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: HomeProps) {
  const { lotteries, loading, refresh } = useLotteries();
  const { registeredIds, addRegisteredLotteries } = useRegisteredLotteries();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState(false);
  const isFirstFocus = useRef(true);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleRegister = async (name: string) => {
    const selectedArray = Array.from(selectedIds);

    for (const lotteryId of selectedArray) {
      try {
        await registerForLottery(lotteryId, name);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: error instanceof Error ? error.message : 'Failed to register',
        });
        throw error;
      }
    }

    await addRegisteredLotteries(selectedArray);
    setSelectedIds(new Set());

    Toast.show({
      type: 'success',
      text1: 'Registration Successful',
      text2: `Registered for ${selectedArray.length} ${selectedArray.length === 1 ? 'lottery' : 'lotteries'}`,
    });
  };

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
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
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
        selectedIds={selectedIds}
        registeredIds={registeredIds}
        onLotteryPress={toggleSelection}
        onRefresh={refresh}
      />

      {selectedIds.size > 0 && (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.registerButtonText}>
            Register ({selectedIds.size})
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddLottery')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <RegisterModal
        visible={modalVisible}
        selectedCount={selectedIds.size}
        onClose={() => setModalVisible(false)}
        onRegister={handleRegister}
      />
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
  registerButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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

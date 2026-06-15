import { StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
  LotteryListSortingOptions,
  useLotteriesSortingContext,
} from '../contexts/LotteriesSortingContext';

interface HomeHeaderProps {
  height: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
  scale: Animated.AnimatedInterpolation<string | number>;
}

export const HomeHeader = ({ height, opacity, scale }: HomeHeaderProps) => {
  return (
    <Animated.View style={[styles.header, { height, opacity }]}>
      <Animated.Text style={[styles.title, { transform: [{ scale }] }]}>
        Lotteries 🎰
      </Animated.Text>
      <LotteriesSortingButton />
    </Animated.View>
  );
};

const LotteriesSortingButton = () => {
  const { selectedSorting, switchSorting } = useLotteriesSortingContext();
  const isAscending = selectedSorting === LotteryListSortingOptions.Ascending;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.sortingButton}
      onPress={switchSorting}
    >
      <Text style={styles.sortingButtonText}>Prices</Text>
      <AntDesign
        name={isAscending ? 'arrow-up' : 'arrow-down'}
        size={16}
        color="black"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  sortingButton: {
    position: 'absolute',
    right: 16,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortingButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 3,
  },
});

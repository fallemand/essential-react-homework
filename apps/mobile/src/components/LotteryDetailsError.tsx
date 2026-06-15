import { StyleSheet, View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../colors';

export const LotteryDetailsError = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={48} color="black" />
      <Text style={styles.whoopsText}>Whoops...!</Text>
      <Text style={styles.regularText}>Something went wrong!</Text>
      <Text style={styles.regularText}>
        We were unable to load your lottery...
      </Text>
      <View style={styles.button}>
        <Button title="Navigate back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
  },
  whoopsText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 10,
  },
  regularText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

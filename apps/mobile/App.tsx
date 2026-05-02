import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { initializeApiUrl } from '@lottery/shared/utils';
import Home from './src/screens/Home';
import AddLottery from './src/screens/AddLottery';

export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

initializeApiUrl(process.env.EXPO_PUBLIC_API_URL);

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddLottery" component={AddLottery} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
      <Toast />
    </>
  );
}

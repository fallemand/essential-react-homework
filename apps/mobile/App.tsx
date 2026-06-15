import { NavigationContainer, type RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import { initializeApiUrl } from '@lottery/shared/utils';
import Home from './src/screens/Home';
import AddLottery from './src/screens/AddLottery';
import { LotteryDetails } from './src/screens/LotteryDetails';

export const Routes = {
  Home: 'Home',
  AddLottery: 'AddLottery',
  LotteryDetails: 'LotteryDetails',
} as const;

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.AddLottery]: undefined;
  [Routes.LotteryDetails]: { id: string };
};

export type LotteryDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Routes.LotteryDetails
>;

export type LotteryDetailsRouteProp = RouteProp<
  RootStackParamList,
  typeof Routes.LotteryDetails
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

initializeApiUrl(process.env.EXPO_PUBLIC_API_URL);

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={Routes.Home} component={Home} />
          <Stack.Screen name={Routes.AddLottery} component={AddLottery} />
          <Stack.Screen
            name={Routes.LotteryDetails}
            component={LotteryDetails}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
      <Toast />
    </>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TransferScreen from './src/screens/TransferScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Traceify Bank' }} />
        <Stack.Screen name="Transfer" component={TransferScreen} options={{ title: 'Transfer Funds' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Transaction History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

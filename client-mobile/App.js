import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppLogin from './src/screens/AppLogin';
import AppSignup from './src/screens/AppSignup';
import AppDashboard from './src/screens/AppDashboard';
import AppTransfer from './src/screens/AppTransfer';
import AppHistory from './src/screens/AppHistory';
import AppProfile from './src/screens/AppProfile';
import AppSuccess from './src/screens/AppSuccess';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="AppLogin"
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8F9FB' } }}
      >
        <Stack.Screen name="AppLogin" component={AppLogin} />
        <Stack.Screen name="AppSignup" component={AppSignup} />
        <Stack.Screen name="AppDashboard" component={AppDashboard} />
        <Stack.Screen name="AppTransfer" component={AppTransfer} />
        <Stack.Screen name="AppHistory" component={AppHistory} />
        <Stack.Screen name="AppProfile" component={AppProfile} />
        <Stack.Screen name="AppSuccess" component={AppSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

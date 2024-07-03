// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomBarRoutes from './BottomBarRoutes';
import LoginScreen from '../screens/Logins/LoginScreen';
import SignUpScreen from '../screens/Logins/SignUpScreen';
import EmailConfirmationScreen from '../screens/Logins/EmailConfirmationScreen';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarAnimation: 'fade',
          statusBarColor: 'white',
          statusBarStyle: 'dark',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeRoutes" component={BottomBarRoutes} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="EmailConfirmation"
          component={EmailConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;

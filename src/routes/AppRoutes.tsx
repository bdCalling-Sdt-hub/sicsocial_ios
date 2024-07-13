// In App.js in a new project

import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomBarRoutes from './BottomBarRoutes';
import LoginScreen from '../screens/Logins/LoginScreen';
import SignUpScreen from '../screens/Logins/SignUpScreen';
import EmailConfirmationScreen from '../screens/Logins/EmailConfirmationScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import VerifyEmailScreen from '../screens/Logins/VerifyEmailScreen';
import ResetPasswordScreen from '../screens/Logins/ResetPasswordScreen';
import VerifySuccessfulScreen from '../screens/Logins/VerifySuccessfulScreen';
import ContextApi, {useContextApi, useStyles} from '../context/ContextApi';
import DonationScreen from '../screens/donation/DonationScreen';
import NotificationsScreen from '../screens/notification/NotificationsScreen';
import PaymentsScreen from '../screens/payments/PaymentsScreen';
import SearchScreen from '../screens/search/SearchScreen';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {colors} = useStyles();
  const {isDark} = useContextApi();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            statusBarAnimation: 'fade',
            statusBarColor: colors.bg,
            statusBarStyle: isDark ? 'light' : 'dark',
          }}>
          {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeRoutes" component={BottomBarRoutes} />
          <Stack.Screen
            name="EmailConfirmation"
            component={EmailConfirmationScreen}
          />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen
            name="VerifySuccessful"
            component={VerifySuccessfulScreen}
          />
          <Stack.Screen
            name="donation"
            component={DonationScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Payments"
            component={PaymentsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(true);

  return (
    <ContextApi>
      {isSplash ? <SplashScreen setIsSplash={setIsSplash} /> : <Routes />}
    </ContextApi>
  );
}

export default AppRoutes;

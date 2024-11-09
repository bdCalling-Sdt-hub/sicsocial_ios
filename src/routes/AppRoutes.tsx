// In App.js in a new project

import * as React from 'react';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import ContextApi, {useContextApi, useStyles} from '../context/ContextApi';
import {getSocket, initiateSocket} from '../redux/services/socket';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '../redux/store';
import LoadingSplash from '../screens/LoadingSplash';
import ChangePassword from '../screens/Logins/ChnagePassword';
import DeleteAccount from '../screens/Logins/DeleteAccount';
import EmailConfirmationScreen from '../screens/Logins/EmailConfirmationScreen';
import InterestScreen from '../screens/Logins/InterestScreen';
import LoginScreen from '../screens/Logins/LoginScreen';
import ResetPasswordScreen from '../screens/Logins/ResetPasswordScreen';
import SignUpScreen from '../screens/Logins/SignUpScreen';
import VerifyEmailScreen from '../screens/Logins/VerifyEmailScreen';
import VerifySuccessfulScreen from '../screens/Logins/VerifySuccessfulScreen';
import SplashScreen from '../screens/SplashScreen';
import TextScreen from '../screens/TextScreen';
import DonationScreen from '../screens/donation/DonationScreen';
import FriendsProfile from '../screens/friends/FriendsProfile';
import CreateNewFaceDown from '../screens/message/CreateNewFaceDown';
import FaceDownAddMember from '../screens/message/FaceDownAddMember';
import FaceDownConversation from '../screens/message/FaceDownConversation';
import GroupConversationScreen from '../screens/message/GroupConversationScreen';
import LiveAddFriendsScreen from '../screens/message/LiveAddFriendsScreen';
import LiveConversationScreen from '../screens/message/LiveConversationScreen';
import LiveMessageScreen from '../screens/message/LiveMessageScreen';
import MakeGroupScreen from '../screens/message/MakeGroupScreen';
import MassageScreen from '../screens/message/MassageScreen';
import NormalConversationScreen from '../screens/message/NormalConversationScreen';
import NotificationsScreen from '../screens/notification/NotificationsScreen';
import PaymentsScreen from '../screens/payments/PaymentsScreen';
import MyAllFriends from '../screens/profile/MyAllFriends';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingScreen from '../screens/profile/SettingScreen';
import ViewAllFaceDown from '../screens/profile/ViewAllFaceDown';
import AboutSicScreen from '../screens/profile/settings/AboutSicScreen';
import FAQScreen from '../screens/profile/settings/FAQScreen';
import FeedBackScreen from '../screens/profile/settings/FeedBackScreen';
import ManageAccounts from '../screens/profile/settings/ManageAccoutns';
import PrivacyPolicyScreen from '../screens/profile/settings/PrivacyPolicyScreen';
import SicGuidelinesScreen from '../screens/profile/settings/SicGuidelinesScreen';
import TermsAndConditions from '../screens/profile/settings/TermsAndConditions';
import SearchScreen from '../screens/search/SearchScreen';
import BookShareScreen from '../screens/sharebooks/BookShareScreen';
import BookShareWithCategory from '../screens/sharebooks/BookShareWithCategory';
import BooksScreen from '../screens/sharebooks/BooksScreen';
import PDFViewer from '../screens/sharebooks/PDFViewer';
import BottomBarRoutes from './BottomBarRoutes';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {colors} = useStyles();
  const {isDark} = useContextApi();

  const {token} = useSelector((state: any) => state?.token);

  const socket = getSocket();

  React.useEffect(() => {
    if (socket) {
      console.warn('Socket is already initialized');
      return;
    }
    initiateSocket();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={token ? 'HomeRoutes' : 'Login'}
      screenOptions={{
        headerShown: false,
        statusBarAnimation: 'fade',
        statusBarColor: colors.bg,
        statusBarStyle: isDark ? 'light' : 'dark',
      }}>
      {/* <Stack.Screen name="Test" component={TestScreen} /> */}

      {/* <Stack.Screen name="TEsting" component={TestScreen} /> */}
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Test" component={TextScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Loading" component={LoadingSplash} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmationScreen}
      />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="VerifySuccessful"
        component={VerifySuccessfulScreen}
      />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

      {token && (
        <>
          {/*=================== under the home ====================== */}
          <Stack.Screen name="HomeRoutes" component={BottomBarRoutes} />
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
          <Stack.Screen
            name="ShareBooks"
            component={BooksScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="BookShare"
            component={BookShareScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="BookShareWithCategory"
            component={BookShareWithCategory}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Interest"
            component={InterestScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="FaceDownAddMember"
            component={FaceDownAddMember}
            options={{
              animation: 'slide_from_right',
            }}
          />
          {/*======================== Home end ============================ */}

          {/*======================== Friend start ============================ */}

          <Stack.Screen
            name="FriendsProfile"
            component={FriendsProfile}
            options={{
              animation: 'slide_from_right',
            }}
          />

          {/*======================== Friend end ============================ */}

          {/*============================ message screens start ====================*/}
          <Stack.Screen
            name="Messages"
            component={MassageScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="MakeGroup"
            component={MakeGroupScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="GroupConversation"
            component={GroupConversationScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="NormalConversation"
            component={NormalConversationScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LiveConversation"
            component={LiveConversationScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LiveMessage"
            component={LiveMessageScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LiveAddFriends"
            component={LiveAddFriendsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="CreateFaceDown"
            component={CreateNewFaceDown}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="FaceDownConversation"
            component={FaceDownConversation}
            options={{
              animation: 'slide_from_right',
            }}
          />

          {/*============================ message screens end ====================*/}

          {/*======================== Profile start ============================ */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEditScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ManageAccounts"
            component={ManageAccounts}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="FAQ"
            component={FAQScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="SicGuidelines"
            component={SicGuidelinesScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="AboutSic"
            component={AboutSicScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="Feedback"
            component={FeedBackScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="MyAllFriends"
            component={MyAllFriends}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ViewAllFaceDown"
            component={ViewAllFaceDown}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="PdfViewer"
            component={PDFViewer}
            options={{
              animation: 'slide_from_right',
            }}
          />
          {/*======================== Profile end ============================ */}
        </>
      )}
    </Stack.Navigator>
  );
};

const linking = {
  prefixes: ['http://192.168.12.202:5000/'],
  config: {
    screens: {
      HomeRoutes: 'home',
      Login: 'login',
      SignUp: 'signup',
      ResetPassword: 'reset-password',
      NormalConversation: {
        path: 'conversation/:id',
      },
      FriendsProfile: {
        path: 'profile/:userId',
      },
      // Additional screen routes
      Settings: 'settings',
      Notifications: 'notifications',
    },
  },
};
function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(true);

  return (
    <Provider store={store}>
      <ContextApi>
        {isSplash ? (
          <SplashScreen setIsSplash={setIsSplash} />
        ) : (
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <NavigationContainer linking={linking}>
                <SafeAreaView style={{flex: 1}}>
                  <Routes />
                </SafeAreaView>
              </NavigationContainer>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        )}
        {/* <Routes /> */}
      </ContextApi>
    </Provider>
  );
}

export default AppRoutes;

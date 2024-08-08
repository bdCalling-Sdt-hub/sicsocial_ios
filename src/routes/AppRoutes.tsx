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
import FriendsScreen from '../screens/friends/FriendsScreen';
import FriendsProfile from '../screens/friends/FriendsProfile';
import MassageScreen from '../screens/message/MassageScreen';

import BookShareScreen from '../screens/sharebooks/BookShareScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingScreen from '../screens/profile/SettingScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import InterestScreen from '../screens/Logins/InterestScreen';
import ManageAccounts from '../screens/profile/settings/ManageAccoutns';
import DeleteAccount from '../screens/Logins/DeleteAccount';
import ChangePassword from '../screens/Logins/ChnagePassword';
import FAQScreen from '../screens/profile/settings/FAQScreen';
import TermsAndConditions from '../screens/profile/settings/TermsAndConditions';
import PrivacyPolicyScreen from '../screens/profile/settings/PrivacyPolicyScreen';
import SicGuidelinesScreen from '../screens/profile/settings/SicGuidelinesScreen';
import AboutSicScreen from '../screens/profile/settings/AboutSicScreen';
import FeedBackScreen from '../screens/profile/settings/FeedBackScreen';
import MyAllFriends from '../screens/profile/MyAllFriends';
import ViewAllFaceDown from '../screens/profile/ViewAllFaceDown';
import MakeGroupScreen from '../screens/message/MakeGroupScreen';
import NormalConversationScreen from '../screens/message/NormalConversationScreen';
import GroupConversationScreen from '../screens/message/GroupConversationScreen';
import LiveConversationScreen from '../screens/message/LiveConversationScreen';
import LiveMessageScreen from '../screens/message/LiveMessageScreen';
import LiveAddFriendsScreen from '../screens/message/LiveAddFriendsScreen';
import CreateNewFaceDown from '../screens/message/CreateNewFaceDown';
import FaceDownConversation from '../screens/message/FaceDownConversation';
import FaceDownAddMember from '../screens/message/FaceDownAddMember';
import TestScreen from '../screens/TextScreen';
import BooksScreen from '../screens/sharebooks/BooksScreen';
import BookShareWithCategory from '../screens/sharebooks/BookShareWithCategory';

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
          {/* <Stack.Screen name="Test" component={TestScreen} /> */}

          {/* <Stack.Screen name="TEsting" component={TestScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
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
          {/*======================== Profile end ============================ */}
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

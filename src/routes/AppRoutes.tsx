// In App.js in a new project

import * as React from 'react';

import {Alert, Linking} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useContextApi, useStyles} from '../context/ContextApi';
import {getSocket, initiateSocket} from '../redux/services/socket';

import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
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
import DonationScreen from '../screens/donation/DonationScreen';
import FavoriteBooks from '../screens/favorite/FavoriteBooks';
import FriendsProfile from '../screens/friends/FriendsProfile';
import AddParticipants from '../screens/message/AddParticipants';
import CreateNewFaceDown from '../screens/message/CreateNewFaceDown';
import FaceDownConversation from '../screens/message/FaceDownConversation';
import GroupConversationScreen from '../screens/message/GroupConversationScreen';
import LiveAddFriendsScreen from '../screens/message/LiveAddFriendsScreen';
import LiveConversationScreen from '../screens/message/LiveConversationScreen';
import LiveMessageScreen from '../screens/message/LiveMessageScreen';
import MakeGroupScreen from '../screens/message/MakeGroupScreen';
import MassageScreen from '../screens/message/MassageScreen';
import MembersManage from '../screens/message/MembersMange';
import NormalConversationScreen from '../screens/message/NormalConversationScreen';
import UpdateNewFaceDown from '../screens/message/UpdateNewFaceDown';
import NotificationsScreen from '../screens/notification/NotificationsScreen';
import OfflineScreen from '../screens/offline/OfflineScreen';
import PDFViewerOffline from '../screens/offline/PDFViewerOffline';
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

// console.log(hostUrl);

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ['https://sic.org'],
  config: {
    screens: {
      Loading: {
        path: 'Loading/:url',
      },
      donation: {
        path: 'donation',
      },
      LiveConversation: {
        path: 'conversation/:live',
      },
      FriendsProfile: {
        path: 'profile/:id',
      },
      HomeRoutes: {
        path: 'homeRoutes/userProfile',
      },
    },
  },
};
const Routes = () => {
  const {colors} = useStyles();
  const {isDark, IsNet} = useContextApi();

  const {token} = useSelector((state: any) => state?.token);

  const socket = getSocket();

  const handleDeepLink = (event: any) => {
    const url = event?.url;
    if (url && !token) {
      Alert.alert('Please Login First');
    } else {
      // Linking.openURL(url);
      if (socket) {
        console.warn('Socket is already initialized');
        return;
      }
      initiateSocket();
    }
  };

  React.useEffect(() => {
    // Add deep link listener
    Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL if the app is opened from a deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        // handleDeepLink({url});
        // console.log(url);
      }
    });

    // Clean up the listener
    return () => {
      Linking?.removeAllListeners('url');
    };
  }, []);

  React.useEffect(() => {
    if (token) {
      if (socket) {
        console.warn('Socket is already initialized');
        return;
      }
      initiateSocket();
    }
  }, []);

  return (
    <NavigationContainer linking={token && linking}>
      <SafeAreaView style={{flex: 1}}>
        <>
          <Stack.Navigator
            initialRouteName={token ? 'HomeRoutes' : 'Login'}
            // initialRouteName={'test'}
            screenOptions={{
              headerShown: false,
              statusBarAnimation: 'slide',
              animation: 'slide_from_right',
              statusBarColor: colors.bg,
              statusBarStyle: isDark ? 'light' : 'dark',
            }}>
            {!IsNet ? (
              <>
                <Stack.Screen
                  name="Offline"
                  component={OfflineScreen}
                  options={{
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen
                  name="PdfViewerOffline"
                  component={PDFViewerOffline}
                  options={{
                    animation: 'slide_from_right',
                  }}
                />
              </>
            ) : (
              <>
                {/* <Stack.Screen name="Test" component={TestScreen} /> */}

                {/* <Stack.Screen name="TEsting" component={TestScreen} /> */}
                {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
                {/* <Stack.Screen name="Test" component={TextScreen} /> */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Loading" component={LoadingSplash} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen
                  name="EmailConfirmation"
                  component={EmailConfirmationScreen}
                />
                <Stack.Screen
                  name="VerifyEmail"
                  component={VerifyEmailScreen}
                />
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPasswordScreen}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                />
                <Stack.Screen
                  name="VerifySuccessful"
                  component={VerifySuccessfulScreen}
                />
                <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

                {token && (
                  <>
                    {/*=================== under the home ====================== */}
                    <Stack.Screen
                      name="HomeRoutes"
                      component={BottomBarRoutes}
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
                      name="MembersManage"
                      component={MembersManage}
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
                      name="AddParticipants"
                      component={AddParticipants}
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
                      name="UpdateNewFaceDown"
                      component={UpdateNewFaceDown}
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
                    <Stack.Screen
                      name="Offline"
                      component={OfflineScreen}
                      options={{
                        animation: 'slide_from_right',
                      }}
                    />
                    <Stack.Screen
                      name="PdfViewerOffline"
                      component={PDFViewerOffline}
                      options={{
                        animation: 'slide_from_right',
                      }}
                    />
                    <Stack.Screen
                      name="Favorite"
                      component={FavoriteBooks}
                      options={{
                        animation: 'slide_from_right',
                      }}
                    />
                    {/*======================== Profile end ============================ */}
                  </>
                )}
              </>
            )}
          </Stack.Navigator>
        </>
      </SafeAreaView>
    </NavigationContainer>
  );
};
function AppRoutes() {
  const [isSplash, setIsSplash] = React.useState(true);
  const {setIsNet} = useContextApi();
  const {type, isConnected} = useNetInfo();
  React.useEffect(() => {
    setIsNet(isConnected);
  }, [isConnected]);
  return (
    <>
      {isSplash ? (
        <SplashScreen setIsSplash={setIsSplash} />
      ) : (
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <Routes />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      )}
      {/* <Routes /> */}
    </>
  );
}

export default AppRoutes;

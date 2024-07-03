// App.tsx
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import {GColors} from '../styles/GColors';

const Tab = createBottomTabNavigator();


const routeAssets = [
  {
    name : "Home",
    icon_fill : require("../assets/icons/bottomBar/home_fill.png"),
    icon_outline : require("../assets/icons/bottomBar/home_outline.png")
  },
  {
    name : "Users",
    icon_fill : require("../assets/icons/bottomBar/add_user_fill.png"),
    icon_outline : require("../assets/icons/bottomBar/add_user_outline.png")
  },
  {
    name : "Chats",
    icon_fill : require("../assets/icons/bottomBar/chat_fill.png"),
    icon_outline : require("../assets/icons/bottomBar/chat_outline.png")
  },
  {
    name : "UserProfile",
    icon_fill : require("../assets/icons/bottomBar/user_profile_fill.png"),
    icon_outline : require("../assets/icons/bottomBar/user_profile_outline.png")
  }
]


const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <LinearGradient
      colors={[
        'rgba(255,255,255,0.0)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
        'rgba(255,255,255,1)',
      ]}
      style={[
        styles.tabBarContainer,
        {
          height: 75,
          zIndex: 5,
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        console.log(routeAssets.find((item=>item.name === route.name && item.icon_fill))?.icon_fill);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
            
           width : 50,
           height : 50,
            gap : 15,
            justifyContent : 'center',
            // alignItems : "center"
            }}>
            <Image
              source={ isFocused ? routeAssets.find((item=>item.name === route.name ))?.icon_fill :routeAssets.find((item=>item.name === route.name))?.icon_outline } // Replace with your icon source
              style={styles.tabIcon}
            />
            <View
              style={{
                borderBottomWidth: 3,
                borderBottomColor: isFocused ? '#DBB162' : "white",
              }}
            />
          </TouchableOpacity>
        );
      })}
      <StatusBar
        hidden={false}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        animated
        translucent={false}
      />
    </LinearGradient>
  );
};

const BottomBarRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarStyle: styles.tabBar,
        headerShown : false
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Users" component={HomeScreen} />
      <Tab.Screen name="Chats" component={HomeScreen} />
      <Tab.Screen name="UserProfile" component={HomeScreen} />
    
      {/* Add more Tab.Screen components as needed */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0, // Remove shadow on Android
  },
  tabButton: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    width: 24,
    height: 24,
    alignSelf : "center"
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: 'transparent', // Ensure this is transparent
    borderTopWidth: 0, // Remove the border
    elevation: 0, // Remove shadow on Android
    zIndex: 4,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default BottomBarRoutes;

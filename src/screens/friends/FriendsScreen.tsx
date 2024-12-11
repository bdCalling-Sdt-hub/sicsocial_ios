import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import FriendRequest from './components/FriendRequest';
import PeopleYouKnow from './components/PeopleYouKnow';

const FriendsScreen = ({navigation}: NavigProps<null>) => {
  // console.log(suggestedFriends);
  const {colors, font} = useStyles();
  const [isRequest, setIsRequest] = React.useState<boolean>(false);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          height: '7.2%',
        }}
      />
      <LinearGradient
        colors={colors.gradient.variantTwo}
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 20,
                color: colors.textColor.primaryColor,
              }}>
              Make Friend
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <SvgXml
              xml={`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.secondaryColor}" stroke="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: '4%',
        }}>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 14,
            color: colors.textColor.light,
            width: '70%',
          }}>
          Add interesting people to bring your{' '}
          <Text
            style={{
              fontFamily: font.PoppinsBold,
              color: colors.textColor.light,
            }}>
            hallway
          </Text>{' '}
          to life
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: '10%',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 24,
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgba(192, 192, 192, 1)',
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsRequest(false);
          }}
          style={{
            backgroundColor: isRequest
              ? colors.btn.variantTwo
              : colors.btn.variantOne,

            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            elevation: isRequest ? 0 : 2,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.normal,
              textAlign: 'center',
            }}>
            People you know
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsRequest(true);
          }}
          style={{
            backgroundColor: isRequest
              ? colors.btn.variantOne
              : colors.btn.variantTwo,

            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            elevation: isRequest ? 2 : 0,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.normal,
              textAlign: 'center',
            }}>
            Friend request
          </Text>
        </TouchableOpacity>
      </View>

      {isRequest ? (
        <FriendRequest navigation={navigation} />
      ) : (
        <PeopleYouKnow navigation={navigation} />
      )}
      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});

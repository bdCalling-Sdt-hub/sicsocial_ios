import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';

const ProfileScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          paddingHorizontal: '6%',
          marginVertical: 35,
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
          gap: 16,
        }}>
        <View
          style={{
            elevation: 10,
            backgroundColor: colors.normal,
            padding: 1,
            width: 106,
            borderRadius: 46,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 46,
              alignSelf: 'center',
            }}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/f6e4/02df/f94d91c8643f6698b126e7dec5854350?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cz4Qczd8u0VDld~tiTdDzpKyOyxcx0QKLi091Vwp7yLsWKwyX0kwvBwFi3CE~mjA1B7~52uARqrujtEPoas1jL07XHeld9MAk-bvMtOR199vh~BxYYw9hY0-XMtCz8NOw-gemuWJpZqKNq2B71gEBIZh5TR4A1VFtOFZwwVP5KaJVlrWAyXCv384mXBcpTrsSICu768Vjcu65nYevf9JiULhGtrft9MZdYjncJo5QIc1Dq~dnjWcEKfIUFTt8YItfJfxDEWxrPmLzv2uG3UjAP16rEmEsmOdNgJlbmHEqu0jB2fxIpTX2woIB75iUqgnTLjpjgxtwp-5PgStdX7P3Q__',
            }}
          />
        </View>
        <View
          style={{
            gap: 4,
          }}>
          <View
            style={{
              gap: -4,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 17,
                color: colors.textColor.primaryColor,
              }}>
              Asadullah
            </Text>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 13,
                color: colors.textColor.neutralColor,
              }}>
              asadullah@gmail.com
            </Text>
          </View>
          <View
            style={{
              gap: -4,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 17,
                color: colors.primaryColor,
              }}>
              7
            </Text>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 13,
                color: colors.primaryColor,
              }}>
              friend
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
        }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://asadullah@insta.com');
          }}
          style={{
            marginTop: 16,
            flexDirection: 'row',

            alignItems: 'center',
            gap: 8,
          }}>
          <Image
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/instagram/instagram.png')}
          />
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.rare,
            }}>
            asadullah@insta.com
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            fontFamily: font.Poppins,
            fontSize: 14,
            color: colors.textColor.neutralColor,
          }}>
          scelerisque Praesent Donec amet, eget lorem. consectetur id varius at,
          nec nec dolor quam amet, tincidunt quis vitae In Ut laoreet
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginHorizontal: '4%',
          gap: 24,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.secondaryColor,
            height: 35,
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderRadius: 50,
            elevation: 2,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/shear/shear.png')}
          />
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.neutralColor,
            }}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryColor,
            height: 35,
            flexDirection: 'row',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderRadius: 50,
            elevation: 2,
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/message/message.png')}
          />
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.white,
            }}>
            message
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: '5%',
          marginTop: 40,
        }}>
        <Text
          style={{
            fontFamily: font.PoppinsMedium,
            fontSize: 17,
            color: colors.textColor.primaryColor,
          }}>
          Chat
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 40,
            padding: 16,
            backgroundColor: colors.normal,
            borderRadius: 50,
            borderWidth: 0.3,
            borderColor: colors.textColor.neutralColor,
            alignSelf: 'center',
            width: '85%',
            elevation: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.neutralColor,
            }}>
            No chat record here
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

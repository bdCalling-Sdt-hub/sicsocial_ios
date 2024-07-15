import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {Books} from './ShareBooksScreen';

const BookShareScreen = ({navigation, route}: NavigProps<Books>) => {
  const {colors, font} = useStyles();
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Share Books"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '4%',
          paddingVertical: '5%',
        }}>
        <Image
          style={{
            width: width * 0.5,
            height: height * 0.35,
            resizeMode: 'stretch',
            borderRadius: 20,
          }}
          source={{
            uri: route?.params?.data?.image,
          }}
        />
      </View>

      <View
        style={{
          marginHorizontal: '5%',
          marginVertical: '3%',
        }}>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 14,
            color: colors.textColor.light,
          }}>
          Visit book link :
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsMedium,
              fontSize: 14,
              color: colors.textColor.light,
              textDecorationLine: 'underline',
            }}>
            https://www.rokomari/Cordless-Clippers-Professional-Supplies-Accessories/dp/B0B5KTBT7J
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: '5%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            width: 95,
            height: 95,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              // backgroundColor: 'red',
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: font.PoppinsMedium,
                  color: colors.textColor.neutralColor,
                },
              ]}>
              Share Book
            </Text>
          </View>

          <View
            // onPress={() => {
            //   handleOpen();
            // }}

            style={[
              {
                paddingHorizontal: '4%',
                paddingVertical: 16,
                backgroundColor: colors.primaryColor,
                // borderBottomWidth: 1,
                width: 90,
                height: 90,
                // borderColor: '#E2E2E2',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 2,
              },
            ]}>
            <View>
              <Image
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
                source={require('../../assets/icons/modalIcons/boogWhite.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            width: 95,
            height: 95,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 150,
              // backgroundColor: 'red',
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  fontSize: 14,
                  fontFamily: font.PoppinsMedium,
                  color: colors.textColor.neutralColor,
                },
              ]}>
              Share room
            </Text>
          </View>

          <View
            // onPress={() => {
            //   handleOpen();
            // }}

            style={[
              {
                paddingHorizontal: '4%',
                paddingVertical: 16,
                backgroundColor: colors.primaryColor,
                // borderBottomWidth: 1,
                width: 90,
                height: 90,
                // borderColor: '#E2E2E2',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                // elevation: 2,
              },
            ]}>
            <View>
              <Image
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,
                }}
                source={require('../../assets/icons/modalIcons/networkingWhite.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookShareScreen;

const styles = StyleSheet.create({});

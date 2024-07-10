import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GFonts} from '../../styles/GFonts';
import {GColors} from '../../styles/GColors';
import {NavigProps} from '../../interfaces/NaviProps';

const VerifySuccessfulScreen = ({navigation}: NavigProps<null>) => {
  setTimeout(() => {
    navigation?.navigate('HomeRoutes'); // Navigate to Home Screen when 2 seconds are passed.
  }, 2000);

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          gap: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../assets/icons/randoms/right.png')} />
        <View>
          <Text
            style={{
              fontFamily: GFonts.PoppinsMedium,
              fontSize: 16,
              color: GColors.textColor.blackNormal,
              marginBottom: 12,
            }}>
            Your account is ready
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VerifySuccessfulScreen;

const styles = StyleSheet.create({});

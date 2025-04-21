import {Image, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';

const VerifySuccessfulScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  setTimeout(() => {
    navigation?.navigate('Interest', {data: {info: 'signup'}}); // Navigate to Home Screen when 2 seconds are passed.
  }, 2000);

  return (
    <View
      style={{
        backgroundColor: colors.bg,
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
              fontFamily: font.PoppinsMedium,
              fontSize: 16,
              color: colors.textColor.secondaryColor,
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

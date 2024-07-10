import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GColors} from '../../styles/GColors';
import {GFonts} from '../../styles/GFonts';
import {NavigProps} from '../../interfaces/NaviProps';

interface VerifyEmailProps {
  routeText?: string;
  backGroundColor?: string;
  textColor?: string;
  title?: string;
  marginVertical?: number;
  onPress?: () => void;
}

const NormalButton = ({
  backGroundColor,
  routeText,
  textColor,
  title,
  marginVertical,
  onPress,
}: VerifyEmailProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backGroundColor
          ? backGroundColor
          : GColors.secondaryColor,
        borderRadius: 100,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: marginVertical ? marginVertical : 0,
      }}>
      <Text
        style={{
          fontFamily: GFonts.PoppinsSemiBold,
          fontSize: 16,
          color: textColor ? textColor : 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NormalButton;

const styles = StyleSheet.create({});

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
  hight?: number;
  textSize?: number;
  outLine?: boolean;
  width?: string | number;
}

const NormalButton = ({
  backGroundColor,
  routeText,
  textColor,
  title,
  marginVertical,
  onPress,
  hight,
  textSize,
  outLine,
  width,
}: VerifyEmailProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: outLine
          ? 'white'
          : backGroundColor
          ? backGroundColor
          : GColors.primaryColor,
        borderRadius: 100,
        borderWidth: outLine ? 1 : 0,
        borderColor: outLine ? GColors.primaryColor : 'white',
        height: hight ? hight : 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: marginVertical ? marginVertical : 0,
        width: width ? width : '100%',
      }}>
      <Text
        style={{
          fontFamily: GFonts.PoppinsSemiBold,
          fontSize: textSize ? textSize : 16,
          color: outLine
            ? GColors.primaryColor
            : textColor
            ? textColor
            : 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NormalButton;

const styles = StyleSheet.create({});

import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';
import { useStyles } from '../../context/ContextApi';

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
  isLoading ?: boolean
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
  isLoading
}: VerifyEmailProps) => {
  const {colors, font} = useStyles();
  return (
    <TouchableOpacity
    disabled={isLoading}
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: outLine
          ? colors.secondaryColor
          : backGroundColor
          ? backGroundColor
          : colors.primaryColor,
        borderRadius: 100,
        borderWidth: outLine ? 1 : 0,
        borderColor: outLine ? colors.primaryColor : 'white',
        height: hight ? hight : 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: marginVertical ? marginVertical : 0,
        width: width ? width : '100%',
        flexDirection : "row",
        gap : 10,
      
      }}>
        {
          isLoading && <ActivityIndicator size="small" color={colors.white} />
        }
      <Text
        style={{
          fontFamily: font.PoppinsSemiBold,
          fontSize: textSize ? textSize : 16,
          color: outLine
            ? colors.primaryColor
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

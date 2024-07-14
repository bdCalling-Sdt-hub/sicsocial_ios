import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import * as Animatable from 'react-native-animatable';

interface modalItemsProps {
  item: any;
  contentOffset: Animated.SharedValue<number>;
  index: number;
}
const {width: windowWidth} = Dimensions.get('window');

export const ListItemWidth = windowWidth / 4;

const ModalItems = ({item, contentOffset, index}: modalItemsProps) => {
  const {colors, font} = useStyles();
  console.log((index - 1) * ListItemWidth);
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];

    const translateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.7, 0.8, 1.2, 0.8, 0.7];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolate.CLAMP,
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateY: translateY,
        },
        // Padding left is better than translateX
        // {
        //   translateX: ListItemWidth / 2 + ListItemWidth,
        // },
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: ListItemWidth,
          aspectRatio: 1,
          margin: 4,

          backgroundColor: colors.primaryColor,
          borderRadius: 100,
        },
        rStyle,
      ]}></Animated.View>
  );
};

export default ModalItems;

const styles = StyleSheet.create({});

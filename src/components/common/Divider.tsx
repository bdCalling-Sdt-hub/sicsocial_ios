import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';

interface DividerProps {
  margin?: number;
}

const Divider = ({margin}: DividerProps) => {
  const {colors} = useStyles();
  return (
    <View
      style={{
        marginVertical: margin ? margin : 10,
        height: 1,
        width: '100%',
        backgroundColor: colors.gray.variantTwo,
      }}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({});

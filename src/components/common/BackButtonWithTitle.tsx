import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigProps} from '../../interfaces/NaviProps';

import Feather from 'react-native-vector-icons/Feather';

interface BackButtonWithTitleProps extends NavigProps<null> {
  title?: string;
  containerStyle?: {};
  BackButtonStyle?: {};
  titleStyle?: {};
  thirdColl?: boolean;
  offBack?: boolean;
  offTitle?: boolean;
}

const BackButtonWithTitle = ({
  offBack,
  navigation,
  title,
  BackButtonStyle,
  containerStyle,
  titleStyle,
  thirdColl,
  offTitle,
}: BackButtonWithTitleProps) => {
  return (
    <View
      style={[
        {
          height: 80,
          paddingTop: 20,
          paddingHorizontal: 21,
          flexDirection: 'row',
          justifyContent: offBack ? 'center' : 'space-between',
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      {offBack || (
        <TouchableOpacity
          style={BackButtonStyle}
          onPress={() => navigation && navigation.goBack()}>
          <Feather name="arrow-left" color="#636363" size={24} />
        </TouchableOpacity>
      )}

      <View>{offTitle || <Text style={titleStyle}>{title}</Text>}</View>
      {thirdColl && <View></View>}
    </View>
  );
};

export default BackButtonWithTitle;

const styles = StyleSheet.create({});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import {NavigProps} from '../../interfaces/NaviProps';

interface BackButtonWithTitleProps extends NavigProps<null> {
  title?: string;
  containerStyle?: {};
  BackButtonStyle?: {};
  titleStyle?: {};

  offBack?: boolean;
  offTitle?: boolean;
  onOptions?: boolean;
  onOptionPress?: () => void;
  button?: boolean;
  buttonComponent?: React.ReactNode;
  thirdRoll?: boolean;
  height?: number;
}

const BackButtonWithTitle = ({
  offBack,
  navigation,
  title,
  BackButtonStyle,
  containerStyle,
  titleStyle,

  offTitle,
  thirdRoll,
  onOptionPress,
  onOptions,
  button,
  buttonComponent,
  height = 80,
}: BackButtonWithTitleProps) => {
  return (
    <View
      style={[
        {
          height: height,
          // paddingTop: 20,
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
          onPress={() => {
            if (navigation && navigation.canGoBack()) {
              // If there is navigation history, go back
              navigation.goBack();
            } else {
              // If there's no navigation history (likely a deep link entry), navigate to Home
              navigation && navigation.navigate('HomeRoutes');
            }
          }}>
          <Feather name="arrow-left" color="#636363" size={24} />
        </TouchableOpacity>
      )}

      <View>{offTitle || <Text style={titleStyle}>{title}</Text>}</View>

      {onOptions && (
        <TouchableOpacity onPress={onOptionPress}>
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_854_4542)">
<path d="M9.75 12C9.75 13.2405 10.7595 14.25 12 14.25C13.2405 14.25 14.25 13.2405 14.25 12C14.25 10.7595 13.2405 9.75 12 9.75C10.7595 9.75 9.75 10.7595 9.75 12Z" fill="#333333"/>
<path d="M9.75 19.5C9.75 20.7405 10.7595 21.75 12 21.75C13.2405 21.75 14.25 20.7405 14.25 19.5C14.25 18.2595 13.2405 17.25 12 17.25C10.7595 17.25 9.75 18.2595 9.75 19.5Z" fill="#333333"/>
<path d="M9.75 4.5C9.75 5.7405 10.7595 6.75 12 6.75C13.2405 6.75 14.25 5.7405 14.25 4.5C14.25 3.2595 13.2405 2.25 12 2.25C10.7595 2.25 9.75 3.2595 9.75 4.5Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_854_4542">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
          />
        </TouchableOpacity>
      )}
      {button && buttonComponent}

      {thirdRoll && <View />}
    </View>
  );
};

export default BackButtonWithTitle;

const styles = StyleSheet.create({});

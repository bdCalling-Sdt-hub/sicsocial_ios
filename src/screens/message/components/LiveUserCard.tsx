import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useStyles} from '../../../context/ContextApi';
import {NavigProps} from '../../../interfaces/NaviProps';
import {makeImage} from '../../../utils/utils';

interface UserCardInfo extends NavigProps<any> {
  item: any;
  host?: boolean;
  sound?: boolean;
  isMute?: boolean;
  currentMute?: boolean;
  onPress?: () => void;
}

const LiveUserCard = ({
  navigation,
  item,
  host,
  sound,
  isMute,
  onPress,
}: UserCardInfo) => {
  const {colors, font} = useStyles();

  // console.log(item);

  const animatedVoice = useSharedValue(1);
  const rVoiceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animatedVoice.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    animatedVoice.value = withRepeat(
      withTiming(1.4, {duration: 1000}),
      -1,
      true,
    );
  }, []);

  // console.log(item);

  // Define the setupVideoSDKEngine method called when the App starts

  // Define the leave method called after clicking the leave channel button

  return (
    <View
      style={{
        gap: 5,
      }}>
      <TouchableOpacity
        onLongPress={() => {
          navigation?.navigate('NormalConversation');
        }}
        activeOpacity={0.9}
        onPress={onPress}
        style={{
          // paddingVertical: 5,

          width: 65,
          alignItems: 'center',

          justifyContent: 'center',
          elevation: 2,
          borderRadius: 50,
          padding: 2,
          position: 'relative',
        }}>
        {sound && (
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 50,
              backgroundColor: colors.primaryColor,
              position: 'absolute',
              right: 0,
              zIndex: +1,
              bottom: 0,
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!isMute ? (
              <SvgXml
                xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="9" fill="#F4F4F4"/>
    <g clip-path="url(#clip0_691_4678)">
    <path d="M8.9997 12.2308C8.14314 12.2298 7.32194 11.8891 6.71626 11.2835C6.11058 10.6778 5.76989 9.85658 5.76893 9.00002V7.38464C5.76893 6.52779 6.10931 5.70603 6.7152 5.10014C7.32109 4.49425 8.14285 4.15387 8.9997 4.15387C9.85655 4.15387 10.6783 4.49425 11.2842 5.10014C11.8901 5.70603 12.2305 6.52779 12.2305 7.38464V9.00002C12.2295 9.85658 11.8888 10.6778 11.2831 11.2835C10.6775 11.8891 9.85626 12.2298 8.9997 12.2308ZM8.9997 4.96156C8.42763 4.96262 7.87435 5.16585 7.43761 5.53535C7.00087 5.90484 6.70879 6.4168 6.61297 6.98079H7.78816C7.89527 6.98079 7.99799 7.02334 8.07372 7.09908C8.14946 7.17481 8.19201 7.27753 8.19201 7.38464C8.19201 7.49175 8.14946 7.59447 8.07372 7.6702C7.99799 7.74594 7.89527 7.78848 7.78816 7.78848H6.57662V8.59618H7.78816C7.89527 8.59618 7.99799 8.63872 8.07372 8.71446C8.14946 8.7902 8.19201 8.89292 8.19201 9.00002C8.19201 9.10713 8.14946 9.20985 8.07372 9.28559C7.99799 9.36132 7.89527 9.40387 7.78816 9.40387H6.61297C6.70789 9.96824 6.99972 10.4807 7.43667 10.8503C7.87362 11.2199 8.4274 11.4227 8.9997 11.4227C9.572 11.4227 10.1258 11.2199 10.5627 10.8503C10.9997 10.4807 11.2915 9.96824 11.3864 9.40387H10.2112C10.1041 9.40387 10.0014 9.36132 9.92568 9.28559C9.84994 9.20985 9.80739 9.10713 9.80739 9.00002C9.80739 8.89292 9.84994 8.7902 9.92568 8.71446C10.0014 8.63872 10.1041 8.59618 10.2112 8.59618H11.4228V7.78848H10.2112C10.1041 7.78848 10.0014 7.74594 9.92568 7.6702C9.84994 7.59447 9.80739 7.49175 9.80739 7.38464C9.80739 7.27753 9.84994 7.17481 9.92568 7.09908C10.0014 7.02334 10.1041 6.98079 10.2112 6.98079H11.3864C11.2906 6.4168 10.9985 5.90484 10.5618 5.53535C10.1251 5.16585 9.57177 4.96262 8.9997 4.96156Z" fill="#A9A9A9"/>
    <path d="M4.55919 9C4.6663 9 4.76902 9.04255 4.84476 9.11828C4.92049 9.19402 4.96304 9.29674 4.96304 9.40385C4.96411 10.3675 5.34738 11.2913 6.02878 11.9727C6.71017 12.6541 7.63402 13.0374 8.59766 13.0385H9.40535C10.3689 13.0373 11.2927 12.654 11.9741 11.9726C12.6555 11.2912 13.0388 10.3674 13.04 9.40385C13.04 9.29674 13.0825 9.19402 13.1582 9.11828C13.234 9.04255 13.3367 9 13.4438 9C13.5509 9 13.6536 9.04255 13.7294 9.11828C13.8051 9.19402 13.8477 9.29674 13.8477 9.40385C13.8463 10.5816 13.3778 11.7107 12.545 12.5435C11.7122 13.3763 10.5831 13.8448 9.40535 13.8462H8.59766C7.41991 13.8448 6.2908 13.3763 5.458 12.5435C4.62521 11.7107 4.15674 10.5816 4.15535 9.40385C4.15535 9.29674 4.1979 9.19402 4.27363 9.11828C4.34937 9.04255 4.45209 9 4.55919 9Z" fill="#A9A9A9"/>
    </g>
    <line x1="3.29986" y1="4.15387" x2="13.8465" y2="14.7005" stroke="#A9A9A9" stroke-width="0.75" stroke-linecap="round"/>
    <defs>
    <clipPath id="clip0_691_4678">
    <rect width="9.69231" height="9.69231" fill="white" transform="matrix(-1 0 0 1 13.8477 4.15387)"/>
    </clipPath>
    </defs>
    </svg>
    
               `}
              />
            ) : (
              <Animated.Image
                style={[
                  {
                    width: 10,
                    height: 10,
                    borderRadius: 50,

                    // transform: [{scale: 1}],
                  },
                  rVoiceStyle,
                ]}
                source={require('../../../assets/icons/microphone/microphone.png')}
              />
            )}
          </View>
        )}

        {item?.isHost && (
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 50,
              backgroundColor: colors.green['#00B047'],
              position: 'absolute',
              left: 0,
              zIndex: +1,
              bottom: 0,
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: font.Poppins,
                color: colors.textColor.white,
              }}>
              H
            </Text>
          </View>
        )}
        <Image
          style={{
            width: 65,
            height: 65,
            borderRadius: 28,
            resizeMode: 'contain',
            borderColor: item?.isHost
              ? colors.green['#00B047']
              : colors.secondaryColor,
            borderWidth: 2,
          }}
          source={{
            uri: makeImage(item?.user?.avatar),
          }}
        />
      </TouchableOpacity>
      {!item.role === 'host' && (
        <View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              textAlign: 'center',
            }}>
            {item?.user?.fullName}
          </Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(LiveUserCard);

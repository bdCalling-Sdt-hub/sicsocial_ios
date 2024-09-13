import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useStyles } from '../../context/ContextApi';

interface IGroupUserCardProps {
  name: string;
  img: any;
  lastMessage: string;
  lastTime: string;
  active?: boolean;
  onPress?: () => void;
  isSelect?: boolean;
  selectOnPress: () => void;
  option ?: "friend" | "group",
  screenTitle : string 
}

const GroupUserCard = ({
  active,
  img,
  lastMessage,
  lastTime,
  name,
  onPress,
  selectOnPress,
  isSelect,
  screenTitle,
  option
}: IGroupUserCardProps) => {
  const {colors, font} = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        // backgroundColor: colors.secondaryColor,
        // paddingVertical: 5,
        alignItems: 'center',

        // elevation: 1,
        borderRadius: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingHorizontal: 15,
        gap: 12,
      }}>
      <View>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 50,
            backgroundColor: colors.green['#00B047'],
            position: 'absolute',
            right: 0,
            zIndex: +1,
            bottom: 5,
          }}
        />
        <View
          style={{
            // elevation: 2,
            width: 70,
            height: 70,
          }}>
          <View
            style={{
              position: 'relative',
              padding: 2,
              backgroundColor: 'white',
              elevation: 2,
              // borderWidth: 0.5,
              width: 65,
              height: 65,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 28,
            }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 26,
                resizeMode: 'cover',
              }}
              source={{uri : img}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.light,
            }}>
            {name}
          </Text>
          <TouchableOpacity >
            {isSelect && option === "group"  &&
              <SvgXml
                xml={`<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.4464 17.1472C8.10313 17.1472 7.75998 17.0163 7.49803 16.7544L0.992449 10.2488C0.468663 9.725 0.468663 8.87585 0.992449 8.35206C1.51613 7.82839 2.36549 7.82839 2.88917 8.35206L8.4464 13.9093L21.11 1.24575C21.6338 0.721959 22.483 0.721959 23.0068 1.24575C23.5306 1.76953 23.5306 2.61868 23.0068 3.14247L9.39476 16.7544C9.13292 17.0162 8.78955 17.1472 8.4464 17.1472Z" fill="#00B047"/>
</svg>

  `}
              />
           
              
            }

{/* <SvgXml
                xml={`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_496_1801)">
  <path d="M10 20C9.741 20 9.49261 19.8971 9.30947 19.714C9.12632 19.5308 9.02344 19.2824 9.02344 19.0234V0.976562C9.02344 0.717562 9.12632 0.46917 9.30947 0.286029C9.49261 0.102888 9.741 0 10 0C10.259 0 10.5074 0.102888 10.6905 0.286029C10.8737 0.46917 10.9766 0.717562 10.9766 0.976562V19.0234C10.9766 19.2824 10.8737 19.5308 10.6905 19.714C10.5074 19.8971 10.259 20 10 20Z" fill="#8E3C50"/>
  <path d="M19.0234 10.9766H0.976562C0.717562 10.9766 0.46917 10.8737 0.286029 10.6905C0.102888 10.5074 0 10.259 0 10C0 9.741 0.102888 9.49261 0.286029 9.30947C0.46917 9.12632 0.717562 9.02344 0.976562 9.02344H19.0234C19.2824 9.02344 19.5308 9.12632 19.714 9.30947C19.8971 9.49261 20 9.741 20 10C20 10.259 19.8971 10.5074 19.714 10.6905C19.5308 10.8737 19.2824 10.9766 19.0234 10.9766Z" fill="#8E3C50"/>
  </g>
  <defs>
  <clipPath id="clip0_496_1801">
  <rect width="20" height="20" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  `}
              /> */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(GroupUserCard);

const styles = StyleSheet.create({});

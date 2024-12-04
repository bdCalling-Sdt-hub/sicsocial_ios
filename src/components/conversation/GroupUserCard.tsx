import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {useStyles} from '../../context/ContextApi';

interface IGroupUserCardProps {
  name?: string;
  img?: any;
  lastMessage?: string;
  lastTime?: string;
  active?: boolean;
  onPress?: () => void;
  isSelect?: boolean;
  selectOnPress: () => void;
  screenTitle: string;
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
  option,
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
        // padding: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        gap: 12,
      }}>
      <View>
        {/* <View
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
        /> */}
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
              source={{uri: img}}
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
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: colors?.redis,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 50,
          }}>
          <Text
            style={{
              color: colors?.white,
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(GroupUserCard);

const styles = StyleSheet.create({});

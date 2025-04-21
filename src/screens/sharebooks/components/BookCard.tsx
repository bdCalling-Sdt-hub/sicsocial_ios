import {Image, Text, View} from 'react-native';
import {height, width} from '../../../utils/utils';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useStyles} from '../../../context/ContextApi';

interface BookCardProps {
  item: {
    bookImage?: string;
    name?: string;
    publisher?: string;
  };

  onPress: () => void;
}

const BookCard = ({item, onPress}: BookCardProps) => {
  const {colors, font} = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // elevation: 2,
        backgroundColor: colors.neutralColor,
        // padding: 2,
        borderRadius: 10,
        // height: height * 0.243,
        // alignItems : "center",
        // justifyContent : "center",
      }}>
      <View
        style={{
          elevation: 1,
          padding: 3,
        }}>
        <Image
          resizeMode="stretch"
          style={{
            height: height * 0.24,
            width: width * 0.41,
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: colors.bg,
          }}
          source={{
            uri: item?.bookImage,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: 'center',
          gap: 5,
          maxWidth: width * 0.41,
          height: height * 0.07,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.textColor.light,
            fontSize: 14,
            fontFamily: font.PoppinsMedium,
          }}>
          {item?.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: colors.textColor.light,
            fontSize: 12,
            fontFamily: font.Poppins,
          }}>
          {item?.publisher}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

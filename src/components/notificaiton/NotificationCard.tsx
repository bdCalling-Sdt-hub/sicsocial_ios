import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {NavigProps} from '../../interfaces/NaviProps';
import {useStyles} from '../../context/ContextApi';

interface NotificationCardProps extends NavigProps<null> {
  title?: string;
  content?: string;
  date?: string;
  img?: string;
}

const NotificationCard = ({
  content,
  date,
  title,
  navigation,
  img,
}: NotificationCardProps) => {
  const {colors, font} = useStyles();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.secondaryColor,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              elevation: 3,
              width: 45,
              borderRadius: 100,
            }}>
            <Image
              style={{
                height: 45,
                width: 45,
                borderRadius: 100,
                borderColor: 'white',
                borderWidth: 2,
              }}
              source={require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg')}
            />
          </View>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.secondaryColor,
            }}>
            {title ? title : 'give title'}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 12,
            color: '#5C5C5C',
            marginVertical: 8,
          }}>
          {content ? content : 'give content'}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 11,
            color: '#767676',
            marginTop: 8,
          }}>
          20/6/2024, 3:00 PM
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});

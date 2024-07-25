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
            gap: 5,
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
              source={{
                uri: img
                  ? img
                  : 'https://s3-alpha-sig.figma.com/img/9a5b/b355/1d7cda242662363cc8c5c6f279c5248e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ws6ogv13FwgG40JNBdYK0dNRkgnWijJvB9UydMrny19qG9IAxEBH6DaUQCtKO4AFbLy-2T6w8Qr6W7BXbVZlGr3anyrb3giz1Y-7Tr3t3DXFaQw2J-i6qIR-O9ZA5kvNT0Cdk0wC9vzQnNZ9a1glskxqT-ygRB-2TYM5J7-089idsFmVuF7rxP7j-O8hDywsAfFYe4EGU5psL4bEKLnf18O3-Q10D9g5rz6cLBQelMMIEwwUqR66dtu~0yZxk3i-cL8BTCdu9oNSq6riLDeql3iQUcFppITRtoA4JeUV5hNp3v6BpmXWVYXvX5-nZKdi4r6MN-F6~4xjLNkpqM2qLA__',
              }}
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

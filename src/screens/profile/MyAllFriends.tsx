import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {isTablet, makeImage} from '../../utils/utils';

import {Image} from 'react-native';
import {GridList} from 'react-native-ui-lib';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetFriendQuery} from '../../redux/apiSlices/friendsSlices';

const MyAllFriends = ({navigation, route}: NavigProps<null>) => {
  const {data: friends} = useGetFriendQuery({});
  const {colors, font, window} = useStyles();
  const [test, setTest] = useState(false);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="My friends"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
      />
      <Text
        style={{
          textAlign: 'right',
          paddingHorizontal: '5%',
        }}>
        {friends?.data.length} friends
      </Text>

      <GridList
        showsHorizontalScrollIndicator={false}
        numColumns={isTablet() ? 8 : 4}
        containerWidth={window.width * 0.9}
        contentContainerStyle={{
          marginTop: 15,
          // alignSelf: 'center',
          paddingHorizontal: '2%',
        }}
        data={friends?.data}
        renderItem={item => (
          <View
            style={{gap: 6, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // setTest(!test);
                navigation?.navigate('FriendsProfile', {
                  data: {
                    id: item.item._id,
                  },
                });
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 3,
                borderRadius: 50,

                position: 'relative',
                width: 70,
              }}>
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

              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 28,
                  resizeMode: 'contain',
                  borderColor: 'white',
                  borderWidth: 2,
                }}
                source={{
                  uri: makeImage(item.item.avatar),
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                fontFamily: font.Poppins,
                color: colors.textColor.neutralColor,
                textAlign: 'center',
              }}>
              {item.item.fullName}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyAllFriends;

const styles = StyleSheet.create({});

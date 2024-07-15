import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';

import {NavigProps} from '../../interfaces/NaviProps';
import {ContextProvider, useStyles} from '../../context/ContextApi';
import {SvgXml} from 'react-native-svg';
import NotificationCard from '../../components/notificaiton/NotificationCard';

const data = [
  {
    id: 1,
    content: 'Top',
  },
  {
    id: 2,
    content: 'People',
  },
  {
    id: 3,
    content: 'Rooms',
  },
  {
    id: 4,
    content: 'House',
  },
];

const SearchScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectIItem] = React.useState<number>(1);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Search"
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
      <View
        style={{
          paddingHorizontal: '4%',
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: colors.search,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: 48,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}>
          <SvgXml
            xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6267 11.5129L16 14.8861L14.8861 16L11.5129 12.6267C10.3 13.5971 8.76177 14.1776 7.08881 14.1776C3.17579 14.1776 0 11.0018 0 7.08881C0 3.17579 3.17579 0 7.08881 0C11.0018 0 14.1776 3.17579 14.1776 7.08881C14.1776 8.76177 13.5971 10.3 12.6267 11.5129ZM11.0465 10.9284C12.0096 9.93584 12.6023 8.58187 12.6023 7.08881C12.6023 4.04259 10.135 1.57529 7.08881 1.57529C4.04259 1.57529 1.57529 4.04259 1.57529 7.08881C1.57529 10.135 4.04259 12.6023 7.08881 12.6023C8.58187 12.6023 9.93584 12.0096 10.9284 11.0465L11.0465 10.9284Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
          />
          <TextInput
            style={{flex: 1}}
            placeholder="Search your friends"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBlockColor: 'rgba(217, 217, 217, 1)',
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 45,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 15,
          }}
          data={data}
          renderItem={item => (
            <>
              <TouchableOpacity
                onPress={() => {
                  setSelectIItem(item.index);
                }}
                style={{
                  backgroundColor:
                    selectItem === item.index
                      ? colors.primaryColor
                      : colors.secondaryColor,
                  height: 35,
                  paddingHorizontal: 20,
                  // paddingVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    color:
                      selectItem === item.index
                        ? colors.textColor.white
                        : colors.textColor.light,
                    fontSize: 12,
                    fontFamily: font.PoppinsMedium,
                    textAlign: 'center',
                  }}>
                  {item.item.content}
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: '4%',
          // marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            height: 90,
            width: '100%',
            backgroundColor: colors.incompleteProfile,
            marginVertical: 10,
            borderRadius: 8,
            elevation: 1,
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
            }}>
            <Image source={require('../../assets/icons/happy/wish.png')} />
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 14,
                color: colors.textColor.secondaryColor,
              }}>
              Finish setting up your Sic profile
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              // alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: colors.bg,
                height: 5,
                borderRadius: 100,
              }}>
              <View
                style={{
                  backgroundColor: colors.green['#00B047'],
                  height: 5,
                  borderRadius: 100,
                  width: '70%',
                }}></View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 20,
              bottom: 0,
              top: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SvgXml
              xml={`<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.1589 8.57065C9.46982 8.25973 9.46982 7.74027 9.1589 7.42855L1.98493 0.236178C1.67002 -0.078726 1.15933 -0.078726 0.845227 0.236178C0.530323 0.551083 0.530323 1.06257 0.845227 1.37747L7.44932 7.99997L0.844429 14.6217C0.529525 14.9374 0.529525 15.4481 0.844429 15.7638C1.15933 16.0787 1.67002 16.0787 1.98413 15.7638L9.1589 8.57065Z" fill="black"/>
</svg>
`}
            />
          </View>
        </TouchableOpacity>
        <NotificationCard
          content="Send you friend request"
          title="Hilari help"
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});

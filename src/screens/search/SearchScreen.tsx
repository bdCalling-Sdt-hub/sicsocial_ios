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
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 45,
            paddingHorizontal: 20,
            paddingVertical: 15,
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

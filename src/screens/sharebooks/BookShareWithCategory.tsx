import {StyleSheet, TextInput, View, useWindowDimensions} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {GridList} from 'react-native-ui-lib';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetCategoryBooksQuery} from '../../redux/apiSlices/bookSlices';
import {makeImage} from '../../utils/utils';
import BookCard from './components/BookCard';

export interface Books {
  id: number;
  content: string;
  image: string;
}

const data = [
  {
    id: 1,
    content: 'All',
  },
  {
    id: 2,
    content: 'Way of Life',
  },
  {
    id: 3,
    content: 'Business',
  },
  {
    id: 4,
    content: 'Human Family',
  },
  {
    id: 5,
    content: 'Worldview',
  },
];

const BookShareWithCategory = ({
  navigation,
  route,
}: NavigProps<{data: string}>) => {
  const {colors, font} = useStyles();
  // console.log(route?.params?.data);
  const Item = route?.params?.data;
  const [selectItem, setSelectIItem] = React.useState<number>(1);
  const {data: allBooks} = useGetCategoryBooksQuery({
    category: Item?.name,
  });

  // console.log(allBooks);
  const {height, width} = useWindowDimensions();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title={`${Item?.name}`}
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
          // marginTop: 5,
        }}>
        <View
          style={{
            backgroundColor: colors.search,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: 48,
            paddingHorizontal: 20,
            marginVertical: 10,
            borderRadius: 50,
          }}>
          <SvgXml
            xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6267 11.5129L16 14.8861L14.8861 16L11.5129 12.6267C10.3 13.5971 8.76177 14.1776 7.08881 14.1776C3.17579 14.1776 0 11.0018 0 7.08881C0 3.17579 3.17579 0 7.08881 0C11.0018 0 14.1776 3.17579 14.1776 7.08881C14.1776 8.76177 13.5971 10.3 12.6267 11.5129ZM11.0465 10.9284C12.0096 9.93584 12.6023 8.58187 12.6023 7.08881C12.6023 4.04259 10.135 1.57529 7.08881 1.57529C4.04259 1.57529 1.57529 4.04259 1.57529 7.08881C1.57529 10.135 4.04259 12.6023 7.08881 12.6023C8.58187 12.6023 9.93584 12.0096 10.9284 11.0465L11.0465 10.9284Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
          />
          <TextInput
            style={{
              flex: 1,
              color: colors.textColor.neutralColor,
            }}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.palaceHolderColor}
          />
        </View>
      </View>
      {/* <View
          style={{
            borderBottomWidth: 1,
            borderBlockColor: 'rgba(217, 217, 217, 1)',
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            horizontal
            contentContainerStyle={{
              gap: 16,
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
        </View> */}
      <GridList
        showsVerticalScrollIndicator={false}
        containerWidth={width * 0.9}
        numColumns={2}
        data={allBooks?.data}
        columnWrapperStyle={{
          gap: 20,
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 20,
          paddingHorizontal: '5%',
        }}
        renderItem={item => (
          <BookCard
            onPress={() => {
              navigation?.navigate('BookShare', {data: item?.item});
            }}
            item={{
              bookImage: makeImage(item?.item?.bookImage),
              name: item?.item?.name,
              publisher: item?.item?.publisher,
            }}
          />
        )}
      />
    </View>
  );
};

export default BookShareWithCategory;

const styles = StyleSheet.create({});

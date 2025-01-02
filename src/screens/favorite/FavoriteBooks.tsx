import {Text, TextInput, View} from 'react-native';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {lStorage, makeImage, width} from '../../utils/utils';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {GridList} from 'react-native-ui-lib';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {IBook} from '../../redux/interface/book';
import BookCard from '../sharebooks/components/BookCard';

const FavoriteBooks = ({route, navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {IsNet} = useContextApi();

  const [BooksData, setBooksData] = React.useState([]);
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectBook, setSelectBook] = React.useState<IBook>();
  const [searchText, setSelectText] = React.useState<string>('');

  React.useEffect(() => {
    // lStorage.getArrayAsync('books').then(res => {
    lStorage.getArrayAsync('favoriteBooks').then(res => {
      if (res) {
        console.log(res);
        setBooksData(res);
      }
      console.log(res);
    });
  }, []);

  return (
    <View style={[tw`flex-1 `, {backgroundColor: colors.bg}]}>
      <BackButtonWithTitle
        height={60}
        navigation={navigation}
        title="Favorite Books"
        offBack={!IsNet}
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

      {/* book selection modal  */}
      <View
        style={{
          // paddingHorizontal: '4%',
          // marginTop: 25,
          width: width * 0.9,
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.search,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            //   height: 48,
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
            style={{
              color: colors.textColor.normal,
              flex: 1,
            }}
            value={searchText}
            onChangeText={text => setSelectText(text)}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.palaceHolderColor}
          />
        </View>
      </View>

      <GridList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        containerWidth={width * 0.9}
        // maxItemWidth={width * 0.51}
        windowSize={5}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: colors.textColor.light,
              fontSize: 16,
              fontFamily: font.PoppinsMedium,
            }}>
            No Books Found
          </Text>
        )}
        data={
          Array.isArray(BooksData)
            ? BooksData?.filter(item => {
                if (searchText) {
                  return item?.name
                    ?.toLowerCase()
                    .includes(searchText?.toLowerCase());
                } else {
                  return item;
                }
              })
            : []
        }
        style={{
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          // gap: 10,
          // alignSelf: 'center',
          paddingVertical: 20,
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

export default FavoriteBooks;

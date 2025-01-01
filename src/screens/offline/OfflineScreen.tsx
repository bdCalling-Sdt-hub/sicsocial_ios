import {Image, Text, TextInput, View} from 'react-native';
import {GridList, TouchableOpacity} from 'react-native-ui-lib';
import {height, lStorage, makeImage, width} from '../../utils/utils';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {IBook} from '../../redux/interface/book';

const OfflineScreen = ({route, navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  const [BooksData, setBooksData] = React.useState([]);
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectBook, setSelectBook] = React.useState<IBook>();
  const [searchText, setSelectText] = React.useState<string>('');
  //   console.log(BooksData);

  React.useEffect(() => {
    lStorage.getStringAsync('books').then(res => {
      if (res) {
        setBooksData(JSON.parse(res));
      }
    });
  }, []);

  return (
    <View style={[tw`flex-1 `, {backgroundColor: colors.bg}]}>
      <BackButtonWithTitle
        height={60}
        navigation={navigation}
        title="Offline Books"
        offBack
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
        containerWidth={width * 0.9}
        numColumns={2}
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
        data={BooksData?.data?.filter(item => {
          if (searchText) {
            return item?.name
              ?.toLowerCase()
              .includes(searchText?.toLowerCase());
          } else {
            return item;
          }
        })}
        columnWrapperStyle={{
          gap: 20,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        style={{
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 20,
        }}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              //   handleCreateNewChat({book: item.item._id});
              navigation?.navigate('PdfViewer', {data: item.item});
            }}
            style={{
              // elevation: 2,
              // backgroundColor: colors.bg,
              // padding: 2,
              borderRadius: 24,
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
                  borderRadius: 24,
                  borderWidth: 2,
                  borderColor: colors.bg,
                }}
                source={{
                  uri: makeImage(item.item.bookImage),
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
                gap: 5,
                maxWidth: width * 0.41,
              }}>
              <Text
                style={{
                  color: colors.textColor.light,
                  fontSize: 14,
                  fontFamily: font.PoppinsMedium,
                }}>
                {item.item.name}
              </Text>
              <Text
                style={{
                  color: colors.textColor.neutralColor,
                  fontSize: 12,
                  fontFamily: font.Poppins,
                }}>
                {item.item.publisher}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OfflineScreen;

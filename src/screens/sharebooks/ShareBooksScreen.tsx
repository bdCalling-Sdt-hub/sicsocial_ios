import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {SvgXml} from 'react-native-svg';
import {NavigProps} from '../../interfaces/NaviProps';

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

const books = [
  {
    id: 1,
    content: 'All',
    image:
      'https://s3-alpha-sig.figma.com/img/b585/a027/7f388786571d771f17b0126f4f4b800e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OC~YaczzAJGqizqlco5iCX~PGxyzUApVZAXbAVgFyiyI~8CT~WCcRn-9uBCMYkGYfbxfNB~3IJZ-TR7UZXX-eFstZmoOkurN4MPc5zQkcaBeYbACaOlbU-ht7rC3nvPJLR1fdDGViukbtJFIcqJsbFEAVBI4fjbrMA~ZB6HkVQEYxWZk5fPyIhUiqdR5tzOzeK8GYVYWtAsJ9Mn1oDpquODytUnzuIn8iLPf~lPyp44TAcERVyIwFG8U~a8h3bkUFzuejdt~LW7~9ESbOwwS0koDiTvrT5eotZI5vzriZZJ2n-4zF1nI39CHpG3pvqL9VfVDSNgctcQMnzANzH2xqg__',
  },
  {
    id: 2,
    content: 'Way of Life',
    image:
      'https://s3-alpha-sig.figma.com/img/b485/2fe5/af0552a10655c69b712579ca828ea910?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFuFuMAqtH233TU3imgCV05rZeo~aNm15BTdHNp6FVrQ4brkHBB9gVIr5K58pimYDt54lSZKdiCmA-vwuC3vwI8abuJ8jfXrnYnwA4Sodia3aVJ2zFcQEIPoE2A48~Vx96K40jMsZicVbWcSmhMN3uyrvfKwOc7hnH22PZLcze0WoS7H7josWXf0AMYfHy11ryvlcyVQ0IM5WXn2o-S~M8JfP84vhqyO3-O2xI4ry2XUQZtvYc3KToGENW1NgR2DeyyViajAQKzXetyMbwiFYXBxxT9LqQpkh~YMAH0~9LxEPApmTiSyj7aQsn6LU2U~MOnWb9sgi8MmgYMfwO7J3A__',
  },
  {
    id: 3,
    content: 'Business',
    image:
      'https://s3-alpha-sig.figma.com/img/ac94/a291/488b4f850f0251fe5ba556fe9da20e2e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lU30ivlnQY21xTbRlkrFvj6pGnG1JjeU~NrbRVoCvwEr4LLzjpFVmDt2GSZbNa0cXEH0GLV1ClbXE9MSrE-GFcwmBRSt6XM8DasUDCdRX3Xls0Y6J39oZRkmrsDpXL-odwKSEv8zzE2qBESxljPDZmBWYUSMWNueiliCXoDLPaSl3tNU18ZHs0ajIO-gp62LT0LQ6ytNlJgl9Ki8NIZ8HS6Em1brLMC7V9eF1LyZ9HFkhiKV5Z1IXZAzO~3aVsiULYyGHSPcAothJ1T~7SALoNqbwE3ScAPFwYBX50n-v88mXDDo5YgF7uhP6~dfEk9m39hMqvmTzN9erqtSAczWPg__',
  },
  {
    id: 4,
    content: 'Human Family',
    image:
      'https://s3-alpha-sig.figma.com/img/668f/869c/1019d2e044ead62f3eb08738a899354c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C7NCI29l1S-7lBg-fBKMTxYfFI7Wz5tnea1OTf3k2chLtJW22V27J~328Ok-DI~IpJiQuHx~RQ-H87Ncz8N~aj92mLRJdIvZoflHwaaCI9DYkBd7I~hT03tJN6IDvh2eErhOPYhyfE3bH56-o3Eck3~Q5Ku3jPiIhP~Z4BuCuvsqZTrcA4Vd9Bqb6Ej-XzPjEtpVY14ISlWxhymCkMgdLnScOaIX6ue~UKaD5lxWUd03C71wDbwZi3Lao-7Xop599-bNfVSG525Xq7c2e63lxxLSYhDFRv7ietjecAiNiEIsXMRhnmP-cgnxMYDT2QK~CTZLV~R6KEowdLSt0aXwjA__',
  },
  {
    id: 5,
    content: 'Worldview',
    image:
      'https://s3-alpha-sig.figma.com/img/e98c/1a54/ee547a642f63a9a135f7b2b7d4b37956?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mGk4oV79QgAFlUfUGDlGutahqQXvpOYOIHhcR2LBxVpJIARIaReonfDBmXYqtA1d4oO2vC3lVp8UmptZ7~yCh~Xkn~z5DKXMkzpvT2oKsWEx~fcshksYJH24oWEinepfhnRh6rry8ZCSJK1qHMxwqDll-9ujtqr-EmdEkSlpOeKD9RtviWCgxtk-UhDFAVabFHsEORW4Ju4qkjBxjWenW8UqFxKUQgfbwBy-gTrF5x0vrMwAxhLm5S4lWppWjONOLNX6t98jQFrwo1oxiG-jzeHRmN4rlDnzN6ip6uFhM4sgCfcqsVW3M5N1iAz96ed50aoo2qRPSCamSF6ZFroRXw__',
  },
  {
    id: 6,
    content: 'Worldview',
    image:
      'https://s3-alpha-sig.figma.com/img/d180/9195/da84fbcfb6556b63dea67af8844a57d8?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XU8OsCuvhuriTh0fx0mDKR5Vz8K81jB6N5Yc~CS44rIvRCRRp4t~rZdYZ6mKP14C4Q8wt3a5WB8B0V1SZQv4gzft-iRV0ZzIFX1yDmy~6IIZmAIeywM2HxOfhutarGZtMxdOguZGlPF4OH4ScrSjjV5RQu5Zy9OHNUw-tPCdwT2oYgNEwtNYcJqAYBfw1IQWsB9l5VpGMsEjprp8QpZADhfvrL5w6Gq2BW1-B6~1cBQhfKV3Y0JefajMOIuI8YH~crtfuXWRP7Rfz7STD3q~iKtsT6fV8HG5e22X9c1RnLyAXIJj43Dd2jRC5kA4QAFkk-hzhihBAS3T5~2Q3rp7Jg__',
  },
];

const ShareBooksScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectIItem] = React.useState<number>(1);
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Share Books"
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
            placeholder="Search your books"
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
      </View>

      <FlatList
        numColumns={2}
        data={books}
        columnWrapperStyle={{
          gap: 20,
          alignSelf: 'center',
        }}
        contentContainerStyle={{
          gap: 20,
          paddingVertical: 20,
        }}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('BookShare', {data: item.item});
            }}
            style={{
              elevation: 2,
              backgroundColor: colors.bg,
              padding: 2,
              borderRadius: 24,
            }}>
            <Image
              style={{
                height: height * 0.24,
                width: width * 0.4,
                borderRadius: 24,
              }}
              source={{
                uri: item.item.image,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ShareBooksScreen;

const styles = StyleSheet.create({});

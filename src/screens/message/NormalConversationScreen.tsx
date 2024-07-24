import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {NavigProps} from '../../interfaces/NaviProps';
import {useStyles} from '../../context/ContextApi';
import ConversationHeader from '../../components/conversation/ConversationHeader';

import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';

const NormalConversationScreen = ({navigation}: NavigProps<null>) => {
  const {width, height} = useWindowDimensions();
  const {colors, font} = useStyles();

  const [messages, setMessages] = React.useState([
    {
      id: 1,
      name: 'Rohim',
      text: 'Hello, how are you ?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 1,
        name: 'Amina',
        avatar:
          'https://s3-alpha-sig.figma.com/img/1364/7d56/5d915a345776150681614d5272f25888?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qO54f8-2k6K9-3-0U-t6w5-46-2i4-y_9f068a3240676543933d60515f764533__',
      },
    },
    {
      id: 2,
      name: 'Rohim',
      text: 'Hello Amina ?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 1,
        name: 'Amina',
        avatar:
          'https://s3-alpha-sig.figma.com/img/1364/7d56/5d915a345776150681614d5272f25888?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qO54f8-2k6K9-3-0U-t6w5-46-2i4-y_9f068a3240676543933d60515f764533__',
      },
    },
    {
      id: 3,
      name: 'Rohim',
      text: 'Hi, how are you?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 2,
        name: 'Amina',
        avatar:
          'https://s3-alpha-sig.figma.com/img/1364/7d56/5d915a345776150681614d5272f25888?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qO54f8-2k6K9-3-0U-t6w5-46-2i4-y_9f068a3240676543933d60515f764533__',
      },
    },
    {
      id: 4,
      name: 'Rohim',
      text: 'This view is so basinful',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 2,
        name: 'Amina',
        avatar:
          'https://s3-alpha-sig.figma.com/img/1364/7d56/5d915a345776150681614d5272f25888?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qO54f8-2k6K9-3-0U-t6w5-46-2i4-y_9f068a3240676543933d60515f764533__',
      },
    },
    {
      id: 5,
      name: 'Amina',
      text: 'This view is so basinful',
      createdAt: new Date(),
      image:
        'https://s3-alpha-sig.figma.com/img/2904/e095/17056fa449ccef1fb1a124b63c0048d2?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IJAdDB-dxR3cdIlLpfyoUSr8qYftMYCm7EfjZGLHNcG3le8u6Ph2R9uzhEZ7rU711t0Ao7LFk~DoV0~D3OjZ57HHYyZGbACUv9ab~gs7xtTy8HZ0b77LCm77Nk7mM51wLnY2FsGTU6SuwpW9A45fGjDqP7NNG28i8~u4IzTIKevm2Hlg3Y7MD7BLYD0hQg~yDrisiMVz83Ia~xYuZxuTVMx81PeTFLsSSgBJcCj0VRu4nJ8dG3twl-W2qtCzrTRsk9kIhTTQf81JHVgcN7t0PpnP58PREVhRwcQeCEdkx8Mw6egPtWVjQ9fBWGZgoA51yhkYReuMDH9~YvvLufxYwA__',
      user: {
        _id: 2,
        name: 'Amina',
        avatar:
          'https://s3-alpha-sig.figma.com/img/1364/7d56/5d915a345776150681614d5272f25888?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qO54f8-2k6K9-3-0U-t6w5-46-2i4-y_9f068a3240676543933d60515f764533__',
      },
    },
  ]);
  const [newMessages, setNewMessages] = React.useState<string>('');

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
        width: width,
      }}>
      <View
        style={{
          height: '7.2%',
        }}
      />
      <ConversationHeader navigation={navigation} />

      {/* <View
        style={{
          paddingHorizontal: 15,
          backgroundColor: 'white',
          width: '100%',
          paddingVertical: 10,
          position: 'absolute',
          top: '7%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 50,
          zIndex: 4,
        }}>
        <View>
          <View
            style={{
              padding: 2,
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              width: 46,
              height: 46,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 30,
              position: 'absolute',
              transform: [
                {
                  translateY: 3,
                },
              ],
            }}>
            <Image
              style={{
                width: 46,
                height: 46,
                borderRadius: 30,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
              }}
            />
          </View>
          <View
            style={{
              padding: 2,
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              width: 56,
              height: 56,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 30,
              position: 'relative',
              transform: [
                {
                  translateX: 30,
                },
              ],
            }}>
            <Image
              style={{
                width: 56,
                height: 56,
                borderRadius: 30,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/d067/c913/ad868d019f92ce267e6de23af3413e5b?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pMfG6YS9I8ruMTaTRqegPV9zZCyzJf~VintWAZomMQnoTSOB9r4vUqRwLPv6QY8UI0ayslqETesPz1z608PL7Lar8-2OFbc56ajfs0Cd0~Oj2IqJmrBLGw6KNarGTI7iBGxg70mDxP5kJQQZGT0sYE0Sd02zOzMoEpcyAxxAQUKlAGkTJocs3DSzvA-3CCCfxvT2qe3qytPeU6v8du6tQgae7mnGcqPOah-VRkMnVjpZ5NXf0fHqtpgHVzEbCRbuQBObOqRLrc-89S7ihmEEysndEuAwU~U9bfmvholer8U4ygOM-VmKm4tcibG6THnu35W3dfic90~qZ6PgubDTeA__',
              }}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: font.PoppinsSemiBold,
            color: colors.textColor.primaryColor,
            fontSize: 14,
          }}>
          Amina
        </Text>
      </View> */}

      <FlatList
        style={{
          height: height * 0.63,
        }}
        inverted
        data={messages}
        renderItem={item => {
          return (
            <View
              style={{
                marginBottom: 10,
                paddingHorizontal: 15,
              }}>
              {/* create card  */}
              {item.item.user._id === 1 ? (
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.primaryColor,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      color: 'white',
                      maxWidth: '60%',
                      alignItems: 'flex-end',
                    }}>
                    <Text>{item.item.user._id}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.primaryColor,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      color: 'white',
                      maxWidth: '60%',
                      alignItems: 'flex-end',
                    }}>
                    <Text>{item.item.user._id}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <ConversationCarousal
          photo
          type
          record
          books
          setTextMessage={setNewMessages}
          onSendTextMessage={() => {}}
        />
      </View>
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default NormalConversationScreen;

const styles = StyleSheet.create({});

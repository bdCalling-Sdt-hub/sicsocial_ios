import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NavigProps} from '../../interfaces/NaviProps';
import {useStyles} from '../../context/ContextApi';
import ConversationHeader from '../../components/conversation/ConversationHeader';

import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import CustomModal from '../../components/common/customModal/CustomModal';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface messagePros {
  id: number;
  text?: string;
  createdAt?: Date;
  bookImage?: string;
  image?: string | null;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

const GroupConversationScreen = ({navigation}: NavigProps<null>) => {
  const {width, height} = useWindowDimensions();
  const {colors, font} = useStyles();

  const [messages, setMessages] = React.useState<Array<messagePros>>([
    {
      id: 1,

      text: 'Hello, how are you ?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 1,
        name: 'Amina',
        avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
      },
    },
    {
      id: 2,

      text: 'Hello Amina ?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 1,
        name: 'Amina',
        avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
      },
    },
    {
      id: 3,

      text: 'Hi, how are you?',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 2,
        name: 'Amina',
        avatar: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
      },
    },
    {
      id: 4,

      text: 'This view is so basinful asdfsa asdf a',
      createdAt: new Date(),
      image: null,
      user: {
        _id: 2,
        name: 'Amina',
        avatar: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
      },
    },
    // {
    //   id: 5,

    //   text: 'This view is so basinful',
    //   createdAt: new Date(),
    //   image: require('../../assets/tempAssets/17056fa449ccef1fb1a124b63c0048d2.jpg'),
    //   user: {
    //     _id: 2,
    //     name: 'Amina',
    //     avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    //   },
    // },
    // {
    //   id: 6,

    //   text: 'This view is so basinful',
    //   createdAt: new Date(),
    //   image: require('../../assets/tempAssets/17056fa449ccef1fb1a124b63c0048d2.jpg'),
    //   user: {
    //     _id: 1,
    //     name: 'Amina',
    //     avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    //   },
    // },
    // {
    //   id: 7,

    //   text: 'I am agree is so basinful',
    //   createdAt: new Date(),
    //   image: require('../../assets/tempAssets/17056fa449ccef1fb1a124b63c0048d2.jpg'),
    //   user: {
    //     _id: 2,
    //     name: 'Amina',
    //     avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    //   },
    // },
  ]);

  const [volume, setVolume] = React.useState<number>(1);
  const [newMessages, setNewMessages] = React.useState<string>('');
  const [newImage, setNewImage] = React.useState<string>('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  const scrollRef = useRef();

  const animatePosition = useSharedValue(height * 0.08);
  const animateOpacity = useSharedValue(1);

  const animationStyleForUserConversation = useAnimatedStyle(() => {
    return {
      top: animatePosition.value,
      opacity: animateOpacity.value,
    };
  });
  console.log(messages);
  console.log(messages.length);

  const currentUser = messages.find(message => message.user._id === 1)?.user;

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
        width: width,
      }}>
      <View
        style={{
          height: '7.5%',
        }}
      />
      <ConversationHeader
        title="Group message"
        icon={`<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_517_1720)">
<path d="M21.0549 6.13881H18.5271V3.61103C18.5271 3.47105 18.4715 3.33681 18.3725 3.23783C18.2736 3.13886 18.1393 3.08325 17.9993 3.08325C17.8594 3.08325 17.7251 3.13886 17.6262 3.23783C17.5272 3.33681 17.4716 3.47105 17.4716 3.61103V6.13881H14.9438C14.8038 6.13881 14.6696 6.19441 14.5706 6.29339C14.4716 6.39237 14.416 6.52661 14.416 6.66658C14.416 6.80656 14.4716 6.9408 14.5706 7.03978C14.6696 7.13876 14.8038 7.19436 14.9438 7.19436H17.4716V9.72214C17.4716 9.86212 17.5272 9.99636 17.6262 10.0953C17.7251 10.1943 17.8594 10.2499 17.9993 10.2499C18.1393 10.2499 18.2736 10.1943 18.3725 10.0953C18.4715 9.99636 18.5271 9.86212 18.5271 9.72214V7.19436H21.0549C21.1949 7.19436 21.3291 7.13876 21.4281 7.03978C21.5271 6.9408 21.5827 6.80656 21.5827 6.66658C21.5827 6.52661 21.5271 6.39237 21.4281 6.29339C21.3291 6.19441 21.1949 6.13881 21.0549 6.13881Z" fill="#DBB162" stroke="#DBB162" stroke-width="0.5"/>
</g>
<g clip-path="url(#clip1_517_1720)">
<path d="M10.182 8.00001C8.17702 8.00001 6.54561 6.36864 6.54561 4.36364C6.54561 2.35864 8.17702 0.727295 10.182 0.727295C12.187 0.727295 13.8184 2.35867 13.8184 4.36364C13.8184 6.36861 12.187 8.00001 10.182 8.00001ZM10.182 2.18183C8.97886 2.18183 8.00017 3.16051 8.00017 4.36364C8.00017 5.56676 8.97886 6.54545 10.182 6.54545C11.3851 6.54545 12.3638 5.56676 12.3638 4.36364C12.3638 3.16051 11.3851 2.18183 10.182 2.18183Z" fill="#DBB162"/>
<path d="M13.8182 15.2728H6.54547C5.34234 15.2728 4.36366 14.2941 4.36366 13.091C4.36366 11.086 5.99503 9.45459 8.00003 9.45459H12.3636C14.3686 9.45459 16 11.086 16 13.091C16 14.2941 15.0213 15.2728 13.8182 15.2728ZM12.3636 10.9092H8C6.79688 10.9092 5.81819 11.8878 5.81819 13.091C5.81819 13.4922 6.14419 13.8182 6.54547 13.8182H13.8182C14.2195 13.8182 14.5455 13.4922 14.5455 13.091C14.5455 11.8878 13.5668 10.9092 12.3636 10.9092Z" fill="#DBB162"/>
<path d="M5.81764 2.18183C4.61452 2.18183 3.63583 3.16051 3.63583 4.36364C3.63583 5.56676 4.61452 6.54545 5.81764 6.54545C6.21927 6.54545 6.54492 6.87108 6.54492 7.27273C6.54492 7.67436 6.2193 8.00001 5.81764 8.00001C3.81267 8.00001 2.18127 6.36864 2.18127 4.36364C2.18127 2.35864 3.81267 0.727295 5.81764 0.727295C6.21927 0.727295 6.54492 1.05292 6.54492 1.45458C6.54492 1.85623 6.21927 2.18183 5.81764 2.18183Z" fill="#DBB162"/>
<path d="M3.636 9.45459C4.03763 9.45459 4.36328 9.78021 4.36328 10.1819C4.36328 10.5835 4.03766 10.9092 3.636 10.9092C2.43288 10.9092 1.45419 11.8878 1.45419 13.091C1.45419 13.4922 1.78019 13.8182 2.18147 13.8182H2.90875C3.31038 13.8182 3.63603 14.1439 3.63603 14.5455C3.63603 14.9472 3.31041 15.2728 2.90875 15.2728H2.18147C0.978344 15.2728 -0.000343323 14.2941 -0.000343323 13.091C-0.000374794 11.086 1.631 9.45459 3.636 9.45459Z" fill="#DBB162"/>
</g>
<defs>
<clipPath id="clip0_517_1720">
<rect width="8" height="8" fill="white" transform="translate(14 2.66663)"/>
</clipPath>
<clipPath id="clip1_517_1720">
<rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)"/>
</clipPath>
</defs>
</svg>
`}
        optionOnPress={() => {
          setModalVisible(true);
        }}
        navigation={navigation}
      />

      <Animated.View
        style={[
          {
            paddingHorizontal: 15,
            backgroundColor: colors.bg,
            width: '100%',
            paddingVertical: 10,
            position: 'absolute',

            flexDirection: 'row',
            alignItems: 'center',
            gap: 50,
            zIndex: 4,
          },
          animationStyleForUserConversation,
        ]}>
        <View
          style={{
            width: '23%',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              width: 46,
              height: 46,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateY: 15,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 46,
                  aspectRatio: 1,
                  borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/tempAssets/ad868d019f92ce267e6de23af3413e5b.jpg')}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              width: 46,
              height: 46,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateX: 80,
                },
                {
                  translateY: -8,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 46,
                  aspectRatio: 1,
                  borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg')}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              aspectRatio: 1,
              height: 40,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateX: 60,
                },
                {
                  translateY: 40,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 35,
                  aspectRatio: 1,
                  borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg')}
              />
            </View>
          </View>
          {/* <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              aspectRatio: 1,
              height: 20,
              // borderColor: 'rgba(0,0,0,.2)',
                borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateX: 100,
                },
                {
                  translateY: 40,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                  borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 20,
                  aspectRatio: 1,
                    borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                }}
              />
            </View>
          </View> */}
          {/* <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              aspectRatio: 1,
              height: 20,
              // borderColor: 'rgba(0,0,0,.2)',
                borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateX: 0,
                },
                {
                  translateY: -15,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                  borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 20,
                  aspectRatio: 1,
                    borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                }}
              />
            </View>
          </View> */}
          <View
            style={{
              backgroundColor: 'white',
              // elevation: 1,
              // borderWidth: 0.5,
              aspectRatio: 1,
              height: 40,
              // borderColor: 'rgba(0,0,0,.2)',
              borderRadius: 28,
              position: 'absolute',
              transform: [
                {
                  translateX: 25,
                },
                {
                  translateY: -23,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 35,
                  aspectRatio: 1,
                  borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg')}
              />
            </View>
          </View>
          <View
            style={{
              // backgroundColor: 'white',

              width: 50,
              height: 50,

              position: 'relative',
              transform: [
                {
                  translateX: 40,
                },
              ],
            }}>
            <View
              style={{
                borderColor: 'rgba(255,255,255,1)',
                elevation: 1,
                borderWidth: 2,
                // padding: 2,
                borderRadius: 28,
              }}>
              <Image
                style={{
                  height: 50,
                  aspectRatio: 1,
                  borderRadius: 28,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/tempAssets/ae1e058c2ed75ab981a9f8bb62e96a13.jpg')}
              />
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              fontSize: 14,
            }}>
            Asadullah created a group
          </Text>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.primaryColor,
              fontSize: 14,
            }}>
            Amina,Arif, Rahman, Mithila,
          </Text>
          <Text
            style={{
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              fontSize: 14,
            }}>
            and 3 peoples in this group
          </Text>
        </View>
      </Animated.View>

      <FlatList
        scrollEventThrottle={10}
        style={{
          height: height * 0.6,
        }}
        onContentSizeChange={(w: number, h: number) => {
          // console.log(height * 0.6);
          if (height * 0.7 < h) {
            animatePosition.value = withTiming(-(height * 0.3), {
              duration: 500,
            });
          }
        }}
        inverted
        data={messages.sort((a, b) => b.id - a.id)}
        renderItem={item => {
          return (
            <View
              style={{
                marginBottom: 10,
                paddingHorizontal: 15,
              }}>
              {/* create card  */}

              <View
                style={{
                  alignItems:
                    item.item.user._id === currentUser?._id
                      ? 'flex-end'
                      : 'flex-start',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    maxWidth: '90%',
                    minWidth: '50%',
                    backgroundColor:
                      item.item.user._id === currentUser?._id
                        ? colors.secondaryColor
                        : colors.redisExtraLight,
                    flexDirection: 'row',
                  }}>
                  {item.item.user._id !== currentUser?._id && (
                    <View>
                      <Image
                        source={item.item.user.avatar}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                  )}

                  <View
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      // paddingVertical: 2,
                      maxWidth: '90%',
                      minWidth: '50%',
                      // backgroundColor: colors.redisExtraLight,
                      gap: 15,
                    }}>
                    <View
                      style={{
                        // backgroundColor: colors.redisExtraLight,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems:
                          item.item.user._id === currentUser?._id
                            ? 'flex-end'
                            : 'flex-start',
                      }}>
                      <View style={{alignItems: 'flex-end', gap: 10}}>
                        {item.item.image && (
                          <View
                            style={{
                              backgroundColor: colors.bg,
                              elevation: 2,
                              height: 150,
                              borderRadius: 15,
                            }}>
                            <Image
                              source={{uri: item.item.image}}
                              style={{
                                marginBottom: 20,
                                aspectRatio: 1,

                                height: 150,
                                borderRadius: 15,
                              }}
                            />
                          </View>
                        )}

                        {item.item.text && (
                          <Text
                            style={{
                              fontSize: 14,
                              color: colors.textColor.secondaryColor,
                              fontFamily: font.Poppins,
                              maxWidth: width * 0.65,
                              textAlign:
                                item.item.user._id === currentUser?._id
                                  ? 'right'
                                  : 'left',
                            }}>
                            {item.item.text}
                          </Text>
                        )}

                        {item.item.bookImage && (
                          <View
                            style={{
                              backgroundColor: colors.bg,
                              elevation: 2,
                              // height: 192,
                              borderColor: colors.bg,

                              borderRadius: 15,
                            }}>
                            <Image
                              resizeMode="stretch"
                              source={{uri: item.item.bookImage}}
                              style={{
                                // marginBottom: 20,
                                // aspectRatio: 1,

                                width: 150,

                                height: 190,
                                borderRadius: 15,
                              }}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
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
          // ImageLink={newImage}
          setMessages={setMessages}
          messages={messages}
          setImageAssets={setNewImage}
          onSendImageMessage={() => {}}
          setTextMessage={setNewMessages}
          onSendTextMessage={() => {
            setMessages([
              ...messages,
              {
                id: messages.length + 1,

                text: newMessages,
                createdAt: new Date(),

                user: {
                  _id: 1,
                  name: 'Amina',
                  avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
                },
              },
            ]);
          }}
        />
      </View>

      <ModalOfBottom
        height={'22%'}
        onlyTopRadius={15}
        modalVisible={modalVisible}
        containerColor={colors.bg}
        setModalVisible={setModalVisible}>
        <View>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              // setModalVisible(false);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Add members
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              // setModalVisible(false);
              if (volume === 4) {
                setVolume(1);
              } else {
                setVolume(volume + 1);
              }
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Playback Speed({volume}x)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              // setModalVisible(false);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Delete chat
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>
      <CustomModal
        modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        height={'14%'}
        containerColor={colors.bg}
        Radius={20}>
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 12,
              color: colors.textColor.neutralColor,
            }}>
            Are you sure you want to remove your friend!
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                borderColor: colors.green['#00B047'],
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.green['#00B047'],
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                backgroundColor: 'rgba(241, 99, 101, 1)',

                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.white,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default GroupConversationScreen;

const styles = StyleSheet.create({});

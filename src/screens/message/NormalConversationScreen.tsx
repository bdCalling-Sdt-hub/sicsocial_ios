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

interface messagePros {
  id: number;
  text?: string;
  createdAt?: Date;
  image?: string | null;
  user: {
    _id: number;
    name: string;
    avatar: string | null;
  };
}

const NormalConversationScreen = ({navigation}: NavigProps<null>) => {
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
  const [newImage, setNewImage] = React.useState<{}>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  const scrollRef = useRef();

  const animatePosition = useSharedValue(height * 0.07);
  const animateOpacity = useSharedValue(1);

  const animationStyleForUserConversation = useAnimatedStyle(() => {
    return {
      top: animatePosition.value,
      opacity: animateOpacity.value,
    };
  });

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
      <ConversationHeader
        optionOnPress={() => {
          setModalVisible(true);
        }}
        navigation={navigation}
      />

      <Animated.View
        style={[
          {
            paddingHorizontal: 15,
            backgroundColor: 'white',
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
              source={require('../../assets/tempAssets/ae1e058c2ed75ab981a9f8bb62e96a13.jpg')}
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
      </Animated.View>

      <FlatList
        scrollEventThrottle={10}
        style={{
          height: height * 0.6,
        }}
        onContentSizeChange={(w: number, h: number) => {
          console.log(height * 0.6);
          if (height * 0.7 < h) {
            animatePosition.value = withTiming(-(height * 0.07), {
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
              {item.item.user._id === 1 ? (
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      maxWidth: '90%',
                      minWidth: '50%',
                      backgroundColor: colors.secondaryColor,
                      gap: 15,
                    }}>
                    <View
                      style={{
                        // backgroundColor: colors.redisExtraLight,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        alignItems: 'flex-end',
                      }}>
                      <View style={{alignItems: 'flex-end'}}>
                        <View style={{}}>
                          {item.item.image && (
                            <Image
                              source={item.item.image}
                              style={{
                                marginBottom: 20,
                                aspectRatio: 1,

                                height: 150,
                                borderRadius: 15,
                              }}
                            />
                          )}
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.textColor.secondaryColor,
                            fontFamily: font.Poppins,
                            maxWidth: width * 0.65,
                          }}>
                          {item.item.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'flex-start',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      maxWidth: '90%',
                      minWidth: '50%',
                      backgroundColor: colors.redisExtraLight,
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Image
                        source={{
                          uri: `https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__`,
                        }}
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 50,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        maxWidth: '90%',
                        minWidth: '50%',
                        backgroundColor: colors.redisExtraLight,
                        gap: 15,
                      }}>
                      <View
                        style={{
                          // backgroundColor: colors.redisExtraLight,
                          borderRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          alignItems: 'flex-end',
                        }}>
                        <View style={{}}>
                          <View style={{}}>
                            {item.item.image && (
                              <Image
                                source={item.item.image}
                                style={{
                                  marginBottom: 20,
                                  aspectRatio: 1,

                                  height: 150,
                                  borderRadius: 15,
                                }}
                              />
                            )}
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: colors.textColor.secondaryColor,
                              fontFamily: font.Poppins,
                              maxWidth: width * 0.65,
                            }}>
                            {item.item.text}
                          </Text>
                        </View>
                      </View>
                    </View>
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
        height={'18%'}
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

export default NormalConversationScreen;

const styles = StyleSheet.create({});

import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../components/common/NormalButton';
import NotifyTopComponent from '../../components/common/notify/NotifyTopComponent';
import ConversationHeader from '../../components/conversation/ConversationHeader';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';
import { messagePros } from './NormalConversationScreen';

const FaceDownConversation = ({navigation}: NavigProps<null>) => {
  const {width, height} = useWindowDimensions();
  const {colors, font, window} = useStyles();
  const [callingLive, setCallingLive] = React.useState(false);
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

      createdAt: new Date(),
      image: null,
      live: false,
      user: {
        _id: 1,
        name: 'Amina',
        avatar: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
      },
    },
    // {
    //   id: 4,

    //   text: 'This view is so basinful asdfsa asdf a',
    //   createdAt: new Date(),
    //   image: null,
    //   user: {
    //     _id: 2,
    //     name: 'Amina',
    //     avatar: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    //   },
    // },
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

  const [fullBanner, setFullBanner] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [liveModal, setLiveModal] = React.useState(false);
  const [open, setNotify] = React.useState(false);
  const scrollRef = useRef();

  const FULL_HIGHT = height * 0.42;
  const REGULAR_REGULAR = height * 0.1;

  const animateHight = useSharedValue(0);
  const animateOpacity = useSharedValue(1);

  const bannerImageHight = useSharedValue(0);
  const bannerImageWidth = useSharedValue(0);

  const animationStyleForUserConversation = useAnimatedStyle(() => {
    return {
      height: animateHight.value,
      opacity: animateOpacity.value,
    };
  });
  const animationImageONBanner = useAnimatedStyle(() => {
    return {
      width: bannerImageWidth.value,
      height: bannerImageHight.value,
    };
  });
  const animationDisplayONBanner = useAnimatedStyle(() => {
    return {
      flexDirection: fullBanner ? 'column' : 'row',
    };
  });

  // console.log(messages);
  // console.log(messages.length);

  const currentUser = messages.find(message => message.user._id === 1)?.user;

  useEffect(() => {
    if (fullBanner) {
      animateHight.value = withTiming(FULL_HIGHT, {duration: 500});
      bannerImageHight.value = withTiming(height * 0.22, {duration: 500});
      bannerImageWidth.value = withTiming(window.width * 0.35, {duration: 500});
    }
    if (!fullBanner) {
      animateHight.value = withTiming(REGULAR_REGULAR, {duration: 500});
      bannerImageHight.value = withTiming(height * 0.083, {duration: 500});
      bannerImageWidth.value = withTiming(window.width * 0.16, {
        duration: 500,
      });
    }
  }, [fullBanner]);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
        width: window.width,
      }}>
      <NotifyTopComponent
        context=""
        variant="normal"
        open={open}
        onDismiss={setNotify}
      />
      <View
        style={{
          height: '7.2%',
        }}
      />
      <ConversationHeader
        titleComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Image
              style={{
                height: 45,
                width: 45,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.white,
                // marginHorizontal: 1,
              }}
              source={require('../../assets/tempAssets/charity.jpg')}
            />
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 16,
                color: colors.textColor.secondaryColor,
                marginLeft: 10,
              }}>
              Asadullah charity house
            </Text>
          </View>
        }
        optionOnPress={() => {
          setModalVisible(true);
        }}
        navigation={navigation}
      />

      <Animated.View
        style={[
          {
            paddingHorizontal: 12,
            backgroundColor: colors.secondaryColor,
            width: '90%',
            paddingVertical: 8,
            alignSelf: 'center',
            borderRadius: 10,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: +9999,
            top: '8%',
          },
          animationStyleForUserConversation,
        ]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setFullBanner(!fullBanner);
          }}
          style={{}}>
          <Animated.View
            style={[
              {
                gap: 10,
              },
              animationDisplayONBanner,
            ]}>
            <Animated.View style={[animationImageONBanner]}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  navigation?.navigate('BookShare');
                }}>
                <Image
                  style={[
                    {
                      borderRadius: 20,
                      height: '100%',
                      width: '100%',
                      resizeMode: 'stretch',
                    },
                  ]}
                  source={require('../../assets/tempAssets/book.jpg')}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.Text
              numberOfLines={fullBanner ? 0 : 3}
              style={{
                fontFamily: font.Poppins,
                color: colors.textColor.primaryColor,
                fontSize: 14,
                width: fullBanner ? '100%' : '70%',
              }}>
              elit. placerat ex non, elit. In ac nibh Ut non non urna porta dui
              sapien enim. elit placerat. sed Ut tincidunt amet, vitae sit enim.
              facilisis vel volutpat Ut sed Quisque ac lobortis, Quisque urna
              ipsum Nam id tempor placerat. Morbi ipsum sollicitudin. dui. urna
              nulla, Donec vitae vehicula, quis libero, commodo ex
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        scrollEventThrottle={10}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={{
          height: height * 0.6,
          // backgroundColor: 'red',
        }}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: window.height * 0.1,
        }}
        // onScroll={e => {
        //   if (e.nativeEvent.contentOffset.y > 0) {
        //     animateHight.value = withTiming(height * 0.07, {
        //       duration: 500,
        //     });
        //   }
        //   if (e.nativeEvent.contentOffset.y === 0) {
        //     animateHight.value = withTiming(-(height * 0.3), {
        //       duration: 500,
        //     });
        //   }
        // }}
        inverted
        data={messages.sort((a, b) => b.id - a.id)}
        // ListFooterComponent={() => {
        //   return (
        //     <Animated.View
        //       style={[
        //         {
        //           paddingHorizontal: 12,
        //           backgroundColor: colors.secondaryColor,
        //           width: '90%',
        //           paddingVertical: 8,
        //           alignSelf: 'center',
        //           borderRadius: 10,
        //           gap: 10,
        //         },
        //         animationStyleForUserConversation,
        //       ]}>
        //       <View>
        //         <Image
        //           style={{
        //             width: window.width * 0.38,
        //             height: height * 0.22,
        //             borderRadius: 20,
        //             resizeMode: 'stretch',
        //           }}
        //           source={require('../../assets/tempAssets/book2.jpg')}
        //         />
        //       </View>
        //       <Text
        //         style={{
        //           fontFamily: font.Poppins,
        //           color: colors.textColor.primaryColor,
        //           fontSize: 14,
        //         }}>
        //         elit. placerat ex non, elit. In ac nibh Ut non non urna porta
        //         dui sapien enim. elit placerat. sed Ut tincidunt amet, vitae sit
        //         enim. facilisis vel volutpat Ut sed Quisque ac lobortis, Quisque
        //         urna ipsum Nam id tempor placerat. Morbi ipsum sollicitudin.
        //         dui. urna nulla, Donec vitae vehicula, quis libero, commodo ex
        //       </Text>
        //     </Animated.View>
        //   );
        // }}
        renderItem={item => {
          return (
            <Pressable
              onPressIn={() => {
                setFullBanner(false);
              }}
              style={{
                marginBottom: 10,
                paddingHorizontal: 15,
              }}>
              {/* create card  */}
              {item.item.live && (
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('LiveConversation');
                  }}
                  activeOpacity={0.9}
                  style={{
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 10,

                      backgroundColor: colors.secondaryColor,

                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        // paddingVertical: 2,
                        width: '90%',
                        // backgroundColor: colors.redisExtraLight,
                        gap: 15,
                      }}>
                      <View
                        style={{
                          // height: 192,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: font.Poppins,
                              color: colors.textColor.neutralColor,
                              fontSize: 14,
                            }}>
                            Asadullah created a room
                          </Text>
                          <Text
                            style={{
                              fontFamily: font.PoppinsSemiBold,
                              color: colors.textColor.secondaryColor,
                              fontSize: 16,
                            }}>
                            Asadullah calling live
                          </Text>
                        </View>
                        <View
                          style={{
                            elevation: 2,
                            borderRadius: 50,
                          }}>
                          <Image
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 50,
                              // resizeMode: 'contain',
                              // position: 'absolute',
                              // bottom: -20,
                              // right: 20,
                              borderColor: colors.bg,
                              borderWidth: 2,
                            }}
                            source={require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {(item?.item.image ||
                item?.item.bookImage ||
                item?.item.text) && (
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
                            <TouchableOpacity
                              onPress={() => {
                                navigation?.navigate('BookShare');
                              }}
                              activeOpacity={0.9}
                              style={{
                                backgroundColor: colors.bg,
                                elevation: 2,
                                // height: 192,
                                borderColor: colors.bg,

                                borderRadius: 15,
                              }}>
                              <Image
                                resizeMode="stretch"
                                source={item.item.bookImage}
                                style={{
                                  // marginBottom: 20,
                                  // aspectRatio: 1,

                                  width: 150,

                                  height: 190,
                                  borderRadius: 15,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Pressable>
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
          room
          // ImageLink={newImage}
          setMessages={setMessages}
          messages={messages}
          setImageAssets={setNewImage}
          onSendImageMessage={() => {}}
          setTextMessage={setNewMessages}
          onPressLive={() => {
            setLiveModal(!liveModal);
          }}
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
            Are you sure you want to remove this FaceDwn!
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
      <ModalOfBottom
        panOf
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
              setModalVisible(false);

              navigation?.navigate('CreateFaceDown');
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
              Edit Face Dwn
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              setModalVisible(false);
              navigation?.navigate('FaceDownAddMember');
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
              Manage members
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: 'red',
              }}>
              Delete chat
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>
      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
        onlyTopRadius={20}
        panOf
        containerColor={colors.bg}>
         
     <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        
          contentContainerStyle={{
            gap: 25,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 20,
              color: colors.textColor.secondaryColor,
              // marginBottom: 10,
            }}>
            Live setup
          </Text>
          <View
            style={{
              backgroundColor: colors.gray.variant,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 50,
              flexDirection: 'row',
              gap: 15,
            }}>
            <Image
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
              source={require('../../assets/icons/modalIcons/earthyGray.png')}
            />
            <View>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 14,
                  color: colors.textColor.neutralColor,
                }}>
                Public
              </Text>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 12,
                  color: colors.textColor.neutralColor,
                }}>
                Everyone can join this room
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                gap: 15,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: '#A1A1A1',
                }}>
                Add title
              </Text>
              <TextInput
                value="Asadullah calling live"
                placeholderTextColor={colors.textColor.light}
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.neutralColor,
                }}
                placeholder="type "
              />
            </View>
          </View>
          <View>
            <View
              style={{
                gap: 15,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: '#A1A1A1',
                }}>
                Pinned link
              </Text>
              <TextInput
                value="https://www.youtube.com/watch?v=...."
                placeholderTextColor={colors.textColor.light}
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.neutralColor,
                }}
                placeholder="type "
              />
            </View>
          </View>
          <NormalButton
            onPress={() => {
              setMessages([
                ...messages,
                {
                  id: messages.length + 1,

                  text: newMessages,
                  createdAt: new Date(),
                  live: true,
                  user: {
                    _id: 1,
                    name: 'Amina',
                    avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
                  },
                },
              ]);
              setLiveModal(false);
              navigation?.navigate('LiveConversation');
            }}
            title="Start Live"
          />
        </ScrollView>
      </ModalOfBottom>
    </View>
  );
};

export default FaceDownConversation;

const styles = StyleSheet.create({});

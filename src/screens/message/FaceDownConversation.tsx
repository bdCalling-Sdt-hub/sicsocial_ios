import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
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
import {
  useDeleteFacedownMutation,
  useGetFaceDownByIdQuery,
} from '../../redux/apiSlices/facedwonSlice';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../components/common/NormalButton';
import NotifyTopComponent from '../../components/common/notify/NotifyTopComponent';
import ConversationHeader from '../../components/conversation/ConversationHeader';
import {useStyles} from '../../context/ContextApi';
import {useAudioPlayer} from '../../hook/playMusic';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useDeletedChatMutation} from '../../redux/apiSlices/chatSlices';
import {useLazyGetMessageQuery} from '../../redux/apiSlices/messageSlies';
import {IMessage} from '../../redux/interface/message';
import {getSocket} from '../../redux/services/socket';
import {makeImage} from '../../utils/utils';

const audioRecorderPlayer = new AudioRecorderPlayer();
const FaceDownConversation = ({
  navigation,
  route,
}: NavigProps<{
  facedown: {
    _id: string;
    image: string;
    name: string;
  };
  id: string;
}>) => {
  const {data: FaceDwn} = useGetFaceDownByIdQuery({
    id: route?.params?.data?.facedown?._id,
  });

  const [deletedFaceDown] = useDeleteFacedownMutation();

  const [deletedChat] = useDeletedChatMutation();

  // console.log(FaceDwn);

  const FaceDownData = FaceDwn?.data;
  // console.log(FaceDownData);
  // console.log(FaceDownData);
  const {data: userInfo} = useGetUserProfileQuery({});
  const [AllMessages, setAllMessages] = React.useState<IMessage[]>([]);
  const [showPinBook, setShowPinBook] = React.useState<boolean>(true);
  // console.log(userInfo);
  const [showImage, setShowImage] = React.useState<boolean>(false);
  const [imageIndex, setImageIndex] = React.useState<number>(0);
  const [showImages, setShowImages] = React.useState<Array<{url: string}>>([]);
  const {width, height} = useWindowDimensions();
  const {colors, font, window} = useStyles();

  const [modalVisible, setModalVisible] = React.useState(false);

  const [fullBanner, setFullBanner] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [liveModal, setLiveModal] = React.useState(false);
  const [open, setNotify] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const FULL_HIGHT = height * 0.24;
  const REGULAR_REGULAR = height * 0.1;

  const animateHight = useSharedValue(0);
  const animateOpacity = useSharedValue(0);

  const bannerImageHight = useSharedValue(0);
  const bannerImageWidth = useSharedValue(0);

  const animationStyleForUserConversation = useAnimatedStyle(() => {
    return {
      height: animateHight.value,
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
      flexDirection: 'row',
    };
  });

  const opacityAnStyle = useAnimatedStyle(() => {
    return {
      opacity: animateOpacity.value,
    };
  });

  // console.log(messages);
  // console.log(messages.length);

  useEffect(() => {
    if (fullBanner) {
      animateHight.value = withTiming(FULL_HIGHT, {duration: 500});
      bannerImageHight.value = withTiming(height * 0.22, {duration: 500});
      bannerImageWidth.value = withTiming(window.width * 0.35, {duration: 500});
      animateOpacity.value = withTiming(1, {duration: 1200});
    }
    if (!fullBanner) {
      animateHight.value = withTiming(REGULAR_REGULAR, {duration: 500});
      bannerImageHight.value = withTiming(height * 0.083, {duration: 500});
      bannerImageWidth.value = withTiming(window.width * 0.16, {
        duration: 500,
      });
      animateOpacity.value = withTiming(0, {duration: 50});
    }
  }, [fullBanner]);

  const animatePosition = useSharedValue(height * 0.07);

  const [getAllMessage, messageResult] = useLazyGetMessageQuery();

  const {toggleAudioPlayback} = useAudioPlayer();

  // console.log(userInfo);
  const [playItem, setPlayItem] = React.useState('');

  const [volume, setVolume] = React.useState<number>(1);

  const handleSelectIndex = (image: string) => {
    // setImageIndex(index);
    setImageIndex(
      showImages.findIndex(
        (item: {url: string}) => item.url === makeImage(image),
      ),
    );
    setShowImage(true);
  };

  const handleLoadData = async () => {
    const res = await getAllMessage({
      id: route?.params?.data?.id || route?.params?.id,
    });
    // console.log(res?.data?.data);
    setAllMessages(res?.data?.data);
    res?.data?.data.map(item => {
      if (item?.image) {
        setShowImages(prev => {
          return [
            ...prev,
            {
              url: makeImage(item?.image),
            },
          ];
        });
      }
    });
  };

  const socket = getSocket();
  useEffect(() => {
    if (AllMessages.length === 0) {
      handleLoadData();
    }
    socket?.on(
      `message::${route?.params?.data?.id || route?.params?.id}`,
      (data: IMessage) => {
        handleLoadData();
      },
    );
  }, [socket]);

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
              source={{
                uri: makeImage(FaceDownData?.image),
              }}
            />
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 16,
                color: colors.textColor.secondaryColor,
                marginLeft: 10,
              }}>
              {FaceDownData?.name}
            </Text>
          </View>
        }
        optionOnPress={() => {
          setModalVisible(true);
        }}
        navigation={navigation}
      />

      {showPinBook && FaceDownData?.book && (
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
            onPress={() => {
              setShowPinBook(false);
            }}
            style={{
              position: 'absolute',
              right: 12,
              top: 8,
              zIndex: +99999,
              backgroundColor: colors.bg,
              paddingHorizontal: 6,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 16,
                color: colors.textColor.secondaryColor,
              }}>
              X
            </Text>
          </TouchableOpacity>
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
                    navigation?.navigate('BookShare', {
                      data: FaceDownData?.book,
                    });
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
                    source={{
                      uri: makeImage(FaceDownData?.book?.bookImage),
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  {
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    flex: 1,
                  },
                ]}>
                <Animated.View>
                  <Text
                    numberOfLines={fullBanner ? 2 : 1}
                    style={{
                      fontSize: 16,
                      color: colors.textColor.secondaryColor,
                      fontFamily: font.Poppins,
                    }}>
                    {FaceDownData?.book?.name}
                  </Text>
                  <Text
                    numberOfLines={fullBanner ? 2 : 1}
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {FaceDownData?.book?.publisher}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: colors.blueColor,
                      fontFamily: font.Poppins,
                    }}>
                    {FaceDownData?.book?.bookUrl}
                  </Text>
                </Animated.View>

                <Animated.View
                  style={[
                    {
                      gap: 10,
                      flex: 1,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                    },
                    opacityAnStyle,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('PdfViewer', {
                        data: FaceDownData?.book,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 5,
                        backgroundColor: colors.primaryColor,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <Text style={{color: colors.textColor.white}}>
                        Reading This Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(FaceDownData?.book?.bookUrl);
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 5,
                        // backgroundColor: colors.blue,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderColor: colors.primaryColor,
                        borderWidth: 1,
                      }}>
                      <Text style={{color: colors.primaryColor}}>
                        Listening This Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}

      <FlatList
        scrollEventThrottle={10}
        // estimatedItemSize={height * 0.6}
        keyboardShouldPersistTaps="always"
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        // style={{
        //   height: height * 0.6,
        //   // backgroundColor: 'red',
        // }}

        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 60,
        }}
        onContentSizeChange={(w: number, h: number) => {
          if (height * 0.7 < h) {
            animatePosition.value = withTiming(-(height * 0.3), {
              duration: 500,
            });
          }
        }}
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y > 0) {
            animatePosition.value = withTiming(height * 0.07, {
              duration: 500,
            });
          }
          if (e.nativeEvent.contentOffset.y === 0) {
            animatePosition.value = withTiming(-(height * 0.3), {
              duration: 500,
            });
          }
        }}
        inverted
        data={AllMessages}
        ListHeaderComponent={() => {
          return (
            <>
              {messageResult?.isFetching && (
                <ActivityIndicator size={'small'} color={colors.primaryColor} />
              )}
            </>
          );
        }}
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
                    item.item?.sender._id === userInfo?.data?._id
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minHeight: item.item?.audio === playItem ? 60 : 40,
                    backgroundColor:
                      item.item?.sender._id === userInfo?.data?._id
                        ? item.item?.audio === playItem
                          ? colors?.secondaryDeeper1
                          : colors.secondaryColor
                        : colors.redisExtraLight,
                    flexDirection: 'row',
                  }}>
                  {item.item?.sender._id !== userInfo?.data?._id && (
                    <View>
                      <Image
                        source={{uri: makeImage(item.item.sender.avatar)}}
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
                          item.item?.sender._id === userInfo?.data?._id
                            ? 'flex-end'
                            : 'flex-start',
                      }}>
                      <View style={{alignItems: 'flex-end', gap: 10}}>
                        {item.item.image && (
                          <TouchableOpacity
                            onPress={() => {
                              handleSelectIndex(item.item.image);
                            }}
                            style={{
                              backgroundColor: colors.bg,
                              // elevation: 2,
                              height: 150,
                              // width: 300,
                              width: '100%',
                              borderRadius: 15,
                            }}>
                            <Image
                              source={{uri: makeImage(item.item.image)}}
                              resizeMode="cover"
                              style={{
                                // marginBottom: 20,
                                aspectRatio: 1,

                                height: 150,
                                borderRadius: 15,
                              }}
                            />
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          style={{}}
                          onPress={async () => {
                            if (item.item.book?.bookUrl) {
                              Linking.openURL(item.item.book.bookUrl);
                            } else if (item.item.audio) {
                              setPlayItem(item.item.audio);
                              toggleAudioPlayback(makeImage(item.item.audio));
                            }
                          }}>
                          {item.item.text && (
                            <Text
                              style={{
                                fontSize: 14,
                                color: colors.textColor.secondaryColor,
                                fontFamily:
                                  playItem === item.item.audio
                                    ? font?.PoppinsSemiBold
                                    : font?.Poppins,
                                maxWidth: width * 0.65,
                                textAlign:
                                  item.item?.sender._id === userInfo?.data?._id
                                    ? 'right'
                                    : 'left',
                              }}>
                              {item.item.text}
                            </Text>
                          )}
                        </TouchableOpacity>

                        {item.item.book && (
                          <TouchableOpacity
                            onPress={() => {
                              navigation?.navigate('BookShare', {
                                data: item.item.book,
                              });
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
                                  uri: makeImage(item.item?.book?.bookImage),
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
                                {item.item?.book?.name}
                              </Text>
                              <Text
                                style={{
                                  color: colors.textColor.neutralColor,
                                  fontSize: 12,
                                  fontFamily: font.Poppins,
                                }}>
                                {item.item?.book?.publisher}
                              </Text>
                            </View>
                          </TouchableOpacity>
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
          // flex: 1,
          height: 130,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ConversationCarousal
          photo
          type
          // live
          record
          books
          chatIt={route?.params?.data?.id}
          onSendImageMessage={() => {}}
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
                deletedFaceDown(FaceDownData?._id).then(res => {
                  if (res?.data) {
                    deletedChat(
                      route?.params?.data?.id || route?.params?.id,
                    ).then(res => {
                      if (res?.data) {
                        setConfirmationModal(false);
                        setShowPinBook(false);
                        navigation?.canGoBack() && navigation?.goBack();
                      }
                    });
                  }
                });
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
              setShowPinBook(true);
              setModalVisible(false);
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
              Show pin
            </Text>
          </TouchableOpacity>
          {FaceDownData?.createdBy === userInfo?.data?._id && (
            <>
              <TouchableOpacity
                onPress={() => {
                  // setIsFriend(false);
                  // setConfirmationModal(!confirmationModal);
                  // setIsFriendRequest(false);
                  // setIsFriendRequestSent(false);
                  setModalVisible(false);
                  navigation?.navigate('UpdateNewFaceDown', {
                    data: FaceDownData,
                  });
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
                  // console.log(FaceDownData);
                  navigation?.navigate('MembersManage', {
                    data: {id: route?.params?.data?.id},
                  });
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
            </>
          )}
        </View>
      </ModalOfBottom>
      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
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
                placeholderTextColor={colors.textColor.palaceHolderColor}
                style={{
                  color: colors.textColor.normal,
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
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
                placeholderTextColor={colors.textColor.palaceHolderColor}
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.normal,
                }}
                placeholder="type "
              />
            </View>
          </View>
          <NormalButton
            onPress={() => {
              setLiveModal(false);
              navigation?.navigate('LiveConversation');
            }}
            title="Start Live"
          />
        </ScrollView>
      </ModalOfBottom>
      <CustomModal
        width={'100%'}
        height={'100%'}
        modalVisible={showImage}
        containerColor="rgba(0, 0, 0, 0.8)"
        setModalVisible={setShowImage}>
        <ImageViewer
          imageUrls={showImages}
          show={showImage}
          backgroundColor="rgba(0, 0, 0, 0.8)"
          index={imageIndex}
          onSwipeDown={() => {
            setShowImage(false);
          }}
          useNativeDriver
          style={{
            width: '100%',
            height: '100%',
            borderWidth: 0,
            // backgroundColor: 'rgba(0, 0, 0, 0.8)',
            margin: 0,
            padding: 0,
            borderColor: 'red',
          }}
          enableSwipeDown
          enableImageZoom
          doubleClickInterval={200}
          renderImage={({style, source}) => {
            // console.log(source);
            return (
              <Image
                source={{uri: source.uri}}
                style={{
                  ...style,
                }}
              />
            );
          }}
          renderHeader={() => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setShowImage(false);
                }}
                style={{
                  padding: 10,
                  alignItems: 'flex-end',
                }}>
                <AntDesign name="close" size={24} color={'white'} />
              </TouchableOpacity>
            );
          }}
          onShowModal={() => {
            setShowImage(false);
          }}
        />
      </CustomModal>
    </View>
  );
};

export default FaceDownConversation;

const styles = StyleSheet.create({});

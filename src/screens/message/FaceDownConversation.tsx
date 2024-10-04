import React, {useEffect} from 'react';
import {
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
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {FlashList} from '@shopify/flash-list';
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
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useGetMessageQuery} from '../../redux/apiSlices/messageSlies';
import {IMessage} from '../../redux/interface/message';
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
  const {data: messages, refetch: messageRefetch} = useGetMessageQuery(
    {id: route?.params?.data?.id},
    {skip: !route?.params?.data?.id},
  );
  const FaceDownData = route?.params?.data?.facedown;
  // console.log(FaceDownData);
  const {data: userInfo} = useGetUserProfileQuery({});
  const [AllMessages, setAllMessages] = React.useState<IMessage[]>([]);
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

  const animatePosition = useSharedValue(height * 0.07);

  const onPlayAudio = async (audioUrl: string) => {
    try {
      setIsPlaying(true);
      await audioRecorderPlayer.startPlayer(audioUrl);

      // Optional: Stop the player after playback finishes
      audioRecorderPlayer.addPlayBackListener(e => {
        if (e?.current_position === e.duration) {
          onStopAudio();
        }
      });
    } catch (error) {
      console.log('Error playing audio:', error);
    }
  };

  const onStopAudio = async () => {
    try {
      setIsPlaying(false);
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    } catch (error) {
      console.log('Error stopping audio:', error);
    }
  };

  useEffect(() => {
    if (messages) {
      let imageFile: Array<{url: string}> = [];
      setAllMessages([...messages?.data] || []);
      messages.data?.forEach((item: any) => {
        if (item?.image) {
          imageFile.push({
            url: makeImage(item?.image),
          });
        }
      });
      setShowImages(imageFile || []);
    }
  }, [messages]);

  const handleSelectIndex = (image: string) => {
    // setImageIndex(index);
    setImageIndex(
      showImages.findIndex(
        (item: {url: string}) => item.url === makeImage(image),
      ),
    );
    setShowImage(true);
  };

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

      {/* <Animated.View
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
      </Animated.View> */}

      <FlashList
        scrollEventThrottle={10}
        estimatedItemSize={height * 0.6}
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
        data={AllMessages?.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })}
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
                    backgroundColor:
                      item.item?.sender._id === userInfo?.data?._id
                        ? colors.secondaryColor
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
                          onPress={async () => {
                            if (item.item.path) {
                              Linking.openURL(item.item.path);
                            } else if (item.item.audio) {
                              if (isPlaying) {
                                await onStopAudio();
                              } else {
                                await onPlayAudio(makeImage(item.item.audio));
                              }
                            }
                          }}>
                          <Text>Audio</Text>
                          {item.item.text && (
                            <Text
                              style={{
                                fontSize: 14,
                                color: colors.textColor.secondaryColor,
                                fontFamily: font.Poppins,
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

                        {item.item.path && (
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
                              source={{uri: item.item.path}}
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
          // flex: 1,
          height: 130,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ConversationCarousal
          photo
          type
          live
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

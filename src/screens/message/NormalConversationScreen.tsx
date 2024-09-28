import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';
import ConversationHeader from '../../components/conversation/ConversationHeader';
import CustomModal from '../../components/common/customModal/CustomModal';
import {IMessage} from '../../redux/interface/message';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import {NavigProps} from '../../interfaces/NaviProps';
import {makeImage} from '../../utils/utils';
import {useGetMessageQuery} from '../../redux/apiSlices/chatSlices';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useStyles} from '../../context/ContextApi';

export interface messagePros {
  id: number;
  text?: string;
  createdAt?: Date;
  live?: boolean;
  bookImage?: string;
  image?: string | null;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}
const audioRecorderPlayer = new AudioRecorderPlayer();
const NormalConversationScreen = ({
  navigation,
  route,
}: NavigProps<{id: string}>) => {
  const {width, height} = useWindowDimensions();
  const {colors, font} = useStyles();
  const {data: messages} = useGetMessageQuery({id: route?.params?.data?.id});
  const {data: userInfo} = useGetUserProfileQuery({});
  const [AllMessages, setAllMessages] = React.useState<IMessage[]>([]);
  // console.log(userInfo);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

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

  const [volume, setVolume] = React.useState<number>(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  const animatePosition = useSharedValue(height * 0.07);
  const animateOpacity = useSharedValue(1);

  useEffect(() => {
    if (messages) {
      // Create a shallow copy of the messages data before sorting
      const sortedMessages = [...(messages?.data || [])].sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      // Set the sorted messages
      setAllMessages(sortedMessages);
    }
  }, [messages]);

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
        icon={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_527_1901)">
<path d="M13.5058 2.90655C12.7431 2.08066 11.8041 1.43713 10.7587 1.02372C9.71324 0.610321 8.58811 0.43766 7.46681 0.518554C5.55516 0.679892 3.77507 1.55762 2.48319 2.97588C1.19131 4.39414 0.483045 6.24819 0.500308 8.16655V15.0001C0.500283 15.0989 0.529579 15.1956 0.584491 15.2778C0.639403 15.3601 0.717465 15.4242 0.808808 15.4621C0.869474 15.4873 0.934581 15.5003 1.00031 15.5001C1.13291 15.5 1.26006 15.4473 1.35381 15.3536L2.53581 14.1721C2.68001 14.0312 2.86983 13.9465 3.071 13.9333C3.27217 13.9201 3.47143 13.9792 3.63281 14.1001C5.14317 15.1854 7.00292 15.6708 8.85104 15.4621C10.6992 15.2534 12.4038 14.3654 13.6341 12.9706C14.8644 11.5758 15.5325 9.77358 15.5088 7.91386C15.4851 6.05414 14.7712 4.26957 13.5058 2.90655ZM14.4268 8.99305C14.2575 10.0909 13.8096 11.1271 13.1259 12.0026C12.4422 12.8782 11.5455 13.5639 10.5215 13.9943C9.49741 14.4248 8.38011 14.5856 7.27621 14.4614C6.17231 14.3373 5.11866 13.9323 4.21581 13.2851C3.89704 13.0548 3.51403 12.9305 3.12081 12.9296C2.88078 12.9292 2.64304 12.9763 2.4213 13.0682C2.19956 13.1601 1.9982 13.295 1.82881 13.4651L1.50031 13.7931V8.16655C1.48243 6.50123 2.09445 4.89065 3.21377 3.65747C4.3331 2.42429 5.87704 1.65958 7.53631 1.51655C8.51056 1.44725 9.48791 1.59824 10.3958 1.95832C11.3037 2.31841 12.1189 2.87833 12.7808 3.59655C13.4428 4.31476 13.9344 5.17282 14.2194 6.10705C14.5043 7.04128 14.5752 8.02768 14.4268 8.99305Z" fill="#DBB162"/>
<rect x="4.66699" y="6" width="1.33333" height="3.33333" rx="0.666667" fill="#DBB162"/>
<rect x="7.33398" y="4" width="1.33333" height="7.33333" rx="0.666667" fill="#DBB162"/>
<rect x="10" y="5.33337" width="1.33333" height="4.66667" rx="0.666667" fill="#DBB162"/>
</g>
<defs>
<clipPath id="clip0_527_1901">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`}
        title="Voice Message"
        optionOnPress={() => {
          setModalVisible(true);
        }}
        navigation={navigation}
      />

      {/* <Animated.View
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
              borderRadius: 28,
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
                borderRadius: 28,
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
              borderRadius: 28,
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
                borderRadius: 28,
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
      </Animated.View> */}

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
                          <View
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
                          </View>
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
          flex: 1,
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <ConversationCarousal
          photo
          type
          record
          books
          chatIt={route?.params?.data?.id}
          // ImageLink={newImage}
          // setMessages={setMessages}
          // messages={messages}
          // setImageAssets={setNewImage}
          onSendImageMessage={() => {}}
          // setTextMessage={setNewMessages}
          // onSendTextMessage={() => {
          //   setMessages([
          //     ...messages,
          //     {
          //       id: messages.length + 1,

          //       text: newMessages,
          //       createdAt: new Date(),

          //       user: {
          //         _id: 1,
          //         name: 'Amina',
          //         avatar: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
          //       },
          //     },
          //   ]);
          // }}
        />
      </View>

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

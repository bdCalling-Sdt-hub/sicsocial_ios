import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  useCreateMessageMutation,
  useLazyGetMessageQuery,
} from '../../redux/apiSlices/messageSlies';

import CustomModal from '../../components/common/customModal/CustomModal';
import Feather from 'react-native-vector-icons/Feather';
import {IMessage} from '../../redux/interface/message';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import {getSocket} from '../../redux/services/socket';
import {makeImage} from '../../utils/utils';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useStyles} from '../../context/ContextApi';

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

const LiveMessageScreen = ({navigation, route}: NavigProps<{data: any}>) => {
  console.log();
  const {width, height} = useWindowDimensions();
  const {colors, font} = useStyles();

  console.log(route?.params?.data);

  const [getAllMessage, messageResult] = useLazyGetMessageQuery();
  const [AllMessages, setAllMessages] = React.useState<any>([]);
  const [volume, setVolume] = React.useState<number>(1);
  const [newMessages, setNewMessages] = React.useState<string>('');
  const [newImage, setNewImage] = React.useState<string>('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const {data: userInfo} = useGetUserProfileQuery({});
  const handleLoadData = async () => {
    const res = await getAllMessage({
      id: route?.params?.data?.chat,
    });
    setAllMessages(res?.data?.data);
  };

  const socket = getSocket();
  const [createMessage, createMessageResult] = useCreateMessageMutation({});

  const handleCreateNewChat = React.useCallback(async (data: any) => {
    // console.log(chatIt, 'chatIt');
    try {
      // console.log(data, 'data');
      const formData = new FormData();
      formData.append('chatId', route?.params?.data?.chat);
      data?.text && formData.append('text', data?.text);
      const res = await createMessage(formData);
      if (res.data?.id) {
        setNewMessages('');
        socket?.emit(`message::${route?.params?.data?.chat}`, res.data);
      }
      // console.log(res, 'res');
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (AllMessages?.length === 0) {
      handleLoadData();
    }
    socket?.on(`message::${route?.params?.data?.chat}`, (data: IMessage) => {
      handleLoadData();
    });
  }, [socket]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        width: width,
      }}>
      <View
        style={{
          width: '100%',
          paddingVertical: 20,
          flexDirection: 'row',

          // justifyContent: 'flex-end',
          paddingHorizontal: '4%',

          // alignItems: 'center',
          gap: 15,
        }}>
        <TouchableOpacity
          style={{marginTop: '2%'}}
          onPress={() => navigation && navigation.goBack()}>
          <Feather
            name="arrow-left"
            color={colors.textColor.neutralColor}
            size={24}
          />
        </TouchableOpacity>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',

              paddingHorizontal: '4%',
              paddingVertical: '3%',

              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 12,
                  color: colors.textColor.neutralColor,
                }}>
                {route?.params?.data?.name}
              </Text>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 14,
                  color: colors.textColor.secondaryColor,
                }}>
                Room Conversations
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <Image
                  style={{
                    width: 12,
                    height: 12,
                  }}
                  source={require('../../assets/icons/modalIcons/earthyGray.png')}
                />
                <Text
                  style={{
                    fontFamily: font.PoppinsSemiBold,
                    fontSize: 12,
                    color: colors.textColor.neutralColor,
                  }}>
                  Public
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        inverted
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: 20,
        }}
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    minHeight: 40,
                    backgroundColor: colors.secondaryColor,

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
                        <TouchableOpacity style={{}} onPress={async () => {}}>
                          {item.item.text && (
                            <Text
                              style={{
                                fontSize: 14,
                                color: colors.textColor.secondaryColor,
                                fontFamily: font?.Poppins,
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
          paddingTop: 10,
          paddingBottom: 15,
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: '4%',
          // paddingVertical: '5%',
          alignSelf: 'center',

          gap: 10,
          // position: 'absolute',
        }}>
        <TextInput
          placeholder="Message"
          onChangeText={text => setNewMessages(text)}
          value={newMessages}
          style={{
            backgroundColor: 'rgba(235, 235, 235, 1)',
            flex: 1,
            borderRadius: 100,
            height: 50,
            paddingHorizontal: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleCreateNewChat({
              text: newMessages,
            });
            setNewMessages('');
          }}
          activeOpacity={0.9}
          style={{
            width: 50,
            height: 50,
            backgroundColor: colors.primaryColor,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 10,
          }}>
          <SvgXml
            xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2166 11.0202C21.2166 11.7502 20.7456 12.4002 19.9266 12.8102L3.5066 21.0202C3.1066 21.2202 2.7166 21.3202 2.3566 21.3202C1.8356 21.3202 1.3766 21.1002 1.0856 20.7112C0.836598 20.3702 0.596598 19.7802 0.886598 18.8202L2.7366 12.6502C2.7966 12.4702 2.8366 12.2512 2.8566 12.0202L12.9866 12.0202C13.5366 12.0202 13.9866 11.5702 13.9866 11.0202C13.9866 10.4702 13.5366 10.0202 12.9866 10.0202L2.8566 10.0202C2.8356 9.79023 2.7956 9.57023 2.7366 9.39023L0.886598 3.22023C0.596598 2.26023 0.836598 1.67023 1.0866 1.33023C1.5766 0.670234 2.5066 0.520234 3.5066 1.02023L19.9276 9.23023C20.7466 9.64023 21.2166 10.2902 21.2166 11.0202Z" fill="#FCFCFC"/>
</svg>
`}
          />
        </TouchableOpacity>
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

export default LiveMessageScreen;

const styles = StyleSheet.create({});

import React, { useRef } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import {
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import { TextInput } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';

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





const LiveMessageScreen = ({navigation}: NavigProps<null>) => {
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

  const animatePosition = useSharedValue(height * 0.07);
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
                Asadullah created a group
              </Text>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 14,
                  color: colors.textColor.secondaryColor,
                }}>
                Asadullah calling live{' '}
              </Text>
              <View
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
              </View>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        style={{
          marginBottom: height * 0.09,
        }}
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets
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
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: '4%',
          // paddingVertical: '5%',
          alignSelf: 'center',

          gap: 10,
          position: 'absolute',
          bottom: 0,
          height: height * 0.09,
          backgroundColor: colors.bg,
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

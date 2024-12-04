import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {
  Easing,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {isSmall, makeImage} from '../../../utils/utils';

import {DeviceEventEmitter} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Carousel from 'react-native-reanimated-carousel';
import {SvgXml} from 'react-native-svg';
import {GridList} from 'react-native-ui-lib';
import {useStyles} from '../../../context/ContextApi';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useGetAllBooksQuery} from '../../../redux/apiSlices/bookSlices';
import {useCreateMessageMutation} from '../../../redux/apiSlices/messageSlies';
import {getSocket} from '../../../redux/services/socket';
import {messagePros} from '../../../screens/message/NormalConversationScreen';
import {useImagePicker} from '../../../utils/hooks/useImagePicker';
import CustomModal from '../customModal/CustomModal';
import ModalOfBottom from '../customModal/ModalOfButtom';

const data = [
  {
    id: 1,
    name: 'Let’s talk',

    activeImage: require('../../../assets/icons/modalIcons/microphoneWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/microphoneGray.png'),
  },
  {
    id: 2,
    name: 'Share Books',
    activeImage: require('../../../assets/icons/modalIcons/boogWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/bookgray.png'),
  },
  {
    id: 3,
    name: 'Share photo',
    activeImage: require('../../../assets/icons/modalIcons/photoWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/photoGray.png'),
  },
  {
    id: 3,
    name: 'Type a message',
    activeImage: require('../../../assets/icons/modalIcons/typeWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/typeGray.png'),
  },
  {
    id: 4,
    name: 'Join your room',
    activeImage: require('../../../assets/icons/modalIcons/networkingWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/networkingGray.png'),
  },
  {
    id: 5,
    name: 'New Face Dwn',
    activeImage: require('../../../assets/icons/modalIcons/oneBook.png'),
    unActive: require('../../../assets/icons/modalIcons/oneBook.png'),
  },
];

const audioRecorderPlayer = new AudioRecorderPlayer();
interface ConversationCarousalProps extends NavigProps<null> {
  // Add props here if needed.
  type?: boolean;
  photo?: boolean;
  books?: boolean;
  live?: boolean;
  faceDown?: boolean;
  room?: boolean;
  record?: boolean;
  onPressLive?: () => void;
  onSendTextMessage?: () => void;
  onSendImageMessage?: () => void;
  setMessages?: Dispatch<SetStateAction<Array<messagePros>>>;
  messages?: Array<messagePros>;
  setTextMessage?: Dispatch<SetStateAction<string>>;
  setImageAssets?: Dispatch<SetStateAction<string>>;
  ImageMessage?: string;
  TextMessage?: string;
  chatIt?: string;
}

const ConversationCarousal = ({
  chatIt,
  books,
  faceDown,
  live,
  photo,
  record,
  room,
  route,
  type,
  onPressLive,
  messageRefetch,
}: ConversationCarousalProps) => {
  const absoluteData = [];

  if (record) {
    absoluteData.push(data[0]);
  }
  if (books) {
    absoluteData.push(data[1]);
  }
  if (photo) {
    absoluteData.push(data[2]);
  }
  if (type) {
    absoluteData.push(data[3]);
  }
  if (live) {
    absoluteData.push(data[4]);
  }
  if (faceDown) {
    absoluteData.push(data[5]);
  }
  if (!room && !photo && !record && !books && !type && !faceDown) {
    absoluteData.push(...data);
  }

  const socket = getSocket();

  const {data: BooksData} = useGetAllBooksQuery({});
  const [booksModal, setBooksModal] = React.useState(false);

  const [createMessage, createMessageResult] = useCreateMessageMutation({});
  const {height, width} = useWindowDimensions();
  const {colors, font} = useStyles();
  const [imageModal, setImageModal] = React.useState(false);
  const [textInputModal, setTextInputModal] = React.useState(false);
  const [activeIndexBigButton, setActiveIndexBigButton] = React.useState(0);
  const [recordOn, setRecordOn] = React.useState(false);
  const [recordOnDone, setRecordOnDone] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState<string>('');
  const textInputRef = React.useRef<TextInput>(null);
  const letsBorderAnimationValue = useSharedValue(23);

  const itemSize = 100;
  const centerOffset = width / 2 - itemSize / 2;

  const letsBorderAnimationValueStyle = useAnimatedStyle(() => {
    return {
      borderWidth: letsBorderAnimationValue.value,
    };
  });

  const handleImagePick = React.useCallback(
    async (option: 'camera' | 'library') => {
      try {
        if (option === 'camera') {
          const image = await useImagePicker({option: 'camera'});
          if (image?.length !== 0) {
            handleCreateNewChat({
              image: {
                uri: image![0].uri,
                type: image![0].type || 'image/jpeg', // or file type
                name: image![0].fileName || 'image',
              },
            });
            // createMessage(formData).then(res => console.log(res));
            // console.log(result);
          }
        }
        if (option === 'library') {
          const image = await useImagePicker({option: 'library'});
          if (image?.length !== 0) {
            handleCreateNewChat({
              image: {
                uri: image![0].uri,
                type: image![0].type || 'image/jpeg', // or file type
                name: image![0].fileName || 'image',
              },
            });
            // add image add a file image
            // console.log(result);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const animationStyle = React.useCallback(
    (value: number) => {
      'worklet';

      // const itemGap = interpolate(
      //   value,
      //   [-2, -2, -1, 0, 1, 2],
      //   [30, 40, 50, 0, -50, -40],
      // );
      const itemGap = interpolate(
        value,
        [-2, -1, 0, 1, 2],
        [40, 30, 0, -30, -40],
      );
      // const itemGap = interpolate(value, [-1, 0, 1], [50, 0, -50]);

      // const translateX =
      //   interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
      //   centerOffset -
      //   itemGap;
      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      // const translateY = interpolate(
      //   value,
      //   [-1, -0, 0, 0, 1],
      //   [10, -5, -10, -5, 20],
      // );

      // const scale = interpolate(
      //   value,
      //   [-1, -0.5, 0, 0.5, 1],
      //   [0.8, 0.85, 1.1, 0.85, 0.8],
      // );

      const opacity = interpolate(value, [-1, 0, 1], [0.4, 1, 0.4]);

      return {
        opacity,

        transform: [
          {
            translateX,
          },
          // {
          //   translateY,
          // },
          // {scale},
        ],
      };
    },
    [centerOffset],
  );
  const recodingOn = async () => {
    if (!recordOn) {
      // startListening(); // Start listening for speech recognition
      // setRecognizedText('');
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }

      setRecordOn(true);
      setRecordOnDone(false);
      letsBorderAnimationValue.value =
        letsBorderAnimationValue.value === 8
          ? withTiming(25, {
              duration: 200,
              easing: Easing.ease,
            })
          : withTiming(8, {
              duration: 200,
            });
      await audioRecorderPlayer.startRecorder();
    } else {
      // stopListening(); // Stop listening
      setRecordOn(false);
      setRecordOnDone(true);
      letsBorderAnimationValue.value = 20;
      const audioPath = await audioRecorderPlayer.stopRecorder();
      // console.log(audioPath);
      const audio = {
        uri: audioPath, // The path of the recorded audio file
        type: 'audio/mp4', // Initial format is MP4
        name: 'voice.mp4', // Use .mp4 extension
      };
      console.log(audio);
      // try {
      //   speechToText(audio);
      // } catch (error) {
      //   console.log(error);
      // }
      handleCreateNewChat({
        audio: {
          uri: audioPath, // The path of the recorded audio file
          type: 'audio/wav', // Initial format is MP4
          name: 'voice.wav', // Use .mp4 extension
        },
      });
      // createMessage(formData).then(res => console.log(res));
    }
  };

  const handleCreateNewChat = React.useCallback(async (data: any) => {
    // console.log(chatIt, 'chatIt');
    try {
      // console.log(data, 'data');
      const formData = new FormData();
      formData.append('chatId', chatIt);
      data?.text && formData.append('text', data?.text);
      data?.image && formData.append('image', data?.image);
      data?.audio && formData.append('audio', data?.audio);
      data?.book && formData.append('book', data?.book);
      const res = await createMessage(formData);
      if (res.data?.id) {
        socket?.emit(`message::${chatIt}`, res.data);
      }
      // console.log(res, 'res');
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('rn-recordback', event => {
      // Handle the event here
      console.log('Received rn-recordback event:', event);
    });

    return () => {
      // Clean up the listener on component unmount
      listener.remove();
    };
  }, []);

  return (
    <>
      <Carousel
        width={itemSize}
        // height={itemSize * 0.8}
        autoFillData
        height={itemSize}
        style={{
          width: width,
          height: height * 0.15,
          alignItems: 'center',
        }}
        loop={false}
        snapEnabled
        pagingEnabled
        data={absoluteData}
        // onSnapToItem={(index: number) => {
        //   setActiveIndexBigButton(index);
        //   setRecordOn(false);
        //   setRecordOnDone(false);
        //   letsBorderAnimationValue.value = 25;
        // }}
        // overscrollEnabled={false}
        renderItem={({index, item, animationValue}) => (
          <TouchableOpacity
            key={item.name} // Ensure unique key
            onPress={() => {
              if (item.name === 'Share photo') {
                setImageModal(!imageModal);
              }
              if (item.name === 'Share Books') {
                setBooksModal(!booksModal);
              }
              if (item.name === 'Let’s talk') {
                recodingOn();
              }
              if (item.name === 'Type a message') {
                setTextInputModal(!textInputModal);
              }
              if (item.name === 'Join your room') {
                onPressLive && onPressLive();
              }
            }}
            style={{
              width: 95,
              height: 95,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  scale: isSmall() ? 0.8 : 1,
                },
              ],
            }}>
            {activeIndexBigButton === index &&
            item.name === 'Let’s talk' &&
            recordOn ? (
              <>
                {recordOnDone ? (
                  <Animated.View
                    style={{
                      paddingHorizontal: '4%',
                      paddingVertical: 16,
                      backgroundColor: colors.green['#00C208'],
                      width: 90,
                      height: 90,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        borderRadius: 100,
                        shadowRadius: 10,
                        padding: 8,
                        shadowColor: '#52006A',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                        }}
                        source={require('../../../assets/icons/modalIcons/rightTik.png')}
                      />
                    </View>
                  </Animated.View>
                ) : (
                  <Animated.View
                    style={{
                      paddingHorizontal: '4%',
                      paddingVertical: 16,
                      width: 90,
                      height: 90,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AnimatedCircularProgress
                      size={95}
                      width={6}
                      rotation={10}
                      fill={100}
                      lineCap="round"
                      style={{
                        borderRadius: 100,
                        position: 'absolute',
                      }}
                      duration={10000}
                      tintColor={colors.neutralColor}
                      onAnimationComplete={() => {
                        setRecordOnDone(true);
                      }}
                    />
                    <Animated.View
                      style={[
                        {
                          borderRadius: 100,
                          borderColor: '#F7CC7F',
                          shadowRadius: 100,
                          padding: 8,
                          elevation: 2,
                          shadowColor: '#52006A',
                          backgroundColor: colors.white,
                        },
                        letsBorderAnimationValueStyle,
                      ]}>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 100,
                        }}
                        source={require('../../../assets/icons/modalIcons/microphoneSendary.png')}
                      />
                    </Animated.View>
                  </Animated.View>
                )}
              </>
            ) : (
              <Animated.View
                style={{
                  paddingHorizontal: '4%',
                  paddingVertical: 16,
                  backgroundColor: colors.primaryColor,
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 28,
                      height: 28,
                    }}
                    source={item?.activeImage}
                  />
                </View>
              </Animated.View>
            )}
          </TouchableOpacity>
        )}
        customAnimation={animationStyle}
      />
      {/* "image modal" */}
      <ModalOfBottom
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={async () => {
              await handleImagePick('camera');
              setImageModal(!imageModal);
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await handleImagePick('library');
              setImageModal(!imageModal);
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Image form gallery
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>
      <ModalOfBottom
        modalVisible={textInputModal}
        setModalVisible={setTextInputModal}
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: colors.primaryColor,
              flexDirection: 'row',
              gap: 10,
            }}>
            {/* {imageAssets && (
              <Image
                source={{uri: imageAssets}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  // elevation: 2,
                }}
              />
            )} */}

            <TextInput
              ref={textInputRef}
              placeholder="Type your message"
              onEndEditing={e => {
                handleCreateNewChat({text: e.nativeEvent.text});
                setTextInputModal(false);
              }}
              onChangeText={text => setTextMessage(text)}
              style={{
                backgroundColor: '#F1F1F1',
                borderRadius: 100,
                paddingHorizontal: 15,
                paddingVertical: 10,
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setTextInputModal(false);
                handleCreateNewChat({text: textMessage});
              }}
              style={{
                height: 40,
                width: 40,
                backgroundColor: colors.primaryColor,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.2151 10.9951C21.2151 11.7251 20.7441 12.3751 19.9251 12.7851L3.50513 20.9951C3.10513 21.1951 2.71513 21.2951 2.35513 21.2951C1.83413 21.2951 1.37513 21.0751 1.08413 20.6861C0.835133 20.3451 0.595133 19.7551 0.885133 18.7951L2.73513 12.6251C2.79513 12.4451 2.83513 12.2261 2.85513 11.9951L12.9851 11.9951C13.5351 11.9951 13.9851 11.5451 13.9851 10.9951C13.9851 10.4451 13.5351 9.99509 12.9851 9.99509L2.85513 9.99509C2.83413 9.76509 2.79413 9.54509 2.73513 9.36509L0.885133 3.19509C0.595133 2.23509 0.835133 1.64509 1.08513 1.30509C1.57513 0.645087 2.50513 0.495087 3.50513 0.995087L19.9261 9.20509C20.7451 9.61509 21.2151 10.2651 21.2151 10.9951Z" fill="#FCFCFC"/>
</svg>
`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>
      {/* book selection modal  */}
      <CustomModal
        modalVisible={booksModal}
        setModalVisible={setBooksModal}
        height={'85%'}
        containerColor={colors.bg}
        Radius={20}
        appearance
        backButton>
        <>
          <View
            style={{
              paddingHorizontal: '4%',
              marginTop: 25,
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

          <GridList
            showsVerticalScrollIndicator={false}
            containerWidth={width * 0.82}
            numColumns={2}
            data={BooksData?.data}
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
                  handleCreateNewChat({book: item.item._id});
                  setBooksModal(false);
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
                      uri: makeImage(item.item.bookImage),
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
                    {item.item.name}
                  </Text>
                  <Text
                    style={{
                      color: colors.textColor.neutralColor,
                      fontSize: 12,
                      fontFamily: font.Poppins,
                    }}>
                    {item.item.publisher}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      </CustomModal>
    </>
  );
};

export default React.memo(ConversationCarousal);

const styles = StyleSheet.create({});

import React, {useEffect, useState} from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Carousel, {TAnimationStyle} from 'react-native-reanimated-carousel';
import {useContextApi, useStyles} from '../../../context/ContextApi';
import {isSmall, isTablet, makeImage} from '../../../utils/utils';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {TextInput} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {GridList} from 'react-native-ui-lib';
import CustomModal from '../../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../../components/common/NormalButton';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useGetAllBooksQuery} from '../../../redux/apiSlices/bookSlices';
import {useCreateChatMutation} from '../../../redux/apiSlices/chatSlices';
import {useGetFaceDownQuery} from '../../../redux/apiSlices/facedwonSlice';
import {useCreateLiveMutation} from '../../../redux/apiSlices/liveSlice';
import {useCreateMessageMutation} from '../../../redux/apiSlices/messageSlies';
import {IBook} from '../../../redux/interface/book';
import {ICreateMessage} from '../../../redux/interface/interface';
import {IConversationProps} from '../../../screens/home/HomeScreen';

const data = [
  {
    id: 1,
    name: 'Let’s talk',

    activeImage: require('../../../assets/icons/modalIcons/microphoneWhite.png'),
    unActive: require('../../../assets/icons/modalIcons/microphoneGray.png'),
  },
  // {
  //   id: 2,
  //   name: 'Share Books',
  //   activeImage: require('../../../assets/icons/modalIcons/boogWhite.png'),
  //   unActive: require('../../../assets/icons/modalIcons/bookgray.png'),
  // },
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

const smallItems = [
  {
    id: 1,
    title: 'Public',
    type: 'public',
    activeImg: require('../../../assets/icons/modalIcons/earthyGray.png'),
    unActive: require('../../../assets/icons/modalIcons/earthBlack.png'),
  },
  {
    id: 2,
    title: 'Friends',
    type: 'private',
    activeImg: require('../../../assets/icons/modalIcons/shearFriendBlack.png'),
    unActive: require('../../../assets/icons/modalIcons/shearFriendGray.png'),
  },
  // {
  //   id: 3,
  //   title: 'Chosen buddies',
  //   type: 'private',
  //   activeImg: require('../../../assets/icons/modalIcons/shearFriendBlack.png'),
  //   unActive: require('../../../assets/icons/modalIcons/shearFriendGray.png'),
  // },
  // {
  //   id: 3,
  //   title: 'Asadullah face',
  //   type: 'public',
  //   house: true,
  // },
];
const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: 'voice.wav', // default 'audio.wav'
};

const audioRecorderPlayer = new AudioRecorderPlayer();
interface ConversationalModalProps extends NavigProps<null> {
  addNewVoiceCard?: Array<IConversationProps>;
  setAddNewVoiceCard?: React.Dispatch<
    React.SetStateAction<Array<IConversationProps>>
  >;
}

const ConversationalModal = ({navigation}: ConversationalModalProps) => {
  const [createChat, createChartResults] = useCreateChatMutation({});
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Public',
      type: 'public',
      activeImg: require('../../../assets/icons/modalIcons/earthyGray.png'),
      unActive: require('../../../assets/icons/modalIcons/earthBlack.png'),
    },
    {
      id: 2,
      title: 'Friends',
      type: 'private',
      activeImg: require('../../../assets/icons/modalIcons/shearFriendBlack.png'),
      unActive: require('../../../assets/icons/modalIcons/shearFriendGray.png'),
    },
  ]);
  const [createMessage, createMessageResult] = useCreateMessageMutation({});
  const {
    colors,
    font,
    window: {height, width},
  } = useStyles();
  const {data: BooksData} = useGetAllBooksQuery({});
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectBook, setSelectBook] = React.useState<IBook>();

  const {isLive, setIsLive, isDark} = useContextApi();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [conversationalModal, setConversationalModal] = React.useState(false);
  const [imageModal, setImageModal] = React.useState(false);
  const [textInputModal, setTextInputModal] = React.useState(false);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeIndexBigButton, setActiveIndexBigButton] = React.useState(0);
  const [recordOn, setRecordOn] = React.useState(false);
  const [recordOnDone, setRecordOnDone] = React.useState(false);
  const [imageAssets, setImageAssets] = React.useState<any>({});
  const textInputRef = React.useRef<TextInput>(null);
  const [selectOptionItem, setSelectOptionItem] = React.useState<number>();
  const [liveModal, setLiveModal] = React.useState(false);
  const [liveInfo, setLiveInfo] = React.useState<any>();

  const [createChartInfo, setCreateChatInfo] = React.useState();
  const [createMessageInfo, setCreateMessageInfo] =
    React.useState<ICreateMessage>();

  // lines of modal animation

  const modalWidth = useSharedValue(height * 0.116);
  const modalHight = useSharedValue(width * 0.244);
  const borderRadius = useSharedValue(100);
  const marginBottom = useSharedValue(65);
  const Bottom = useSharedValue('0%');
  const topBorderRadius = useSharedValue(100);
  const backgroundColor = useSharedValue('rgba(219, 177, 98, 1)');
  const opacityDown = useSharedValue(0.2);
  const letsBorderAnimationValue = useSharedValue(23);

  const {data: userFaceDown} = useGetFaceDownQuery({});
  // console.log(userFaceDown?.data, 'userFaceDown');

  const handleOpen = () => {
    setConversationalModal(true);
    modalWidth.value = withTiming(width * 1.8, {
      duration: 200,
    });
    modalHight.value = withTiming(
      isSmall()
        ? height * 0.777
        : isTablet()
        ? height * 0.6444
        : height * 0.6222,
      {
        duration: 200,
      },
    );

    Bottom.value = withTiming('0%', {duration: 200});

    marginBottom.value = withTiming(-200, {duration: 200});
    borderRadius.value = withTiming(isLive ? 5000 : 2000, {duration: 200});
    backgroundColor.value = withTiming(colors.bg, {
      duration: 600,
      easing: Easing.cubic,
    });
    // topBorderRadius.value = withTiming(100, {duration: 200});
    opacityDown.value = withTiming(1, {duration: 300});
  };
  const handleClose = () => {
    opacityDown.value = withTiming(0, {duration: 150});
    modalWidth.value = withTiming(isSmall() ? 80 : 100, {
      duration: 200,
    });
    modalHight.value = withTiming(isSmall() ? 80 : 100, {
      duration: 200,
    });
    Bottom.value = withTiming(
      isLive ? (isTablet() ? '16.8%' : '10.5%') : isSmall() ? '0%' : '0.4%',
      {duration: 200},
    );
    // marginBottom.value = withTiming(65, {duration: 200});
    borderRadius.value = withTiming(100, {duration: 200});
    backgroundColor.value = withTiming('rgba(219, 177, 98, 1)', {
      duration: 200,
      easing: Easing.ease,
    });
    topBorderRadius.value = withTiming(100, {duration: 200});
    setTimeout(() => {
      setConversationalModal(false);
    }, 200);
  };

  const styleOnModal = useAnimatedStyle(() => {
    return {
      width: modalWidth.value,
      height: modalHight.value,
      borderRadius: borderRadius.value,
      marginVertical: marginBottom.value,
      backgroundColor: backgroundColor.value,
      bottom: Bottom.value,
      maxWidth: 500,
    };
  });

  const itemSize = 80;
  const itemSizeSmall = 60;
  const centerOffset = width / 2 - itemSize / 2;

  const animationStyle1: TAnimationStyle = React.useCallback(
    (value: number) => {
      'worklet';

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2],
        [10, 30, 20, 0, -10, -0],
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSizeSmall, 0, itemSizeSmall]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0, 0, 0, 1],
        [20, 10, 0, 10, 20],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1.1, 0.85, 0.8],
      );

      const opacity = interpolate(value, [-1, 0, 1], [0.1, 1, 0.6]);

      return {
        opacity,

        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          {scale},
        ],
      };
    },
    [centerOffset],
  );
  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      'worklet';

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2],
        [30, 40, 50, 0, -50, -40],
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0, 0, 0, 1],
        [10, -10, -10, -10, 20],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1.1, 0.85, 0.8],
      );

      const opacity = interpolate(value, [-1, 0, 1], [0.4, 1, 0.4]);

      return {
        opacity,

        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          {scale},
        ],
      };
    },
    [centerOffset],
  );

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityDown.value,
    };
  });

  const letsBorderAnimationValueStyle = useAnimatedStyle(() => {
    return {
      borderWidth: letsBorderAnimationValue.value,
    };
  });

  const handleImagePick = async (option: 'camera' | 'library') => {
    try {
      if (option === 'camera') {
        const result = await launchCamera({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          handleCreateNewChat({
            image: {
              uri: result?.assets![0].uri,
              type: result?.assets![0].type,
              name: result?.assets![0].fileName,
            },
          });
          // console.log(result);
          setImageModal(false);
        }
      }
      if (option === 'library') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
        });

        if (!result.didCancel) {
          // add image add a file image
          handleCreateNewChat({
            image: {
              uri: result?.assets![0].uri,
              type: result?.assets![0].type,
              name: result?.assets![0].fileName,
            },
          });
          setImageModal(false);
          // console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const recodingOn = async () => {
    if (!recordOn) {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }

      setRecordOn(true);
      setRecordOnDone(false);
      await audioRecorderPlayer.startRecorder();
      letsBorderAnimationValue.value =
        letsBorderAnimationValue.value === 8
          ? withTiming(25, {
              duration: 200,
              easing: Easing.ease,
            })
          : withTiming(8, {
              duration: 200,
            });
    } else {
      setRecordOn(false);
      setRecordOnDone(true);
      letsBorderAnimationValue.value = 20;
      const audioPath = await audioRecorderPlayer.stopRecorder();
      console.log(audioPath);
      const audio = {
        uri: audioPath,
        type: 'audio/wav', // Try changing this if 'audio/x-wav' doesn't work
        name: 'voice.wav',
      };

      handleCreateNewChat({audio});
    }
  };

  const liveCardAnimationPositionY = useSharedValue('-8.5%');
  const voiceModalAnimationPositionY = useSharedValue('0%');

  useEffect(() => {
    if (textInputModal) {
      setTimeout(() => textInputRef.current?.focus(), 10);
    }

    if (isLive) {
      liveCardAnimationPositionY.value = withTiming(
        isSmall() ? '14%' : isTablet() ? '20%' : '8.5%',
        {
          duration: 1000,
        },
      );
      voiceModalAnimationPositionY.value = withTiming(
        isSmall() ? '22.3%' : isTablet() ? '25.5%' : '18%',
        {
          duration: 1000,
        },
      );
    }
    if (!isLive) {
      liveCardAnimationPositionY.value = withTiming('-9%', {
        duration: 1000,
      });
      voiceModalAnimationPositionY.value = withTiming(
        isSmall() ? '9%' : isTablet() ? '9%' : '7.8%',
        {
          duration: 1000,
        },
      );
    }

    const listener = DeviceEventEmitter.addListener('rn-recordback', event => {
      // Handle the event here
      console.log('Received rn-recordback event:', event);
    });
    return () => {
      // Clean up the listener on component unmount
      listener.remove();

      liveCardAnimationPositionY.value = withTiming('-9%', {
        duration: 1000,
      });
      voiceModalAnimationPositionY.value = withTiming(
        isSmall() ? '9%' : isTablet() ? '9%' : '7.8%',
        {
          duration: 1000,
        },
      );
    };
  }, [textInputModal, isLive]);

  // is live  card have checker and create animation asaa

  const rLiveCardStyle = useAnimatedStyle(() => {
    return {
      bottom: liveCardAnimationPositionY.value,
    };
  });
  const rVoiceModalStyle = useAnimatedStyle(() => {
    return {
      bottom: voiceModalAnimationPositionY.value,
    };
  });

  // console.log(createChartInfo);
  const handleCreateNewChat = React.useCallback(
    (data: any) => {
      const formData = new FormData();
      if (createChartInfo?.chatId) {
        formData.append('chatId', createChartInfo?.chatId);
        if (data?.image) {
          formData.append('image', data?.image);
        }
        if (data?.audio) {
          formData.append('audio', data.audio);
        }
        if (data?.text) {
          formData.append('text', data?.text);
        }
        if (data?.path) {
          formData.append('path', data?.path);
        }
        // console.log(formData);
        createMessage(formData).then(ms => {
          handleClose();
          console.log(ms);
          navigation?.navigate('FaceDownConversation', {
            data: {
              id: createChartInfo?.chatId,
              facedown: userFaceDown?.data?.find(
                i => i.chatId == createChartInfo?.chatId,
              ),
            },
          });
        });
      }
      createChat({type: createChartInfo?.type || 'public'}).then(res => {
        // console.log(res);
        if (res?.data?.data?._id) {
          formData.append('chatId', res.data?.data?._id);
          if (data?.image) {
            formData.append('image', data?.image);
          }
          if (data?.audio) {
            formData.append('audio', data.audio);
          }
          if (data?.text) {
            formData.append('text', data?.text);
          }
          if (data?.path) {
            formData.append('path', data?.path);
          }
          // console.log(formData);
          createMessage(formData).then(ms => {
            handleClose();
            console.log(ms);
            if (createChartInfo?.title === 'Chosen buddies') {
              setConversationalModal(false);
              navigation?.navigate('MakeGroup', {
                data: {
                  id: res?.data?.data?._id,
                  screenTitle: 'Make Group',
                  option: 'group',
                },
              });
            }
            if (createChartInfo?.title === 'Friends') {
              //  console.log(createChartInfo);
              setConversationalModal(false);
              navigation?.navigate('MakeGroup', {
                data: {
                  id: res?.data?.data?._id,
                  screenTitle: 'Send Message',
                  option: 'friend',
                },
              });
            }
          });
        }
      });
    },
    [createChartInfo, createMessageInfo],
  );

  const [createLive] = useCreateLiveMutation();

  const handleCreateLive = React.useCallback(async () => {
    // console.log(liveInfo?.name);
    if (!selectBook?._id) return Alert.alert('Please Select the book');
    if (!liveInfo?.name) return Alert.alert('Please give a live name');
    const chatRes = await createChat({type: 'public'});
    // console.log(selectBook);

    if (chatRes?.data?.data?._id) {
      const createdLive = await createLive({
        chatId: chatRes?.data?.data?._id,
        role: 'host',
        name: liveInfo?.name,
        book: selectBook?._id,
      });
      if (createdLive?.data) {
        setLiveInfo(null);
        setSelectBook(null);
        setLiveModal(false);

        navigation?.navigate('LiveConversation', {
          live: createdLive?.data?.data?._id,
        });
      }
      if (createdLive?.error) {
        Alert.alert(
          'Warring',
          'You have already live please end th previous session',
        );

        console.log('Warring', createdLive?.error?.data?.message);
      }
    } else {
      console.log(chatRes?.error?.data?.message);
    }
  }, [selectBook, liveInfo]);

  useEffect(() => {
    setItems(smallItems?.concat(userFaceDown?.data));
  }, [userFaceDown?.data]);
  // console.log(createChartInfo);
  // console.log(selectBook);
  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',

            borderRadius: 100,
            // width: '100%',

            alignSelf: 'center',
            transform: [
              {
                scale: isSmall() ? 0.8 : 1,
              },
            ],
          },
          rVoiceModalStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            handleOpen();
          }}
          style={{
            paddingHorizontal: '4%',
            paddingVertical: 16,
            backgroundColor: colors.primaryColor,
            // borderBottomWidth: 1,
            width: 100,
            height: 100,
            // borderColor: '#E2E2E2',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/microphone/microphone.png')}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            // bottom: 65,
            // width: '100%',
            // alignSelf: 'center',

            marginHorizontal: '5%',
            width: width * 0.9,
            height: isTablet() ? height * 0.05 : height * 0.09,
          },
          rLiveCardStyle,
        ]}>
        <View
          style={{
            backgroundColor: colors.bg,
            flexDirection: 'row',

            paddingHorizontal: isTablet() ? '4%' : '10%',
            paddingVertical: '3%',
            // elevation: 5,
            borderRadius: 1000,
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
              Asadullah calling live
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
                source={require('../../../assets/icons/modalIcons/earthyGray.png')}
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
          <TouchableOpacity
            onPress={() => {
              setIsLive(false);
            }}
            activeOpacity={0.9}
            style={{
              backgroundColor: 'rgba(241, 99, 101, 1)',
              width: '35%',
              height: 37,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <SvgXml
              xml={`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_5429)">
<path d="M5.59375 1.80081V6.35366C5.59375 7.07206 6.17616 7.65447 6.89456 7.65447H10.6019C10.7815 7.65447 10.9271 7.80006 10.9271 7.97969V9.08769C10.9271 9.36653 11.255 9.51606 11.4655 9.33322L13.2152 7.81378C13.3335 7.71103 13.4849 7.65447 13.6416 7.65447H14.6994C15.4178 7.65447 16.0002 7.07206 16.0002 6.35366V1.80081C16.0002 1.08241 15.4178 0.5 14.6994 0.5H6.89456C6.17612 0.5 5.59375 1.08241 5.59375 1.80081Z" fill="#FD8087"/>
<path d="M14.7008 0.5H13.6602C14.3786 0.5 14.961 1.08241 14.961 1.80081V6.35366C14.961 7.07206 14.3786 7.65447 13.6602 7.65447H14.7008C15.4192 7.65447 16.0016 7.07206 16.0016 6.35366V1.80081C16.0016 1.08241 15.4192 0.5 14.7008 0.5Z" fill="#FE646F"/>
<path d="M9.76859 6.42007C9.44116 6.10485 9.01044 5.93125 8.55575 5.93125C8.46422 5.93125 8.37378 5.93825 8.28503 5.95194C8.23966 5.8905 8.18997 5.83163 8.13616 5.77575C7.80725 5.43413 7.36191 5.24597 6.88219 5.24597C6.41375 5.24597 5.95584 5.43522 5.62587 5.76519L5.59375 5.79732V6.35366C5.59375 7.07207 6.17616 7.65447 6.89456 7.65447H10.2982C10.293 7.18232 10.105 6.744 9.76859 6.42007Z" fill="#FE646F"/>
<path d="M10.0261 10.9296C9.69785 10.6136 9.17554 10.6174 8.85194 10.941L9.57966 10.2132C9.91203 9.88087 9.92007 9.32884 9.58144 9.0028C9.25319 8.68677 8.73088 8.69055 8.40728 9.01415L9.135 8.28643C9.46738 7.95405 9.47541 7.40202 9.13679 7.07599C8.80854 6.75996 8.28622 6.76374 7.96263 7.08734L7.46857 7.5814C7.79216 7.2578 7.79594 6.73549 7.47991 6.40724C7.15388 6.06862 6.60185 6.07665 6.26947 6.40902L2.86441 9.81412L3.29963 9.0603C3.53466 8.65321 3.39953 8.11793 2.98807 7.89065C2.58919 7.67034 2.08569 7.80918 1.85685 8.20552L0.536691 10.4921C-0.369715 12.062 -0.108622 14.045 1.17322 15.3269C2.73738 16.891 5.27338 16.891 6.83753 15.3269L10.0243 12.1401C10.3567 11.8077 10.3647 11.2556 10.0261 10.9296Z" fill="#FED2A4"/>
<path d="M10.0247 10.9297C10.0117 10.9171 9.99825 10.9053 9.98466 10.8938L6.19381 14.6847C4.73894 16.1395 2.44344 16.2409 0.871094 14.9893C0.964281 15.1062 1.06413 15.2193 1.17178 15.3269C2.73594 16.8911 5.27194 16.8911 6.83609 15.3269L10.0229 12.1401C10.3553 11.8077 10.3633 11.2557 10.0247 10.9297Z" fill="#FFBD86"/>
<path d="M13.7759 5.14362H12.9141V4.31155H13.6951C13.8245 4.31155 13.9295 4.20662 13.9295 4.07718C13.9295 3.94774 13.8245 3.8428 13.6951 3.8428H12.9141V3.01074H13.7759C13.9053 3.01074 14.0103 2.9058 14.0103 2.77637C14.0103 2.6469 13.9053 2.54199 13.7759 2.54199H12.6797C12.5502 2.54199 12.4453 2.6469 12.4453 2.77637V5.37799C12.4453 5.50743 12.5502 5.61237 12.6797 5.61237H13.7759C13.9053 5.61237 14.0103 5.50743 14.0103 5.37799C14.0103 5.24855 13.9053 5.14362 13.7759 5.14362Z" fill="#DFF6FD"/>
<path d="M9.22106 3.89643C9.33606 3.75359 9.40513 3.57224 9.40513 3.37499C9.40513 2.91568 9.03144 2.54199 8.57212 2.54199H7.81641C7.68697 2.54199 7.58203 2.6469 7.58203 2.77637V5.37799C7.58203 5.44034 7.60687 5.50012 7.65103 5.54409C7.69497 5.5878 7.75444 5.61237 7.81641 5.61237H7.81744C7.8175 5.61237 8.5125 5.60927 8.70409 5.60927C9.21947 5.60927 9.63875 5.18999 9.63875 4.67462C9.63875 4.35027 9.47262 4.06412 9.22106 3.89643ZM8.57212 3.01074C8.77297 3.01074 8.93638 3.17415 8.93638 3.37499C8.93638 3.57584 8.77297 3.73924 8.57212 3.73924C8.51637 3.73924 8.41119 3.73955 8.29662 3.73993H8.05078V3.01074H8.57212ZM8.70409 5.14052C8.58497 5.14052 8.27153 5.14171 8.05078 5.14262V4.20968C8.12784 4.20937 8.21481 4.20902 8.29703 4.20874H8.70409C8.961 4.20874 9.17 4.41774 9.17 4.67465C9.17 4.93155 8.961 5.14052 8.70409 5.14052Z" fill="#DFF6FD"/>
<path d="M11.8378 2.58658C11.7293 2.51598 11.5841 2.54664 11.5135 2.65514L10.8854 3.61995L10.2509 2.64827C10.1802 2.53986 10.0349 2.50939 9.92657 2.58014C9.8182 2.65092 9.7877 2.79614 9.85848 2.90452L10.6512 4.11855L10.6481 5.37742C10.6478 5.50689 10.7524 5.61205 10.8819 5.61239H10.8825C11.0116 5.61239 11.1165 5.50783 11.1169 5.37861L11.1199 4.11892L11.9064 2.91086C11.9769 2.80239 11.9462 2.6572 11.8378 2.58658Z" fill="#DFF6FD"/>
<path d="M9.78752 9.33896L6.89193 12.2346L6.03765 11.3803L9.13284 8.28509C9.36612 8.05078 9.43859 7.70812 9.34287 7.41215L5.70621 11.0488L4.85193 10.1945L7.46659 7.57987C7.69902 7.34631 7.76543 7.01 7.6659 6.71765L4.52046 9.86309L4.43915 9.78178C4.34762 9.69025 4.19921 9.69025 4.10771 9.78178C4.01618 9.87331 4.01618 10.0217 4.10771 10.1132L6.97321 12.9787C7.01896 13.0245 7.07896 13.0474 7.13893 13.0474C7.1989 13.0474 7.2589 13.0245 7.30465 12.9787C7.39618 12.8872 7.39618 12.7388 7.30465 12.6473L7.22334 12.566L9.57762 10.2117C9.8108 9.97743 9.88321 9.63484 9.78752 9.33896Z" fill="#FFBD86"/>
<path d="M2.86329 9.81357L2.86276 9.8141L3.29798 9.06026C3.44692 8.80232 3.44704 8.49295 3.32257 8.24304L2.49479 9.5192L2.34467 9.75704C2.19526 9.99376 2.18214 10.2954 2.31045 10.5442L2.74914 11.3947C3.03798 11.9547 2.93267 12.6304 2.48707 13.0759L2.38432 13.1787C2.29279 13.2702 2.29282 13.4186 2.38435 13.5101C2.4301 13.5559 2.49007 13.5788 2.55007 13.5788C2.61007 13.5788 2.67004 13.5559 2.71582 13.5101L2.81857 13.4074C3.40895 12.817 3.54845 11.9218 3.16576 11.1798L2.72707 10.3293C2.67457 10.2275 2.67995 10.1041 2.74107 10.0072L2.86329 9.81357Z" fill="#FFBD86"/>
</g>
<defs>
<clipPath id="clip0_691_5429">
<rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`}
            />
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 14,
                color: colors.textColor.white,
              }}>
              Leave
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/*==================== Body part end ===================  */}

      {/*===================== modal main part start ================ */}
      {/* modal of mother  */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={conversationalModal}
        onDismiss={() => {
          setModalVisible(false);
        }}>
        <Pressable
          onPress={() => {
            handleClose();
          }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            // height: height,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <Animated.View
            style={[
              styleOnModal,

              {
                alignItems: 'center',
              },
            ]}></Animated.View>

          <Pressable
            style={{
              position: 'absolute',
              bottom: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              height: isSmall() ? height * 0.35 : height * 0.3,
              // gap: -20,
              zIndex: 99999,
            }}>
            <Carousel
              loop={false}
              style={{
                width: width,
                height: height * 0.2,
              }}
              width={itemSize}
              height={itemSize}
              snapEnabled
              pagingEnabled
              defaultIndex={0}
              data={items}
              onSnapToItem={(index: number) => {
                setActiveIndex(index);
                // console.log(index);
                setCreateChatInfo(items![index]);
              }}
              renderItem={({index, item, animationValue}) => (
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    transform: [
                      {
                        scale: isSmall() ? 0.8 : 1,
                      },
                    ],
                    alignItems: 'center',
                  }}>
                  <Animated.View
                    style={[
                      {
                        paddingHorizontal: '4%',
                        paddingVertical: 16,
                        backgroundColor: '#ECF3FF',
                        // borderBottomWidth: 1,
                        width: 50,
                        height: 50,
                        // borderColor: '#E2E2E2',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // elevation: 2,
                      },
                      opacityStyle,
                    ]}>
                    <View>
                      {item?.chatId ? (
                        <View
                          style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 30,
                              position: 'relative',
                              fontFamily: font.Poppins,
                              color: '#FFD40E',
                              textAlign: 'center',
                            }}>
                            {item?.name?.slice(0, 1)}
                          </Text>
                        </View>
                      ) : (
                        <Animated.Image
                          style={[
                            {
                              width: 24,
                              height: 24,
                              resizeMode: 'contain',
                            },
                            opacityStyle,
                          ]}
                          source={item?.activeImg}
                        />
                      )}
                    </View>
                  </Animated.View>
                  {activeIndex === index && (
                    <Animated.Text
                      style={[
                        {
                          marginVertical: 10,
                          textAlign: 'center',
                          fontSize: 11,
                          fontFamily: font.PoppinsMedium,
                          color: colors.textColor.neutralColor,
                        },
                        opacityStyle,
                      ]}>
                      {item?.title || item?.name}
                    </Animated.Text>
                  )}
                </TouchableOpacity>
              )}
              customAnimation={animationStyle1}
            />
            <Carousel
              loop={false}
              width={itemSize}
              height={itemSize}
              style={{
                width: width,
                height: height * 0.2,
              }}
              snapEnabled
              defaultIndex={0}
              pagingEnabled
              data={data}
              onSnapToItem={(index: number) => {
                // setActiveIndexBigButton(index);

                setRecordOn(false);
                setRecordOnDone(false);
                letsBorderAnimationValue.value = 25;
              }}
              renderItem={({index, item, animationValue}) => (
                <TouchableOpacity
                  onPress={async () => {
                    if (item.name === 'Share photo') {
                      // handleImagePick('camera');
                      setImageModal(true);
                      setConversationalModal(false);
                    }
                    if (item.name === 'Share Books') {
                      // all modal false
                      setModalVisible(false);
                      setConversationalModal(false);
                      setImageModal(false);
                      setTextInputModal(false);
                      navigation?.navigate('ShareBooks');
                    }
                    if (item.name === 'Let’s talk') {
                      // handleImagePick('camera');
                      recodingOn();
                    }
                    if (item.name === 'Type a message') {
                      setTextInputModal(!textInputModal);

                      setConversationalModal(false);
                    }
                    if (item.name === 'Join your room') {
                      // setLiveModal(true);
                      setConversationalModal(false);
                      // setBooksModal(true);
                      navigation?.navigate('CreateNewRoom');
                    }
                    if (item.name === 'New Face Dwn') {
                      navigation?.navigate('CreateFaceDown');
                      setConversationalModal(false);
                    }
                  }}
                  style={{
                    width: 95,
                    height: 95,
                    // justifyContent: 'center',
                    transform: [
                      {
                        scale: isSmall() ? 0.8 : 1,
                      },
                    ],
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 150,
                      // backgroundColor: 'red',
                    }}>
                    {/* <Animated.Text
                      style={[
                        {
                          textAlign: 'center',
                          fontSize: 14,
                          fontFamily: font.PoppinsMedium,
                          color: colors.textColor.neutralColor,
                        },
                        opacityStyle,
                      ]}>
                      {activeIndexBigButton === index && item?.name}
                    </Animated.Text> */}
                  </View>
                  {activeIndexBigButton === index &&
                  item.name === 'Let’s talk' &&
                  recordOn ? (
                    <TouchableOpacity
                      onPress={async () => {
                        recodingOn();
                      }}>
                      {recordOnDone ? (
                        <Animated.View
                          // onPress={() => {
                          //   handleOpen();
                          // }}

                          style={[
                            {
                              paddingHorizontal: '4%',
                              paddingVertical: 16,
                              backgroundColor: colors.green['#00C208'],
                              // borderBottomWidth: 1,
                              width: 90,
                              height: 90,
                              // borderColor: colors.primaryColor,
                              // borderWidth: 5,
                              borderRadius: 100,
                              // shadowOpacity: 0.4,

                              justifyContent: 'center',
                              alignItems: 'center',
                              // elevation: 2,
                            },
                            opacityStyle,
                          ]}>
                          <View
                            style={{
                              // width: 28,
                              // height: 28,
                              // padding: 1,
                              borderRadius: 100,
                              // elevation: 2,
                              // borderColor: '#F7CC7F',
                              // borderWidth: 8,
                              shadowRadius: 10,
                              padding: 8,
                              // elevation: 2,
                              shadowColor: '#52006A',
                              // backgroundColor: colors.white,
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
                          // onPress={() => {
                          //   handleOpen();
                          // }}

                          style={[
                            {
                              paddingHorizontal: '4%',
                              paddingVertical: 16,
                              // backgroundColor: colors.white,
                              // borderBottomWidth: 1,
                              width: 90,
                              height: 90,
                              // borderColor: colors.primaryColor,
                              // borderWidth: 5,
                              borderRadius: 100,
                              // shadowOpacity: 0.4,

                              justifyContent: 'center',
                              alignItems: 'center',
                              // elevation: 2,
                            },
                            opacityStyle,
                          ]}>
                          <AnimatedCircularProgress
                            size={100}
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
                            // backgroundColor={'rgba(0,0,0,.4)'}
                          />
                          <Animated.View
                            style={[
                              {
                                // width: 28,
                                // height: 28,
                                // padding: 1,
                                borderRadius: 100,
                                // elevation: 2,
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
                    </TouchableOpacity>
                  ) : (
                    <Animated.View
                      // onPress={() => {
                      //   handleOpen();
                      // }}

                      style={[
                        {
                          paddingHorizontal: '4%',
                          paddingVertical: 16,
                          backgroundColor: colors.primaryColor,
                          // borderBottomWidth: 1,
                          width: 90,
                          height: 90,
                          // borderColor: '#E2E2E2',
                          borderRadius: 100,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // elevation: 2,
                        },
                        opacityStyle,
                      ]}>
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

            {/* <View style={{}}>
              <ConversationCarousal1 />
            </View> */}
          </Pressable>
        </Pressable>
      </Modal>
      {/*===================== modal main part end ================ */}

      <ModalOfBottom
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        height={height * 0.15}
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('camera');
              setImageModal(false);
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
            onPress={() => {
              handleImagePick('library');
              // setModalVisible(false);
              // setImageModal(false);
              // setImageModal(false);
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

      {/*============================== text message modal =================================== */}
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
            <TextInput
              ref={textInputRef}
              placeholder="Type your message"
              onChangeText={text => {
                setCreateMessageInfo({text});
              }}
              placeholderTextColor={colors.textColor.palaceHolderColor}
              style={{
                color: colors.textColor.normal,
                backgroundColor: colors.bg,
                // backgroundColor : colors.whiteDark,
                borderRadius: 100,
                paddingHorizontal: 15,
                borderWidth: 1,
                borderColor: colors.secondaryColor,
                paddingVertical: 10,
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                handleCreateNewChat(createMessageInfo);
                setConversationalModal(false);
                setTextInputModal(false);
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
      {/*======================== live setup modal =================== */}
      {liveModal && (
        <ModalOfBottom
          modalVisible={liveModal}
          setModalVisible={setLiveModal}
          // backButton
          // ios-
          containerColor={colors.bg}>
          <View
            style={{
              gap: 25,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 20,
                color: colors.textColor.secondaryColor,
                // marginBottom: 10,
              }}>
              Room setup
            </Text>

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
                  value={liveInfo?.name}
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
                  onChangeText={text =>
                    setLiveInfo({
                      name: text,
                    })
                  }
                  placeholder="title"
                />
              </View>
            </View>
            <View
              style={{
                gap: 15,
                // marginHorizontal: '4%',
                // marginVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: '#A1A1A1',
                  paddingLeft: 10,
                }}>
                Share content
              </Text>

              <TouchableOpacity activeOpacity={0.8}>
                {selectBook && (
                  <Image
                    resizeMode="stretch"
                    style={{
                      borderRadius: 24,

                      height: 150,
                      width: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={{
                      uri: makeImage(selectBook?.bookImage),
                    }}
                  />
                )}
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  paddingHorizontal: 10,
                }}>
                {/* <TextInput
                placeholder="shear url/link"
                onChangeText={text => setLinkUrl(text)}
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  flex: 1,
                  color: colors.textColor.neutralColor,
                }}
                // defaultValue="write image /book/url link"
              /> */}
                <TouchableOpacity
                  onPress={() => {
                    setBooksModal(true);
                    setLiveModal(false);
                    setConversationalModal(false);
                  }}
                  activeOpacity={0.9}
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SvgXml
                    xml={`<svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_771_5364)">
<path d="M19.7831 9H16.4974H13.0289C12.1944 9.00141 11.5172 9.61924 11.5117 10.3842V18.6158C11.5172 19.3807 12.1944 19.9985 13.0289 19.9999H19.7874C19.973 20.0025 20.1519 19.9369 20.2845 19.8179C20.4111 19.6987 20.4818 19.539 20.4817 19.3727V9.64035C20.4809 9.28698 20.1686 9.00072 19.7831 9ZM16.786 9.52381H18.4645V11.9805L17.8688 11.1096C17.8447 11.0728 17.811 11.0419 17.7708 11.0198C17.6355 10.9454 17.46 10.9856 17.3788 11.1096L16.786 11.9765V9.52381ZM12.0903 10.3842C12.0926 9.90988 12.5115 9.52597 13.0289 9.52381H16.2145V12.1952C16.2038 12.4079 16.3494 12.6008 16.5703 12.6666C16.8217 12.736 17.0474 12.5868 17.1817 12.3903L17.626 11.7356L18.0703 12.3903C18.2031 12.5841 18.4288 12.7334 18.6874 12.6666C18.9072 12.6011 19.0525 12.4095 19.0431 12.1978V9.53035H19.7874C19.8533 9.53107 19.9066 9.57989 19.9074 9.64035V17.2354C19.8677 17.2292 19.8276 17.2262 19.7874 17.2264H13.0289C12.688 17.2263 12.3572 17.332 12.0903 17.5263V10.3842ZM19.9074 18.3565L13.3203 18.363C13.1625 18.363 13.0346 18.4803 13.0346 18.6249C13.0346 18.7696 13.1625 18.8868 13.3203 18.8868L19.9074 18.8803V19.3674C19.9077 19.3967 19.8954 19.425 19.8731 19.446C19.8502 19.4664 19.8193 19.4777 19.7874 19.4774H13.0289C12.5101 19.4774 12.0896 19.0919 12.0896 18.6164C12.0896 18.1409 12.5101 17.7554 13.0289 17.7554H19.7874C19.8533 17.7561 19.9066 17.805 19.9074 17.8654V18.3565Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip1_771_5364)">
<path d="M30.1545 18H27.4165H24.526C23.8306 18.0013 23.2663 18.5629 23.2617 19.2583V26.7416C23.2663 27.437 23.8306 27.9987 24.526 27.9999H30.1581C30.3127 28.0022 30.4619 27.9427 30.5724 27.8345C30.6778 27.7261 30.7368 27.5809 30.7367 27.4297V18.5821C30.736 18.2609 30.4758 18.0007 30.1545 18ZM27.6569 18.4762H29.0557V20.7095L28.5593 19.9178C28.5392 19.8843 28.5112 19.8563 28.4776 19.8362C28.3649 19.7685 28.2186 19.8051 28.151 19.9178L27.6569 20.7059V18.4762ZM23.7439 19.2583C23.7458 18.8272 24.0948 18.4782 24.526 18.4762H27.1807V20.9047C27.1718 21.098 27.2932 21.2735 27.4772 21.3333C27.6867 21.3964 27.8748 21.2607 27.9867 21.0821L28.3569 20.4869L28.7272 21.0821C28.8379 21.2583 29.026 21.394 29.2414 21.3333C29.4246 21.2737 29.5457 21.0996 29.5379 20.9071V18.4821H30.1581C30.2131 18.4828 30.2575 18.5272 30.2581 18.5821V25.4867C30.2251 25.4811 30.1916 25.4783 30.1581 25.4785H24.526C24.242 25.4784 23.9663 25.5745 23.7439 25.7511V19.2583ZM30.2581 26.5059L24.7689 26.5119C24.6374 26.5119 24.5308 26.6185 24.5308 26.7499C24.5308 26.8814 24.6374 26.988 24.7689 26.988L30.2581 26.9821V27.4249C30.2583 27.4516 30.2481 27.4773 30.2295 27.4964C30.2104 27.5149 30.1847 27.5252 30.1581 27.5249H24.526C24.0937 27.5249 23.7433 27.1745 23.7433 26.7422C23.7433 26.3099 24.0937 25.9595 24.526 25.9595H30.1581C30.2131 25.9601 30.2575 26.0045 30.2581 26.0595V26.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip2_771_5364)">
<path d="M8.15453 18H5.41646H2.526C1.83061 18.0013 1.2663 18.5629 1.26172 19.2583V26.7416C1.2663 27.437 1.83061 27.9987 2.526 27.9999H8.15811C8.31275 28.0022 8.46188 27.9427 8.57239 27.8345C8.67783 27.7261 8.73679 27.5809 8.73667 27.4297V18.5821C8.73602 18.2609 8.47578 18.0007 8.15453 18ZM5.65693 18.4762H7.05573V20.7095L6.55931 19.9178C6.53919 19.8843 6.51115 19.8563 6.47764 19.8362C6.36487 19.7685 6.21862 19.8051 6.15098 19.9178L5.65693 20.7059V18.4762ZM1.74386 19.2583C1.74582 18.8272 2.09484 18.4782 2.526 18.4762H5.18074V20.9047C5.17178 21.098 5.29315 21.2735 5.47717 21.3333C5.68669 21.3964 5.87479 21.2607 5.98669 21.0821L6.35693 20.4869L6.72716 21.0821C6.83788 21.2583 7.02597 21.394 7.24145 21.3333C7.4246 21.2737 7.54573 21.0996 7.53787 20.9071V18.4821H8.15811C8.21308 18.4828 8.25745 18.5272 8.25811 18.5821V25.4867C8.22507 25.4811 8.19162 25.4783 8.15811 25.4785H2.526C2.24198 25.4784 1.9663 25.5745 1.74386 25.7511V19.2583ZM8.25811 26.5059L2.76885 26.5119C2.63737 26.5119 2.53076 26.6185 2.53076 26.7499C2.53076 26.8814 2.63737 26.988 2.76885 26.988L8.25811 26.9821V27.4249C8.25834 27.4516 8.24811 27.4773 8.22953 27.4964C8.21043 27.5149 8.18474 27.5252 8.15811 27.5249H2.526C2.09371 27.5249 1.74326 27.1745 1.74326 26.7422C1.74326 26.3099 2.09371 25.9595 2.526 25.9595H8.15811C8.21308 25.9601 8.25745 26.0045 8.25811 26.0595V26.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip3_771_5364)">
<path d="M30.1545 0H27.4165H24.526C23.8306 0.00127975 23.2663 0.562943 23.2617 1.25833V8.74161C23.2663 9.437 23.8306 9.99866 24.526 9.99994H30.1581C30.3127 10.0022 30.4619 9.94268 30.5724 9.83447C30.6778 9.72613 30.7368 9.5809 30.7367 9.42971V0.582139C30.736 0.260891 30.4758 0.000654758 30.1545 0ZM27.6569 0.476188H29.0557V2.70951L28.5593 1.91785C28.5392 1.88433 28.5112 1.85627 28.4776 1.83618C28.3649 1.76853 28.2186 1.80508 28.151 1.91785L27.6569 2.70594V0.476188ZM23.7439 1.25833C23.7458 0.827168 24.0948 0.478152 24.526 0.476188H27.1807V2.90474C27.1718 3.09805 27.2932 3.27349 27.4772 3.33331C27.6867 3.39641 27.8748 3.26069 27.9867 3.08212L28.3569 2.48689L28.7272 3.08212C28.8379 3.25831 29.026 3.39403 29.2414 3.33331C29.4246 3.27373 29.5457 3.09956 29.5379 2.90713V0.48214H30.1581C30.2131 0.482795 30.2575 0.527169 30.2581 0.582139V7.48671C30.2251 7.48112 30.1916 7.47835 30.1581 7.47853H24.526C24.242 7.47844 23.9663 7.57454 23.7439 7.75114V1.25833ZM30.2581 8.5059L24.7689 8.51185C24.6374 8.51185 24.5308 8.61846 24.5308 8.74995C24.5308 8.88144 24.6374 8.98804 24.7689 8.98804L30.2581 8.98209V9.42494C30.2583 9.45158 30.2481 9.47726 30.2295 9.49637C30.2104 9.51491 30.1847 9.52518 30.1581 9.52494H24.526C24.0937 9.52494 23.7433 9.1745 23.7433 8.74221C23.7433 8.30992 24.0937 7.95948 24.526 7.95948H30.1581C30.2131 7.96013 30.2575 8.00451 30.2581 8.05948V8.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip4_771_5364)">
<path d="M8.15453 0H5.41646H2.526C1.83061 0.00127975 1.2663 0.562943 1.26172 1.25833V8.74161C1.2663 9.437 1.83061 9.99866 2.526 9.99994H8.15811C8.31275 10.0022 8.46188 9.94268 8.57239 9.83447C8.67783 9.72613 8.73679 9.5809 8.73667 9.42971V0.582139C8.73602 0.260891 8.47578 0.000654758 8.15453 0ZM5.65693 0.476188H7.05573V2.70951L6.55931 1.91785C6.53919 1.88433 6.51115 1.85627 6.47764 1.83618C6.36487 1.76853 6.21862 1.80508 6.15098 1.91785L5.65693 2.70594V0.476188ZM1.74386 1.25833C1.74582 0.827168 2.09484 0.478152 2.526 0.476188H5.18074V2.90474C5.17178 3.09805 5.29315 3.27349 5.47717 3.33331C5.68669 3.39641 5.87479 3.26069 5.98669 3.08212L6.35693 2.48689L6.72716 3.08212C6.83788 3.25831 7.02597 3.39403 7.24145 3.33331C7.4246 3.27373 7.54573 3.09956 7.53787 2.90713V0.48214H8.15811C8.21308 0.482795 8.25745 0.527169 8.25811 0.582139V7.48671C8.22507 7.48112 8.19162 7.47835 8.15811 7.47853H2.526C2.24198 7.47844 1.9663 7.57454 1.74386 7.75114V1.25833ZM8.25811 8.5059L2.76885 8.51185C2.63737 8.51185 2.53076 8.61846 2.53076 8.74995C2.53076 8.88144 2.63737 8.98804 2.76885 8.98804L8.25811 8.98209V9.42494C8.25834 9.45158 8.24811 9.47726 8.22953 9.49637C8.21043 9.51491 8.18474 9.52518 8.15811 9.52494H2.526C2.09371 9.52494 1.74326 9.1745 1.74326 8.74221C1.74326 8.30992 2.09371 7.95948 2.526 7.95948H8.15811C8.21308 7.96013 8.25745 8.00451 8.25811 8.05948V8.5059Z" fill="${colors.textColor.normal}"/>
</g>
<defs>
<clipPath id="clip0_771_5364">
<rect width="12" height="11" fill="white" transform="translate(10 9)"/>
</clipPath>
<clipPath id="clip1_771_5364">
<rect width="10" height="10" fill="white" transform="translate(22 18)"/>
</clipPath>
<clipPath id="clip2_771_5364">
<rect width="10" height="10" fill="white" transform="translate(0 18)"/>
</clipPath>
<clipPath id="clip3_771_5364">
<rect width="10" height="10" fill="white" transform="translate(22)"/>
</clipPath>
<clipPath id="clip4_771_5364">
<rect width="10" height="10" fill="white"/>
</clipPath>
</defs>
</svg>
`}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
              activeOpacity={0.9}
              style={{
                height: 50,
                width: 50,
                backgroundColor: colors.secondaryColor,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 9.75C6.48 9.75 5.25 8.52 5.25 7C5.25 5.48 6.48 4.25 8 4.25C9.52 4.25 10.75 5.48 10.75 7C10.75 8.52 9.52 9.75 8 9.75ZM8 5.75C7.31 5.75 6.75 6.31 6.75 7C6.75 7.69 7.31 8.25 8 8.25C8.69 8.25 9.25 7.69 9.25 7C9.25 6.31 8.69 5.75 8 5.75Z" fill="${colors.textColor.normal}"/>
<path d="M14 21.75H8C2.57 21.75 0.25 19.43 0.25 14V8C0.25 2.57 2.57 0.25 8 0.25H12C12.41 0.25 12.75 0.59 12.75 1C12.75 1.41 12.41 1.75 12 1.75H8C3.39 1.75 1.75 3.39 1.75 8V14C1.75 18.61 3.39 20.25 8 20.25H14C18.61 20.25 20.25 18.61 20.25 14V9C20.25 8.59 20.59 8.25 21 8.25C21.41 8.25 21.75 8.59 21.75 9V14C21.75 19.43 19.43 21.75 14 21.75Z" fill="${colors.textColor.normal}"/>
<path d="M17 7.74994C16.59 7.74994 16.25 7.40994 16.25 6.99994V0.999939C16.25 0.699939 16.43 0.419939 16.71 0.309939C16.99 0.199939 17.31 0.259939 17.53 0.469939L19.53 2.46994C19.82 2.75994 19.82 3.23994 19.53 3.52994C19.24 3.81994 18.76 3.81994 18.47 3.52994L17.75 2.80994V6.99994C17.75 7.40994 17.41 7.74994 17 7.74994Z" fill="${colors.textColor.normal}"/>
<path d="M15.0014 3.74994C14.8114 3.74994 14.6214 3.67994 14.4714 3.52994C14.1814 3.23994 14.1814 2.75994 14.4714 2.46994L16.4714 0.469941C16.7614 0.179941 17.2414 0.179941 17.5314 0.469941C17.8214 0.759941 17.8214 1.23994 17.5314 1.52994L15.5314 3.52994C15.3814 3.67994 15.1914 3.74994 15.0014 3.74994Z" fill="${colors.textColor.normal}"/>
<path d="M1.66932 18.7001C1.42932 18.7001 1.18932 18.5801 1.04932 18.3701C0.819316 18.0301 0.909317 17.5601 1.24932 17.3301L6.17932 14.0201C7.25932 13.3001 8.74932 13.3801 9.72932 14.2101L10.0593 14.5001C10.5593 14.9301 11.4093 14.9301 11.8993 14.5001L16.0593 10.9301C17.1193 10.0201 18.7893 10.0201 19.8593 10.9301L21.4893 12.3301C21.7993 12.6001 21.8393 13.0701 21.5693 13.3901C21.2993 13.7001 20.8193 13.7401 20.5093 13.4701L18.8793 12.0701C18.3793 11.6401 17.5393 11.6401 17.0393 12.0701L12.8793 15.6401C11.8193 16.5501 10.1493 16.5501 9.07932 15.6401L8.74932 15.3501C8.28932 14.9601 7.52933 14.9201 7.01933 15.2701L2.09932 18.5801C1.95932 18.6601 1.80932 18.7001 1.66932 18.7001Z" fill="${colors.textColor.normal}"/>
</svg>

`}
              />
            </TouchableOpacity> */}
              </View>
            </View>
            <NormalButton
              onPress={() => {
                handleCreateLive();
                // setLiveModal(false);
                // navigation?.navigate('LiveConversation');
              }}
              title="Start Room"
            />
          </View>
        </ModalOfBottom>
      )}

      {/* book selection modal  */}
      {booksModal && (
        <CustomModal
          modalVisible={booksModal}
          setModalVisible={setBooksModal}
          height={'85%'}
          containerColor={colors.bg}
          Radius={20}
          // slide="slide"
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
                  style={{
                    color: colors.textColor.normal,
                    flex: 1,
                  }}
                  placeholder="Search your books"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
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
                    setBooksModal(false);
                    setSelectBook(item?.item);
                    setLiveModal(true);
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
      )}
    </>
  );
};

export default React.memo(ConversationalModal);

const styles = StyleSheet.create({});

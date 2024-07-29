import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {SvgUri, SvgXml} from 'react-native-svg';
import ConversationalCard from '../../components/common/ConversationalCard';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import {Link, useTheme} from '@react-navigation/native';
import {NavigProps} from '../../interfaces/NaviProps';
import {
  ContextProvider,
  useContextApi,
  useStyles,
} from '../../context/ContextApi';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from 'react-native-reanimated-carousel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import NormalButton from '../../components/common/NormalButton';

const data = [
  {
    id: 1,
    name: 'Let’s talk',

    activeImage: require('../../assets/icons/modalIcons/microphoneWhite.png'),
    unActive: require('../../assets/icons/modalIcons/microphoneGray.png'),
  },
  {
    id: 2,
    name: 'Share Books',
    activeImage: require('../../assets/icons/modalIcons/boogWhite.png'),
    unActive: require('../../assets/icons/modalIcons/bookgray.png'),
  },
  {
    id: 3,
    name: 'Share photo',
    activeImage: require('../../assets/icons/modalIcons/photoWhite.png'),
    unActive: require('../../assets/icons/modalIcons/photoGray.png'),
  },
  {
    id: 3,
    name: 'Type a message',
    activeImage: require('../../assets/icons/modalIcons/typeWhite.png'),
    unActive: require('../../assets/icons/modalIcons/typeGray.png'),
  },
  {
    id: 4,
    name: 'Join your room',
    activeImage: require('../../assets/icons/modalIcons/networkingWhite.png'),
    unActive: require('../../assets/icons/modalIcons/networkingGray.png'),
  },
  {
    id: 5,
    name: 'New Face Dwn',
    activeImage: require('../../assets/icons/modalIcons/oneBook.png'),
    unActive: require('../../assets/icons/modalIcons/oneBook.png'),
  },
];

const items = [
  {
    id: 1,
    title: 'Public',
    activeImg: require('../../assets/icons/modalIcons/earthyGray.png'),
    unActive: require('../../assets/icons/modalIcons/earthBlack.png'),
  },
  {
    id: 2,
    title: 'Friends',
    activeImg: require('../../assets/icons/modalIcons/shearFriendBlack.png'),
    unActive: require('../../assets/icons/modalIcons/shearFriendGray.png'),
  },
  {
    id: 3,
    title: 'Chosen buddies',
    activeImg: require('../../assets/icons/modalIcons/shearFriendBlack.png'),
    unActive: require('../../assets/icons/modalIcons/shearFriendGray.png'),
  },
  {
    id: 3,
    title: 'Asadullah face',
    house: true,
  },
];

const {height, width} = Dimensions.get('window');

const HomeScreen = ({navigation}: NavigProps<null>) => {
  const LIVE_ACTIVE_VALUE = height * 0.079;
  const {isLive, setIsLive} = useContextApi();
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [conversationalModal, setConversationalModal] = React.useState(false);
  const [imageModal, setImageModal] = React.useState(false);
  const [textInputModal, setTextInputModal] = React.useState(false);
  const [liveModal, setLiveModal] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeIndexBigButton, setActiveIndexBigButton] = React.useState(0);
  const [recordOn, setRecordOn] = React.useState(false);
  const [recordOnDone, setRecordOnDone] = React.useState(false);
  const [imageAssets, setImageAssets] = React.useState<any>({});
  const textInputRef = React.useRef<TextInput>(null);

  // lines of modal animation

  const modalWidth = useSharedValue(height * 0.116);
  const modalHight = useSharedValue(width * 0.244);
  const marginBottom = useSharedValue(65);
  const borderRadius = useSharedValue(100);
  const topBorderRadius = useSharedValue(100);
  const backgroundColor = useSharedValue('rgba(219, 177, 98, 1)');
  const opacityDown = useSharedValue(0.2);
  const letsBorderAnimationValue = useSharedValue(23);

  const handleOpen = () => {
    setConversationalModal(true);
    modalWidth.value = withTiming(width * 1.6, {duration: 200});
    modalHight.value = withTiming(height * 0.75, {duration: 200});
    marginBottom.value = withTiming(-200, {duration: 200});
    borderRadius.value = withTiming(2000, {duration: 200});
    backgroundColor.value = withTiming(colors.bg, {
      duration: 600,
      easing: Easing.cubic,
    });
    // topBorderRadius.value = withTiming(100, {duration: 200});
    opacityDown.value = withTiming(1, {duration: 300});
  };
  const handleClose = () => {
    opacityDown.value = withTiming(0, {duration: 300});
    modalWidth.value = withTiming(height * 0.116, {duration: 200});
    modalHight.value = withTiming(width * 0.244, {duration: 200});
    marginBottom.value = withTiming(65, {duration: 200});
    borderRadius.value = withTiming(100, {duration: 200});
    backgroundColor.value = withTiming('rgba(219, 177, 98, 1)', {
      duration: 300,
      easing: Easing.ease,
    });
    topBorderRadius.value = withTiming(100, {duration: 200});
    setTimeout(() => {
      setConversationalModal(false);
    }, 150);
  };

  const styleOnModal = useAnimatedStyle(() => {
    return {
      width: modalWidth.value,
      height: modalHight.value,
      borderRadius: borderRadius.value,
      marginVertical: marginBottom.value,
      backgroundColor: backgroundColor.value,

      // borderTopRightRadius: topBorderRadius.value,
      // borderTopLeftRadius: topBorderRadius.value,
      // borderTopEndRadius: topBorderRadius.value,
      // borderTopStartRadius: topBorderRadius.value,
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
          setImageAssets(result?.assets![0].uri);
          // console.log(result);
        }
      }
      if (option === 'library') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          setImageAssets(result?.assets![0].uri);
          // console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const recordingAnimation = useSharedValue('0%');

  const recodingOn = () => {
    recordingAnimation.value = withTiming('100%', {duration: 10000});
  };

  const liveCardAnimationPositionY = useSharedValue('-10%');
  const voiceModalAnimationPositionY = useSharedValue('7.4%');
  const scrollViewGapHight = useSharedValue('20%');

  useEffect(() => {
    if (textInputModal) {
      setTimeout(() => textInputRef.current?.focus(), 10);
    }

    if (isLive) {
      liveCardAnimationPositionY.value = withTiming('10%', {
        duration: 1000,
      });
      voiceModalAnimationPositionY.value = withTiming('21%', {
        duration: 1000,
      });
      scrollViewGapHight.value = withTiming('25%', {
        duration: 1000,
      });
    }
    if (!isLive) {
      liveCardAnimationPositionY.value = withTiming('-9%', {
        duration: 1000,
      });
      voiceModalAnimationPositionY.value = withTiming('7.4%', {
        duration: 1000,
      });
      scrollViewGapHight.value = withTiming('2%', {
        duration: 1000,
      });
    }
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

  return (
    <SafeAreaView
      style={{
        height: '100%',
        // backgroundColor: 'gray',
        backgroundColor: colors.bg,
      }}>
      {/*=============== border cover ================== */}
      <View
        style={{
          height: '7.2%',
        }}
      />
      {/*==================== profile card start ===================  */}

      <LinearGradient
        colors={colors.gradient.variantTwo}
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 48,
              width: 48,
              borderRadius: 100,
              // backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg')}
          />
          <View
            style={{
              gap: -2,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: '#720B24',
              }}>
              Welcome to SIC
            </Text>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 16,
                color: colors.textColor.primaryColor,
              }}>
              Asadullah
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <SvgXml
              xml={`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.neutralColor}" stroke="${colors.textColor.neutralColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/*==================== profile card end ===================  */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingTop: 16,
          // paddingBottom: isLive ? LIVE_ACTIVE_VALUE + 30 : 16,
          paddingHorizontal: '5%',
        }}>
        {/*========================== conversation card start ======================= */}

        <ConversationalCard
          disabled
          conversationStyle="donation"
          conversationTitle="Hello Asadullah"
          // conversationSubtitle="Contribute and share with others."
          lastMessage="Contribute and share with others."
          onDonationShearPress={() => {
            setModalVisible(true);
          }}
          onDonationViewDetailsPress={() => {
            navigation?.navigate('donation');
          }}
        />
        <ConversationalCard
          conversationStyle="normal"
          onPress={() => {
            navigation?.navigate('NormalConversation');
          }}
          cardStyle="single"
          conversationTitle="You"
          conversationSubtitle="Start a chat"
          lastMessageTime="9:30 am"
          lastMessage="All of my friends pleas 
            Share your story my friends"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="two"
          // havNotUser
          onPress={() => {
            navigation?.navigate('GroupConversation');
          }}
          conversationTitle="Khushi Aktar"
          isReply
          conversationSubtitle="replied in chat"
          lastMessageTime="9:30 am"
          lastMessage="Hello asad vai, i`m 
coming from Banasri"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="two"
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          havNotUser
          conversationTitle="Khushi Aktar"
          isReply
          conversationSubtitle="replied in chat"
          lastMessageTime="9:30 am"
          lastMessage="Hello asad vai, i`m 
coming from Banasri"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="book"
          onPress={() => {
            navigation?.navigate('BookShare');
          }}
          conversationTitle="SIC Discussion"
          conversationSubtitle="recommendations"
          lastMessageTime="9:30 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="four"
          conversationTitle="COFFE HOUSE"
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          manyPeople
          havNotUser
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          havNotUser
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <Animated.View
          style={{
            paddingBottom: scrollViewGapHight,
          }}
        />
      </ScrollView>
      {/*==================== Body part Start ===================  */}

      <Animated.View
        style={[
          {
            position: 'absolute',

            borderRadius: 100,
            // width: '100%',
            alignSelf: 'center',
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
            source={require('../../assets/icons/microphone/microphone.png')}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            // bottom: 65,
            borderRadius: 100,
            // width: '100%',
            // alignSelf: 'center',
            marginHorizontal: '5%',
          },
          rLiveCardStyle,
        ]}>
        <View
          style={{
            backgroundColor: colors.bg,
            flexDirection: 'row',
            width: width * 0.9,
            paddingHorizontal: '10%',
            paddingVertical: '3%',
            elevation: 5,

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
          <TouchableOpacity
            onPress={() => {
              setIsLive(false);
            }}
            activeOpacity={0.8}
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

      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyTopRadius={20}
        backButton
        height={'30%'}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
            }}>
            Share Integrity Donation
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Linking.openURL('https://www.sic.com/donation');
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.blue,
                marginTop: '10%',
              }}>
              https://www.sic.com/donation
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString('https://www.sic.com/donation');
                ToastAndroid.showWithGravity(
                  'link copy to https://www.sic.com/donation',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }}
              style={{
                flexDirection: 'row',
                gap: 8,
                width: 84,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                elevation: 2,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons name="content-copy" size={15} />
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>
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
            height: height,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <Animated.View
            style={[
              styleOnModal,

              {
                alignItems: 'center',
              },
              // opacityStyle,
            ]}></Animated.View>

          <Pressable
            style={{
              position: 'absolute',
              // bottom: '15%',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.45,
              gap: -10,
              zIndex: 99999,
            }}>
            <Carousel
              style={{
                width: width,
                height: height * 0.3,
              }}
              width={itemSize}
              height={itemSize}
              snapEnabled
              pagingEnabled
              data={items}
              onSnapToItem={(index: number) => {
                setActiveIndex(index);
              }}
              renderItem={({index, item, animationValue}) => (
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 100,
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Animated.View
                    // onPress={() => {
                    //   handleOpen();
                    // }}

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
                      {item.house ? (
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
                            {item.title.slice(0, 1)}
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
                          source={item.activeImg}
                        />
                      )}

                      {/* {activeIndex === index ? (
                          <SvgXml xml={item.activeImage} />
                        ) : (
                          <SvgXml xml={item.unActive} />
                        )} */}
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
                      {item.title}
                    </Animated.Text>
                  )}
                </TouchableOpacity>
              )}
              customAnimation={animationStyle1}
            />
            <Carousel
              width={itemSize}
              height={itemSize}
              style={{
                width: width,
                height: height * 0.3,
              }}
              loop
              snapEnabled
              defaultIndex={0}
              pagingEnabled
              data={data}
              onSnapToItem={(index: number) => {
                setActiveIndexBigButton(index);
                setRecordOn(false);
                setRecordOnDone(false);
                letsBorderAnimationValue.value = 25;
              }}
              renderItem={({index, item, animationValue}) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.name === 'Share photo') {
                      // handleImagePick('camera');
                      setImageModal(!imageModal);
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
                      setRecordOn(!recordOn);
                      letsBorderAnimationValue.value =
                        letsBorderAnimationValue.value === 8
                          ? withTiming(25, {
                              duration: 200,
                              easing: Easing.ease,
                            })
                          : withTiming(8, {
                              duration: 200,
                            });
                      recordOnDone && setRecordOnDone(!recordOnDone);
                    }
                    if (item.name === 'Type a message') {
                      setTextInputModal(!textInputModal);

                      setConversationalModal(false);
                    }
                    if (item.name === 'Join your room') {
                      setConversationalModal(false);
                      setLiveModal(!liveModal);
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
                    <Animated.Text
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
                    </Animated.Text>
                  </View>
                  {activeIndexBigButton === index &&
                  item.name === 'Let’s talk' &&
                  recordOn ? (
                    <>
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
                              source={require('../../assets/icons/modalIcons/rightTik.png')}
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
                              source={require('../../assets/icons/modalIcons/microphoneSendary.png')}
                            />
                          </Animated.View>
                        </Animated.View>
                      )}
                    </>
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
                      <Animatable.View duration={100}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: 28,
                            height: 28,
                          }}
                          source={item?.activeImage}
                        />
                      </Animatable.View>
                    </Animated.View>
                  )}
                </TouchableOpacity>
              )}
              customAnimation={animationStyle}
            />
          </Pressable>
        </Pressable>
      </Modal>
      {/*===================== modal main part end ================ */}

      <ModalOfBottom
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        onlyTopRadius={20}
        height={'20%'}
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('camera');
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
        onlyTopRadius={20}
        height={'17%'}
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
      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
        height={'60%'}
        containerColor={colors.bg}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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

      <View
        style={{
          height: '7.2%',
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

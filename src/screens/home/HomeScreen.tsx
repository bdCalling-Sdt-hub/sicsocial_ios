import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
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
import {ContextProvider, useStyles} from '../../context/ContextApi';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  TAnimationStyle,
} from 'react-native-reanimated-carousel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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

const HomeScreen = ({navigation}: NavigProps<null>) => {
  const {height, width} = useWindowDimensions();
  const {colors, font} = useStyles();
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

  useEffect(() => {
    if (textInputModal) {
      setTimeout(() => textInputRef.current?.focus(), 10);
    }
  }, [textInputModal]);

  return (
    <View
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
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
            }}
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
          paddingBottom: 16,
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
          conversationTitle="SIC Discussion"
          conversationSubtitle="recommendations"
          lastMessageTime="9:30 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
      </ScrollView>
      {/*==================== Body part Start ===================  */}

      <View
        style={{
          position: 'absolute',
          bottom: 65,
          borderRadius: 100,
          // width: '100%',
          alignSelf: 'center',
        }}>
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
      </View>

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
                    }
                    if (item.name === 'New Face Dwn') {
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

      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

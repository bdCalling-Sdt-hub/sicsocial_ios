import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Carousel from 'react-native-reanimated-carousel';
import { SvgXml } from 'react-native-svg';
import { GridList } from 'react-native-ui-lib';
import { useStyles } from '../../../context/ContextApi';
import { NavigProps } from '../../../interfaces/NaviProps';
import { messagePros } from '../../../screens/message/NormalConversationScreen';
import { TemBooks } from '../../../utils/GetRandomColor';
import { isSmall } from '../../../utils/utils';
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

const options = [
  {
    id: 1,
    content: 'All',
  },
  {
    id: 2,
    content: 'Way of Life',
  },
  {
    id: 3,
    content: 'Business',
  },
  {
    id: 4,
    content: 'Human Family',
  },
  {
    id: 5,
    content: 'Worldview',
  },
];



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
}

const ConversationCarousal = ({
  navigation,
  books,
  faceDown,
  live,
  photo,
  record,
  room,
  route,
  type,
  onSendTextMessage,
  // setTextMessage,
  // setImageAssets,
  setMessages,
  onSendImageMessage,
  ImageMessage,
  TextMessage,
  messages,
  onPressLive,
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
  if (room) {
    absoluteData.push(data[4]);
  }
  if (faceDown) {
    absoluteData.push(data[5]);
  }
  if (!room && !photo && !record && !books && !type && !faceDown) {
    absoluteData.push(...data);
  }

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
  const [imageAssets, setImageAssets] = React.useState<any>();
  const [textMessage, setTextMessage] = React.useState<string>('');
  const textInputRef = React.useRef<TextInput>(null);
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectItem, setSelectIItem] = React.useState<number>(1);
  const letsBorderAnimationValue = useSharedValue(23);

  const itemSize = 100;
  const centerOffset = width / 2 - itemSize / 2;

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
          setImageAssets && setImageAssets(result?.assets![0].uri);
          // console.log(result);
          setTextInputModal(!textInputModal);
          // setMessages &&
          //   setMessages([
          //     ...messages,
          //     {
          //       id: messages.length + 1,
          //       text: '',
          //       createdAt: new Date(),
          //       image: result.assets![0].uri,
          //       user: {
          //         _id: 1,
          //         name: 'Amina',
          //         avatar: require('../../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
          //       },
          //     },
          //   ]);
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
          setImageAssets && setImageAssets(result?.assets![0].uri);
          // console.log(result);
          setTextInputModal(!textInputModal);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


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

  useEffect(() => {
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  }, [textInputModal]);

  return (
    <>
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: width,
          height: height * 0.158,
          alignItems: 'center',
          // paddingVertical: 10,
        }}
        loop
        snapEnabled
        pagingEnabled
        data={absoluteData}
        onSnapToItem={(index: number) => {
          setActiveIndexBigButton(index);
          setRecordOn(false);
          setRecordOnDone(false);
          letsBorderAnimationValue.value = 25;
        }}
        // enabled={false}
        // mode="horizontal-stack"

        // windowSize={1}
        // onConfigurePanGesture={g => g.enabled(false)}
        // maxScrollDistancePerSwipe={100}
        overscrollEnabled={false}
        renderItem={({index, item, animationValue}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.name === 'Share photo') {
                // handleImagePick('camera');
                setImageModal(!imageModal);
              }
              if (item.name === 'Share Books') {
                // all modal false
                setBooksModal(!booksModal); //
              }
              if (item.name === 'Let’s talk') {
                // handleImagePick('camera');
                setRecordOn(!recordOn);
                letsBorderAnimationValue.value =
                  letsBorderAnimationValue.value === 8
                    ? withTiming(25, {
                        duration: 200,
                      })
                    : withTiming(8, {
                        duration: 200,
                      });
                recordOnDone && setRecordOnDone(!recordOnDone);
              }
              if (item.name === 'Type a message') {
                setTextInputModal(!textInputModal);
              }
              if (item.name === 'Join your room') {
                onPressLive && onPressLive();
              }
              if (item.name === 'New Face Dwn') {
              }
            }}
            style={{
              width: 95,
              height: 95,
              justifyContent: 'center',
              alignItems: 'center',
              transform : [
                {
                  scale : isSmall() ? .8 : 1
                }
              ]
            }}>
            {/* <View
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
                ]}>
                {activeIndexBigButton === index && item?.name}
              </Animated.Text>
            </View> */}
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
                    ]}>
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
            onPress={() => {
              handleImagePick('camera');
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
            onPress={() => {
              handleImagePick('library');
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
            {imageAssets && (
              <Image
                source={{uri: imageAssets}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  // elevation: 2,
                }}
              />
            )}

            <TextInput
              ref={textInputRef}
              placeholder="Type your message"
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
                setMessages &&
                  setMessages([
                    ...messages,
                    {
                      id: messages && messages?.length + 1,
                      text: textMessage ? textMessage : '',
                      createdAt: new Date(),
                      image: imageAssets ? imageAssets : '',
                      user: {
                        _id: 1,
                        name: 'Amina',
                        avatar: require('../../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
                      },
                    },
                  ]);
                setImageAssets && setImageAssets('');
                setTextMessage && setTextMessage('');
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
          {/* <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: 'rgba(217, 217, 217, 1)',
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              horizontal
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 15,
              }}
              data={TemBooks}
              renderItem={item => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectOptionItem(item.index);
                    }}
                    style={{
                      backgroundColor:
                        selectOptionItem === item.index
                          ? colors.primaryColor
                          : colors.secondaryColor,
                      height: 35,
                      paddingHorizontal: 20,
                      // paddingVertical: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        color:
                          selectOptionItem === item.index
                            ? colors.textColor.white
                            : colors.textColor.light,
                        fontSize: 12,
                        fontFamily: font.PoppinsMedium,
                        textAlign: 'center',
                      }}>
                      {item.item.content}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View> */}

          <GridList
            showsVerticalScrollIndicator={false}
            containerWidth={width * 0.82}
            numColumns={2}
            data={TemBooks}
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
                setMessages &&
                setMessages([
                  ...messages,
                  {
                    id: messages.length + 1,
                    createdAt: new Date(),
                    bookImage: item.item.image,
                    user: {
                      _id: 1,
                      name: 'Amina',
                      avatar: require('../../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
                    },
                  },
                ]);

              setBooksModal(false);
                // setSelectBook(item?.item.image)
                // navigation?.navigate('BookShare', {data: item.item});
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
           <View style={{
            elevation : 1,
            padding : 3,
         
         
           }}>
           <Image
              resizeMode='stretch'
                style={{
                  height: height * 0.24,
                  width: width * 0.41,
                  borderRadius: 24,
                  borderWidth : 2,
                  borderColor : colors.bg
                }}
                source={item.item.image}
              />
           </View>
              <View style={{
                marginTop : 10,
                alignItems : "center",
                gap : 5,
                maxWidth : width * 0.41,
              }}>
              <Text style={{
                color: colors.textColor.light,
                fontSize: 14,
                fontFamily: font.PoppinsMedium,
                
              }}>{item.item.title}</Text>
              <Text style={{
                color: colors.textColor.neutralColor,
                fontSize: 12,
                fontFamily: font.Poppins,
                
              }}>{item.item.publisher}</Text>
              </View>
            </TouchableOpacity>
            )}
          />
        </>
      </CustomModal>
    </>
  );
};

export default ConversationCarousal;

const styles = StyleSheet.create({});

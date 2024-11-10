import {
  Easing,
  PermissionsAndroid,
  Platform,
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

import React from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import NormalButton from '../../../components/common/NormalButton';
import {useStyles} from '../../../context/ContextApi';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useSendFeedBackMutation} from '../../../redux/apiSlices/additionalSlices';
import {isSmall} from '../../../utils/utils';

const audioRecorderPlayer = new AudioRecorderPlayer();
const FeedBackScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {height} = useWindowDimensions();
  const [feedbackTest, setFeedbackTest] = React.useState('');
  const [sendFeedBack, feedBackResults] = useSendFeedBackMutation();
  const [recordOn, setRecordOn] = React.useState(false);
  const [recordOnDone, setRecordOnDone] = React.useState(false);
  const letsBorderAnimationValue = useSharedValue(23);

  const letsBorderAnimationValueStyle = useAnimatedStyle(() => {
    return {
      borderWidth: letsBorderAnimationValue.value,
    };
  });

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
      // console.log(audioPath);
      const audio = {
        uri: audioPath,
        type: 'audio/wav', // Try changing this if 'audio/x-wav' doesn't work
        name: 'voice.wav',
      };
      // sendFeedBackHandler(audio);
    }
  };

  const sendFeedBackHandler = async () => {
    let text = feedbackTest;

    try {
      await sendFeedBack({feedback: text}).then(res => {
        navigation?.goBack();
      });
    } catch (error) {}
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Your feedback"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={{
          paddingHorizontal: '4%',
        }}>
        <Text
          style={{
            fontFamily: font.PoppinsMedium,
            fontSize: 14,
            color: colors.textColor.gray,
            marginBottom: 8,
          }}>
          Feedback Details
        </Text>
        <View
          style={{
            padding: 16,
            backgroundColor: colors.secondaryColor,
            borderRadius: 20,
            minHeight: '90%',
            flexDirection: 'row',
            flex: 1,
          }}>
          <TextInput
            textAlignVertical="top"
            placeholder="Write your feedback here"
            multiline
            placeholderTextColor={colors.textColor.neutralColor}
            onChangeText={text => setFeedbackTest(text)}
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.light,
              lineHeight: 24,
              flex: 1,
              marginBottom: 16,
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          // paddingHorizontal: '5%',
          paddingBottom: 20,
          height: height * 0.25,
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              recodingOn();
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
            {/* {recordOn ? (
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
                    source={require('../../../assets/icons/modalIcons/microphoneWhite.png')}
                  />
                </View>
              </Animated.View>
            )} */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: '5%',
          }}>
          <NormalButton
            isLoading={feedBackResults?.isLoading}
            onPress={() => {
              sendFeedBackHandler();
            }}
            title="Send Feedback"
          />
        </View>
      </View>
    </View>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({});

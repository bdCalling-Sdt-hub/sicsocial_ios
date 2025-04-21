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

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../../interfaces/NaviProps';
import NormalButton from '../../../components/common/NormalButton';
import React from 'react';
import {isSmall} from '../../../utils/utils';
import {useSendFeedBackMutation} from '../../../redux/apiSlices/additionalSlices';
import {useStyles} from '../../../context/ContextApi';

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
            flex: 1,
            height: height * 0.3,
            flexDirection: 'row',
          }}>
          <TextInput
            textAlignVertical="top"
            placeholder="Write your feedback here"
            multiline
            placeholderTextColor={colors.textColor.palaceHolderColor}
            onChangeText={text => setFeedbackTest(text)}
            style={{
              color: colors.textColor.normal,
              fontFamily: font.Poppins,
              fontSize: 14,
              lineHeight: 24,
              flex: 1,
              height: '100%',
              marginBottom: 16,
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          // paddingHorizontal: '5%',
          paddingBottom: 20,
          // height: height * 0.25,
        }}>
        <View
          style={{
            alignItems: 'center',
            // paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              recodingOn();
            }}
            style={{
              // width: 95,
              // height: 95,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                {
                  scale: isSmall() ? 0.8 : 1,
                },
              ],
            }}></TouchableOpacity>
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

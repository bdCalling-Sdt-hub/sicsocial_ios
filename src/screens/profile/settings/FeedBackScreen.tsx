import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useStyles} from '../../../context/ContextApi';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import NormalButton from '../../../components/common/NormalButton';
import ConversationCarousal from '../../../components/common/ConversationCarousal/ConversationCarousal';

const FeedBackScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {height} = useWindowDimensions();

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
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
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
            height: height * 0.65,
          }}>
          <TextInput
            textAlignVertical="top"
            placeholder=" Sic is a social audio app — think of it as a call-in radio show for
            the 21st century. Users enter “Rooms,” where they can listen to (and
            participate in) conversations about specific topics. Sic is a social audio app — think of it as a call-in radio show for
            the 21st century. Users enter “Rooms,” where they can listen to (and
            participate in) conversations about specific topics. Sic is a social audio app — think of it as a call-in radio show for
            the 21st century. Users enter “Rooms,” where they can listen to (and
            participate  Sic is a social audio app — think of it as a call-in radio show for
            the 21st century. Users enter “Rooms,” where they can listen to (and
            participate in) conversations about specific topics. conversations about specific topics. Sic is a social audio app — think of it as a call-in radio show for
            the 21st century. Users enter “Rooms,” where they can listen to (and
            participate in) conversations about specific topics."
            multiline
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.light,
              lineHeight: 24,
              marginBottom: 16,
              flex: 2,
            }}
          />

          <View
            style={{
              flex: 1,
              right: '11%',
            }}>
            <ConversationCarousal />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: '5%',
          paddingVertical: 20,
        }}>
        <NormalButton title="Send Feedback" />
      </View>
    </View>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({});

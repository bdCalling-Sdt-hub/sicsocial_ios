import {StyleSheet, Text, TextInput, View} from 'react-native';
import PopUpModal, {
  PopUpModalRef,
} from '../../components/common/modals/PopUpModal';
import {useForgotPasswordMutation} from '../../redux/apiSlices/authSlice';

import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';

const EmailConfirmationScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const modalRef = React.useRef<PopUpModalRef>();
  const [email, setEmail] = React.useState('');

  const [mailVerification, results] = useForgotPasswordMutation();

  const handleEmailVerification = async () => {
    try {
      const response = await mailVerification({
        email: email,
      });
      console.log('Email Verification Response:', response);

      if (response?.data) {
        navigation?.navigate('VerifyEmail', {
          data: {
            email: email,
            otp: '',
            verificationType: 'passwordReset',
          },
        });
      }

      if (response.error) {
        modalRef.current?.open({
          title: 'Warning',
          content: response?.error?.data?.message,
        });
      }
    } catch (error) {
      console.error('Error sending email verification:', error);
    }
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        containerStyle={{
          marginTop: 10,
        }}
        // offBack
        // thirdColl
        // title="Welcome Back !"
        offTitle
        titleStyle={{
          fontSize: 24,
          // marginTop: 10,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <View
        style={{
          marginHorizontal: '5%',
          gap: 25,
          flex: 1,
          //   alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 80,
        }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.secondaryColor,
              textAlign: 'center',
            }}>
            Email Confirmation
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              textAlign: 'center',
            }}>
            Enter Your email for verification.
          </Text>
        </View>
        <View
          style={{
            gap: 8,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
            }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              fontFamily: font.Poppins,
              backgroundColor: colors.secondaryColor,
              borderRadius: 100,
              fontSize: 14,
              paddingHorizontal: 20,
              height: 56,
              color: colors.textColor.neutralColor,
            }}
            placeholder="Enter your email"
          />
        </View>

        <View>
          <NormalButton
            title="Send Verification Code"
            onPress={handleEmailVerification}
            isLoading={results.isLoading}
            disabled={!results.isLoading && email.length < 1}
          />
        </View>
      </View>
      <PopUpModal ref={modalRef} />
    </View>
  );
};

export default EmailConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

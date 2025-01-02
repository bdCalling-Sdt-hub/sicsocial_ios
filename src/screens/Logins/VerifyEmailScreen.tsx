import React, {useEffect, useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PopUpModal, {
  PopUpModalRef,
} from '../../components/common/modals/PopUpModal';
import {
  useSendCodeAgainMutation,
  useVerifyUserMutation,
} from '../../redux/apiSlices/authSlice';

import {useDispatch} from 'react-redux';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {IVerifyUserRoute} from '../../interfaces/Interface';
import {NavigProps} from '../../interfaces/NaviProps';
import {setToken} from '../../redux/apiSlices/tokenSlice';
import {lStorage} from '../../utils/utils';

const VerifyEmailScreen = ({
  navigation,
  route,
}: NavigProps<IVerifyUserRoute>) => {
  const verifyInfo = route?.params.data;
  const [sendVerifyCodeAgain, sendCodeResult] = useSendCodeAgainMutation();
  const [VerifyEmail, results] = useVerifyUserMutation();
  const modalRef = useRef<PopUpModalRef>();
  const textInputRef = useRef<TextInput>(null);
  const {colors, font} = useStyles();

  const dispatch = useDispatch();

  const [pin, setPin] = useState('');

  useEffect(() => {
    // Automatically focus the hidden TextInput on mount

    textInputRef.current?.focus();
  }, [pin]);

  const handlePinChange = (input: string) => {
    const filteredInput = input.replace(/[^0-9]/g, '').slice(0, 6); // Allow only numbers and limit to 6 digits
    setPin(filteredInput);
  };

  const handleEmailVerify = () => {
    if (pin.length < 6) {
      modalRef.current?.open({
        title: 'Warning',
        content: 'Please enter your 6 digits code',
      });
    } else {
      verifyInfo.otp = Number(pin);

      VerifyEmail(verifyInfo).then(res => {
        if (
          res?.data &&
          route?.params?.data?.verificationType === 'passwordReset'
        ) {
          lStorage.setString('token', res.data?.data?.accessToken);
          dispatch(setToken(res.data?.data?.accessToken));
          (navigation as any)?.replace('ChangePassword', {
            email: route?.params?.data?.email,
          });
        } else if (res?.data) {
          lStorage.setString('token', res.data?.data?.accessToken);
          dispatch(setToken(res.data?.data?.accessToken));
          (navigation as any)?.replace('VerifySuccessful', {
            data: {info: 'signup'},
          });
        } else if (res.error) {
          modalRef.current?.open({
            title: 'Warning',
            content: res?.error?.data?.message,
          });
        }
      });
    }
  };

  const handlePress = () => {
    textInputRef.current?.focus();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <BackButtonWithTitle
        navigation={navigation}
        containerStyle={{marginTop: 10}}
        offTitle
        titleStyle={{
          fontSize: 24,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <ScrollView style={{backgroundColor: colors.bg}}>
        <View
          style={{
            marginHorizontal: '5%',
            flex: 1,
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
                marginBottom: 16,
              }}>
              Enter 6 digits code
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: font.Poppins,
                color: colors.textColor.neutralColor,
                textAlign: 'center',
                marginBottom: 31,
              }}>
              Enter the 6 digits code that you received on your email{' '}
              {route?.params?.data?.email}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {Array.from({length: 6}).map((_, index) => (
              <Pressable
                key={index}
                onPress={handlePress}
                style={{
                  backgroundColor: '#FBF5EB',
                  borderRadius: 5,
                  height: 54,
                  width: 41,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: '#636363',
                    fontFamily: font.Poppins,
                  }}>
                  {pin[index] || ''}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={{flexDirection: 'row', marginTop: 31}}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: font.Poppins,
                color: colors.textColor.light,
              }}>
              I didn't receive the code,{' '}
            </Text>
            <TouchableOpacity
              disabled={sendCodeResult.isLoading}
              onPress={() => {
                sendVerifyCodeAgain({email: verifyInfo?.email}).then(res => {
                  if (res.data) {
                    modalRef.current?.open({
                      title: 'Please check your email',
                      content: res?.data?.message,
                    });
                    setPin('');
                  }
                });
              }}>
              <Text
                style={{
                  color: colors.primaryColor,
                  borderBottomColor: colors.primaryColor,
                  borderBottomWidth: 1,
                }}>
                Send Again
              </Text>
            </TouchableOpacity>
          </View>

          <NormalButton
            disabled={pin.length < 6}
            isLoading={results.isLoading}
            title="Confirm"
            marginVertical={31}
            onPress={handleEmailVerify}
          />
        </View>
      </ScrollView>

      <TextInput
        ref={textInputRef}
        keyboardType="numeric"
        style={{
          position: 'absolute',
          opacity: 0, // Fully hide the TextInput
        }}
        value={pin}
        onChangeText={handlePinChange}
        maxLength={6}
      />
      <PopUpModal ref={modalRef} />
    </View>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

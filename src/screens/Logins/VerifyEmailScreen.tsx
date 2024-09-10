import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import PopUpModal, { PopUpModalRef } from '../../components/common/modals/PopUpModal';
import { useSendCodeAgainMutation, useVerifyUserMutation } from '../../redux/apiSlices/authSlice';

import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import { useStyles } from '../../context/ContextApi';
import { IVerifyUserRoute } from '../../interfaces/Interface';
import { NavigProps } from '../../interfaces/NaviProps';
import { lStorage } from '../../utils/utils';

const VerifyEmailScreen = ({navigation,route}: NavigProps<IVerifyUserRoute>) => {
  const verifyInfo = route?.params.data;
   const [sendVerifyCodeAgain, sendCodeResult] = useSendCodeAgainMutation();
   const [VerifyEmail, results] = useVerifyUserMutation();
   const modalRef = React.useRef<PopUpModalRef>();
  console.log(verifyInfo);

  const {colors, font} = useStyles();
  const [pin, setPin] = React.useState('');
  const textInputRef = React.useRef<TextInput>(null);
  const handlePress = () => {
    if (textInputRef.current) {
   textInputRef.current?.focus()
    }
  };
  React.useEffect(() => {
    setTimeout(() => textInputRef.current?.focus(), 100);
  }, []);

  const handlePinChange = (input: string) => {
    // Ensure only numbers are entered and limit to 6 digits
    const filteredInput = input.replace(/[^0-9]/g, '').slice(0, 6);
    setPin(filteredInput);
  };

  const handleEmailVerify = () => {
    // check have pin or pin must be 8 digits 
    if (pin.length < 6) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Please enter your 6 digits code',
      });

      return;
    }
    // console.log(pin);

      verifyInfo.otp = Number(pin);
    
    VerifyEmail(verifyInfo).then(res => {
      if (res?.data) {
        lStorage.setString("token", res.data?.data?.accessToken);
        navigation?.navigate('VerifySuccessful');
      }
      if(res.error){
        modalRef.current?.open({
          // title : "Error",
          content: res?.error?.data?.message,
        });
      }
    });
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
              width: '100%',
            }}>
            Enter the 6 digits code that you received on yor email
          </Text>
        </View>
        <View
          style={{
            gap: 8,
            marginVertical: 15,
            maxWidth : '100%'
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: colors.bg,
            }}>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[0] ? pin[0] : ''}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[1] ? pin[1] : ''}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[2] ? pin[2] : ''}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[3] ? pin[3] : ''}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[4] ? pin[4] : ''}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handlePress()}
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
                {pin[5] ? pin[5] : ''}
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: font.Poppins,
              color: colors.textColor.light,
              marginTop: 31,
            }}>
            I didn't find confirmation code,{' '}
          </Text>
          <TouchableOpacity
        disabled={sendCodeResult.isLoading}
          onPress={()=>{
            sendVerifyCodeAgain({email :verifyInfo?.email}).then((res)=>{
              if(res.data){
                modalRef.current?.open({
                  title: 'Please check your email',
                  content: res?.data?.message,
                  lottify : require("../../assets/lotties/notifyEmail.json"),
                })
                setPin('')
              }
            })
          }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 25,
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
        <View>
          <NormalButton
          isLoading={results.isLoading}
            title="Confirm"
            marginVertical={31}
            onPress={() => {
              // navigation?.navigate('ResetPassword');
              // navigation?.navigate('VerifySuccessful');
              handleEmailVerify()
            }}
          />
        </View>
      </View>

      <TextInput
        ref={textInputRef}
        keyboardType="numeric"
        style={{
          position: 'absolute',
          top: -500,
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

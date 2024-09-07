import {
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

import { Formik } from 'formik';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';
import { useCreateUserMutation } from '../../redux/apiSlices/authSlice';

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const modalRef = React.useRef<PopUpModalRef>();
  const [createUser, results] = useCreateUserMutation();
  const {colors, font} = useStyles();
  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const OnSubmitHandler = values => {
    console.log(values);
    if (!values?.fullName) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Please enter your name',
      });
    } else if (!values?.email) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Please enter your email',
      });
    } else if (!values?.password) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Please enter your password',
      });
    }
    // password maust be at least 8 characters
    else if (values?.password?.length < 8) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Password must be at least 8 characters',
      });
    }
    // password or confirm password not match
    else if (values?.password !== values?.confirm_password) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Password or confirm password not match',
      });
    }
    // email not valid
    else if (!values?.email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Email not valid',
      });
    } else if (!values?.confirm_password) {
      modalRef.current?.open({
        // title : "Error",
        content: 'Please enter your confirm password',
      });
    } else {
      createUser(values).then(res => {
        console.log(res);
        if (res.error) {
          modalRef.current?.open({
            // title : "Error",
            content: res?.error?.data?.message,
          });
        }
        if (res?.data) {
          // console.log(res.data);
          if (res.data?.success) {
            navigation?.navigate('VerifyEmail', {
              data: {
                email: values?.email,
                otp : "",
                verificationType: 'emailVerification',
              },
            });
          }
          // lStorage.setString("token", res.data?.data?.accessToken);
        }
      });
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
        title="Sign Up !"
        titleStyle={{
          fontSize: 24,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
          textAlign: 'center',
          flex: 1,
          marginRight: '10%',
        }}
        thirdRoll
        // containerStyle={{}}

        // thirdRoll
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#5C5C5C',
              fontFamily: font.Poppins,
            }}>
            Please Enter Your Personal Data
          </Text>
        </View>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirm_password: '',
          }}
          onSubmit={values => OnSubmitHandler(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View
              style={{
                marginTop: 24,
                marginHorizontal: '5%',
                gap: 24,
              }}>
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
                  Full name
                </Text>
                <TextInput
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholder="ex : John Doe"
                  placeholderTextColor={colors.textColor.gray}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values?.fullName}
                />
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
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholder="ex : johndoe@gmail.com"
                  placeholderTextColor={colors.textColor.gray}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email}
                />
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
                  Contact no
                </Text>
                <TextInput
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholderTextColor={colors.textColor.gray}
                  placeholder="+000000000000"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values?.phoneNumber}
                />
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
                  Password
                </Text>
                <TextInput
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholderTextColor={colors.textColor.gray}
                  // placeholder="********"
                  secureTextEntry={!isShow}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values?.password}
                />
                <TouchableOpacity
                  onPress={() => setIsShow(!isShow)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 7,
                    padding: 10,
                  }}>
                  {isShow ? (
                    <Feather
                      name="eye"
                      size={24}
                      color={colors.textColor.neutralColor}
                    />
                  ) : (
                    <Feather
                      name="eye-off"
                      size={24}
                      color={colors.textColor.neutralColor}
                    />
                  )}
                </TouchableOpacity>
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
                  Confirm Password
                </Text>
                <TextInput
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  placeholderTextColor={colors.textColor.gray}
                  // placeholder="********"
                  secureTextEntry={!isShow}
                />
                <TouchableOpacity
                  onPress={() => setIsShow(!isShow)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 7,
                    padding: 10,
                  }}>
                  {isShow ? (
                    <Feather
                      name="eye"
                      size={24}
                      color={colors.textColor.neutralColor}
                    />
                  ) : (
                    <Feather
                      name="eye-off"
                      size={24}
                      color={colors.textColor.neutralColor}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 20}}>
                <NormalButton
                  isLoading={results?.isLoading}
                  title="Sign Up"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <PopUpModal ref={modalRef} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

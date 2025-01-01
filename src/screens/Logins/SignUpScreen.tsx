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

import {Formik} from 'formik';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useCreateUserMutation} from '../../redux/apiSlices/authSlice';

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const modalRef = React.useRef<PopUpModalRef>();
  const [createUser, results] = useCreateUserMutation();
  const {colors, font} = useStyles();
  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const OnSubmitHandler = values => {
    // console.log(values);

    createUser(values).then(res => {
      // console.log(res);
      if (res.error) {
        modalRef.current?.open({
          title: 'Warning',
          content: res?.error?.data?.message,
        });
      }
      if (res?.data) {
        // console.log(res.data);
        if (res.data?.success) {
          navigation?.navigate('VerifyEmail', {
            data: {
              email: values?.email,
              otp: '',
              verificationType: 'emailVerification',
            },
          });
        }
        // lStorage.setString("token", res.data?.data?.accessToken);
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
        contentContainerStyle={{paddingBottom: 20}}
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
          validate={values => {
            const errors: any = {};
            if (!values.fullName) {
              errors.fullName = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            }
            // email validate
            else if (!values.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
              errors.email = 'Email not valid';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            // password must be at least 8 characters
            else if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters';
            }
            // password or confirm password not match
            else if (
              values.confirm_password &&
              values.password !== values.confirm_password
            ) {
              errors.confirm_password =
                'Password or confirm password not match';
            }
            if (!values.confirm_password) {
              errors.confirm_password = 'Required';
            }
            return errors;
          }}
          onSubmit={values => OnSubmitHandler(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
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
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values?.fullName}
                />
              </View>
              {errors.fullName && touched.fullName && (
                <Text style={{color: 'red', fontSize: 12}}>
                  {errors.fullName}
                </Text>
              )}
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
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={{color: 'red', fontSize: 12}}>{errors.email}</Text>
              )}
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
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  placeholder="Enter your contact no"
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
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  placeholder="Enter your password"
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
              {errors.password && touched.password && (
                <Text style={{color: 'red', fontSize: 12}}>
                  {errors.password}
                </Text>
              )}
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
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  onChangeText={handleChange('confirm_password')}
                  onBlur={handleBlur('confirm_password')}
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  placeholder="Enter your confirm password"
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
              {errors.confirm_password && touched.confirm_password && (
                <Text style={{color: 'red', fontSize: 12}}>
                  {errors.confirm_password}
                </Text>
              )}
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

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
import {getStorageToken, lStorage} from '../../utils/utils';

import {Formik} from 'formik';
import React from 'react';
import {Checkbox} from 'react-native-ui-lib';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useLoginUserMutation} from '../../redux/apiSlices/authSlice';
import {setToken} from '../../redux/apiSlices/tokenSlice';

const LoginScreen = ({navigation}: NavigProps<null>) => {
  const modalRef = React.useRef<PopUpModalRef>();
  const {colors, font} = useStyles();

  console.log(getStorageToken());

  const [rememberItems, setRememberItems] = React.useState({
    check: lStorage.getBool('check') || false,
    email: lStorage.getString('email') || '',
    password: lStorage.getString('password') || '',
  });
  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(lStorage.getBool('check') || false);
  const dispatch = useDispatch();
  const [loginUser, results] = useLoginUserMutation();

  const OnSubmit = values => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(res => res.json())
    //   .then(res => console.log(res));

    loginUser(values).then(res => {
      if (res.error) {
        console.log(res.error);
        modalRef.current?.open({
          title: 'Warning',
          content:
            res?.error?.error === 'TypeError: Network request failed'
              ? 'Internet Connection Failed'
              : res?.error?.data?.message || res?.error?.error,
        });
      }
      if (res?.data) {
        // console.log(res.data?.data?.accessToken);
        dispatch(setToken(res.data?.data?.accessToken));
        lStorage.setString('token', res.data?.data?.accessToken);
        (navigation as any)?.replace('Loading');
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
        offBack
        // thirdColl
        title="Welcome Back !"
        titleStyle={{
          fontSize: 24,
          // marginTop: 10,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#5C5C5C',
              fontFamily: font.Poppins,
            }}>
            Please log in to continue
          </Text>
        </View>
        <Formik
          initialValues={{
            email: rememberItems.email,
            password: rememberItems.password,
          }}
          validate={values => {
            const errors: any = {};
            if (!values.email) {
              errors.email = 'Required';
            }
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            // passowrd mast be 8 char long
            if (values.password.length < 8) {
              errors.password = ' Password must be 8 char long';
            }
            return errors;
          }}
          onSubmit={values => OnSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            resetForm,
            errors,
            touched,
          }) => (
            <View
              style={{
                marginTop: 105,
                marginHorizontal: '5%',
                gap: 24,
              }}>
              <View
                style={{
                  gap: 8,
                }}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: '#A1A1A1',
                    }}>
                    Email{' '}
                  </Text>
                  {errors.email && touched.email && (
                    <Text style={tw`text-red-400 font-PoppinsRegular text-xs`}>
                      {errors.email}
                    </Text>
                  )}
                </View>
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
                  placeholder="Enter your email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email}
                />
              </View>

              <View
                style={{
                  gap: 8,
                }}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: '#A1A1A1',
                    }}>
                    Password{' '}
                  </Text>
                  {errors.password && touched.password && (
                    <Text style={tw`text-red-400 font-PoppinsRegular text-xs`}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <TextInput
                  value={values.password}
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  style={{
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter your password"
                  secureTextEntry={!isShow}
                  // placeholderTextColor={colors.textColor.palaceHolderColor}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
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
                      color={colors.textColor.normal}
                      size={24}
                    />
                  ) : (
                    <Feather
                      name="eye-off"
                      color={colors.textColor.normal}
                      size={24}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (!rememberItems.check) {
                      setRememberItems({
                        check: true,
                        email: values.email,
                        password: values.password,
                      });
                      lStorage.setBool('check', true);
                      lStorage.setString('email', values.email);
                      lStorage.setString('password', values.password);
                    }

                    if (rememberItems.check) {
                      lStorage.removeItem('email');
                      lStorage.removeItem('password');
                      lStorage.removeItem('check');
                      setRememberItems({
                        check: false,
                        email: '',
                        password: '',
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                  <Checkbox
                    value={rememberItems.check}
                    onValueChange={() => {
                      if (!rememberItems.check) {
                        setRememberItems({
                          check: true,
                          email: values.email,
                          password: values.password,
                        });
                        lStorage.setBool('check', true);
                        lStorage.setString('email', values.email);
                        lStorage.setString('password', values.password);
                      }

                      if (rememberItems.check) {
                        lStorage.removeItem('email');
                        lStorage.removeItem('password');
                        lStorage.removeItem('check');
                        setRememberItems({
                          check: false,
                          email: '',
                          password: '',
                        });
                      }
                    }}
                    containerStyle={{
                      borderWidth: 1,
                      borderColor: colors.textColor.neutralColor,
                    }}
                    borderRadius={5}
                    size={18}
                    // iconColor="red"
                    color="white"
                    // size={10}
                    iconColor={colors.green['#00B047']}
                  />
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 12,
                      color: '#A1A1A1',
                    }}>
                    Remember me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    navigation?.navigate('EmailConfirmation');
                  }}>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 12,
                      color: colors.primaryColor,
                      borderBottomWidth: 0.4,
                      borderBottomColor: colors.primaryColor,
                      lineHeight: 14,
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <NormalButton
                  onPress={() => {
                    handleSubmit();
                    // navigation?.navigate('HomeRoutes');
                  }}
                  title="Log In"
                  isLoading={results.isLoading}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('SignUp');
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsSemiBold,
                      fontSize: 14,
                      color: '#A15C6C',
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>

      <PopUpModal ref={modalRef} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

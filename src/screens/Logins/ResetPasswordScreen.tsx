import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {useStyles} from '../../context/ContextApi';

const ResetPasswordScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        thirdColl
        // title="Sign Up !"
        titleStyle={{
          fontSize: 24,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          marginBottom: '25%',
        }}>
        <View
          style={{
            marginBottom: 10,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.secondaryColor,
              textAlign: 'center',
            }}>
            Reset Password !
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.light,
              textAlign: 'center',
            }}>
            Please Enter Your Personal Data
          </Text>
        </View>
        <Formik
          initialValues={{
            password: 'asdfsadf',
            confirm_password: 'asdfsadf',
          }}
          onSubmit={values => console.log(values)}>
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
                  Password
                </Text>
                <TextInput
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
                  placeholder="Enter you password"
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

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('VerifySuccessful');
                    // handleSubmit();
                  }}
                  style={{
                    backgroundColor: colors.primaryColor,
                    borderRadius: 100,
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 24,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsSemiBold,
                      fontSize: 16,
                      color: 'white',
                    }}>
                    Update password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

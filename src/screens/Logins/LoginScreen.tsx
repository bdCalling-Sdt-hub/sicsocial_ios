import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Formik } from 'formik';
import React from 'react';
import { Checkbox } from 'react-native-ui-lib';
import Feather from 'react-native-vector-icons/Feather';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';

const LoginScreen = ({navigation}: NavigProps<null>) => {
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
            email: 'Gabrail101@gmail.com',

            password: 'asdfsadf',
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
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
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Email
                </Text>
                <TextInput
                  value="Gabrail101@gmail.com"
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholderTextColor={colors.textColor.light}
                  placeholder="type "
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
                  Password
                </Text>
                <TextInput
                  value="Gabrail101@gmail.com"
                  placeholderTextColor={colors.textColor.light}
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  placeholder="type "
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
                    <Feather name="eye" size={24} />
                  ) : (
                    <Feather name="eye-off" size={24} />
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
                  onPress={() => setCheck(!check)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                  <Checkbox
                    value={check}
                    onValueChange={() => setCheck(!check)}
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
                <TouchableOpacity
                  onPress={() => {
                    // handleSubmit();
                    navigation?.navigate('HomeRoutes');
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
                    Log In
                  </Text>
                </TouchableOpacity>
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

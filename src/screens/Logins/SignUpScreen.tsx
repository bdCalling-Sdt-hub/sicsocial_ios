import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {GColors} from '../../styles/GColors';
import {GFonts} from '../../styles/GFonts';
import {NavigProps} from '../../interfaces/NaviProps';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/Feather';

const SignUpScreen = ({navigation}: NavigProps<null>) => {
  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        thirdColl
        title="Sign Up !"
        titleStyle={{
          fontSize: 24,
          color: GColors.textColor.blackNormal,
          fontFamily: GFonts.PoppinsSemiBold,
        }}
      />
      <ScrollView>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#5C5C5C',
              fontFamily: GFonts.Poppins,
            }}>
            Please Enter Your Personal Data
          </Text>
        </View>
        <Formik
          initialValues={{
            name: 'Asadullah',
            email: 'Gabrail101@gmail.com',
            contract: '+99000000000000',
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
                    fontFamily: GFonts.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Name
                </Text>
                <TextInput
                  value="Asadullah"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values?.name}
                />
              </View>
              <View
                style={{
                  gap: 8,
                }}>
                <Text
                  style={{
                    fontFamily: GFonts.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Email
                </Text>
                <TextInput
                  value="Gabrail101@gmail.com"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
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
                    fontFamily: GFonts.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Contact no
                </Text>
                <TextInput
                  value="+99000000000000"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('contract')}
                  onBlur={handleBlur('contract')}
                  value={values?.contract}
                />
              </View>
              <View
                style={{
                  gap: 8,
                }}>
                <Text
                  style={{
                    fontFamily: GFonts.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Password
                </Text>
                <TextInput
                  value="Gabrail10"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
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
                  gap: 8,
                }}>
                <Text
                  style={{
                    fontFamily: GFonts.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Confirm Password
                </Text>
                <TextInput
                  value="Gabrail10"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
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
                    <Feather name="eye" size={24} />
                  ) : (
                    <Feather name="eye-off" size={24} />
                  )}
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('EmailConfirmation');
                    // handleSubmit();
                  }}
                  style={{
                    backgroundColor: GColors.primaryColor,
                    borderRadius: 100,
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 24,
                  }}>
                  <Text
                    style={{
                      fontFamily: GFonts.PoppinsSemiBold,
                      fontSize: 16,
                      color: 'white',
                    }}>
                    Sign up
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

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

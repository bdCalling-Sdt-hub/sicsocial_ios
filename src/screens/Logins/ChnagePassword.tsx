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
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
} from '../../redux/apiSlices/authSlice';

import {Formik} from 'formik';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';

const ChangePassword = ({navigation, route}: NavigProps<null>) => {
  const modalRef = React.useRef<PopUpModalRef>();
  const {colors, font} = useStyles();
  const [isShow, setIsShow] = React.useState({
    currentPassword: false,
    newPassword: false,
  });

  const [updatePassword, results] = useChangePasswordMutation();

  const {data: userInfo} = useGetUserProfileQuery({});
  const handleShowPass = (value: string) => {
    value.email = route?.params?.email || userInfo?.data.email;
    updatePassword(value).then(res => {
      // console.log(res);

      if (res.data) {
        modalRef.current?.open({
          title: 'Success',
          content: res.data.message,
        });
        (navigation as any).replace('Login');
      }

      if (res.error) {
        modalRef.current?.open({
          title: 'Warning',
          content: res.error.data.message,
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
        // title="Sign Up !"
        titleStyle={{
          fontSize: 24,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          //   flex: 1,
          justifyContent: 'center',
          // alignItems: 'center',
          paddingTop: '20%',
          paddingBottom: '10%',
        }}>
        <View
          style={{
            marginBottom: 10,
            gap: 10,
            paddingHorizontal: '5%',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.secondaryColor,
              //   textAlign: 'center',
            }}>
            Reset Password !
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.light,
              //   textAlign: 'center',
            }}>
            Please enter your password to reset password!
          </Text>
        </View>
        <Formik
          initialValues={{
            confirmPassword: '',
            newPassword: '',
          }}
          onSubmit={values => handleShowPass(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View
              style={{
                marginTop: 15,
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
                  New Password
                </Text>
                <TextInput
                  value={values?.newPassword}
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder="Enter new password "
                  secureTextEntry={!isShow.newPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsShow({...isShow, newPassword: !isShow.newPassword})
                  }
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
                    fontFamily: font.Poppins,
                    fontSize: 14,
                    color: '#A1A1A1',
                  }}>
                  Confirm Password
                </Text>
                <TextInput
                  value={values?.confirmPassword}
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.neutralColor,
                  }}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Confirm Password"
                  secureTextEntry={!isShow.currentPassword}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsShow({
                      ...isShow,
                      currentPassword: !isShow.currentPassword,
                    })
                  }
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
                <NormalButton
                  onPress={handleSubmit}
                  title="Update Password"
                  isLoading={results.isLoading}
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

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
